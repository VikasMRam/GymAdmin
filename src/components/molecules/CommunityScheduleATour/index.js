import React, { Fragment } from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import { Heading, Button, Icon, Block } from 'sly/components/atoms/index';

const Wrapper = styled.div`
  width: ${size('layout.col4')};
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
  padding-top: ${size('spacing.tiny')};
  color: ${palette('slate', 'accent')};
  margin-right: ${size('spacing.regular')};
`;

const ListItemText = styled(Block)`
  color: ${palette('slate', 'accent')};
`;

const CommunityScheduleATour = ({ onSATClick }) => {
  const list = ['Completely free!', 'No obligation - cancel anytime'];
  const listComponents = list.map(item => (
    <ListItem key={item}>
      <CheckIcon icon="check" size="small" />
      <ListItemText size="caption">{item}</ListItemText>
    </ListItem>
  ));
  return (
    <Wrapper>
      <DescriptionHeading size="subtitle">Tour this commmunity for free</DescriptionHeading>
      <SATButton kind="jumbo" palette="primary" onClick={onSATClick}>Schedule a Tour</SATButton>
      <Fragment>{listComponents}</Fragment>
    </Wrapper>
  );
};

CommunityScheduleATour.propTypes = {
  onSATClick: func.isRequired,
};

export default CommunityScheduleATour;
