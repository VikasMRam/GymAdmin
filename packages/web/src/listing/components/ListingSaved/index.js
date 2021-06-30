import React from 'react';
import styled from 'styled-components';
import { array, func } from 'prop-types';

import { size } from 'sly/common/components/themes';
import { Heading, Button, Block, Hr } from 'sly/common/components/atoms';
import SimilarCommunities from 'sly/web/components/organisms/SimilarCommunities';

const StyledDoneButton = styled(Button)`
  flex: 1;
  margin-right: ${size('spacing.large')};
`;
StyledDoneButton.displayName = 'StyledDoneButton';

const ButtonsWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-bottom: ${size('spacing.xxLarge')};
`;
ButtonsWrapper.displayName = 'ButtonsWrapper';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`;
StyledHeading.displayName = 'StyledHeading';

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;
StyledBlock.displayName = 'StyledBlock';

const ListingSaved = ({ onDoneButtonClicked }) => (
  <section>
    <StyledHeading size="subtitle">Listing Saved!</StyledHeading>
    <StyledBlock>You can view your saved listing from the nav bar</StyledBlock>
    <ButtonsWrapper>
      <StyledDoneButton
        onClick={onDoneButtonClicked}
        ghost
      >
        Done
      </StyledDoneButton>
    </ButtonsWrapper>
    <Hr pad="xxLarge" />
  </section>
);

ListingSaved.propTypes = {
  // similarListings: array.isRequired,
  onDoneButtonClicked: func,
};

export default ListingSaved;
