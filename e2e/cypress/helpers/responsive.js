export default function (describeTitle, tests) {
  ['iphone-6', 'ipad-2', 'macbook-13'].forEach((viewport) => {
    describe(`${describeTitle} in ${viewport}`, () => {
      beforeEach(() => {
        cy.viewport(viewport);
      });
      tests(viewport);
    });
  });
}
