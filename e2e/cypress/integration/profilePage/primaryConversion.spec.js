import { responsive, select } from '../../helpers/tests';
import { toJson } from '../../helpers/request';
import { getCommunity } from '../../helpers/getCommunity';

const randChars = (characters, length = 1) => {
  let result = '';
  while (length > 0 && length--) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const fromTwo = length => randChars('23456789', length);
const fromZero = length => randChars('0123456789', length);

const randHash = () => Math.random().toString(36).substring(7);
const randPhone = () => `${fromTwo()}${fromZero(2)}${fromTwo()}${fromZero(6)}`;
const formatPhone = phone => `${phone.substr(0, 3)}-${phone.substr(3, 3)}-${phone.substr(6)}`;

describe('Primary Conversion', () => {
  let community;

  beforeEach(() => {
    cy.server();

    getCommunity('buena-vista-manor-house').then((response) => {
      community = response;
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
        const response = await toJson(xhr);
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
