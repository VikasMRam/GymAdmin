import React, { Component } from 'react';
import { instanceOf, string, bool } from 'prop-types';
import styled from 'styled-components';

import Box from 'sly/web/components/atoms/Box';
import { topSnap, upTo } from 'sly/web/components/helpers';

const Wrapper = styled(Box)`
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  text-transform: uppercase;
  
  ${upTo('laptop')} {
    ${topSnap} 
    border-radius: 0;
  }
`;


Wrapper.defaultProps = {
  background: 'white',
  padding: [0, 0, 0, 'xLarge'],
  snap: 'bottom',
};

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
    noBorder: bool,
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
    const { children, ...props } = this.props;
    const { activeTab } = this.state;

    return (
      <Wrapper {...props}>
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
