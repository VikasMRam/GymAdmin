import React, { Component } from 'react';
import { shape, object } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { getHelmetForAgentProfilePage } from 'sly/services/helpers/html_headers';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import Footer from 'sly/components/organisms/Footer';
import AgentSummary from 'sly/components/molecules/AgentSummary';
import Section from 'sly/components/molecules/Section';
import { Hr, Paragraph } from 'sly/components/atoms';
import AskQuestionToAgentFormContainer from 'sly/containers/AskQuestionToAgentFormContainer';
import EntityReviews from 'sly/components/organisms/EntityReviews';
import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';
import { getBreadCrumbsForAgent } from 'sly/services/helpers/url';
import BannerNotificationController from 'sly/controllers/BannerNotificationController';
import { formatDate } from 'sly/services/helpers/date';

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
      id, info, aggregateRating, reviews, communities, address, updatedAt,
    } = agent;
    const { ratingValue } = aggregateRating;
    const { displayName, cv } = info;
    const firstName = displayName.split(' ')[0];
    const { state, city } = address;
    const similarCommunityStyle = { layout: 'column', imageSize: 'regular', showDescription: false };
    return (
      <>
        {getHelmetForAgentProfilePage({ agent, location })}

        <TemplateHeader>
          <HeaderContainer />
        </TemplateHeader>

        <TemplateContent>
          <AgentSummaryWrapper ref={this.agentSummaryRef}>
            <BreadCrumb size="caption" items={getBreadCrumbsForAgent({ name: displayName, state, city, id })} />
            <AgentSummary
              agent={agent}
              buttonHref="#ask-agent-question"
            />
          </AgentSummaryWrapper>

          <StyledHr fullWidth />

          {cv && <LegacyContent dangerouslySetInnerHTML={{ __html: cv }} />}
          {cv &&  updatedAt &&
            <Paragraph>
              This page was updated on {formatDate(updatedAt)}
            </Paragraph>
          }
          {cv && <StyledHr fullWidth />}

          {communities &&
            <>
              <Section title={`Assisted Living Communities in ${city}, ${state}`}>
                <SimilarCommunities communities={communities} communityStyle={similarCommunityStyle} />
              </Section>
              <StyledHr fullWidth />
            </>
          }

          {reviews && reviews.length > 0 &&
            <StyledSection title={`${firstName}'s reviews`} >
              <EntityReviews
                reviewsValue={ratingValue}
                reviews={reviews}
              />
            </StyledSection>
          }

          <StyledSection>
            <AskQuestionToAgentWrapper id="ask-agent-question">
              <BannerNotificationController>
                {({ notifyInfo }) => (
                  <AskQuestionToAgentFormContainer
                    id={id}
                    heading={`Ask ${firstName} a question`}
                    firstName={firstName}
                    type="agent-profile-page"
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
      </>
    );
  }
}

export default AgentProfilePage;
