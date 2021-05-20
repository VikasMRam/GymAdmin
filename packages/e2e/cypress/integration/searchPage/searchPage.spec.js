import { responsive } from '../../helpers/tests';
import {
  CommunityTypes,
  SizeFilters,
  PriceFilter,
  MoreFilters,
  FilterNames,
} from '../../constants/SearchFilters';

// / <reference types="Cypress" />

//* Helper Functions Start
const toSearchPage = (address) => {
  // Get Search Box Input
  cy.get('nav').find('input[placeholder="Search by city, zip, community name"]').type(address);

  cy.wait('@searchRequest');

  // Wait untill suggestions appear
  cy.get('div[class*=__SuggestionsWrapper]').contains(address);

  // Click Search Icon
  cy.get('nav').find('input[placeholder="Search by city, zip, community name"]').parent().find('button')
    .click();
};

const toSearchPageFromCity = (cityName) => {
  cy.get('a h4')
    .contains(cityName)
    .click();
  cy.url().should('have.string', 'assisted-living');
};

//* List Logics

// Accepts list data (Array of json) and validates,
// if a card with each json object is rendered in Ui or not
const checkPopulationOfList = (data) => {
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
const checkForListCount = (count) => {
  cy.get('a article img').then((elements) => {
    expect(elements.length).to.eql(count);
  });
};

// Accepts array of text and validates that each text should be present in all list items
// const checkForListText = (arrayOfText) => {
//   cy.get('a article picture')
//     .parents('article')
//     .each((item) => {
//       cy.wrap(item)
//         .invoke('text')
//         .then((text) => {
//           let textFound = false;
//           arrayOfText.forEach((listText) => {
//             if (text.includes(listText)) {
//               textFound = true;
//             }
//           });
//           expect(textFound).to.be.true;
//         });
//     });
// };

//* Filter Logics

// Accepts name of the filter, and clicks it.
const applyFilter = (text) => {
  cy.get('div[class*="FilterButton"]').contains(text).click();
};

const applyGenericFilter = (filterName, selectionTypes) => {
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

const clearGenericTypeFilter = (filterName, selectionValue) => {
  applyFilter(selectionValue); // Click on filter

  cy.get('button') // Click on clear all
    .contains('Clear all')
    .click();

  cy.get('button')
    .contains('Save')
    .click({ force: true });

  cy.get('div[class*="FilterButton"]').contains(filterName);
};

const applyMoreFilter = (filterName, selectionTypes) => {
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
const validateChangeInResultSet = (previousResultCount) => {
  cy.get('div')
    .contains('results')
    .invoke('text')
    .then((text) => {
      const textCount = parseFloat(text);
      expect(textCount !== Number(previousResultCount));
    });
};

// Accepts count, and check it matches with present result count
// const validateResultSetCount = (count) => {
//   cy.get('div')
//     .contains('results')
//     .invoke('text')
//     .then((text) => {
//       const textCount = parseFloat(text);
//       expect(Number(textCount)).to.eql(count);
//     });
// };

const validateNoResultCheck = () => {
  cy.contains('No results');
};

const checkForTitle = (titleText) => {
  cy.get('h1').contains(titleText).should('exist');
};

//* Map Logics

const closeMapView = () => {
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

const countMapMarkers = (list) => {
  cy.get('button[class*="gm-control"]').then(() => {
    cy.get('div[class*="Marker__"]').then((markers) => {
      expect(list.length).to.eql(markers.length);
    });
  });
  closeMapView();
};
const navigateAndCheckTitles  = (data) => {
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

const markerNavigation = (list) => {
  const urlData = [];

  cy.get('button[class*="gm-control"]').then(() => {
    cy.get('div[class*="Marker__"]').each((marker, index) => {
      cy.wrap(marker).find('svg').click({ force: true });
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
const mapAssertions = (list) => {
  cy.get('button[class*="gm-control"]').then(() => {
    cy.get('div[class*="Marker__"]').each((marker) => {
      cy.wrap(marker).find('svg').click({ force: true });
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


const openMapView = () => {
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
const mapCheck = (list, mode) => {
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
//* Helper Functions End

describe('Search Page', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.server();
    cy.route('GET', '**/search?**').as('searchRequest');
    cy.route({
      method: 'GET',
      url: '**/platform/community-search?filter**',
    }).as('communitySearch');
    // cy.route('POST', '**/uuid-actions').as('postUuidActions');
  });
  let currentList = [];
  responsive(() => {
    it('Check for near by cities links ', () => {
      cy.visit('/');

      it('Near by cities link check', () => {
        cy.visit('/');
        cy.get('a[class*="CommunitiesByCity"]').then((cityCards) => {
          expect(cityCards.length).to.eql(30);
        });
      });
    });

    it('Navigate to city search page', () => {
      toSearchPage('San Francisco, CA');
      // Url check
      cy.url().should('have.string', 'san-francisco');
      cy.wait('@communitySearch').then((res) => {
        res.response.body.text().then((text) => {
          const responseBody = JSON.parse(text);
          if (responseBody.data && responseBody.data.length) {
            currentList = responseBody.data;
          }
        });
      });
    });

    it('Title check', () => {
      // Heading check
      cy.contains('Senior Living Communities in San Francisco');
    });

    // it("Results text check", () => {
    //   // Results text
    //   validateResultSetCount(currentList.length);
    // });

    it('Filter section check', () => {
      //! Filter Section
      cy.get('div[class*="FilterButton__"]')
        .its('length')
        .should('greaterThan', 4);
    });
    it('List section check', () => {
      checkForListCount(20);
    });
    it('Map section check', () => {
      //! Map Section
      mapCheck(currentList, 'Markers');
    });
  });
});

// ! Second Set
describe('Search Page Sections', () => {
  let currentList = [];
  let currentResultCount = 0;
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '**/platform/community-search?filter**',
    }).as('communitySearch');
    cy.route('GET', '**/search?**').as('searchRequest');
  });

  it('Navigate to search page', () => {
    cy.visit('/');
    toSearchPage('San Francisco, CA');
    // Url check
    cy.url().should('have.string', 'san-francisco');
    cy.wait('@communitySearch').then((res) => {
      res.response.body.text().then((text) => {
        const responseBody = JSON.parse(text);
        if (responseBody.data && responseBody.data.length) {
          currentList = responseBody.data;
        }
      });
    });
  });

  it('Care types explanation check', () => {
    // Care types explanation
    cy.get('section h3')
      .contains('Explore other types of communities')
      .parent()
      .children()
      .find('article')
      .each((element) => {
        cy.wrap(element)
          .invoke('text')
          .then((text) => {
            expect(text.length).to.be.at.least(10);
          });
      });
  });

  it('List check for 20 elements', () => {
    checkForListCount(20);
  });

  it('Care Type Filter Check', () => {
    cy.get('div')
      .contains('results')
      .invoke('text')
      .then((text) => {
        currentResultCount = parseFloat(text);
      });

    applyGenericFilter(FilterNames.CommunityType.uiText, [
      CommunityTypes.AssistedLiving,
    ]);
    // check for title change
    checkForTitle(CommunityTypes.AssistedLiving.uiText);

    validateChangeInResultSet(currentResultCount);

    clearGenericTypeFilter(
      FilterNames.CommunityType.uiText,
      CommunityTypes.AssistedLiving.uiText,
    );
  });

  it('Size Type Filter Check', () => {
    cy.get('div')
      .contains('results')
      .invoke('text')
      .then((text) => {
        currentResultCount = parseFloat(text);
      });

    applyGenericFilter(FilterNames.Size.uiText, [SizeFilters.Small]);
    validateChangeInResultSet(currentResultCount);
    clearGenericTypeFilter(FilterNames.Size.uiText, SizeFilters.Small.uiText);
  });

  it('Prize Type Filter Check', () => {
    cy.get('div')
      .contains('results')
      .invoke('text')
      .then((text) => {
        currentResultCount = parseFloat(text);
      });

    applyGenericFilter(FilterNames.Price.uiText, [PriceFilter.Range1]);
    validateChangeInResultSet(currentResultCount);
    clearGenericTypeFilter(FilterNames.Price.uiText, PriceFilter.Range1.uiText);
  });

  it('More Filter Check', () => {
    cy.get('div')
      .contains('results')
      .invoke('text')
      .then((text) => {
        currentResultCount = parseFloat(text);
      });
    applyMoreFilter(FilterNames.MoreFilters.uiText, [
      MoreFilters.CareServices.MedicationManagement,
    ]);
    validateChangeInResultSet(currentResultCount);
    clearGenericTypeFilter(
      FilterNames.MoreFilters.uiText,
      FilterNames.MoreFilters.uiText,
    );
  });

  it('More Filter Check - No results', () => {
    applyMoreFilter(FilterNames.MoreFilters.uiText, [
      MoreFilters.CareServices.TransportArrangememt,
      MoreFilters.CareServices.MedicationManagement,
    ]);
    validateNoResultCheck();
    clearGenericTypeFilter(
      FilterNames.MoreFilters.uiText,
      FilterNames.MoreFilters.uiText,
    );
  });

  // it("Verify AD Tile", () => {});

  it('Navigate to page 2', () => {
    cy.get('div[class*="SearchPagination"]')
      .find('button')
      .contains('2')
      .click();

    cy.wait('@communitySearch').then((res) => {
      res.response.body.text().then((text) => {
        const responseBody = JSON.parse(text);
        if (responseBody.data && responseBody.data.length) {
          currentList = responseBody.data;
        }
      });
    });
  });

  it('check contents of page 2', () => {
    checkPopulationOfList(currentList);
  });
});

//! Third Set

describe('Assisted Search Page Sections', () => {
  let currentList = [];
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '**/platform/community-search?filter**',
    }).as('communitySearch');
  });

  it('Navigate to search page', () => {
    // cy.visit('/');
    cy.visit('/');
    toSearchPageFromCity('San Francisco');
    cy.wait('@communitySearch').then((res) => {
      res.response.body.text().then((text) => {
        const responseBody = JSON.parse(text);
        if (responseBody.data && responseBody.data.length) {
          currentList = responseBody.data;
        }
      });
    });
  });

  it('List population check', () => {
    checkPopulationOfList(currentList);
  });

  it('map check', () => {
    mapCheck(currentList, 'CONTENT');
  });

  it('Navigate from map popover', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    mapCheck([currentList[0]], 'MARKER_NAVIGATION');
  });

  it('Geo Guide', () => {
    cy.get('div')
      .contains('Getting Ready to Move to Assisted Living')
      .should('exist');
    cy.get('div')
      .contains('Costs Associated with Assisted Living')
      .should('exist');
    cy.get('div')
      .contains('Comparing Assisted Living to Other Care communities')
      .should('exist');
  });
  // it("Verify AD Tile", () => {});
});
