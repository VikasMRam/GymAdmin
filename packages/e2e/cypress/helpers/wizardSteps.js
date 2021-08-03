import { waitForHydration } from './tests';

export const completeResidentNameStep = (fullName) => {
  waitForHydration(cy.contains("What is the resident's name?", { timeout: 30000 }));
  waitForHydration(cy.get('form input[id=fullName]')).type(fullName);
  waitForHydration(cy.get('form button[type=submit]').contains('Continue')).click({ force: true });
  cy.wait('@postUuidActions').then((xhr) => {
    const request = xhr.requestBody;
    const attrs = request.data.attributes;
    expect(attrs.actionInfo).to.have.property('stepName', 'step-12:ResidentName');
    expect(attrs.actionInfo).to.have.property('wizardName', 'assessmentWizard');
    expect(attrs.actionInfo).to.have.property('wizardPostConversionInfo', true);
  });
};
