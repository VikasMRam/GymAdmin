import responsive from '../../helpers/responsive';
import buildEntity from '../../helpers/buildEntity';

responsive('Community Profile Sections', () => {
  it('Should see details', async () => {
    const response = await cy.fixture('community-almavia');
    const data = buildEntity(response);

    cy.visit(`/assisted-living/california/san-francisco/${data.id}`);
    cy.get('h1').contains(data.name);
    cy.get('h3').contains(data.address);
  });
});
