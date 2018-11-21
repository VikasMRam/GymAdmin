import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import { size, assetPath } from 'sly/components/themes';
import { Block, Button, Image } from 'sly/components/atoms/index';
import IconListItem from 'sly/components/molecules/IconListItem/index';

const SubHeading = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const items = [
  { icon: 'favourite-light', text: '100% free. They do not charge you.' },
  { icon: 'location', text: 'Personalized service. They set up tours and can accompany you.' },
  { icon: 'book', text: 'Expert knowledge. They can answer any question you have.' },
  { icon: 'house', text: 'Insider information. They know unique details about this community.' },
  { icon: 'loyalty', text: '$500 cash back. They will arrange this gift after you move in.' },
];

const IconListWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;

const IconListItemWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const GotItButton = styled(Button)`
  width: 100%;
`;

const TopSection = styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
    justify-content: space-between;
  }
`;

const AvatarIcon = styled(Image)`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;

const AdvisorHelpPopup = ({ onButtonClick }) => {
  const iconListItemsComponent = items.map(item => (
    <IconListItemWrapper key={item.icon}><IconListItem {...item} /></IconListItemWrapper>
  ));
  return (
    <div>
      <TopSection>
        <div>
          <SubHeading weight="medium">Here are the top 5 benefits to work with our local senior living advisors:</SubHeading>
          <IconListWrapper>{iconListItemsComponent}</IconListWrapper>
        </div>
        <div>
          <AvatarIcon src={assetPath('images/agent-xLarge.png')} />
        </div>
      </TopSection>
      <GotItButton kind="jumbo" palette="primary" onClick={onButtonClick}>Got it</GotItButton>
    </div>
  );
};

AdvisorHelpPopup.propTypes = {
  onButtonClick: func.isRequired,
};

export default AdvisorHelpPopup;
