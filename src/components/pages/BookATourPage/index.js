import React, { Component } from 'react';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import HeaderController from 'sly/controllers/HeaderController';
import CommunityTile from 'sly/components/organisms/CommunityTile';
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

const Column = makeColumn(styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
    align-items: flex-end;
  }
`);

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
          <CommunityTile layout="fullHeight" community={community} />
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
