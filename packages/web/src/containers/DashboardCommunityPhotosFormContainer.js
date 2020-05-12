import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func, arrayOf } from 'prop-types';
import pick from 'lodash/pick';
import defaultsDeep from 'lodash/defaultsDeep';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import userPropType from 'sly/propTypes/user';
import { galleryPropType, imagePropType } from 'sly/propTypes/gallery';
import { query, prefetch, getRelationship } from 'sly/services/api';
import withUser from 'sly/services/api/withUser';
import { userIs } from 'sly/services/helpers/role';
import { PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/constants/roles';
import DashboardCommunityPhotosForm from 'sly/components/organisms/DashboardCommunityPhotosForm';
import { purgeFromRelationships, invalidateRequests } from 'sly/services/api/actions';
import ConfirmationDialog from 'sly/components/molecules/ConfirmationDialog';

const arrayMove = (array, from, to) => {
  array = array.slice();
  const item = array.splice(from, 1)[0];
  array.splice(to, 0, item);
  return array;
};

@query('updateImage', 'updateImage')
@query('createImage', 'createImage')
@query('deleteImage', 'deleteImage')
@withUser
@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
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
    createImage: func.isRequired,
    updateImage: func.isRequired,
    deleteImage: func.isRequired,
    purgeFromRelationships: func.isRequired,
    invalidateRequests: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    gallery: galleryPropType,
    images: arrayOf(imagePropType),
    user: userPropType,
    currentValues: object.isRequired,
    match: object.isRequired,
    status: object,
  };

  static getDerivedStateFromProps = (props, state) => {
    if (!state?.touched) {
      const { images: a = [] } = props;
      const { images: b = [] } = state || {};
      const dest = [];
      // we don't resort the images while uploading
      for (let i = 0; i < a.length; i++) {
        dest.push(a[i]);
      }

      for (let i = 0; i < b.length; i++) {
        if (!b[i].id) {
          dest.push(b[i]);
        }
      }

      return {
        images: dest.sort((a, b) => {
          const aSort = a.attributes.sortOrder;
          const bSort = b.attributes.sortOrder;

          return aSort - bSort;
        }),
      };
    }

    return state;
  };

  static defaultProps = {
    images: [],
  };

  addImage = () => {
    // this adds a image template with the relationship and sortOrder
    // the rest of the attributes of the image are added in MediaItem
    const { status } = this.props;
    const { images } = this.state;
    const newImage = {
      relationships: {
        gallery: status.community.result.relationships.gallery,
      },
      attributes: {
        sortOrder: images.length,
      },
    };
    this.setState({
      images: [
        ...images,
        newImage,
      ],
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { images } = this.state;

    this.setState({
      touched: true,
      images: arrayMove(images, oldIndex, newIndex),
    }, this.handleSubmitSort);
  };

  handleSubmitSort = () => {
    const { updateImage, notifyError } = this.props;
    const { images } = this.state;

    const promises = images.reduce((acc, { id, attributes }, i) => {
      if (id && attributes.sortOrder !== i) {
        acc.push(updateImage({ id }, {
          attributes: {
            sortOrder: i,
          },
        }));
      }
      return acc;
    }, []);

    return Promise.all(promises)
      .then(() => this.setState({
        touched: false,
      }))
      .catch(e => {
        notifyError(`Could not sort images: ${e.message}`);
      });
  };

  saveImage = (image) => {
    const { createImage, notifyError, notifyInfo } = this.props;
    createImage(image).then(() => {
      this.spliceImageFromState(image);
    })
      .then(() => notifyInfo(`Image ${image.attributes.name} saved correctly`))
      .catch(() => notifyError(`Image ${image.attributes.name} could not be saved`));
  };

  spliceImageFromState = (image) => {
    const { images } = this.state;
    const index = images.indexOf(image);
    const newImages = [...images];
    newImages.splice(index, 1);
    this.setState({
      images: newImages,
    });
  };

  deleteImage = (image) => {
    const { showModal, hideModal, notifyInfo, notifyError } = this.props;

    const doDelete = () => {
      const { gallery, deleteImage, purgeFromRelationships } = this.props;
      if (image.id && image.type) {
        const entity = {
          ...image,
          relationships: {
            gallery: {
              data: gallery,
            },
          },
        };
        return deleteImage(image)
          .then(() => purgeFromRelationships({
            name: 'images',
            entity,
          }))
          .then(hideModal)
          .then(this.handleSubmitSort)
          .then(() => {
            notifyInfo(`Image ${image.attributes.name} removed correctly`);
          })
          .catch(() => {
            notifyError(`Image ${image.attributes.name} could not be removed`);
          });
      }
      return this.spliceImageFromState(image);
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


  render() {
    const { gallery, user, status, currentValues, images: discardImagesProp, deleteImage: discardDeleteImage, ...props } = this.props;
    const { images } = this.state;

    const canEdit = userIs(user, PLATFORM_ADMIN_ROLE | PROVIDER_OD_ROLE);

    const initialValues = pick(
      status.community.result.attributes,
      [],
    );

    // passes by ref
    defaultsDeep(initialValues, {});

    return (
      <DashboardCommunityPhotosForm
        addImage={this.addImage}
        saveImage={this.saveImage}
        deleteImage={this.deleteImage}
        initialValues={initialValues}
        currentValues={currentValues}
        user={user}
        canEdit={canEdit}
        images={images}
        onSortEnd={this.onSortEnd}
        {...props}
      />
    );
  }
}