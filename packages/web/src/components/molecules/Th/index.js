import React from 'react';
import styled from 'styled-components';
import { string, oneOf, func } from 'prop-types';

import { size, palette } from 'sly/web/components/themes';
import { Icon } from 'sly/web/components/atoms';
import { text as textPropTypes } from 'sly/common/propTypes/text';

const Wrapper = styled.th`
  padding: 0;
  background-color: ${palette('grey', 'stroke')};
`;
const StyledDiv = styled.div`
  display: flex;
  padding: ${size('spacing.regular')} ${size('spacing.large')};
  font-weight: ${size('weight.medium')};
  color: ${palette('grey', 'base')};
  white-space: nowrap;
`;

const Text = styled.p`
  margin: 0;
  padding:  ${size('spacing.regular')} 0;
  font-size: ${p => size('text', p.size)};
  line-height: ${p => size('lineHeight', p.size)};
`;


const SortIcon = styled(Icon)`
  margin-left: ${size('spacing.regular')};
`;

const DropDownIcon = styled(Icon)`
  margin-left: auto;
`;

const Th = ({
  children, sort, size, onDropDownIconClick, ...props
}) => {
  return (
    <Wrapper {...props} >
      <StyledDiv size={size}>
        <Text size={size}>{children}</Text>
        {sort && <SortIcon icon="arrow-up" palette="grey" flip={sort === 'desc'} />}
        {onDropDownIconClick && <DropDownIcon icon="dropdown-down" palette="grey" onClick={onDropDownIconClick} />}
      </StyledDiv>
    </Wrapper>
  );
};

Th.propTypes = {
  children: string.isRequired,
  sort: oneOf(['asc', 'desc']),
  size: textPropTypes,
  onDropDownIconClick: func,
};

Th.defaultProps = {
  size: 'caption',
};

export default Th;
