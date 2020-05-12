import { getImagePath, getFormat } from 'sly/web/services/images/index';

describe('Image Handler service', () => {
  it('should throw an error when the wrong dimmensions are passed', () => {
    expect(() => getFormat({})).toThrow();
    expect(() => getFormat({ crop: true })).toThrow();
  });

  it('should get a format with one dimension', () => {
    expect(getFormat({ width: 300 })).toEqual('300x');
    expect(getFormat({ height: 300 })).toEqual('x300');

    // crop should not do anything with a single dimension
    expect(getFormat({ height: 300, crop: false })).toEqual('x300');
    expect(getFormat({ height: 300, crop: true })).toEqual('x300');
    expect(getFormat({ width: 300, crop: false })).toEqual('300x');
    expect(getFormat({ width: 300, crop: true })).toEqual('300x');
  });

  it('should get a format with two dimensions', () => {
    expect(getFormat({ width: 100, height: 100 })).toEqual('100x100');
    expect(getFormat({ width: 100, height: 100, crop: false })).toEqual('a100x100');
    expect(getFormat({ width: 100, height: 100, crop: true })).toEqual('100x100');
  });

  it('should get the uploads path', () => {
    expect(getImagePath('image/path.ext')).toEqual('http://localhost/assets/uploads/image/path.ext');
  });

  it('should get the uploads path', () => {
    expect(getImagePath('image/path.ext', { width: 300, height: 300 })).toEqual('http://localhost/assets/images/300x300/image/path.ext');
  });
});
