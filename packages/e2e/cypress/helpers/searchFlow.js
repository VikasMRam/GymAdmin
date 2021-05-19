

//* List Logics

// Accepts list data (Array of json) and validates,
// if a card with each json object is rendered in Ui or not
export const checkPopulationOfList = (data) => {
  cy.get('a article picture')
    .parents('article')
    .each((item) => {
      cy.wrap(item)
        .invoke('text')
        .then((text) => {
          let textFound = false;
          data.forEach((dataObj) => {
            if (text.includes(dataObj.attributes.name)) {
              textFound = true;
            }
          });
          expect(textFound).to.be.true;
        });
    });
};

// Validates expected list count to renered list count
export const checkForListCount = (count) => {
  cy.get('a article img').then((elements) => {
    expect(elements.length).to.eql(count);
  });
};

// Accepts array of text and validates that each text should be present in all list items
export const checkForListText = (arrayOfText) => {
  cy.get('a article picture')
    .parents('article')
    .each((item) => {
      cy.wrap(item)
        .invoke('text')
        .then((text) => {
          let textFound = false;
          arrayOfText.forEach((listText) => {
            if (text.includes(listText)) {
              textFound = true;
            }
          });
          expect(textFound).to.be.true;
        });
    });
};

//* Filter Logics

// Accepts name of the filter, and clicks it.
const applyFilter = (text) => {
  cy.get('div[class*="FilterButton"]').contains(text).click();
};

export const applyGenericFilter = (filterName, selectionTypes) => {
  applyFilter(filterName); // Click on filter

  // Select the choices
  selectionTypes.forEach((communityType) => {
    const searchText = communityType.uiText;
    cy.get('label[class*="FilterChoice"]')
      .contains(searchText)
      .click();
  });

  // Click on Save button
  cy.get('button')
    .contains('Save')
    .click({ force: true });

  cy.get('div[class*="FilterButton"]').contains(selectionTypes[0].uiText);
};

export const clearGenericTypeFilter = (filterName, selectionValue) => {
  applyFilter(selectionValue); // Click on filter

  cy.get('button') // Click on clear all
    .contains('Clear all')
    .click();

  cy.get('button')
    .contains('Save')
    .click({ force: true });

  cy.get('div[class*="FilterButton"]').contains(filterName);
};

export const applyMoreFilter = (filterName, selectionTypes) => {
  applyFilter(filterName);
  selectionTypes.forEach((communityType) => {
    const searchText = communityType.uiText;
    cy.get('label[class*="FilterChoice"]')
      .contains(searchText)
      .click();
  });

  cy.get('button')
    .contains('Save')
    .click();

  cy.log('Save Button Clicked');

  cy.get('span[class*="FilterButton__Number"]').eq(1).scrollIntoView();
};

//* Result Set Logics

// Accepts previous result count , and validate if present and previous count are different
export const validateChangeInResultSet = (previousResultCount) => {
  cy.get('div')
    .contains('results')
    .invoke('text')
    .then((text) => {
      const textCount = parseFloat(text);
      expect(textCount !== Number(previousResultCount));
    });
};

// Accepts count, and check it matches with present result count
export const validateResultSetCount = (count) => {
  cy.get('div')
    .contains('results')
    .invoke('text')
    .then((text) => {
      const textCount = parseFloat(text);
      expect(Number(textCount)).to.eql(count);
    });
};

export const validateNoResultCheck = () => {
  cy.contains('No results');
};

export const checkForTitle = (titleText) => {
  cy.get('h1').contains(titleText).should('exist');
};

//* Map Logics

export const closeMapView = () => {
  // check if map button is present in filter buttons
  cy.get('div[class*="FilterButton"]').each((filterButton) => {
    cy.wrap(filterButton)
      .invoke('text')
      .then((text) => {
        if (text.includes('List')) {
          cy.wrap(filterButton).click();
        }
      });
  });
};

export const countMapMarkers = (list) => {
  cy.get('button[class*="gm-control"]', { timeout: 50000 }).then(() => {
    cy.get('div[class*="Marker__"]').then((markers) => {
      expect(list.length).to.eql(markers.length);
    });
  });
  closeMapView();
};
export const navigateAndCheckTitles  = (data) => {
  let currentUrl;
  cy.url().then((url) => {
    currentUrl = url;
    data.forEach((dataObj, index) => {
      cy.visit(dataObj.url);
      checkForTitle(dataObj.title);
      if (index === data.length - 1) {
        cy.visit(currentUrl);
      }
    });
  });
};

export const markerNavigation = (list) => {
  const urlData = [];

  cy.get('button[class*="gm-control"]', { timeout: 50000 }).then(() => {
    cy.get('div[class*="Marker__"]').each((marker, index) => {
      cy.wrap(marker).find('svg').click({ force: true });
      // waitForHydration(cy.wrap(marker).find('svg')).click({ force: true });
      cy.wrap(marker)
        .invoke('text')
        .then(() => {
          cy.get("a[href*='map']")
            .find('h3')
            .contains(list[index].attributes.name).parents("a[href*='map']")
            .each((aTag, index, collection) => {
              urlData.push({
                url: aTag[0].href,
                title: list[index].attributes.name,
              });
              if (index === collection.length - 1) {
                navigateAndCheckTitles(urlData);
              }
            });
        });
    });
  });
};


// Accepts list's data, and check no of markers equal to list length
// Click on markers and validate data
export const mapAssertions = (list) => {
  cy.get('button[class*="gm-control"]', { timeout: 50000 }).then(() => {
    cy.get('div[class*="Marker__"]').each((marker) => {
      // cy.wait(200);
      cy.wrap(marker).find('svg').click({ force: true });
      // waitForHydration(cy.wrap(marker).find('svg')).click({ force: true });
      cy.wrap(marker)
        .invoke('text')
        .then((text) => {
          const index = (Number(text)) - 1;
          cy.get('h3')
            .contains(list[index].attributes.name)
            .should('exist');
        });
    });
  });

  closeMapView();
};


export const openMapView = () => {
  cy.get('div[class*="FilterButton"]').each((filterButton) => {
    cy.wrap(filterButton)
      .invoke('text')
      .then((text) => {
        if (text.includes('Map') && filterButton.is(':visible')) {
          cy.wrap(filterButton).click();
        }
      });
  });
};
export const mapCheck = (list, mode) => {
  // Check if is map view filter button present or not
  // If it is present then click that button else continue assertions
  openMapView();
  if (mode === 'Markers') {
    countMapMarkers(list);
  } else if (mode === 'MARKER_NAVIGATION') {
    markerNavigation(list);
  } else {
    mapAssertions(list);
  }
};

