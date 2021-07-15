import React, { Component } from 'react';
import { object, func, arrayOf, array } from 'prop-types';
import pick from 'lodash/pick';
import defaultsDeep from 'lodash/defaultsDeep';
import { set } from 'object-path-immutable';
import { withRouter } from 'react-router';

import DashboardListingPhotosForm from 'sly/web/dashboard/listings/DashboardListingPhotosForm';
import userPropType from 'sly/common/propTypes/user';
import { galleryPropType, imagePropType } from 'sly/common/propTypes/gallery';
import { query, prefetch } from 'sly/web/services/api';
import withUser from 'sly/web/services/api/withUser';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE } from 'sly/common/constants/roles';
import ConfirmationDialog from 'sly/web/components/molecules/ConfirmationDialog';
import { withProps } from 'sly/web/services/helpers/hocs';

const arrayMove = (array, from, to) => {
  array = array.slice();
  const item = array.splice(from, 1)[0];
  array.splice(to, 0, item);
  array.forEach((image, i) => {
    image.attributes.sortOrder = i;
  });
  return array;
};

const JSONAPI_IMAGES_PATH = 'relationships.gallery.data.relationships.images.data';

@withUser
@withRouter
@query('updateListing')
@prefetch('listing', 'getListing', (req, { match }) => req({
  id: match.params.id,
  include: 'similar-listings,agent,community,reviews',
}))
@prefetch('imageCategories', 'getImageCategories')
@withProps(({ status }) => {
  const gallery  = status.listing.getRelationship(status.listing.result, 'gallery');
  const images = status.listing.getRelationship(gallery, 'images');
  const category = status.listing.getRelationship(status.listing.result, 'category');
  return {
    gallery,
    images,
    category,
  };
})

export default class DashboardListingPhotosFormContainer extends Component {
  static propTypes = {
    updateListing: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    gallery: galleryPropType,
    images: arrayOf(imagePropType),
    user: userPropType,
    match: object.isRequired,
    status: object,
    imageCategories: array,
  };

  static defaultProps = {
    images: [],
  };


  makeImagesFromProps = () => {
    const { images } = this.props;

    return images.sort((a, b) => {
      const aSort = a.attributes.sortOrder;
      const bSort = b.attributes.sortOrder;

      return aSort - bSort;
    });
  }


  makeInitialState = () => {
    const images = this.makeImagesFromProps();

    return {
      images,

    };
  };

  state = this.makeInitialState();

  reloadImages = (images = this.makeImagesFromProps()) => {
    return new Promise(resolve => this.setState({
      images,
    }, resolve));
  };

  updateListingImages = (images) => {
    const { match, updateListing, notifyError, notifyInfo, status } = this.props;
    const { id } = match.params;

    const listing = set(status.listing.result, JSONAPI_IMAGES_PATH, images);

    // here:
    //  1. put the images in the state to reflect the last ui change (adding, removing, sorting..)
    //  2. patch the community with that change
    //  3. reload the state with the single source of truth (the response from the server)
    return this.reloadImages(images)
      .then(() => updateListing({ id }, listing))
      .then(() => notifyInfo(`Details for ${listing.attributes.name} saved correctly`))
      .catch(() => notifyError(`Details for ${listing.attributes.name} could not be saved`))
      .then(status.listing.refetch);
  };

  addImages = (result) => {
    const { status } = this.props;
    const { images } = this.state;
    const resultImages = result.map(({ name, path }) => ({
      type: 'Image',
      relationships: {
        gallery: status.listing.result.relationships.gallery,
      },
      attributes: {
        sortOrder: images.length,
        name,
        path,
      },
    }));

    const newImages = [
      ...images,
      ...resultImages,
    ];

    return this.updateListingImages(newImages);
  };

  onUploadError = (error) => {
    const { notifyError, listing } = this.props;
    notifyError(`Photos for ${listing.name} could not be uploaded to the CDN`);
  };

  saveImage = (image, original) => {
    const { images } = this.state;
    const index = images.indexOf(original);
    const newImages = [
      ...images.slice(0, index),
      image,
      ...images.slice(index + 1),
    ];
    return this.updateListingImages(newImages);
  };

  deleteImage = (image) => {
    const { showModal, hideModal } = this.props;

    const doDelete = () => {
      const { images } = this.state;
      const index = images.indexOf(image);
      const newImages = [...images];
      newImages.splice(index, 1);
      this.updateListingImages(newImages)
        .then(hideModal);
    };

    return showModal((
      <ConfirmationDialog
        heading={`Remove ${image.attributes.description || image.attributes.name}`}
        description={`Are you sure that you want to remove ${image.attributes.name}? This cannot be undone.`}
        onConfirmClick={doDelete}
        onCancelClick={hideModal}
      />
    ), hideModal);
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { images } = this.state;

    const newImages = arrayMove(images, oldIndex, newIndex);
    this.updateListingImages(newImages);
  };

  render() {
    const { gallery, user, status, imageCategories, ...props } = this.props;
    const { images } = this.state;

    const canEdit = userIs(user, PLATFORM_ADMIN_ROLE);

    const initialValues = pick(
      status.listing.result.attributes,
      [],
    );

    // passes by ref
    defaultsDeep(initialValues, {});

    return (
      <DashboardListingPhotosForm
        {...props}
        onUpload={this.addImages}
        onUploadError={this.onUploadError}
        saveImage={this.saveImage}
        deleteImage={this.deleteImage}
        initialValues={initialValues}
        imageCategories={imageCategories}
        user={user}
        canEdit={canEdit}
        images={images}
        onSortEnd={this.onSortEnd}
      />
    );
  }
}
