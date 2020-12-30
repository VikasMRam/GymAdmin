import React from 'react';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { Block, ResponsiveImage } from 'sly/web/components/atoms';
import { PageWrapper, Wrapper } from 'sly/web/components/wizards/assessment/Template';

const LoadingContainer = styled.div`
`;


const End = () => (
  <PageWrapper>
    <Wrapper >
      <Block >
        Sending your request...
      </Block>
      <LoadingContainer />
    </Wrapper>

  </PageWrapper>
);

End.propTypes = {
};

End.defaultProps = {
  city: '',
};

export default End;
