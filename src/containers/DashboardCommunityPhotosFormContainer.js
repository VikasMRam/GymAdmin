import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func, arrayOf } from 'prop-types';
import pick from 'lodash/pick';
import defaultsDeep from 'lodash/defaultsDeep';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import userPropType from 'sly/propTypes/user';
import { galleryPropType, imagePropType } from 'sly/propTypes/gallery';
import { query, prefetch, getRelationship } from 'sly/services/newApi';
import withUser from 'sly/services/newApi/withUser';
import { userIs } from 'sly/services/helpers/role';
import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import DashboardCommunityPhotosForm from 'sly/components/organisms/DashboardCommunityPhotosForm';

const arrayMove = (array, from, to) => {
  array = array.slice();
  const startIndex = to < 0 ? array.length + to : to;
  const item = array.splice(from, 1)[0];
  array.splice(startIndex, 0, item);
  return array;
};

@query('updateImage', 'updateImage')
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
})

export default class DashboardCommunityPhotosFormContainer extends Component {
  static propTypes = {
    updateImage: func.isRequired,
    deleteImage: func.isRequired,
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
    const { images } = props;

    // we don't resort the images while uploading
    if (!state?.touched) {
      console.log('resorting!');
      return {
        images: [...images].sort((a, b) => {
          const aSort = a.sort || a.sequence;
          const bSort = b.sort || b.sequence;
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
    const { images } = this.state;
    const newImage = {
      attributes: {
        sortOrder: images.length,
      },
    };
    this.setState({
      touched: true,
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
    const { updateImage } = this.props;
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
        console.error(e);
      });
  };

  saveImage = (image) => {
    const { createImage } = this.props;

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
    console.log('delete image', image)
    const { deleteImage } = this.props;
    if (image.id && image.attributes.path) {
      deleteImage({ id: image.id }).then(() => {
        this.spliceImageFromState(image);
      });
    } else {
      this.spliceImageFromState(image);
    }
  };


  render() {
    const { gallery, user, status, currentValues, images: discardImagesProp, deleteImage: discardDeleteImage, ...props } = this.props;
    const { images } = this.state;

    const canEdit = userIs(user, PLATFORM_ADMIN_ROLE);

    const initialValues = pick(
      status.community.result.attributes,
      [],
    );

    // passes by ref
    defaultsDeep(initialValues, {});

    return (
      <DashboardCommunityPhotosForm
        addImage={this.addImage}
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
