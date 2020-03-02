import React from 'react';
import styled from 'styled-components';

import { Heading, Icon } from 'sly/components/atoms';
import { size, palette } from 'sly/components/themes';

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
        <Icon icon="bath" palette="secondary" variation="dark35" />
      </ADLIconItem>
      <ADLIconItem>
        Feeding
        <Icon icon="food" palette="secondary" variation="dark35" />
      </ADLIconItem>
      <ADLIconItem>
        Continence Management
        <Icon icon="washroom" palette="secondary" variation="dark35" />
      </ADLIconItem>
      <ADLIconItem>
        Ambulating
        <Icon icon="accessibility" palette="secondary" variation="dark35" />
      </ADLIconItem>
      <ADLIconItem>
        Dressing
        <Icon icon="shirt" palette="secondary" variation="dark35" />
      </ADLIconItem>
      <ADLIconItem>
        Toileting
        <Icon icon="toilet" palette="secondary" variation="dark35" />
      </ADLIconItem>
    </ADLWrapper>
  </>
);
export default ADLChart;
