import React from 'react';
import styled from 'styled-components';

import { assetPath } from 'sly/web/components/themes';
import { size } from 'sly/common/components/themes';
import { Heading, Block, ResponsiveImage } from 'sly/web/components/atoms';
import { PageWrapper, Wrapper } from 'sly/web/components/wizards/assessment/Template';

const LoadingContainer = styled.div`
`;


const End = () => (
  <PageWrapper>
    <Wrapper >
      <Block align="center" display="flex" direction="column">
        <Heading level="subtitle" weight="medium" pad="xLarge" align="center">
          Sending your request...
        </Heading>
        <ResponsiveImage loading="lazy" src={assetPath('images/homebase/loader.svg')} />
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
