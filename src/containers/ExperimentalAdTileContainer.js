import React, { Component } from 'react';
import { func, string } from 'prop-types';

import AdTile from 'sly/components/organisms/AdTile';
import { Experiment, Variant } from 'sly/services/experiments';
import { assetPath } from 'sly/components/themes';

export default class ExperimentalAdTileContainer extends Component {
  static propTypes = {
    locationLabel: string,
    tocLabel: string,
    handleClick: func,
  };
  render() {
    const { locationLabel, tocLabel, handleClick } = this.props;
    const agentAdTitle = `Find the Best ${tocLabel} in ${locationLabel}`;
    const agentAdTitleVerA = `Need Live Help Now in ${locationLabel}?`;
    const agentAdTitleVerB = `Want Custom Pricing and Options in ${locationLabel}?`;
    return (
      <Experiment name="SearchAdTile">
        <Variant name="Ask_Question">
          <AdTile
            title={agentAdTitle}
            buttonText="Ask a Question"
            image={assetPath('images/agents-1.png')}
            buttonProps={{ onClick: handleClick }}
            {...this.props}
          >
            Our Local Senior Living Experts Can Help
          </AdTile>
        </Variant>
        <Variant name="Need_Live_Help">
          <AdTile
            title={agentAdTitleVerA}
            buttonText="Get Help"
            image={assetPath('images/agents-1.png')}
            buttonProps={{ onClick: handleClick }}
            {...this.props}
          >
            Our Local Senior Living Experts are Available
          </AdTile>
        </Variant>
        <Variant name="Custom_Options">
          <AdTile
            title={agentAdTitleVerB}
            buttonText="Get Pricing Now"
            image={assetPath('images/agents-1.png')}
            buttonProps={{ onClick: handleClick }}
            {...this.props}
          >
            Our Local Senior Living Experts Will Help
          </AdTile>
        </Variant>
      </Experiment>
    );
  }
}
