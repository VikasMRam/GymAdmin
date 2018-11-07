import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import Heading from 'sly/components/atoms/Heading/index';
import Button from 'sly/components/atoms/Button/index';
import { Icon } from 'sly/components/atoms/index';

const Wrapper = styled.div`
  width: calc( 4 * ${size('layout.col1')} + 3 * ${size('layout.gutter')});
  padding: ${size('spacing.xLarge')};
`;

const DescriptionHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const SATButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.large')};
`;
SATButton.displayName = 'SATButton';

const ListItem = styled.div`
  display: flex;
  margin-bottom: ${size('spacing.regular')};
`;

const CheckIcon = styled(Icon)`
  color: ${palette('slate', 'accent')};
  margin-right: ${size('spacing.regular')};
`;

const ListItemText = styled.div`
  color: ${palette('slate', 'accent')};
  font-size: ${size('text.caption')};
`;

const CommunityScheduleATour = ({ onSATClick }) => {
  const list = ['Completely free!', 'No obligation - cancel anytime'];
  const listComponents = list.map(item => (
    <ListItem key={item}>
      <CheckIcon icon="check" />
      <ListItemText>{item}</ListItemText>
    </ListItem>
  ));
  return (
    <Wrapper>
      <DescriptionHeading size="subtitle">Tour this commmunity for free</DescriptionHeading>
      <SATButton kind="jumbo" palette="primary" onClick={onSATClick}>Schedule a Tour</SATButton>
      <div>{listComponents}</div>
    </Wrapper>
  );
};

CommunityScheduleATour.propTypes = {
  onSATClick: func.isRequired,
};

export default CommunityScheduleATour;
