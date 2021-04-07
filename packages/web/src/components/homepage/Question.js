import React from 'react';
import styled from 'styled-components';

import Section from './Section';

import { assetPath } from 'sly/web/components/themes';
import HomeCTABox from 'sly/web/components/organisms/HomeCTABox';
import { getKey } from 'sly/common/components/themes';
import { Heading, Grid } from 'sly/common/system';
import SlyEvent from 'sly/web/services/helpers/events';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';

const sendEvent = (category, action, label, value) => SlyEvent.getInstance().sendEvent({
  category,
  action,
  label,
  value,
});

const Question = ({ showModal, hideModal, onLocationSearch, ...props }) => {
  const onButtonClick = () => {
    const modalContent = (
      <>
        <Heading font="title-m">Please enter a location:</Heading>
        <SearchBoxContainer
          layout="homeHero"
          onLocationSearch={(e) => {
            hideModal();
            onLocationSearch(e, true);
          }}
        />
      </>
    );
    sendEvent('freedomToExploreSearch', 'open');

    const closeModal = () => {
      hideModal();
      sendEvent('freedomToExploreSearch', 'close');
    };

    showModal(modalContent, closeModal, 'searchBox');
  };

  return (
    <Section
      {...props}
    >
      <Heading
        font="title-xl"
        textAlign="center"
        maxWidth="col8"
        marginX="auto"
        marginBottom="l"
      >
        Why do 3.5 million families use Seniorly every year?
      </Heading>

      <Grid
        gridGap="l"
        gridTemplateColumns="auto"
        sx$laptop={{
          gridTemplateColumns: 'col4 col4 col4',
        }}
      >
        <HomeCTABox
          image={assetPath('vectors/home/advisor.svg')}
          heading="Your Own Advisor"
          buttonText="Speak with an expert"
          buttonProps={{
            to: '/wizards/assessment?cta=speakExpert&entry=homepage',
          }}
        >
          We connect you with a Seniorly Local Advisor, our trusted partner who knows the communities in your area. Rely on your advisor as much or as little as you need to find a new home you&apos;ll love.
        </HomeCTABox>
        <HomeCTABox
          image={assetPath('vectors/home/smart-search.svg')}
          heading="Our Smart Search"
          buttonText="Take our quiz"
          buttonPalette="primary"
          buttonProps={{
            to: '/wizards/assessment?cta=generalOptions&entry=homepage',
          }}
        >
          Take our short quiz to set your personal preferences, then see the communities we recommend for you. Seniorly Smart Search helps you make sense of your options and choose wisely.
        </HomeCTABox>
        <HomeCTABox
          image={assetPath('vectors/home/freedom-to-explore.svg')}
          heading="Freedom to Explore"
          buttonText="Explore communities"
          buttonPalette="harvest"
          buttonProps={{
            onClick: onButtonClick,
          }}
        >
          Want to explore communities on your own? No problem. We give you the tools to navigate through over 40,000 of the best communities—with access to monthly pricing and exclusive photos.
        </HomeCTABox>
      </Grid>
    </Section>
  );
};

export default Question;
