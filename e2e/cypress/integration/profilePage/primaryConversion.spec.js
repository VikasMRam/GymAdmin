import { responsive, select } from '../../helpers/tests';
import buildEntity from '../../helpers/buildEntity';

const pad = (str, size) => {
  while (str.length < (size || 2)) {
    str = `${'0'}${str}`;
  }
  return str;
};

const randHash = () => Math.random().toString(36).substring(7);
const randPhone = () => `${'908'}${pad((10e9 * Math.random()).toString(10).substring(0, 7), 7)}`;
const formatPhone = phone => `${phone.substr(0, 3)}-${phone.substr(3, 3)}-${phone.substr(6)}`;

describe('Primary Conversion', () => {
  let community;

  beforeEach(() => {
    cy.server();

    cy.fixture('community-rhoda').then((response) => {
      community = buildEntity(response);
    });
  });

  const form = selector => select(`form[name="ConversionForm"] ${selector}`);

  responsive('laptop', () => {
    it('should convert and log into the dashboard', () => {
      cy.route('POST', '**/auth/register').as('register');
      cy.route('GET', '**/users/me').as('me');

      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      const email = `slytest+${randHash()}@seniorly.com`;
      const phone = randPhone();

      form('input[name="full_name"]').type('Fonz');
      form('input[name="email"]').type(email);
      form('input[name="phone"]').type(phone);
      form('button').click();

      cy.wait('@register').then((xhr) => {
        expect(xhr.status).to.equal(200);
        expect(xhr.requestBody).to.deep.equal({
          email,
          name: 'Fonz',
          phone_number: phone,
        });
      });

      cy.wait('@me').then(async (xhr) => {
        const responseText = await xhr.response.body.text();
        const response = JSON.parse(responseText);
        const attrs = response.data.attributes;
        expect(attrs.email).to.equal(email);
        expect(attrs.name).to.equal('Fonz');
        expect(attrs.phoneNumber).to.equal(phone);
      });

      cy.url().should('include', `/custom-pricing/${community.id}`);

      select('.Header.Link').contains('My Seniorly').click();
      select('.HeaderMenu.HeaderMenuItem').contains('My Profile').click();

      cy.url().should('include', '/dashboard/family/my-profile');

      select('input[name="name"]').should('have.value', 'Fonz');
      select('input[name="email"]').should('have.value', email);
      select('input[name="phoneNumber"]').should('have.value', formatPhone(phone));
    });
  });
});
