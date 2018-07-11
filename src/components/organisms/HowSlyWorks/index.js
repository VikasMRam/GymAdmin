import React from 'react';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { assetPath } from "sly/components/themes";
import ReasonTile from 'sly/components/molecules/ReasonTile';


const reasons = [
  {
    image: assetPath('vectors/Support.svg'),
    title: 'After you message a community:',
    text: `
      1. Seniorly Guide will reach out.\n
      2. Connect with the community.\n
      3. Get our support at every step.
    `,
    to: '/how-it-works/consumers',
  },

  {
    image: assetPath('vectors/Present.svg'),
    title: 'How much does it cost?',
    text: `This is 100% Free. We are compensated by the community you eventualy select.`,
    to: '/how-it-works/consumers',
  },

  {
    image: assetPath('vectors/Home.svg'),
    title: 'Compare Other Communities!',
    text:
      'We’ve partnered with top senior living experts to  help you find local options, accompany you on tours, and coordinate the move.',
    to: '/how-it-works/consumers',
  },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
    > * {
      margin-right: ${size('spacing.large')};

      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

const HowSlyWorks = () => {
  return (
    <Wrapper>
      {reasons.map((reason) => (
        <ReasonTile
          key={reason.title}
          {...reason}
        />
      ))}
    </Wrapper>
  );
};

export default HowSlyWorks;
