const getReactSelectValue = (value, { value: oldValue }) => {
  if (Array.isArray(value)) {
    return value.map(({ value }) => value);
  }
  if (value === null && Array.isArray(oldValue)) {
    return [];
  }
  return value?.value;
};

const getFieldProps = (input, meta, props = {}) => {
  const fieldProps = { ...props };

  if (fieldProps.type === 'date') {
    const oldBlur = fieldProps.onBlur;
    // date ui won't fire blur event after date pick so touched will be false
    fieldProps.invalid = meta.dirty && !!meta.error;
    fieldProps.onBlur = () => oldBlur(null, true);
  }

  if (fieldProps.type === 'choice') {
    fieldProps.onChange = (value, ...props) => input.onChange(getReactSelectValue(value, input), ...props);
    fieldProps.onBlur = _ => _;
  }

  if (fieldProps.type === 'autocomplete') {
    fieldProps.onBlur = _ => _;
  }

  if (fieldProps.type === 'button') {
    fieldProps.onClick = () => input.onChange(fieldProps.inputValue);
  }

  return fieldProps;
};

export default getFieldProps;
