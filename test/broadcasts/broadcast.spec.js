import createContext from '../../src/ctx/createContext';
import broadcast from '../../src/broadcasts/broadcast';

describe('broadcast', () => {
  it('broadcast should invoke declaration', () => {
    const mock = jest.fn();
    const ctx = createContext({
      onEvent: [
        {
          on: 'test',
          reaction: mock
        }
      ]
    });
    ctx.broadcast('test');
    expect(mock).toBeCalled();
  });

  it('should pick up global context', () => {
    const mock = jest.fn();
    createContext({
      onEvent: [
        {
          on: 'test',
          reaction: mock
        }
      ]
    });
    broadcast('test');
    expect(mock).toBeCalled();
  });

  it('should defer broadcast', done => {
    const mock = jest.fn();
    createContext({
      onEvent: [
        {
          on: 'test',
          reaction: mock
        }
      ]
    });
    broadcast('test', null, { defer: true });
    expect(mock).not.toBeCalled();
    setTimeout(() => {
      expect(mock).toBeCalled();
      done();
    });
  });

  it('should not fail when there are no declarations', () => {
    const ctx1 = createContext({});
    const ctx2 = createContext({ onEvent: [] });
    expect(() => ctx1.broadcast('test')).not.toThrow();
    expect(() => ctx2.broadcast('test')).not.toThrow();
  });
});
