import React from 'react';
import styled from 'styled-components';
import { string, object } from 'prop-types';

import { size } from 'sly/components/themes';
import CommunityDetail from 'sly/components/organisms/CommunityDetail';
import ConciergeContainer from 'sly/containers/ConciergeContainer';
import Header from 'sly/components/molecules/Header';

const PageWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: calc(
      ${size('layout.mainColumn')} + ${size('layout.sideColumn')} +
        ${size('spacing.xLarge')}
    );
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: ${size('layout.laptopLarge')};
  }
`;

const Main = styled(CommunityDetail)`
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    margin-right: ${size('spacing.xLarge')};
  }
`;

const Column = styled(ConciergeContainer)`
  display: none;
  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: ${size('layout.sideColumn')};
    display: block;
  }
`;

class HeaderWithState extends React.Component {
  state = {
    menuOpen: false,
  };
  onMenuIconClick = () => {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  };
  render() {
    const headerItems = [
      { name: 'List on Seniorly', url: '#' },
      { name: 'Help Center', url: '#' },
      { name: 'Saved', url: '#' },
      { name: 'Sign Up', url: '#' },
      { name: 'Login', url: '#' },
    ];
    const menuItems = [
      { name: 'Assisted Living', url: '#' },
      { name: "Alzheimer's Care", url: '#' },
      { name: 'Respite Care', url: '#' },
      { name: 'About Us', url: '#' },
      { name: 'Contact', url: '#' },
      { name: 'Careers', url: '#' },
      { name: 'List on Seniorly', url: '#' },
      { name: 'Sign Out', url: '#' },
    ];
    return (
      <Header
        menuOpen={this.state.menuOpen}
        onMenuIconClick={this.onMenuIconClick}
        headerItems={headerItems}
        menuItems={menuItems}
      />
    );
  }
}

const CommunityDetailPage = ({ community, userActions }) => {
  return (
    <div>
      <HeaderWithState />
      <PageWrapper>
        <Main key="main" community={community} />
        <Column key="column" community={community} userActions={userActions} />
      </PageWrapper>
    </div>
  );
};

CommunityDetailPage.propTypes = {
  community: object.isRequired,
  userActions: object.isRequired,
};

export default CommunityDetailPage;
