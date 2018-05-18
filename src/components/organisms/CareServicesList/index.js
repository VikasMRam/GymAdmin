import React, { Component } from 'react';
import { arrayOf, string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import List from 'sly/components/molecules/List';

const StyledArticle = styled.article`
  margin-bottom: ${size('spacing.large')};
`;

export default class CareServicesList extends Component {
  static propTypes = {
    communityName: string.isRequired,
    careServices: arrayOf(string).isRequired,
    serviceHighlights: arrayOf(string).isRequired,
  };

  render() {
    const { communityName, careServices, serviceHighlights } = this.props;

    return (
      <section id="care-services">
        {serviceHighlights && serviceHighlights.length > 0 && <StyledArticle>
          <List heading={`${communityName} is known for`} items={serviceHighlights} />
        </StyledArticle>
        }

        <StyledArticle>
          <List heading={`${communityName} also offers`} items={careServices} />
        </StyledArticle>
      </section>
    );
  }
}
