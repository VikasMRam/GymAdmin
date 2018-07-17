import React, { Component } from 'react';
import { func, object } from 'prop-types';

import AgentsProfilePage from 'sly/components/pages/AgentsProfilePage';
import { connectController } from 'sly/controllers';

const profile = {
  heading: 'Arthur Bretschneider',
  subHeading: 'Founder & CEO',
  imageUrl: 'https://d3tqosv1ilj4q.cloudfront.net/assets/team/Arthur-a2b97989c2264366a85578f9a9103196.jpg',
  description: `Arthur is a third generation senior housing operator. After selling his family’s senior housing company,
     he held two financial analyst roles in real estate and finance companies. He then founded a consulting firm, assisting 
     real estate developers and other financial institutions in entering the senior housing market. While pursuing his MBA
      at Berkeley-Haas, he created Seniorly to solve a problem he noticed while running his family's business. 
      Arthur is a native San Franciscan, and when he isn't working he is usually at Crissy Field with his wife, 
      two boys and Jack Russell terrier.
    `,
};

const profiles = [profile, profile, profile, profile, profile, profile, profile, profile, profile, profile, profile, profile, profile, profile];

class AgentsProfilePageController extends Component {
  static propTypes = {
    activeProfile: object,
    handleModalProfile: func,
    set: func,
  };

  handleModalProfile = (profile) => {
    const { set } = this.props;
    set({
      activeProfile: profile,
    });
  }

  render() {
    const { activeProfile } = this.props;
    return <AgentsProfilePage profiles={profiles} activeProfile={activeProfile} setModalProfile={this.handleModalProfile} />;
  }
}

const mapStateToProps = (state, { controller }) => {
  return {
    activeProfile: controller.activeProfile || null,
  };
};

export default connectController(mapStateToProps, {})(AgentsProfilePageController);
