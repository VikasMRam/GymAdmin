import dayjs from 'dayjs';

export const buildAddressDisplay = (community) => {
  const { address } = community;
  if (address) {
    return `${address.line1}, ${address.city}, ${address.zip}, ${address.state}`;
  }
  return '';
};

export const getReferralSentTimeText = date => dayjs(date).format('M/D/YY, h:mmA');
