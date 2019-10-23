// Helpers for some front end validation of client forms
export const validateAM = (additionalMetadata) => {
  if (Array.isArray(additionalMetadata)) {
    const a = new Set(additionalMetadata);
    if ((additionalMetadata.indexOf('WarmTransfer') > -1 || additionalMetadata.indexOf('WarmTransferVM') > -1)) {
      a.add('PhoneConnect');
    }
    return [...a];
  }
  return additionalMetadata;
};
