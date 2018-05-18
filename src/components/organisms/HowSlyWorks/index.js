import React from 'react';
import styled from 'styled-components';

import { assetPath } from "sly/components/themes";
import ReasonTile from 'sly/components/molecules/ReasonTile';


const reasons = [
  {
    image: assetPath('images/how-sly-works/info.png'),
    title: 'Get the Info You Want',
    text:
      'Our powerful search engine is designed to give you unlimited access to all the information you want- pricing, floor plans, photos, ratings and more.',
    to: '/how-it-works/consumers',
  },

  {
    image: assetPath('images/how-sly-works/community.png'),
    title: 'Community Connect',
    text:
      'We connect you directly to each senior community you choose and we guarantee no other properties will obtain your personal information.',
    to: '/how-it-works/consumers',
  },

  {
    image: assetPath('images/how-sly-works/support.jpg'),
    title: 'Access Local Support',
    text:
      'We’ve partnered with top senior living experts to  help you find local options, accompany you on tours, and coordinate the move.',
    to: '/how-it-works/consumers',

  },

  {
    image: assetPath('images/how-sly-works/support.jpg'),
    title: 'Personalized Service',
    text:
      'We listen in your time of need because we have been there. We are available to you via email, online chat, text message or telephone.',
    to: '/how-it-works/consumers',
  }
];

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const HowSlyWorks = () => {
  const reasonTiles = reasons.map((reason) => <ReasonTile key={reason.title} {...reason}/>);
  return (
    <Wrapper>
      {reasonTiles}
    </Wrapper>
  );
};

export default HowSlyWorks;
