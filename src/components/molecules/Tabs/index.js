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

class Tabs extends Component {
  static propTypes = {
    children: instanceOf(Array).isRequired,
    activeTab: string,
    className: string,
  }

  constructor(props) {
    super(props);
    const { children } = this.props;
    let { activeTab } = this.props;
    if (!activeTab) {
      activeTab = children[0].props.id;
    }

    this.state = {
      activeTab,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
        className,
      },
      state: {
        activeTab,
      },
    } = this;

    return (
      <div className={className}>
        <TabWrapper>
          {children.map((child) => {
            const {
              to, id, label, tabStyles,
            } = child.props;
            const tab = (
              <CursorTab
                active={activeTab === id}
                key={id}
                label={label}
                onClick={() => onClickTabItem(id)}
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

export default Tabs;
