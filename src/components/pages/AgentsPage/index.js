import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { func, object, string } from 'prop-types';

import { size, assetPath } from 'sly/components/themes';
import { TemplateHeader, TemplateContent } from 'sly/components/templates/BasePageTemplate';
import { Image, Hr } from 'sly/components/atoms';
import { getHelmetForAgentsPage } from 'sly/services/helpers/html_headers';
import { agentsFAQs, mostSearchedRegions } from 'sly/constants/agents';
import HeaderContainer from 'sly/containers/HeaderContainer';
import Footer from 'sly/components/organisms/Footer';
import Section from 'sly/components/molecules/Section';
import IconInfoTile from 'sly/components/molecules/IconInfoTile';
import MostSearchedRegions, { ColumnWrapper } from 'sly/components/molecules/MostSearchedRegions';
import FindLocalAgent from 'sly/components/molecules/FindLocalAgent';
import TalkToAgentFormContainer from 'sly/containers/TalkToAgentFormContainer';
import BannerNotificationController from 'sly/controllers/BannerNotificationController';
import FAQSection from 'sly/components/organisms/FAQSection';

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

const HeroBackgroundImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
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

const FormSection = StyledSection.extend`
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col6')};
  }
`;

class AgentsPage extends Component {
  static propTypes = {
    onLocationSearch: func,
    userDetails: object,
    postUserAction: func.isRequired,
    pathName: string.isRequired,
  };

  constructor(props) {
    super(props);
    this.heroRef = React.createRef();
  }

  render() {
    const {
      onLocationSearch, userDetails, postUserAction, pathName,
    } = this.props;
    const headerContent = (
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <HeaderContainer />
        <HeroWrapper innerRef={this.heroRef}>
          <HeroBackgroundImage src={assetPath('images/agents/agent-hero.png')} alt="A Home To Love" />
          <HeroTextWrapper>
            <FindLocalAgent onLocationSearch={onLocationSearch} />
          </HeroTextWrapper>
        </HeroWrapper>
      </Fragment>
    );
    return (
      <Fragment>
        {getHelmetForAgentsPage()}
        <TemplateHeader>{headerContent}</TemplateHeader>
        <TemplateContent>
          <StyledSection>
            <ColumnWrapper>
              <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="house" heading="100% free" content="Seniorly Partner Agents are commissioned by the community you choose only when you move-in. They are on your side to find and choose the right option." />
              <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="star" heading="Personalized Service" content="Navigating this process can be a challenge. Your agent will help you throughout to answer questions, weigh your options, accompany you on tours and help you get the best deal for your budget." />
              <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="loyalty" heading="Local Insider Expertise" content="Your agent will know and share the unique details of communities and care options in your area." />
            </ColumnWrapper>
          </StyledSection>
          <Hr fullWidth />
          <StyledSection centerTitle title="Search senior living agents by region">
            <MostSearchedRegions mostSearchedRegions={mostSearchedRegions} />
          </StyledSection>
          <Hr fullWidth />
          <FormSection>
            <BannerNotificationController>
              {({ notifyInfo }) => (
                <TalkToAgentFormContainer
                  postUserAction={postUserAction}
                  userDetails={userDetails}
                  pathName={pathName}
                  postSubmit={() => {
                    notifyInfo('We have received your request and we will get back to you soon.');
                    if (this.heroRef.current.scrollIntoView) {
                      this.heroRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />
              )}
            </BannerNotificationController>
          </FormSection>
          <Hr fullWidth />
          <StyledSection>
            <FAQSection faqs={agentsFAQs} />
          </StyledSection>
        </TemplateContent>
        <Footer />
      </Fragment>
    );
  }
}

export default AgentsPage;
