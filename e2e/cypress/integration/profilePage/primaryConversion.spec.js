// import { responsive, select } from '../../helpers/tests';
// import { toJson } from '../../helpers/request';
// import { TEST_COMMUNITY } from '../../constants/community';
//
// import randomUser, { formatPhone } from 'e2e/helpers/randomUser';
//
// describe('Primary Conversion', () => {
//   let community;
//
//   beforeEach(() => {
//     cy.server();
//
//     cy.getCommunity(TEST_COMMUNITY).then((response) => {
//       community = response;
//     });
//   });
//
//   const form = selector => select(`form[name="ConversionForm"] ${selector}`);
//
//   responsive('laptop', () => {
//     it('should convert and log into the dashboard', () => {
//       cy.route('POST', '**/auth/register').as('register');
//       cy.route('GET', '**/users/me').as('me');
//
//       cy.visit(`/assisted-living/california/san-francisco/${community.id}?experimentEvaluations=Community_DetailPage_Sidebar:Sidebar_Concierge_Form`);
//
//       const { email, phone } = randomUser();
//
//       form('input[name="full_name"]').type('Fonz');
//       form('input[name="email"]').type(email);
//       form('input[name="phone"]').type(phone);
//       form('button').click();
//
//       cy.wait('@register').then((xhr) => {
//         expect(xhr.status).to.equal(200);
//         expect(xhr.requestBody).to.deep.equal({
//           email,
//           name: 'Fonz',
//           phone_number: phone,
//         });
//       });
//
//       cy.wait('@me').then(async (xhr) => {
//         const response = await toJson(xhr.response);
//         const attrs = response.data.attributes;
//         expect(attrs.email).to.equal(email);
//         expect(attrs.name).to.equal('Fonz');
//         expect(attrs.phoneNumber).to.equal(phone);
//       });
//
//       cy.url().should('include', `/custom-pricing/${community.id}`);
//
//       select('.Header.Link').contains('My Seniorly').click();
//       select('.HeaderMenu.HeaderMenuItem').contains('My Profile').click();
//
//       cy.url().should('include', '/dashboard/family/my-profile');
//
//       select('input[name="name"]').should('have.value', 'Fonz');
//       select('input[name="email"]').should('have.value', email);
//       select('input[name="phoneNumber"]').should('have.value', formatPhone(phone));
//     });
//   });
// });
