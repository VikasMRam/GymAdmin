// Helpers for some front end validation of client forms
export const validateAM = (client, { phone, email }) => {
  const { additionalMetadata } = client;
  const a = new Set();
  if (Array.isArray(additionalMetadata)) {
    additionalMetadata.map(e => a.add(e));
    if ((additionalMetadata.indexOf('WarmTransfer') > -1 || additionalMetadata.indexOf('WarmTransferVM') > -1)) {
      a.add('PhoneConnect');
    }

  }
  if (isReferralSent(client)) {
    a.add('ReferralSent');
  }
  // Check if phone is null
  if (!phone || phone === '') {
    a.add('EmailOnly');
  }
  if (!email || email === '') {
    a.delete('EmailOnly');
  }


  return [...a];
};

export const isReferralSent = (client) => {
  const { children } = client;
  if (Array.isArray(children) && children.length > 0) {
    return true;
  }
  return false;
};
