import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import CommunityTile from '.';

const { similarProperties } = RhodaGoldmanPlaza;
const similarProperty = similarProperties[0];

const props = {
  community: {
    name: similarProperty.name,
    picture: similarProperty.mainImage,
    startingRate: similarProperty.startingRate,
    rating: 3.5,
    numReviews: 50,
  },
};

class CommunityTileWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
  }
  render() {
    return (
      <CommunityTile
        {...props}
        selectable
        selected={this.state.selected}
        onClick={() => this.setState({ selected: !this.state.selected })}
      />
    );
  }
}

storiesOf('Molecules|CommunityTile', module)
  .add('default', () => <CommunityTile {...props} />)
  .add('Selectable', () => <CommunityTile {...props} selectable />)
  .add('Selectable Selected', () => (
    <CommunityTile {...props} selectable selected />
  ))
  .add('Selectable Toggle Check', () => <CommunityTileWrapper />);
