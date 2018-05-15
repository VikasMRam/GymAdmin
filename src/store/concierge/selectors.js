import { getDetail } from 'sly/store/resource/selectors';

export selectConversionStatus = (state, slug) => {
  return {
    callbackRequested: false,
    advancedInfoSent: false,
  };
}
