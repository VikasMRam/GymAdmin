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

const formName = 'DashboardCommunityPhotosForm';

const arrayMove = (array, from, to) => {
  array = array.slice();
  const startIndex = to < 0 ? array.length + to : to;
  const item = array.splice(from, 1)[0];
  array.splice(startIndex, 0, item);
  return array;
};

const ReduxForm = reduxForm({
  form: formName,
})(DashboardCommunityPhotosForm);

@query('updateCommunity', 'updateCommunity')
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
    currentValues: state.form[formName]?.values,
  };
})

export default class DashboardCommunityPhotosFormContainer extends Component {
  static propTypes = {
    updateCommunity: func.isRequired,
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

    // we don't resort the images while
    if (!state?.touched) {
      console.warn('resorting')
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

  onSortEnd = ({ oldIndex, newIndex }) => {
    console.log('sorting', oldIndex, newIndex);
    const { images } = this.state;
    this.setState({
      touched: true,
      images: arrayMove(images, oldIndex, newIndex),
    });
    // then update images
  };

  handleSubmitSort = (values) => {
    const { match, updateCommunity } = this.props;
    const { id } = match.params;

    return updateCommunity({ id }, {
      attributes: values,
    });
  };

  render() {
    const { gallery, user, status, currentValues, images: discardImagesProp, ...props } = this.props;
    const { images } = this.state;

    const canEdit = userIs(user, PLATFORM_ADMIN_ROLE);

    const initialValues = pick(
      status.community.result.attributes,
      [],
    );

    // passes by ref
    defaultsDeep(initialValues, {});

    return (
      <ReduxForm
        onSubmit={this.handleSubmitSort}
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
