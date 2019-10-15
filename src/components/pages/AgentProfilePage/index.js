import React, { Fragment, Component } from 'react';
import { shape, object, func } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { getHelmetForAgentProfilePage } from 'sly/services/helpers/html_headers';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import Footer from 'sly/components/organisms/Footer';
import AgentSummary from 'sly/components/molecules/AgentSummary';
import Section from 'sly/components/molecules/Section';
import { Link, Hr } from 'sly/components/atoms';
import AskQuestionToAgentFormContainer from 'sly/containers/AskQuestionToAgentFormContainer';
import EntityReviews from 'sly/components/organisms/EntityReviews';
import SimilarCommunityNearbyTile from 'sly/components/molecules/SimilarCommunityNearbyTile';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';
import { getBreadCrumbsForAgent } from 'sly/services/helpers/url';
import BannerNotificationController from 'sly/controllers/BannerNotificationController';

const StyledHr = styled(Hr)`
  margin-top: ${size('spacing.huge')};
  margin-bottom: ${size('spacing.huge')};
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

const LegacyContent = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
  a {
    text-decoration: none;
    color: ${palette('base')};

    &:hover {
      color: ${palette('filler')};
      cursor: pointer;
    }

    &:active {
      color: ${palette('base')};
    }

    &:focus {
      outline: none;
    }
  }
`;
LegacyContent.defaultProps = {
  palette: 'primary',
};


class AgentProfilePage extends Component {
  static propTypes = {
    agent: shape({
      info: object.isRequired,
    }).isRequired,
    location: object.isRequired,
  };

  constructor(props) {
    super(props);

    this.askAgentAQuestionRef = React.createRef();
    this.agentSummaryRef = React.createRef();
  }

  render() {
    const {
      agent,
      location,
    } = this.props;
    if (!agent) {
      return null;
    }
    const {
      id, info, aggregateRating, reviews, communities, address,
    } = agent;
    const { ratingValue } = aggregateRating;
    const { displayName, bio, cv } = info;
    const firstName = displayName.split(' ')[0];
    const { state, city } = address;
    return (
      <Fragment>
        {getHelmetForAgentProfilePage({ agent, location })}

        <TemplateHeader>
          <HeaderContainer />
        </TemplateHeader>

        <TemplateContent>
          <AgentSummaryWrapper innerRef={this.agentSummaryRef}>
            <BreadCrumb size="caption" items={getBreadCrumbsForAgent({ name: displayName, state, city, id })} />
            <AgentSummary
              agent={agent}
              firstName={firstName}
              onButtonClick={() => {
                if (this.askAgentAQuestionRef.current.scrollIntoView) {
                  this.askAgentAQuestionRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </AgentSummaryWrapper>

          <StyledHr fullWidth />

          {cv && <LegacyContent dangerouslySetInnerHTML={{ __html: cv }} />}
          {cv && <StyledHr fullWidth />}

          {communities &&
            <Fragment>
              <Section title={`Assisted Living Communities in ${city}, ${state}`}>
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
                          address={community.addressString}
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
              <StyledHr fullWidth />
            </Fragment>
          }

          {reviews && reviews.length > 0 &&
            <StyledSection title={`${firstName}'s reviews`} >
              <EntityReviews
                reviewsValue={ratingValue}
                reviews={reviews}
              />
            </StyledSection>
          }

          {bio &&
            <Fragment>
              <StyledSection title={`More About ${firstName}`}>
                {bio}
              </StyledSection>
              <StyledHr fullWidth />
            </Fragment>
          }

          <StyledSection>
            <AskQuestionToAgentWrapper innerRef={this.askAgentAQuestionRef}>
              <BannerNotificationController>
                {({ notifyInfo }) => (
                  <AskQuestionToAgentFormContainer
                    agent={agent}
                    heading={`Ask ${firstName} a question`}
                    firstName={firstName}
                    postSubmit={() => {
                      notifyInfo(`We have received your request and our Seniorly Partner Agent, ${displayName} will get back to you soon.`);
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
