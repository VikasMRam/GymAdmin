import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import { size } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { Block, Button, Image } from 'sly/web/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';

const SubHeading = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const items = [
  { icon: 'favourite-light', text: '100% free. They do not charge you.' },
  { icon: 'location', text: 'Personalized service. They set up tours and can accompany you.' },
  { icon: 'book', text: 'Expert knowledge. They can answer any question you have.' },
  { icon: 'house', text: 'Insider information. They know unique details about this community.' },
];

const List = styled.ul`
  padding: 0 0 ${size('spacing.xLarge')};
`;

const ListItem = styled.li`
  list-style: none;
  margin: 0 0 ${size('spacing.large')};
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
    <ListItem key={item.icon}>
      <IconItem icon={item.icon}>
        {item.text}
      </IconItem>
    </ListItem>
  ));
  return (
    <div>
      <TopSection>
        <div>
          <SubHeading weight="medium">Here are the top 4 benefits to work with our Seniorly Local Advisors:</SubHeading>
          <List>{iconListItemsComponent}</List>
        </div>
        <div>
          <AvatarIcon src={assetPath('images/agent-xLarge.png')} />
        </div>
      </TopSection>
      <GotItButton kind="jumbo" onClick={onButtonClick}>Got it</GotItButton>
    </div>
  );
};

AdvisorHelpPopup.propTypes = {
  onButtonClick: func,
};

export default AdvisorHelpPopup;
