import React, { Component } from 'react';
import { func, string } from 'prop-types';

import AdTile from 'sly/web/components/organisms/AdTile';
import { Experiment, Variant } from 'sly/web/services/experiments';
import { assetPath } from 'sly/web/components/themes';

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
            Our Seniorly Local Advisorss Can Help
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
            Our Seniorly Local Advisorss are Available
          </AdTile>
        </Variant>
      </Experiment>
    );
  }
}
