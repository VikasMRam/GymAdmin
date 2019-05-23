import React, { Component } from 'react';
import { instanceOf, string } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Link } from 'sly/components/atoms';
import Tab from 'sly/components/atoms/Tab';
import cursor from 'sly/components/helpers/cursor';

const CursorTab = cursor(Tab);
CursorTab.displayName = 'CursorTab';

const TabWrapper = styled.div`
  border: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};
  border-left: 0;
  border-right: 0;
  padding: ${size('spacing.large')};
  padding-bottom: 0;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    border-top-left-radius: ${size('border.xxLarge')};
    border-top-right-radius: ${size('border.xxLarge')};
    border: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};
  }
`;

const TabContent = styled.div`
  background-color: inherit;
  height: 100%;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    border: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};
    border-top: 0;
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

  onClickTabItem = (id) => {
    this.setState({ activeTab: id });
  };

  render() {
    const { children, className } = this.props;
    const { activeTab } = this.state;

    return (
      <div className={className}>
        <TabWrapper>
          {children.map((child) => {
            const {
              to, id, label, tabStyles, onClick,
            } = child.props;
            const tab = (
              <CursorTab
                active={activeTab === id}
                key={id}
                label={label}
                onClick={() => { this.onClickTabItem(id); onClick(); }}
                tabStyles={tabStyles}
              />
            );

            if (to) {
              return <Link key={id} to={to}>{tab}</Link>;
            }

            return tab;
          })}
        </TabWrapper>

        <TabContent>
          {children.map((child) => {
            if (child.props.id !== activeTab) return undefined;
            return child.props.children;
          })}
        </TabContent>
      </div>
    );
  }
}
