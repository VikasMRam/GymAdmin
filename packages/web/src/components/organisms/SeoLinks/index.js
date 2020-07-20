import React, { Component } from 'react';
import styled from 'styled-components';
import { arrayOf, string, object } from 'prop-types';

import { size, palette } from 'sly/common/components/themes';
import { Heading, Link } from 'sly/web/components/atoms';
import CollapsibleBlock from 'sly/web/components/molecules/CollapsibleBlock';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledCollapsibleBlock = styled(CollapsibleBlock)`

`;

const PatchedCollapsibleBlock = styled(({ className, ...props }) => (
  <StyledCollapsibleBlock
    blockClassName={className}
    {...props}
  />))`
  line-height: 1.5;
  margin-bottom: ${size('spacing.large')};
  font-size: ${size('text.tiny')};
`;

const LinkList = styled.div`
  column-count: 2;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    column-count: 3;
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    column-count: 4;
  }

  > a {
    display: block;
    color: ${palette('slate', 'base')};
    margin-bottom: ${size('spacing.large')};
  }
`;

export default class SeoLinks extends Component {
  static propTypes = {
    title: string.isRequired,
    links: arrayOf(object).isRequired,
  };
  renderSection = (title, data) => (
    <>
      <StyledHeading level="subtitle">{title}</StyledHeading>
      <PatchedCollapsibleBlock minHeight="small">
        <LinkList>
          {data.map(link => <Link size="tiny" key={link.to} {...link}>{link.title}</Link>)}
        </LinkList>
      </PatchedCollapsibleBlock>
    </>
  );

  render() {
    const { title, links } = this.props;
    return (
      <>
        {this.renderSection(title, links)}
      </>
    );
  }
}
