const viewports = {
  mobile: 'iphone-6',
  tablet: 'ipad-2',
  laptop: 'macbook-13',
};

const getViewport = (viewportList) => {
  const viewport = Cypress.env('viewport');
  if (viewport) {
    return {
      [viewport]: viewports[viewport],
    };
  }
  if (!viewportList) {
    return viewports;
  }
  if (Array.isArray(viewportList)) {
    return viewportList.reduce((acc, viewport) => {
      acc[viewport] = viewports[viewport];
      return acc;
    }, {});
  }
  return {
    [viewportList]: viewports[viewportList],
  };
};

export const responsive = (viewportList, tests) =>  {
  if (typeof viewportList === 'function') {
    tests = viewportList;
    viewportList = null;
  }
  Object.entries(getViewport(viewportList)).forEach(([viewport, id]) => {
    if (!id) {
      throw Error(`${viewport} does not seem to be a valid viewport name`);
    }
    context(`in ${viewport}`, () => {
      beforeEach(() => {
        cy.viewport(id);
      });
      tests(viewport, id);
    });
  });
};

export const getSelector = (selector) => {
  const regexes = {
    class: /\.[^\s.#[,:]+/g,
    'data-cy': /#[^\s.#[,:]+/g,
  };
  Object.entries(regexes).forEach(([attr, regex]) => {
    let match;
    // eslint-disable-next-line no-cond-assign
    while (match = regex.exec(selector)) {
      const { 0: matched, index } = match;
      const replaced = `[${attr}*="${matched.slice(1)}"]`;
      selector = `${selector.substr(0, index)}${replaced}${selector.substr(index + matched.length)}`;
      regex.lastIndex = index + replaced.length;
    }
  });
  return selector;
};

/**
 * Transforms selector to make it more compatible with our e2e tests
 * ; classes are converted from '.something' to '[class*="something"]
 * to make easier to target styled-components and ids are converted
 * from '#something' to '[data-cy*="something"]'
 *
 * @param selector A selector to transform
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
 */
export const select = (selector) => {
  return cy.get(getSelector(selector));
};

export const waitForHydration = () => cy.wait(200);
