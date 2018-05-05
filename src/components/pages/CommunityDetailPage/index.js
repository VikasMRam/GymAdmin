import React from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import { key } from 'styled-theme';
import Sticky from 'react-stickynode';

import { size } from 'sly/components/themes';
import CommunityDetail from 'sly/components/organisms/CommunityDetail';
import ConciergeContainer from 'sly/containers/ConciergeContainer';
import Header from 'sly/components/molecules/Header';
import Footer from 'sly/components/molecules/Footer';
import StickyFooter from 'sly/components/molecules/StickyFooter';
import CommunityStickyHeader from 'sly/components/organisms/CommunityStickyHeader';

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

export default class CommunityDetailPage extends React.Component {
  static propTypes = {
    community: object.isRequired,
    userActions: object.isRequired,
  };

  state = {
    stickyHeaderVisible: false,
    menuOpen: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    if (this.communityReviewsRef.current) {
      this.bottomBoundaryQuerySelector = `.${this.communityReviewsRef.current.className.replace(/\s+/g, '.')}`;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // TODO: use ref forwarding once we upgrade to react 16.3+: https://reactjs.org/docs/forwarding-refs.html
  communityReviewsRef = React.createRef();
  breadCrumbRef = React.createRef();
  pricingAndFloorPlansRef = React.createRef();
  communitySummaryRef = React.createRef();
  amenitiesAndFeaturesRef = React.createRef();

  handleScroll = () => {
    if (this.breadCrumbRef.current) {
      const rect = this.breadCrumbRef.current.getBoundingClientRect();
      const elemTop = rect.top;
      const elemBottom = rect.bottom;
      const isVisible = elemTop < window.innerHeight && elemBottom >= 0;

      if (!isVisible) {
        this.setState({
          stickyHeaderVisible: true,
        });
      } else {
        this.setState({
          stickyHeaderVisible: false,
        });
      }
    }
  };

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  };

  render() {
    const { community, userActions } = this.props;
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
    const stickyHeaderItems = [
      { label: 'Summary', ref: this.communitySummaryRef },
      { label: 'Pricing & Floor Plans', ref: this.pricingAndFloorPlansRef },
      { label: 'Reviews', ref: this.communityReviewsRef },
    ];

    return (
      <React.Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <Header
          menuOpen={this.state.menuOpen}
          onMenuIconClick={this.toggleMenu}
          headerItems={headerItems}
          menuItems={menuItems}
        />
        <CommunityStickyHeader
          items={stickyHeaderItems}
          visible={this.state.stickyHeaderVisible}
        />
        <PageWrapper>
          <Main
            key="main"
            breadCrumbRef={this.breadCrumbRef}
            communityReviewsRef={this.communityReviewsRef}
            pricingAndFloorPlansRef={this.pricingAndFloorPlansRef}
            communitySummaryRef={this.communitySummaryRef}
            amenitiesAndFeaturesRef={this.amenitiesAndFeaturesRef}
            community={community}
          />
          {/* 24px or 84px (when sticky header is visible) from top TODO: figure out how to get this from styled theme sizes */
            this.communityReviewsRef.current &&
            <Sticky
              top={this.state.stickyHeaderVisible ? 84 : 24}
              bottomBoundary={this.bottomBoundaryQuerySelector}
            >
              <Column
                key="column"
                community={community}
                userActions={userActions}
              />
            </Sticky>
          }
        </PageWrapper>
        <Footer />
        <StickyFooter community={community} />
      </React.Fragment>
    );
  }
}
