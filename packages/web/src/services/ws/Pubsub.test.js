import Pubsub from './Pubsub';

describe('Pubsub', () => {
  let pubsub;

  beforeEach(() => {
    pubsub = new Pubsub();
  });

  it('should not call a listener', () => {
    const cb = jest.fn();
    pubsub.on('foo', cb);
    pubsub.emit('bar', 'thing');
    expect(cb).not.toHaveBeenCalled();
  });

  it('should add a listener', () => {
    const cb = jest.fn();
    pubsub.on('foo', cb);
    pubsub.emit('foo', 'thing');
    expect(cb).toHaveBeenCalledWith('thing');
  });

  it('should remove a listener', () => {
    const cb = jest.fn();
    pubsub.on('foo', cb);
    pubsub.off('foo', cb);
    pubsub.emit('foo', 'thing');
    expect(cb).not.toHaveBeenCalledWith();
  });

  it('should work without capture', () => {
    const more = jest.fn().mockReturnValue(true);
    const bail = jest.fn().mockReturnValue(false);
    pubsub.on('foo', more);
    pubsub.emit('foo', 'more');
    expect(more).toHaveBeenCalledWith('more');
    pubsub.on('foo', bail);
    pubsub.emit('foo', 'bail');
    expect(more).toHaveBeenCalledWith('bail');
    expect(bail).toHaveBeenCalledWith('bail');
  });

  it('should work with capture', () => {
    const more = jest.fn().mockReturnValue(true);
    const bail = jest.fn().mockReturnValue(false);
    pubsub.on('foo', more);
    pubsub.on('foo', bail, { capture: true });
    pubsub.emit('foo', 'bail');
    expect(bail).toHaveBeenCalledWith('bail');
    expect(more).not.toHaveBeenCalled();
  });
});
