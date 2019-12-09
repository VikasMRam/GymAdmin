import React from 'react';
import { mount } from 'enzyme';
import { renderToString } from 'react-dom/server';
import ReactDom from 'react-dom';

import { hydrateComponents, HydrationData, withHydration } from 'sly/services/partialHydration/index';

jest.mock('react-dom');

const clickMock = jest.fn();

function Button({ value }) {
  return <button onClick={() => clickMock(value)} />;
}
Button.typeHydrationId = 'Button';
const HydratedButton = withHydration(Button);

function Sea({ name, isBig }) {
  return (
    <span>
      The {name} is a {isBig && 'big'} sea.
    </span>
  );
}
Sea.typeHydrationId = 'Sea';
const HydratedSea = withHydration(Sea);

function Wrapper({ children }) {
  return children;
}

function renderHydration(children) {
  const root = document.createElement('div');

  root.innerHTML = renderToString(
    <>
      {children}
      <HydrationData />
    </>,
  );

  return root;
}

describe('Partial hydration (integration)', () => {
  let wrappers; let
    intersectionObserver;

  beforeEach(() => {
    wrappers = [];
    ReactDom.hydrate = (node, root) => wrappers.push(mount(node, { attachTo: root }));

    clickMock.mockReset();

    intersectionObserver = {
      constructor: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    };

    global.IntersectionObserver = jest.fn().mockImplementation((...props) => {
      intersectionObserver.constructor(...props);
      return intersectionObserver;
    });
  });

  function intersectAll() {
    const callback = intersectionObserver.constructor.mock.calls[0][0];

    callback(intersectionObserver.observe.mock.calls.map(([target]) => ({ target, isIntersecting: true })));
  }

  function intersect(callIndex) {
    const callback = intersectionObserver.constructor.mock.calls[0][0];

    callback(intersectionObserver.observe.mock.calls.map(([target], index) => ({ target, isIntersecting: callIndex === index })));
  }

  describe('when there are no hydrated components', () => {
    it('should not fail', () => {
      const container = renderHydration(null);

      hydrateComponents([Button], container, Wrapper);

      expect(intersectionObserver.observe).not.toHaveBeenCalled();
    });
  });
  describe('when a component has been hydrated but that component is not in the components param', () => {
    it('should not hydrate the component and not fail', () => {
      const container = renderHydration(<HydratedButton initialValue={1} />);

      hydrateComponents([Sea], container, Wrapper);
      intersectAll();

      expect(wrappers).toHaveLength(0);
    });
  });

  describe('when the components being hydrated do not have `typeHydrationId`', () => {
    it('should throw an error saying that property is required', () => {
      const container = renderHydration(null);

      function Foobar() {}

      expect(() => hydrateComponents([Foobar], container, Wrapper)).toThrowError(
        'Can only hydrate components with a `typeHydrationId` property defined.',
      );
    });
  });

  describe('when a component is hydrated successfully', () => {
    it('should become interactive', async () => {
      const value = 'Hello world';
      const container = renderHydration(<HydratedButton value={value} />);

      hydrateComponents([Button], container, Wrapper);
      intersectAll();

      expect(wrappers.length).toBe(1);
      wrappers[0].find(Button).simulate('click');
      expect(clickMock).toHaveBeenCalledWith(value);
    });
  });

  describe('when the same hydrated component appears multiple times in the tree', () => {
    it('should hydrate each of them with the correct props', async () => {
      const container = renderHydration(
        <>
          <HydratedButton value="first" />
          <HydratedButton value="second" />
        </>,
      );

      hydrateComponents([Button], container, Wrapper);
      intersectAll();

      expect(wrappers).toHaveLength(2);

      clickMock.mockReset();
      wrappers[1].find(Button).simulate('click');
      expect(clickMock).toHaveBeenCalledWith('second');

      clickMock.mockReset();
      wrappers[0].find(Button).simulate('click');
      expect(clickMock).toHaveBeenCalledWith('first');
    });
  });

  describe('when the different types of components are hydrated in the same tree', () => {
    it('should hydrate each of them with the correct props', async () => {
      const container = renderHydration(
        <>
          <HydratedButton value="button" />
          <HydratedSea name="Caspian" isBig />
        </>,
      );

      hydrateComponents([Button, Sea], container, Wrapper);
      intersectAll();

      expect(wrappers).toHaveLength(2);

      clickMock.mockReset();
      wrappers[0].find(Button).simulate('click');
      expect(clickMock).toHaveBeenCalledWith('button');

      expect(wrappers[1].find(Sea).text()).toEqual('The Caspian is a big sea.');
    });
  });

  describe('when the multiple hydrated components but only some appear on the screen', () => {
    it('should only hydrate the components that appear on screen', async () => {
      const container = renderHydration(
        <>
          <HydratedButton value="first" />
          <HydratedButton value="second" />
        </>,
      );

      hydrateComponents([Button], container, Wrapper);
      intersect(1);

      expect(wrappers).toHaveLength(1);

      clickMock.mockReset();
      wrappers[0].find(Button).simulate('click');
      expect(clickMock).toHaveBeenCalledWith('second');
    });
  });
});
