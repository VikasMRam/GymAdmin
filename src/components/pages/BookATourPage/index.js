import React, { Component } from 'react';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import HeaderController from 'sly/controllers/HeaderController';
import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import BookingFormFooter from 'sly/components/molecules/BookingFormFooter';

import {
  FullScreenWizard,
  makeBody,
  makeColumn,
  makeControls,
  makeHeader,
} from 'sly/components/templates/FullScreenWizard';

import community from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const Header = makeHeader(HeaderController);

const columnBackground = ({ backgroundImage }) => `url(${backgroundImage})`;
const Column = makeColumn(styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    background-image: ${columnBackground};
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
  }
`);

const StyledCommunityInfo = styled(CommunityInfo)`
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  padding: ${size('spacing.large')}; 
  padding-top: ${size('spacing.xxxLarge')}; 
  width: 100%;
`;

const Body = makeBody(styled.div`background: deeppink;`);
const Controls = makeControls(styled.div`background: hotpink;`);

export default class BookATourPage extends Component {
  render() {
    return (
      <FullScreenWizard>
        <Header>
          <HeaderController />
        </Header>
        <Column backgroundImage={community.mainImage}>
          <StyledCommunityInfo palette="white" community={community} />
        </Column>
        <Body>
          
        </Body>
        <Controls>
          <BookingFormFooter />
        </Controls>
      </FullScreenWizard>
    );
  }
}
