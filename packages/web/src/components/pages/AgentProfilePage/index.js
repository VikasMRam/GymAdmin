import React, { Component } from 'react';
import { shape, object, func } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import { getHelmetForAgentProfilePage } from 'sly/web/services/helpers/html_headers';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/web/components/templates/BasePageTemplate';
import Footer from 'sly/web/components/organisms/Footer';
import AgentSummary from 'sly/web/components/molecules/AgentSummary';
import Section from 'sly/web/components/molecules/Section';
import { Hr, Paragraph } from 'sly/web/components/atoms';
import AskQuestionToAgentFormContainer from 'sly/web/containers/AskQuestionToAgentFormContainer';
import EntityReviews from 'sly/web/components/organisms/EntityReviews';
import SimilarCommunities from 'sly/web/components/organisms/SimilarCommunities';
import BreadCrumb from 'sly/web/components/molecules/BreadCrumb';
import { getBreadCrumbsForAgent } from 'sly/web/services/helpers/url';
import { formatDate } from 'sly/web/services/helpers/date';

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
    onConsultationRequested: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.agentSummaryRef = React.createRef();
  }

  render() {
    const {
      agent,
      location,
      onConsultationRequested,
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
            <BreadCrumb size="caption" pad="large" items={getBreadCrumbsForAgent({ name: displayName, state, city, id })} />
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
              <AskQuestionToAgentFormContainer
                hasEmail
                entityId={id}
                heading={`Ask ${firstName} a question`}
                firstName={firstName}
                type="agent-profile-page"
                postSubmit={() => {
                  onConsultationRequested();
                  if (this.agentSummaryRef.current.scrollIntoView) {
                    this.agentSummaryRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />
            </AskQuestionToAgentWrapper>
          </StyledSection>
        </TemplateContent>
        <Footer />
      </>
    );
  }
}

export default AgentProfilePage;
