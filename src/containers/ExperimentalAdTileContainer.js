import React, { Component } from 'react';
import { func, string } from 'prop-types';

import AdTile from 'sly/components/organisms/AdTile';
import { Experiment, Variant } from 'sly/services/experiments';
import { assetPath } from 'sly/components/themes';

export default class ExperimentalAdTileContainer extends Component {
  static propTypes = {
    city: string,
    tocLabel: string,
    handleClick: func,
  };
  render() {
    const { city, tocLabel, handleClick } = this.props;
    const agentAdTitle = `Find the Best ${tocLabel} Communities in ${city}`;
    const agentAdTitleVerA = `Need Live Help Now in ${city} ?`;
    const agentAdTitleVerB = `Want Custom Pricing and Options ${city} ?`;
    return (
      <Experiment name="SearchAdTile">
        <Variant name="Ask_Question">
          <AdTile
            title={agentAdTitle}
            buttonText="Ask a Question"
            image={assetPath('images/agents.png')}
            buttonProps={{ onClick: handleClick }}
            {...this.props}
          >
            Our Local Senior Living Experts Can Help.
          </AdTile>
        </Variant>
        <Variant name="Need_Live_Help">
          <AdTile
            title={agentAdTitleVerA}
            buttonText="Get Help"
            image={assetPath('images/agents.png')}
            buttonProps={{ onClick: handleClick }}
            {...this.props}
          >
            Our Local Senior Living Experts are here.
          </AdTile>
        </Variant>
        <Variant name="Custom_Options">
          <AdTile
            title={agentAdTitleVerB}
            buttonText="Get Pricing Now"
            image={assetPath('images/agents.png')}
            buttonProps={{ onClick: handleClick }}
            {...this.props}
          >
            Our Local Senior Living Experts Will Help.
          </AdTile>
        </Variant>
      </Experiment>
    );
  }
}
