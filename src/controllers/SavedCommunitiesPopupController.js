import React, { Component } from 'react';
import { func, array, object, bool } from 'prop-types';
import { withRouter } from 'react-router';

import { connectController } from 'sly/controllers/index';
import { resourceListReadRequest } from 'sly/store/resource/actions';
import SavedCommunitiesPopup from 'sly/components/organisms/SavedCommunititesPopup/index';
import { USER_SAVE_COMMUNITY_ENTITY_TYPE, USER_SAVE_INIT_STATUS } from 'sly/constants/userSave';
import { getList, isResourceListRequestComplete, isResourceListRequestFailure } from 'sly/store/selectors';
import { getSearchParams } from 'sly/services/helpers/search';
import { SAVED_COMMUNITIES } from 'sly/constants/modalType';
import { objectToURLQueryParams, parseURLQueryParams } from 'sly/services/helpers/url';

class SavedCommunitiesPopupController extends Component {
  static propTypes = {
    userSaves: array,
    getUserSaves: func,
    set: func,
    searchParams: object,
    history: object,
    location: object,
    isLoading: bool,
    isLoadSuccess: bool,
  };

  componentDidMount() {
    const { getUserSaves } = this.props;
    getUserSaves();
  }

  setModal = (value, history, location) => {
    if (value) {
      this.changeSearchParams({ changedParams: { modal: value }, history, location });
    } else {
      this.handleParamsRemove({ paramsToRemove: ['modal'] });
    }
  };

  changeSearchParams = ({ changedParams }) => {
    const { history, location } = this.props;
    const { pathname, search } = location;

    const newParams = { ...parseURLQueryParams(search), ...changedParams };
    const path = `${pathname}?${objectToURLQueryParams(newParams)}`;
    history.push(path);
  };

  handleParamsRemove = ({ paramsToRemove }) => {
    const changedParams = paramsToRemove.reduce((obj, p) => {
      const nobj = obj;
      nobj[p] = undefined;
      return nobj;
    }, {});
    this.changeSearchParams({ changedParams });
  };

  render() {
    const {
      userSaves, searchParams, isLoading, isLoadSuccess,
    } = this.props;
    if (searchParams.modal === SAVED_COMMUNITIES) {
      const savedCommunities = userSaves.reduce((result, userSave) => {
        const { id, info } = userSave;
        const {
          name, address, mainImage, note,
        } = info;
        result.push({
          id, name, address, image: mainImage, note,
        });
        return result;
      }, []);
      return <SavedCommunitiesPopup isLoading={isLoading} isLoadSuccess={isLoadSuccess} savedCommunities={savedCommunities} onCloseButtonClick={() => this.setModal()} />;
    }
    return null;
  }
}

const mapStateToProps = (state, { match, location }) => {
  return {
    searchParams: getSearchParams(match, location),
    userSaves: getList(state, 'userSave'),
    isLoading: !isResourceListRequestComplete(state, 'userSave'),
    isLoadSuccess: !isResourceListRequestFailure(state, 'userSave'),
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    getUserSaves: () => dispatch(resourceListReadRequest('userSave', { 'filters[entity_type]': USER_SAVE_COMMUNITY_ENTITY_TYPE, 'filters[status]': USER_SAVE_INIT_STATUS })),
  };
};

export default withRouter(connectController(mapStateToProps, mapDispatchToProps)(SavedCommunitiesPopupController));
