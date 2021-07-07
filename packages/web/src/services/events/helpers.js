import { v4, parse } from 'uuid';
import { Cookies } from 'react-cookie';

import { domain } from 'sly/web/config';
import { randomHexNumber } from 'sly/web/services/helpers/utils';

const cookie = new Cookies();

const byteArrayToLong = (/*byte[]*/byteArray) => {
    var value = 0;
    for (var i = byteArray.length - 1; i >= 0; i--) {
      value = (value * 256) + byteArray[i];
    }

    return value;
};

export const setUUID = () => {
  const slyUuid = v4();
  cookie.set('sly_uuid', slyUuid, { domain, path: '/', maxAge: 27000000 });
  return slyUuid;
};

export const getUuidValue = () => {
  const bytes = parse(cookie.get('sly_uuid'));
  return  byteArrayToLong(bytes);
};

export const getUUID = () => {
  return cookie.get('sly_uuid') || setUUID();
};

export const setSID = () => {
  const sid = randomHexNumber();
  cookie.set('sly_sid', sid, { domain, path: '/', maxAge: 3600 });
  return sid;
};

export const getSID = () => {
  return cookie.get('sly_sid') || setSID();
};

export const setReferrer = () => {
  const { referrer } = document;
  cookie.set('referrer', referrer, { domain, path: '/', maxAge: 27000000 });
  return referrer;
};

