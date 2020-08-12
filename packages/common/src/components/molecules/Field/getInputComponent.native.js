import { TextInput } from 'sly/mobile/components/atoms';

const getInputComponent = (type) => {
  switch (type) {
    default:
      return TextInput;
  }
};

export default getInputComponent;
