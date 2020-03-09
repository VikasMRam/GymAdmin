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
})

export default class DashboardCommunityPhotosFormContainer extends Component {
  static propTypes = {
    createImage: func.isRequired,
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

      console.log('resorting!');
      return {
        images: dest.sort((a, b) => {
          const aSort = a.sortOrder || a.sequence || 0;
          const bSort = b.sortOrder || b.sequence || 0;

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
    createImage(image).then(() => {
      this.spliceImageFromState(image);
    });
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
