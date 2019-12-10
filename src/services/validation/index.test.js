import * as v from 'sly/services/validation';

describe('services/validation', () => {
  test('email', () => {
    expect(v.email('invalid')).toBeTruthy();
    expect(v.email('invalid@invalid')).toBeTruthy();
    expect(v.email('valid@valid.com')).toBeFalsy();
  });

  test('emails', () => {
    expect(v.emails('invalid')).toBeTruthy();
    expect(v.emails('invalid@invalid')).toBeTruthy();
    expect(v.emails('valid@valid.com')).toBeFalsy();

    expect(v.emails('invalid,invalid')).toBeTruthy();
    expect(v.emails('invalid@invalid,invalid@invalid')).toBeTruthy();
    expect(v.emails('valid@valid.com,valid@valid.com')).toBeFalsy();

    expect(v.emails('invalid, invalid')).toBeTruthy();
    expect(v.emails('invalid@invalid, invalid@invalid')).toBeTruthy();
    expect(v.emails('valid@valid.com, valid@valid.com')).toBeFalsy();
  });

  test('url', () => {
    expect(v.url('invalid')).toBeTruthy();
    expect(v.url('valid.com')).toBeFalsy();
    expect(v.url('valid.com/test')).toBeFalsy();
    expect(v.url('http://valid.com')).toBeFalsy();
  });

  test('required', () => {
    expect(v.required('')).toBeTruthy();
    expect(v.required(null)).toBeTruthy();
    expect(v.required(undefined)).toBeTruthy();
    expect(v.required('valid')).toBeFalsy();
  });

  test('dependentRequired', () => {
    const allValues = {
      field2: 'test',
    };
    expect(v.dependentRequired('field2', 'test message')('')).toBeTruthy();
    expect(v.dependentRequired('field2', 'test message')(null)).toBeTruthy();
    expect(v.dependentRequired('field2', 'test message')(undefined)).toBeTruthy();
    expect(v.dependentRequired('field2', 'test message')('valid', allValues)).toBeFalsy();
  });

  test('minLength', () => {
    expect(v.minLength(5)('1234')).toBeTruthy();
    expect(v.minLength(5)('12345')).toBeFalsy();
  });

  test('maxLength', () => {
    expect(v.maxLength(5)('123456')).toBeTruthy();
    expect(v.maxLength(5)('12345')).toBeFalsy();
  });

  test('integer', () => {
    expect(v.integer('invalid')).toBeTruthy();
    expect(v.integer('2.3')).toBeTruthy();
    expect(v.integer('.5')).toBeTruthy();
    expect(v.integer('1')).toBeFalsy();
  });

  test('oneOf', () => {
    expect(v.oneOf(['valid', 'test'])('invalid')).toBeTruthy();
    expect(v.oneOf(['valid', 'test'])('valid')).toBeFalsy();
    expect(v.oneOf(['valid', 'test'])('test')).toBeFalsy();
  });

  test('match', () => {
    expect(v.match('invalid')('123', { password: '321' })).toBeTruthy();
    expect(v.match('password')('123', { password: '321' })).toBeTruthy();
    expect(v.match('password')('321', { password: '321' })).toBeFalsy();
  });

  test('mmDdYyyyy', () => {
    expect(v.mmDdYyyyy('10/23/1999')).toBeFalsy();
    expect(v.mmDdYyyyy('12/23/199')).toBeTruthy();
    expect(v.mmDdYyyyy('12/02/19')).toBeTruthy();
    expect(v.mmDdYyyyy('12/02/')).toBeTruthy();
    expect(v.mmDdYyyyy('12/')).toBeTruthy();
    expect(v.mmDdYyyyy('12345')).toBeTruthy();
  });

  test('createValidator', () => {
    const validator = v.createValidator({
      email: [v.required, v.email],
      emails: [v.emails],
      password: [v.required, v.minLength(6)],
      passwordRepeat: [v.match('password'), v.required],
    });

    expect(typeof validator).toBe('function');

    expect(validator({
      email: '',
      emails: '',
      password: '',
      passwordRepeat: null,
    })).toEqual(
      {
        email: v.required(''),
        emails: v.emails(''),
        password: v.required(''),
        passwordRepeat: v.match('a')('c', { a: 'b' }),
      },
      'Expected to follow the validation order',
    );

    expect(Object.keys(validator({
      email: 'invalid',
      emails: 'invalid, invalid',
      password: '12345',
      passwordRepeat: '',
    }))).toEqual(['email', 'emails', 'password', 'passwordRepeat']);

    expect(Object.keys(validator({
      email: 'test@example.com',
      emails: 'test@example.com, test2@example.com',
      password: '12345',
      passwordRepeat: '',
    }))).toEqual(['password', 'passwordRepeat']);

    expect(Object.keys(validator({
      email: 'test@example.com',
      emails: 'test@example.com, test2@example.com',
      password: '123456',
      passwordRepeat: '654321',
    }))).toEqual(['passwordRepeat']);

    expect(validator({
      email: 'test@example.com',
      emails: 'test@example.com, test2@example.com',
      password: '123456',
      passwordRepeat: '123456',
    })).toEqual({});

    expect(validator()).toEqual({
      email: v.required(''),
      emails: v.emails(''),
      password: v.required(''),
      passwordRepeat: v.required(''),
    });

    const validatorWithoutMessage = v.createValidator({
      email: [v.email, v.required],
    });

    expect(validatorWithoutMessage({
      email: '',
    })).toEqual({
      email: 'Required field',
    });

    const validatorWithMessage = v.createValidator({
      email: [v.email, v.required],
    }, {
      email: {
        required: 'Blah',
      },
    });

    expect(validatorWithMessage({
      email: '',
    })).toEqual({
      email: 'Blah',
    });
  });
});
