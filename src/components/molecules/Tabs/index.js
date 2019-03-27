import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tab from 'sly/components/atoms/Tab';

const Wrapper = styled.div`

`;

const TabWrapper = styled.div`
  border-bottom: 1px solid #ccc;
  padding-left: 0;
`;

const TabContent = styled.div`
  background-color: white;
  border: 1px solid #DFE1E2;
  border-top: 0;
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
      <Wrapper>
        <TabWrapper>
          {children.map((child) => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
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
      </Wrapper>
    );
  }
}

export default Tabs;
