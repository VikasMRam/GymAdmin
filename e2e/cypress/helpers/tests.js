const MOBILE = 'iphone-6';
const TABLET = 'ipad-2';
const LAPTOP = 'macbook-13';

const getViewport = () => {
  switch (Cypress.env('viewport')) {
    case 'mobile': return [MOBILE];
    case 'desktop': return [TABLET];
    case 'tablet': return [LAPTOP];
    default: return [MOBILE, TABLET, LAPTOP];
  }
};

export const responsive = (tests) =>  {
  getViewport().forEach((viewport) => {
    context(`in ${viewport}`, () => {
      beforeEach(() => {
        cy.viewport(viewport);
      });
      tests(viewport);
    });
  });
};

/**
 * Transforms selectors to make them more compatible with our e2e tests
 * ; classes are converted from '.something' to '[class*="something"]
 * to make easier to target styled-components and ids are converted
 * from '#something' to '[data-cy*="something"]'
 *
 * @param args A list of selectors to match
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
 */
export const select = (...args) => cy.get(args.map((arg) => {
  const regexes = {
    class: /\.[^\s.#\[,]+/g,
    'data-cy': /\#[^\s.#\[,]+/g,
  };
  Object.entries(regexes).forEach(([attr, regex]) => {
    let match;
    while(match = regex.exec(arg)) {
      const { 0: matched, index } = match;
      const replaced = `[${attr}*="${matched.slice(1)}"]`;
      arg = `${arg.substr(0, index)}${replaced}${arg.substr(index + matched.length)}`;
      regex.lastIndex = index + replaced.length;
    }
  });
  return arg;
}).join(', '));

