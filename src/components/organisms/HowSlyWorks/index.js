import React from 'react';
import styled, { css } from 'styled-components';
import { oneOf } from 'prop-types';
import { switchProp } from 'styled-tools';

import { size, assetPath } from 'sly/components/themes';
import ReasonTile from 'sly/components/molecules/ReasonTile';


const support = {
  image: assetPath('vectors/Support.svg'),
  title: 'Get Our Full Support',
  text: 'Once you select a property, we assign a Seniorly Guide. This expert is near you and provides all the support you need.',
  to: '/how-it-works/consumers',
};

const free = {
  image: assetPath('vectors/Present.svg'),
  title: 'This Is a Free Service',
  text: 'We do not charge you for our services. We are compensated by the community you eventually select.',
  to: '/how-it-works/consumers',
};

const search = {
  image: assetPath('vectors/Home.svg'),
  title: 'Search & Compare',
  text: 'Use our search box and all its features to find a home to love. Get price, pics and more. Compare all the communities you’d like.',
  to: '/how-it-works/consumers',
};

const connect = {
  image: assetPath('vectors/Support.svg'),
  title: 'Connect with a Community',
  text: 'Now that you’ve made a choice, we assign a Seniorly Guide who ensures you connect with the community and get full support.',
  to: '/how-it-works/consumers',
};

const compare = {
  image: assetPath('vectors/Home.svg'),
  title: 'Compare Other Communities',
  text: 'While you wait to connect, we recommend you search and compare other communities near your selection.',
  to: '/how-it-works/consumers',
};

const reasons = {
  howItWorks: [search, support, free],
  whatNext: [connect, compare, free],
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${switchProp('layout', {
    section: css`
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        flex-direction: row;
        > * {
          margin-right: ${size('spacing.large')};

          &:last-child {
            margin-right: 0;
          }
        }
      }
    `,
  })};
`;

const HowSlyWorks = ({ reasons: key, ...props }) => {
  return (
    <Wrapper {...props}>
      {reasons[key].map(reason => (
        <ReasonTile
          key={reason.title}
          {...reason}
        />
      ))}
    </Wrapper>
  );
};

HowSlyWorks.propTypes = {
  layout: oneOf(['section', 'modal']).isRequired,
  reasons: oneOf(['howItWorks', 'whatNext']).isRequired,
};

HowSlyWorks.defaultProps = {
  layout: 'section',
  reasons: 'howItWorks',
};

export default HowSlyWorks;
