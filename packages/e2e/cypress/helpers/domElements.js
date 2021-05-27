const selectorTpeDetector = (selector) => {
  if (selector.substring(0,1) === '/' || selector.substring(0,1) === '('){
    return 'XPATH'
  }
  return 'CSS'
};

export const domElement = (selector, timeout = 5000) => {
  return selectorTpeDetector(selector) === 'CSS' ? cy.get(selector , {timeout}) : cy.xpath(selector , {timeout});
};

export const isVisible = (selector, timeout = 5000) => {
  return domElement(selector, {timeout}).should('be.visible')
};

export const isVisibleXpath = (selector, timeout = 5000) => {
  cy.xpath(selector , {timeout}).should('be.visible')
};

export const isAbsent = (selector, timeout = 5000) => {
  return domElement(selector, {timeout}).should('not.exist')
};

export const isNotVisibleXpath = (selector, timeout = 5000) => {
  cy.xpath(selector , {timeout}).should('not.be.visible')
};

export const isAbsentXpath = (selector, timeout = 5000) => {
  cy.xpath(selector , {timeout}).should('not.be.visible')
};

export const elemWithTextIsExist = (element, textExpected) => {
  domElement(element).invoke('text').then((text) => {
    console.log(text);
    expect(text.trim()).equal(textExpected)
  });
};

export const click = (selector) => domElement(selector, {timeout: 5000}).click();




