import React from 'react';
import styled from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import { Heading, Icon } from 'sly/web/components/atoms';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const ADLWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
  margin-bottom: ${size('spacing.large')};
`;

const ADLIconItem = styled.div`
  width: 100%;
  flex: 0 100%;
  display: flex;
  padding: ${size('spacing.large')};
  justify-content: space-between;
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: 50%;
    flex: 0 50%;
  }
`;

const ADLChart = () => (
  <>
    <StyledHeading level="subtitle" size="subtitle">
      Activities of Daily Living (ADLs)
    </StyledHeading>
    <ADLWrapper>
      <ADLIconItem>
        Personal Hygiene
        <Icon icon="bath" palette="primary" variation="base" />
      </ADLIconItem>
      <ADLIconItem>
        Feeding
        <Icon icon="food" palette="primary" variation="base" />
      </ADLIconItem>
      <ADLIconItem>
        Continence Management
        <Icon icon="washroom" palette="primary" variation="base" />
      </ADLIconItem>
      <ADLIconItem>
        Ambulating
        <Icon icon="accessibility" palette="primary" variation="base" />
      </ADLIconItem>
      <ADLIconItem>
        Dressing
        <Icon icon="shirt" palette="primary" variation="base" />
      </ADLIconItem>
      <ADLIconItem>
        Toileting
        <Icon icon="toilet" palette="primary" variation="base" />
      </ADLIconItem>
    </ADLWrapper>
  </>
);
export default ADLChart;
