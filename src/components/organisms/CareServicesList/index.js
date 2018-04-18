import React, { Component } from 'react';
import { arrayOf, string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import List from 'sly/components/molecules/List';

const ArticleWrapper = styled.article`
  margin-bottom: ${size('spacing.large')};
`;

export default class CareServicesList extends Component {
  static propTypes = {
    propertyName: string.isRequired,
    careServices: arrayOf(string).isRequired,
    serviceHighlights: arrayOf(string).isRequired,
  };

  render() {
    const { propertyName, careServices, serviceHighlights } = this.props;

    return (
      <section id="care-services">
        <ArticleWrapper>
          <List
            heading={`${propertyName} is known for`}
            items={serviceHighlights}
          />
        </ArticleWrapper>
        <ArticleWrapper>
          <List heading={`${propertyName} also offers`} items={careServices} />
        </ArticleWrapper>
      </section>
    );
  }
}
