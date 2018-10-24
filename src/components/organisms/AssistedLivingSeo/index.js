import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Heading, Link } from 'sly/components/atoms';
import { ALSeoCities, ALSeoStates } from 'sly/services/helpers/homepage';
import CollapsibleBlock  from 'sly/components/molecules/CollapsibleBlock';

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
  line-height: 2.0;
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
    color: ${palette('slate', 0)};
  }
`;

export default class AssistedLivingSeo extends Component{
  renderSection = (title, data) => (
    <Fragment>
      <StyledHeading level="subtitle">{title}</StyledHeading>
      <PatchedCollapsibleBlock minHeight="tiny">
        <LinkList>
          {data.map(link => <Link key={link.to} {...link}>{link.title}</Link>)}
        </LinkList>
      </PatchedCollapsibleBlock>
    </Fragment>
  );

  render(){
    return (
      <Fragment>
        {this.renderSection("Assisted living by Cities", ALSeoCities)}
        {this.renderSection("Assisted living by State", ALSeoStates)}
      </Fragment>
    );
  }
};


