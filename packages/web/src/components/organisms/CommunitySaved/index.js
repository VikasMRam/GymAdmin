import React from 'react';
import styled from 'styled-components';
import { array, func } from 'prop-types';

import { size } from 'sly/web/components/themes';
import { Heading, Button, Block, Hr } from 'sly/web/components/atoms';
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

const StyledHr = styled(Hr)`
  margin-bottom: ${size('spacing.xxLarge')};
`;
StyledHr.displayName = 'StyledHr';

const CommunitySaved = ({ similarCommunities, onDoneButtonClicked }) => (
  <section>
    <StyledHeading size="subtitle">Community Saved!</StyledHeading>
    <StyledBlock>You can view your saved communities from the nav bar</StyledBlock>
    <ButtonsWrapper>
      <StyledDoneButton
        onClick={onDoneButtonClicked}
        ghost
      >
        Done
      </StyledDoneButton>
      {/* <StyledGotoButton href="/mydashboard"> */}
      {/* Go to my dashboard */}
      {/* </StyledGotoButton> */}
    </ButtonsWrapper>
    <StyledHr />
    <StyledHeading size="subtitle">Similar communities nearby</StyledHeading>
    <SimilarCommunities communities={similarCommunities} communityStyle={{ layout: 'row', showDescription: false }} />
  </section>
);

CommunitySaved.propTypes = {
  similarCommunities: array.isRequired,
  onDoneButtonClicked: func,
};

export default CommunitySaved;
