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

export const select = (...args) => cy.get(args.map((x) => {
  if (x[0] === '.') {
    return `[class*="${x.slice(1)}"]`;
  } else if (x[0] === '#') {
    return `[data-cy*="${x.slice(1)}"]`;
  }
  return x;
}).join(' '));

