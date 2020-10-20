import isMobilePhone from 'validator/lib/isMobilePhone';
import { addresses } from 'rrad/addresses-us-all.min.json';

const randChars = (characters, length = 1) => {
  let result = '';
  while (length > 0 && length--) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const fromTwo = length => randChars('23456789', length);
const fromZero = length => randChars('0123456789', length);

const randHash = () => Math.random().toString(36).substring(7);
const randPhone = () => `${fromTwo()}${fromZero(2)}${fromTwo()}${fromZero(6)}`;
const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];

export default function randomCommunity() {
  const name = `Test Community ${randHash()}`;
  const address = randomAddress.address1;
  const zip = randomAddress.postalCode;
  const { city } = randomAddress;
  const { state } = randomAddress;

  let phone = null;
  do {
    phone = randPhone();
  }
  while (!isMobilePhone(phone, 'en-US'));
  return {
    name,
    phone,
    address,
    city,
    state,
    zip,
  };
}
