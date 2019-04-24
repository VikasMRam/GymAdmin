import React, { Component } from 'react';
import { instanceOf, string, bool } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Link } from 'sly/components/atoms';
import Tab from 'sly/components/atoms/Tab';
import cursor from 'sly/components/helpers/cursor';

const CursorTab = cursor(Tab);
CursorTab.displayName = 'CursorTab';

const TabWrapper = styled.div`
  border: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};
  padding-left: 0;
`;

const TabContent = styled.div`
  background-color: ${palette('white', 'base')};
  border: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};
  border-top: 0;
  height: 100%;
`;

class Tabs extends Component {
  static propTypes = {
    children: instanceOf(Array).isRequired,
    activeTab: string,
    className: string,
    tabStyles: bool,
  }

  constructor(props) {
    super(props);
    const { children } = this.props;
    let { activeTab } = this.props;
    if (!activeTab) {
      activeTab = children[0].props.label;
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
            const { to, label, tabStyles } = child.props;
            const tab = (
              <CursorTab
                active={activeTab === label}
                key={label}
                label={label}
                onClick={() => onClickTabItem(label)}
                tabStyles={tabStyles}
              />
            );

            if (to) {
              return <Link key={label} to={to}>{tab}</Link>;
            }
            return tab;
          })}
        </TabWrapper>
        <TabContent>
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </TabContent>
      </div>
    );
  }
}

export default Tabs;
