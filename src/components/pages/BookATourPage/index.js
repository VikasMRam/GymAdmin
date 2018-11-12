import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import classes from 'classnames';

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

const Header = makeHeader(styled.div`
  background: blue;
`);
const Column = makeColumn(styled.div`
  background: red;
`);
const Body = makeBody(styled.div`
  background: deeppink;
`);
const Controls = makeControls(styled.div`
  background: hotpink; 
`);

export default class BookATourPage extends Component {
  render() {
    return (
      <FullScreenWizard>
        <Header><HeaderController /></Header>
        <Column><CommunityInfo community={community} /></Column>
        <Body />
        <Controls><BookingFormFooter /></Controls>
      </FullScreenWizard>
    );
  }
}
