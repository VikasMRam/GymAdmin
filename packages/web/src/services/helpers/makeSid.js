import crypto from 'crypto';

const makeSid = () => crypto.randomBytes(16).toString('hex');

export default makeSid;
