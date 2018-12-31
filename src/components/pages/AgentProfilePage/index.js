import React, { Fragment, Component } from 'react';
import { shape, object, func } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import Footer from 'sly/components/organisms/Footer';
import AgentSummary from 'sly/components/molecules/AgentSummary/index';
import Section from 'sly/components/molecules/Section/index';
import { Link, Hr } from 'sly/components/atoms';
import AskQuestionToAgentFormContainer from 'sly/containers/AskQuestionToAgentFormContainer';
import EntityReviews from 'sly/components/organisms/EntityReviews/index';
import SimilarCommunityNearbyTile from 'sly/components/molecules/SimilarCommunityNearbyTile/index';
import BreadCrumb from 'sly/components/molecules/BreadCrumb/index';
import { getBreadCrumbsForAgent } from 'sly/services/helpers/url';
import BannerNotificationController from 'sly/controllers/BannerNotificationController';

const StyledHr = styled(Hr)`
  margin: ${size('spacing.xxxLarge')} 0;
`;

const StyledSection = styled(Section)`
  margin: 0 ${size('spacing.regular')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin: 0 ${size('spacing.xxxLarge')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin: 0;
  }
`;

const AgentSummaryWrapper = styled.div`
  margin: 0 auto;
  width: ${size('mobileLayout.col4')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tabletLayout.col8')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col10')};
  }
`;

const AskQuestionToAgentWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: ${size('spacing.huge')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tabletLayout.col6')};
  }
`;

const AgentCommunityLink = styled(Link)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const AgentCommunitiesWrapper = styled.div`
  width: 100%;
  justify-content: center;
  display: grid;
  grid-gap: ${size('spacing.large')};
  grid-template-columns: ${size('layout.col4')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: ${size('layout.col4')} ${size('layout.col4')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: ${size('layout.col4')} ${size('layout.col4')} ${size('layout.col4')};
  }
`;

class AgentProfilePage extends Component {
  static propTypes = {
    agent: shape({
      info: object.isRequired,
    }).isRequired,
    user: object,
    userDetails: object,
    postUserAction: func.isRequired,
  }
  constructor(props) {
    super(props);
    this.askAgentAQuestionRef = React.createRef();
    this.agentSummaryRef = React.createRef();
  }

  render() {
    const {
      agent, user, userDetails, postUserAction,
    } = this.props;
    if (!agent) {
      return null;
    }
    const {
      info, aggregateRating, reviews, communities, address,
    } = agent;
    const { ratingValue } = aggregateRating;
    const { displayName, bio } = info;
    const firstName = displayName.split(' ')[0];
    const { state, city } = address;
    return (
      <Fragment>
        <TemplateHeader>
          <HeaderContainer />
        </TemplateHeader>
        <TemplateContent>
          <AgentSummaryWrapper innerRef={this.agentSummaryRef}>
            <BreadCrumb items={getBreadCrumbsForAgent({ name: displayName, state, city })} />
            <AgentSummary
              {...info}
              aggregateRating={aggregateRating}
              firstName={firstName}
              onButtonClick={() => {
                if (this.askAgentAQuestionRef.current.scrollIntoView) {
                  this.askAgentAQuestionRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </AgentSummaryWrapper>
          <StyledHr />
          {communities &&
            <Fragment>
              <Section title={`${firstName}'s communities`}>
                <AgentCommunitiesWrapper>
                  {communities.map((community) => {
                    const { mainService } = community;
                    return (
                      <AgentCommunityLink
                        key={community.slug}
                        to={community.url}
                      >
                        <SimilarCommunityNearbyTile
                          image={community.imageUrl}
                          typeOfCare={mainService}
                          name={community.name}
                          estimatedRate={community.estimated || 0}
                          startingRate={community.startingRate}
                          reviewsValue={community.reviewsValue}
                          numReviews={community.numReviews}
                        />
                      </AgentCommunityLink>
                    );
                  })}
                </AgentCommunitiesWrapper>
              </Section>
              <StyledHr />
            </Fragment>
          }
          <StyledSection title={`${firstName}'s reviews`} >
            <EntityReviews
              reviewsValue={ratingValue}
              reviews={reviews}
              user={user}
            />
          </StyledSection>
          <StyledSection title={`About ${firstName}`}>
            {bio}
          </StyledSection>
          <StyledHr />
          <StyledSection>
            <AskQuestionToAgentWrapper innerRef={this.askAgentAQuestionRef}>
              <BannerNotificationController>
                {({ notifyInfo }) => (
                  <AskQuestionToAgentFormContainer
                    agent={agent}
                    heading={`Ask ${firstName} a question`}
                    firstName={firstName}
                    userDetails={userDetails}
                    postUserAction={postUserAction}
                    postSubmit={() => {
                      notifyInfo(`We have received your request and our partner agent, ${displayName} will get back to you soon.`);
                      if (this.agentSummaryRef.current.scrollIntoView) {
                        this.agentSummaryRef.current.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  />)
                }
              </BannerNotificationController>
            </AskQuestionToAgentWrapper>
          </StyledSection>
        </TemplateContent>
        <Footer />
      </Fragment>
    );
  }
}

export default AgentProfilePage;
