import React, { Component } from 'react';
import { instanceOf, string, bool, node } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/web/components/themes';

const Wrapper = styled.div`
  border-bottom: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};
  padding: ${size('spacing.large')};
  padding-bottom: 0;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  background: ${palette('white.base')};
  text-transform: uppercase;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    border: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};
    border-top-left-radius: ${size('border.xxLarge')};
    border-top-right-radius: ${size('border.xxLarge')};
    ${ifProp({ noBorder: true }, css`
      border-left: none;
      border-right: none;
      border-top: none;
    `)};
  }
`;

const getDefaultActiveTab = (children) => {
  for (let i = 0; i < children.length; ++i) {
    if (children[i].props.default) {
      return children[i].props.id;
    }
  }
  return children[0].props.id;
};

export default class Tabs extends Component {
  static propTypes = {
    children: instanceOf(Array).isRequired,
    activeTab: string,
    className: string,
    tabsOnly: bool.isRequired,
    beforeHeader: node,
    noBorder: bool,
  };

  static defaultProps = {
    tabsOnly: false,
  };

  static getDerivedStateFromProps(props, state) {
    const activeTab = props.activeTab || state.activeTab;
    return {
      ...state,
      activeTab,
    };
  }

  constructor(props) {
    super(props);

    const { children } = this.props;

    let { activeTab } = this.props;

    if (!activeTab) {
      activeTab = getDefaultActiveTab(children);
    }

    this.state = {
      activeTab,
    };
  }

  onClickTabItem = (id, callback) => this.setState({ activeTab: id }, callback);

  render() {
    const { children, beforeHeader, ...props } = this.props;
    const { activeTab } = this.state;

    return (
      <Wrapper {...props}>
        {beforeHeader}
        {children.map((child) => {
          const {
            id, onClick,
          } = child.props;
          return React.cloneElement(child, {
            key: id,
            active: activeTab === id,
            onClick: child.props.to
              ? onClick
              : e => this.onClickTabItem(id, () => onClick(e)),
          });
        })}
      </Wrapper>
    );
  }
}
