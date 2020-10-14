import React, { Component } from 'react';
import styled from 'styled-components';
import { func, object } from 'prop-types';

import { size } from 'sly/common/components/themes';
import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import { Hr } from 'sly/web/components/atoms';
import { getHelmetForAgentsPage } from 'sly/web/services/helpers/html_headers';
import { agentsFAQs, mostSearchedRegions } from 'sly/web/constants/agents';
import { CONSULTATION_REQUESTED } from 'sly/web/services/api/constants';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import Footer from 'sly/web/components/organisms/Footer';
import Section from 'sly/web/components/molecules/Section';
import IconInfoTile from 'sly/web/components/molecules/IconInfoTile';
import MostSearchedRegions, { ColumnWrapper } from 'sly/web/components/molecules/MostSearchedRegions';
import FindLocalAgent from 'sly/web/components/molecules/FindLocalAgent';
import AskQuestionToAgentFormContainer from 'sly/web/containers/AskQuestionToAgentFormContainer';
import FAQSection from 'sly/web/components/organisms/FAQSection';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';

const HeroWrapper = styled.div`
  position: relative;
  height: ${size('header.agents.heroImage.height')};

  > * {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

const HeroBackgroundImage = styled(ResponsiveImage)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  z-index: 0;
  display: block;
`;

const HeroTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * {
    max-width: ${size('mobileLayout.col4')};
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      max-width: ${size('tabletLayout.col6')};
    }
    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      max-width: ${size('layout.col8')};
    }
  }
`;

const StyledSection = styled(Section)`
  text-align: left;
  margin: ${size('spacing.huge')} auto;

  & > h2 {
    margin-bottom: ${size('spacing.xLarge')};
  }
`;

const FormSection = styled(StyledSection)`
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col6')};
  }
`;

class AgentsPage extends Component {
  static propTypes = {
    onLocationSearch: func,
    location: object.isRequired,
    onConsultationRequested: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.heroRef = React.createRef();
  }

  render() {
    const {
      onLocationSearch,
      location,
      onConsultationRequested,
    } = this.props;
    const headerContent = (
      <>
        <HeaderContainer />
        <HeroWrapper ref={this.heroRef}>
          <HeroBackgroundImage path="react-assets/agents/agent-hero.png" height={480} alt="A Home To Love" />
          <HeroTextWrapper>
            <FindLocalAgent onLocationSearch={onLocationSearch} placeholder="Search by city" />
          </HeroTextWrapper>
        </HeroWrapper>
      </>
    );
    return (
      <>
        {getHelmetForAgentsPage({ location })}
        <TemplateHeader>{headerContent}</TemplateHeader>
        <TemplateContent>
          <StyledSection>
            <ColumnWrapper>
              <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="primary" iconVariation="base" icon="loyalty" heading="100% free" content="Seniorly Partner Agents are commissioned by the senior living community you choose only when you move-in. They are on your side to find and choose the right option for mom or dad." />
              <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="primary" iconVariation="base" icon="star" heading="Personalized Service" content="Navigating this process can be a challenge. Your senior living agent will help you throughout to answer questions, weigh your options, accompany you on tours and help you get the best deal for your budget." />
              <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="primary" iconVariation="base" icon="location" heading="Local Insider Expertise" content="Your agent will know and share the unique details of assisted living communities and care options in your area." />
            </ColumnWrapper>
          </StyledSection>
          <Hr fullWidth />
          <StyledSection centerTitle title="Search senior living agents by region">
            <MostSearchedRegions mostSearchedRegions={mostSearchedRegions} />
          </StyledSection>
          <Hr fullWidth />
          <FormSection>
            <AskQuestionToAgentFormContainer
              hasLocation
              actionType={CONSULTATION_REQUESTED}
              postSubmit={() => {
                onConsultationRequested();
                if (this.heroRef.current.scrollIntoView) {
                  this.heroRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </FormSection>
          <Hr fullWidth />
          <StyledSection>
            <FAQSection faqs={agentsFAQs} />
          </StyledSection>
        </TemplateContent>
        <Footer />
      </>
    );
  }
}

export default AgentsPage;
