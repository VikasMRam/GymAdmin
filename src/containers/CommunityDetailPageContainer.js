import React from 'react';
import { func, object, array, bool, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import isMatch from 'lodash/isMatch';
import omit from 'lodash/omit';
import { parse as parseSearch } from 'query-string';
import { Redirect } from 'react-router-dom';
import { withServerState } from 'sly/store';
import SlyEvent from 'sly/services/helpers/events';
import { getLastSegment, replaceLastSegment } from 'sly/services/helpers/url';
import { getDetail } from 'sly/store/selectors';
import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import CommunityDetailPage from 'sly/components/pages/CommunityDetailPage';
import ModalController from 'sly/controllers/ModalController';
import { query, prefetch, withAuth, withApi } from 'sly/services/newApi';
import {
  AVAILABILITY_REQUEST,
  PRICING_REQUEST,
  PROFILE_CONTACTED,
  PROFILE_VIEWED,
  TOUR_BOOKED,
} from 'sly/services/newApi/constants';
import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import CommunityAskQuestionFormContainer from 'sly/containers/CommunityAskQuestionFormContainer';
import { Experiment, Variant } from 'sly/services/experiments';
import styled from 'styled-components';
import { Heading } from 'sly/components/atoms';
import { size } from 'sly/components/themes';

const ignoreSearchParams = [
  'modal',
  'action',
  'entityId',
  'currentStep',
  'token',
  'modal',
];

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const createHasProfileAction = uuidActions => (type, actionInfo) => {
  if (!uuidActions) return false;
  return uuidActions.some((uuidAction) => {
    return (
      uuidAction.actionType === type &&
      isMatch(uuidAction.actionInfo, actionInfo)
    );
  });
};

const getCommunitySlug = match => match.params.communitySlug;

const mapPropsToActions = () => ({
  userAction: resourceDetailReadRequest('userAction'),
});

const mapStateToProps = (state) => {
  // default state for ssr
  return {
    userAction: getDetail(state, 'userAction') || {},
  };
};

@withApi
@withAuth
@query('createAction', 'createUuidAction')
@prefetch('community', 'getCommunity', (req, { match }) =>
  req({
    id: getCommunitySlug(match),
    include: 'similar-communities,questions,agents',
  })
)
@prefetch('uuidActions', 'getUuidActions', (req, { match }) =>
  req({
    'filter[actionType]': `${PROFILE_CONTACTED},${TOUR_BOOKED}`,
    'filter[actionInfo][slug]': getCommunitySlug(match),
  })
)
@withServerState(mapPropsToActions, undefined, ignoreSearchParams)
@connect(mapStateToProps)
export default class CommunityDetailPageContainer extends React.PureComponent {
  static propTypes = {
    set: func,
    status: object,
    community: object,
    uuidActions: array,
    userAction: object,
    errorCode: number,
    history: object,
    location: object,
    user: object,
    isQuestionModalOpenValue: bool,
    searchParams: object,
    setQueryParams: func,
    match: shape({
      url: string.isRequired,
    }),
  };

  componentDidMount() {
    this.uuidActionPageView();
  }

  componentWillUpdate(nextProps) {
    const { match, location } = this.props;
    if (match.url !== nextProps.match.url) {
      this.uuidActionPageView(nextProps);
    } else {
      const prev = omit(parseSearch(location.search), ignoreSearchParams);
      const next = omit(
        parseSearch(nextProps.location.search),
        ignoreSearchParams
      );
      if (!isEqual(prev, next)) {
        this.uuidActionPageView(nextProps);
      }
    }
  }

  uuidActionPageView(props = this.props) {
    const { match, createAction } = props;

    createAction({
      type: 'UUIDAction',
      attributes: {
        actionInfo: {
          slug: match.params.communitySlug,
        },
        actionPage: match.url,
        actionType: PROFILE_VIEWED,
      },
    });
  }

  handleBackToSearchClick = () => {
    const { community } = this.props;
    const { id } = community;
    const event = {
      action: 'click',
      category: 'backToSearch',
      label: id,
    };
    SlyEvent.getInstance().sendEvent(event);
  };

  handleConciergeNumberClick = () => {
    const { community } = this.props;
    const { id } = community;
    const event = {
      action: 'click',
      category: 'conciergePhone',
      label: id,
    };
    SlyEvent.getInstance().sendEvent(event);
  };

  handleLiveChatClick = () => {
    const { community } = this.props;
    const { id } = community;
    const event = {
      action: 'click',
      category: 'liveChat',
      label: id,
    };
    SlyEvent.getInstance().sendEvent(event);
    window && window.olark && window.olark('api.box.expand');
  };

  handleReceptionNumberClick = () => {
    const { community } = this.props;
    const { id } = community;
    const event = {
      action: 'click',
      category: 'receptionPhone',
      label: id,
    };
    SlyEvent.getInstance().sendEvent(event);
  };

  handleSimilarCommunitiesClick = (index, to) => {
    const event = {
      action: 'click',
      category: 'similarCommunity',
      label: index.toString(),
      value: to,
    };
    SlyEvent.getInstance().sendEvent(event);
  };

  handleShareCommunityModalClose = () => {
    const { community } = this.props;
    const { id } = community;
    const event = {
      action: 'close-modal',
      category: 'shareCommunity',
      label: id,
    };

    SlyEvent.getInstance().sendEvent(event);
  };

  getExitintent = (showModal, hideModal) => {
    const {
      community: { id, name, similarProperties },
      onSimilarCommunitiesClick,
    } = this.props;
    const communityStyle = {
      layout: 'row',
      imageSize: 'small',
      showDescription: false,
    };
    // Track profiles on popup launch
    const modalContent = (
      <Experiment name="User_Bounce_Popup" defaultVariant="QuestionModal">
        <Variant name="QuestionModal">
          <CommunityAskQuestionFormContainer
            showModal={showModal}
            communityName={name}
            communitySlug={id}
            onButtonClick={hideModal}
            type="exitForm"
          />
        </Variant>
        <Variant name="SimilarCommunities">
          <StyledHeading>
            We found some Assisted Living communities you might like
          </StyledHeading>

          <SimilarCommunities
            communities={similarProperties}
            onSimilarCommunityClick={onSimilarCommunitiesClick}
            communityStyle={communityStyle}
          />
        </Variant>
      </Experiment>
    );

    return modalContent;
  };

  render() {
    const {
      status,
      user,
      uuidActions,
      community,
      history,
      userAction,
    } = this.props;

    const { location } = history;
    const { pathname } = location;

    if (status.community.status === 301) {
      const newSlug = getLastSegment(status.community.headers.location);
      return <Redirect to={replaceLastSegment(location.pathname, newSlug)} />;
    }

    if (status.community.status === 404) {
      return <Redirect to={replaceLastSegment(location.pathname)} />;
    }

    if (!community || !userAction) {
      return null;
    }

    // If request url does not match resource url from api, perform 302 redirect
    if (pathname !== community.url) {
      return <Redirect to={community.url} />;
    }

    const hasProfileAction = createHasProfileAction(uuidActions, community.id);
    const profileContacted = {
      tour: hasProfileAction(TOUR_BOOKED, {
        slug: community.id,
      }),

      pricing: hasProfileAction(PROFILE_CONTACTED, {
        slug: community.id,
        contactType: PRICING_REQUEST,
      }),

      availability: hasProfileAction(PROFILE_CONTACTED, {
        slug: community.id,
        contactType: AVAILABILITY_REQUEST,
      }),
    };

    return (
      <ModalController>
        {({ show, hide }) => (
          <CommunityDetailPage
            user={user}
            community={community}
            location={location}
            onShareCommunityModalClose={this.handleShareCommunityModalClose}
            onBackToSearchClicked={this.handleBackToSearchClick}
            onConciergeNumberClicked={this.handleConciergeNumberClick}
            onLiveChatClicked={this.handleLiveChatClick}
            onReceptionNumberClicked={this.handleReceptionNumberClick}
            onSimilarCommunitiesClick={this.handleSimilarCommunitiesClick}
            onSubmitSaveCommunityForm={this.handleSubmitSaveCommunityForm}
            profileContacted={profileContacted}
            userAction={userAction}
            history={history}
            exitIntentContent={this.getExitintent(show, hide)}
          />
        )}
      </ModalController>
    );
  }
}
