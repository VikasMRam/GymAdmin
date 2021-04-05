import React, { forwardRef } from 'react';
import { bool, string, func, object } from 'prop-types';

import Flex from 'sly/common/system/Flex';
import Search from 'sly/common/icons/Search';
import Button from 'sly/common/system/Button';
import Input from 'sly/common/system/Input';

const SearchInput = forwardRef(({ placeholder, type, value, name, onBlur, onChange, onKeyDown, onFocus, inputStyles, ...props }, ref) => (
  <Flex ref={ref} {...props}>
    <Input
      ref={ref}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      sx={inputStyles}
      type={type}
      snap="right"
    />
    <Button
      snap="left"
      border="box"
      borderColor="viridian.base"
    >
      <Search color="white.base" />
    </Button>
  </Flex>
));

SearchInput.propTypes = {
  type: string,
  disabled: bool,
  placeholder: string,
  value: string,
  name: string,
  onBlur: func,
  onChange: func,
  onKeyDown: func,
  onFocus: func,
  inputStyles: object,
};

SearchInput.defaultProps = {
  type: 'text',
};

SearchInput.displayName = 'SearchInput';

export default SearchInput;
