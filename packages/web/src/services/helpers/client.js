// Helpers for some front end validation of client forms
export const isReferralSent = (client) => {
  const { children } = client;
  if (Array.isArray(children) && children.length > 0) {
    const validClients = children.filter(e => e.provider && (e.provider.entityType === 'Property' || e.provider.entityType === 'PartnerAgent'));
    return validClients.length > 0;
  }
  return false;
};


export const validateAM = (client, additionalMetadata,  { phone, email }) => {
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

