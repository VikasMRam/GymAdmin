import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import Tab from 'sly/components/atoms/Tab';
import cursor from 'sly/components/helpers/cursor';

const CursorTab = cursor(Tab);

const TabWrapper = styled.div`
  border: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};
  padding-left: 0;
`;

const TabContent = styled.div`
  background-color: ${palette('white', 'base')};
  border: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};
  border-top: 0;
  padding: ${size('spacing.large')} ${size('spacing.xLarge')};
`;

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);
    const { children } = this.props;

    this.state = {
      activeTab: children[0].props.label,
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
      },
      state: {
        activeTab,
      },
    } = this;

    return (
      <div>
        <TabWrapper>
          {children.map((child) => {
            const { label } = child.props;

            return (
              <CursorTab
                active={activeTab === label}
                key={label}
                label={label}
                onClick={() => onClickTabItem(label)}
              />
            );
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
