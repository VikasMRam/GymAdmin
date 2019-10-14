import { responsive, select } from '../../helpers/tests';
import buildEntity from '../../helpers/buildEntity';

describe('Community Profile Sections', () => {
  let data;

  beforeEach(() => {
    cy.fixture('community-rhoda').then((response) => {
      data = buildEntity(response);
    });
  });

  responsive(() => {
    it('Should see details', () => {
      cy.visit(`/assisted-living/california/san-francisco/${data.id}`);

      cy.get('h1').contains(data.name).its('length').should('be', 1);

      const { line1, city, state, zip } = data.address;

      cy.get('h3').should(($h3) => {
        const address = `${line1}, ${city}, ${state} ${zip}`;
        expect($h3.first().text().replace(/\s+/g, ' ')).to.equal(address);
      });

      select('#concierge-number').should(($div) => {
        expect($div.text().replace(/[^\d]/g, '')).to.equal(data.twilioNumber.numbers[0].toString());
      });
    });
  });
});
