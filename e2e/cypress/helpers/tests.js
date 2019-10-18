const viewports = {
  mobile: 'iphone-6',
  tablet: 'ipad-2',
  laptop: 'macbook-13',
};

const getViewport = () => {
  const viewport = Cypress.env('viewport');
  if (viewport) {
    return {
      [viewport]: viewports[viewport],
    };
  }
  return viewports;
};

export const responsive = (tests) =>  {
  Object.entries(getViewport()).forEach(([viewport, id]) => {
    context(`in ${viewport}`, () => {
      beforeEach(() => {
        cy.viewport(id);
      });
      tests(viewport, id);
    });
  });
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
  const regexes = {
    class: /\.[^\s.#[,]+/g,
    'data-cy': /#[^\s.#[,]+/g,
  };
  Object.entries(regexes).forEach(([attr, regex]) => {
    let match;
    while (match = regex.exec(selector)) {
      const { 0: matched, index } = match;
      const replaced = `[${attr}*="${matched.slice(1)}"]`;
      selector = `${selector.substr(0, index)}${replaced}${selector.substr(index + matched.length)}`;
      regex.lastIndex = index + replaced.length;
    }
  });
  return cy.get(selector);
};

