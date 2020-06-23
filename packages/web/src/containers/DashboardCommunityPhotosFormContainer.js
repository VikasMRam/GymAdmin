import React, { Component } from 'react';
import { object, func, arrayOf } from 'prop-types';
import pick from 'lodash/pick';
import defaultsDeep from 'lodash/defaultsDeep';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { set } from 'object-path-immutable';

import userPropType from 'sly/web/propTypes/user';
import { galleryPropType, imagePropType } from 'sly/web/propTypes/gallery';
import { query, prefetch, getRelationship } from 'sly/web/services/api';
import withUser from 'sly/web/services/api/withUser';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/web/constants/roles';
import DashboardCommunityPhotosForm from 'sly/web/components/organisms/DashboardCommunityPhotosForm';
import { purgeFromRelationships, invalidateRequests } from 'sly/web/services/api/actions';
import ConfirmationDialog from 'sly/web/components/molecules/ConfirmationDialog';

const arrayMove = (array, from, to) => {
  array = array.slice();
  const item = array.splice(from, 1)[0];
  array.splice(to, 0, item);
  array.forEach((image, i) => {
    image.attributes.sortOrder = i;
  });
  return array;
};

const denormalizeImages = images => images.map(({ id, type, ...attributes }) => ({
  id,
  type: 'Image',
  attributes,
}));

const imageNotIn = list => image => !list.some(l => (
  l.attributes.sortOrder === image.attributes.sortOrder
  && l.attributes.path === image.attributes.path
));

const imageIsNotNew = image => (image.id && image.attributes.path);
const imageIsNew = image => !imageIsNotNew(image);

const imageHasChanged = list => image => list.find(n => n.id === image.id && (
  (n.attributes.path || '') !== (image.attributes.path || '')
  || (n.attributes.description || '') !== (image.attributes.description || '')
));

const JSONAPI_IMAGES_PATH = 'relationships.gallery.data.relationships.images.data';

@query('updateCommunity')
@withUser
@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
  include: 'suggested-edits',
}))
@connect((state, { status }) => {
  const gallery  = getRelationship(state, status.community.result, 'gallery');
  const images = getRelationship(state, gallery, 'images');
  return {
    gallery,
    images,
  };
}, { purgeFromRelationships, invalidateRequests })

export default class DashboardCommunityPhotosFormContainer extends Component {
  static propTypes = {
    updateCommunity: func.isRequired,
    purgeFromRelationships: func.isRequired,
    invalidateRequests: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    gallery: galleryPropType,
    images: arrayOf(imagePropType),
    user: userPropType,
    match: object.isRequired,
    status: object,
    currentEdit: object,
  };

  static defaultProps = {
    images: [],
  };

  makeImagesFromProps = () => {
    const { currentEdit, images } = this.props;
    const newImages = currentEdit?.changes['gallery.images']
      ? denormalizeImages(currentEdit.change.gallery.images)
      : images;

    return newImages.sort((a, b) => {
      const aSort = a.attributes.sortOrder;
      const bSort = b.attributes.sortOrder;

      return aSort - bSort;
    });
  }

  getChangesFromImages = (newImages) => {
    const { currentEdit, images } = this.props;

    const changes = {
      deleted: [],
      newImages: [],
      modified: [],
    };

    if (!currentEdit?.changes['gallery.images']) {
      return changes;
    }

    changes.deleted = images.filter(imageNotIn(newImages));
    changes.newImages = newImages.filter(imageIsNew);
    changes.modified = images
      .filter(imageIsNotNew)
      .filter(imageHasChanged(newImages));

    return changes;
  };

  makeInitialState = () => {
    const images = this.makeImagesFromProps();
    const changes = this.getChangesFromImages(images);
    return {
      images,
      changes,
      savePromise: Promise.resolve(),
    };
  };

  state = this.makeInitialState();

  reloadImages = (images = this.makeImagesFromProps()) => {
    const changes = this.getChangesFromImages(images);
    return new Promise(resolve => this.setState({
      images,
      changes,
    }, resolve));
  };

  updateCommunityImages = (images) => {
    const { match, updateCommunity, notifyError, notifyInfo, status } = this.props;
    const { id } = match.params;

    const community = set(status.community.result, JSONAPI_IMAGES_PATH, images);

    // here:
    //  1. put the images in the state to reflect the last ui change (adding, removing, sorting..)
    //  2. patch the community with that change
    //  3. reload the state with the single source of truth (the response from the server)
    return this.reloadImages(images)
      .then(() => updateCommunity({ id }, community))
      .then(() => notifyInfo(`Details for ${community.attributes.name} saved correctly`))
      .catch(() => notifyError(`Details for ${community.attributes.name} could not be saved`))
      .then(this.reloadImages);
  };

  addImage = ({ name, path }) => {
    const { savePromise } = this.state;

    this.setState({
      savePromise: savePromise.then(() => {
        const { status } = this.props;
        const { images } = this.state;
        const newImage = {
          type: 'Image',
          relationships: {
            gallery: status.community.result.relationships.gallery,
          },
          attributes: {
            sortOrder: images.length,
            name,
            path,
          },
        };

        const newImages = [
          ...images,
          newImage,
        ];

        return this.updateCommunityImages(newImages);
      }),
    });
  };

  onUpload = (result, file) => {
    this.addImage({
      name: file.name,
      path: result.path,
    });
  };

  onUploadError = (error) => {
    const { notifyError, community } = this.props;
    notifyError(`Photos for ${community.name} could not be uploaded to the CDN`);
  };

  saveImage = (image, original) => {
    const { images } = this.state;
    const index = images.indexOf(original);
    const newImages = [
      ...images.slice(0, index),
      image,
      ...images.slice(index + 1),
    ];
    this.updateCommunityImages(newImages);
  };

  deleteImage = (image) => {
    const { showModal, hideModal } = this.props;

    const doDelete = () => {
      const { images } = this.state;
      const index = images.indexOf(image);
      const newImages = [...images];
      newImages.splice(index, 1);
      this.updateCommunityImages(newImages)
        .then(hideModal);
    };

    return showModal((
      <ConfirmationDialog
        heading={`Remove ${image.attributes.name}`}
        description={`Are you sure that you want to remove ${image.attributes.name}? This cannot be undone.`}
        onConfirmClick={doDelete}
        onCancelClick={hideModal}
      />
    ), hideModal);
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { images } = this.state;

    const newImages = arrayMove(images, oldIndex, newIndex);
    this.updateCommunityImages(newImages);
  };

  render() {
    const { gallery, user, status, currentEdit, ...props } = this.props;
    const { images, changes } = this.state;

    const canEdit = !currentEdit?.isPendingForAdmin
      && userIs(user, PLATFORM_ADMIN_ROLE | PROVIDER_OD_ROLE);

    const initialValues = pick(
      status.community.result.attributes,
      [],
    );

    // passes by ref
    defaultsDeep(initialValues, {});

    return (
      <DashboardCommunityPhotosForm
        {...props}
        onUpload={this.onUpload}
        onUploadError={this.onUploadError}
        saveImage={this.saveImage}
        deleteImage={this.deleteImage}
        initialValues={initialValues}
        user={user}
        canEdit={canEdit}
        images={images}
        onSortEnd={this.onSortEnd}
        changes={changes}
      />
    );
  }
}
