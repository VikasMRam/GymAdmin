// Helpers for some front end validation of client forms
export const validateAM = (additionalMetadata, { phone, email }) => {
  const a = new Set();
  if (Array.isArray(additionalMetadata)) {
    additionalMetadata.map(e => a.add(e));
    if ((additionalMetadata.indexOf('WarmTransfer') > -1 || additionalMetadata.indexOf('WarmTransferVM') > -1)) {
      a.add('PhoneConnect');
    }
  }
  // Check if phone is null
  if (!phone || phone === '') {
    a.add('EmailOnly');
  }
  if (!email || email === '') {
    a.delete('EmailOnly');
  }
  console.log('Seeing set', a);
  return [...a];
};
