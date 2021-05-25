// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

import { responsive } from '../../helpers/tests';
import {
  CommunityTypes,
  SizeFilters,
  PriceFilter,
  MoreFilters,
  FilterNames,
} from '../../constants/SearchFilters';


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

const checkForADTile = (currentList) => {
  if (currentList.length && currentList.length > 2) {
    cy.get('div[data-testid = "GetAssessmentBox"]').then((matchedElements) => {
      expect(matchedElements.length).to.eql(2);
    });
  } else {
    cy.get('div[data-testid = "GetAssessmentBox"]').then((matchedElements) => {
      expect(matchedElements.length).to.eql(1);
    });
  }
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

const clickFilterButtons  = (viewPort, buttonName) => {
  if (viewPort === 'mobile') {
    if (buttonName === 'Save') {
      cy.get('div[class*="NewModal"]').find('button').contains('Save').click();
    } else if (buttonName === 'Clear') {
      cy.get('div[class*="NewModal"]').find('button').contains('Clear all').click();
    }
  } else if (buttonName === 'Save') {
    cy.get('button')
      .contains('Save')
      .click({ force: true });
  } else if (buttonName === 'Clear') {
    cy.get('button') // Click on clear all
      .contains('Clear all')
      .click();
  }
};

const applyFilter = (filterName, viewPort) => {
  cy.get('div[class*="FilterButton"]').each((filterButton) => {
    cy.wrap(filterButton)
      .invoke('text')
      .then((text) => {
        if (text.includes('Filters') && filterButton.is(':visible')) {
          cy.wrap(filterButton).click();
        }
      });
  }).then(() => {
    if (viewPort === 'mobile') {
      cy.get('div[class*="Collapsible__Header"]').contains(filterName.mobileUiText).click();
    } else {
      cy.get('div[class*="FilterButton"]').contains(filterName.uiText).click();
    }
  });
  // cy.get('div[class*="FilterButton"]').contains(text).click();
};


const applyGenericFilter = (filterName, selectionTypes, viewPort) => {
  applyFilter(filterName, viewPort); // Click on filter


  // Select the choices
  selectionTypes.forEach((communityType) => {
    const searchText = communityType.uiText;
    cy.get('label[class*="FilterChoice"]')
      .contains(searchText)
      .click();
  });

  // if (viewPort === 'mobile') {
  //   cy.get('div[class*="NewModal"]').find('button').contains('Save').click();
  //   cy.get('span[class*="FilterButton__Number"]').contains(selectionTypes.length);
  // } else {
  //   cy.get('button')
  //     .contains('Save')
  //     .click({ force: true });
  //   cy.get('div[class*="FilterButton"]').contains(selectionTypes[0].uiText);
  // }
  clickFilterButtons(viewPort, 'Save');
  if (viewPort === 'mobile') {
    cy.get('span[class*="FilterButton__Number"]').contains(selectionTypes.length);
  } else {
    cy.get('div[class*="FilterButton"]').contains(selectionTypes[0].uiText);
  }
};

const clearGenericTypeFilter = (filterName, selectionValue, viewPort) => {
  cy.log('Clear result');
  if (viewPort === 'mobile') {
    applyFilter(filterName, viewPort);
  } else {
    applyFilter(selectionValue, viewPort);
  }

  // if (viewPort === 'mobile') {
  //   cy.get('div[class*="NewModal"]').find('button').contains('Clear all').click();
  //   cy.get('div[class*="NewModal"]').find('button').contains('Save').click();
  //   cy.get('span[class*="FilterButton__Number"]').should('not.exist');
  // } else {
  //   cy.get('button') // Click on clear all
  //     .contains('Clear all')
  //     .click();
  //   cy.get('button')
  //     .contains('Save')
  //     .click({ force: true });
  //   cy.get('div[class*="FilterButton"]').contains(selectionValue.uiText);
  // }

  clickFilterButtons(viewPort, 'Clear');
  clickFilterButtons(viewPort, 'Save');
  if (viewPort === 'mobile') {
    cy.get('span[class*="FilterButton__Number"]').should('not.exist');
  } else {
    cy.get('div[class*="FilterButton"]').contains(filterName.uiText);
  }
};

const applyMoreFilter = (lapHeader, filterName, selectionTypes, viewPort) => {
  if (viewPort === 'mobile') {
    applyFilter(filterName, viewPort);
  } else {
    applyFilter(lapHeader, viewPort);
  }

  selectionTypes.forEach((communityType) => {
    const searchText = communityType.uiText;
    cy.get('label[class*="FilterChoice"]')
      .contains(searchText)
      .click();
  });

  // if (viewPort === 'mobile') {
  //   cy.get('div[class*="NewModal"]').find('button').contains('Save').click();
  // } else {
  //   cy.get('button')
  //     .contains('Save')
  //     .click({ force: true });
  // }
  clickFilterButtons(viewPort, 'Save');


  cy.log('Save Button Clicked');

  cy.get('span[class*="FilterButton__Number"]').contains(selectionTypes.length);
};

const clearMoreFilter = (lapHeader, filterName, viewPort) => {
  if (viewPort === 'mobile') {
    applyFilter(filterName, viewPort);
  } else {
    applyFilter(lapHeader, viewPort);
  }
  // if (viewPort === 'mobile') {
  //   cy.get('div[class*="NewModal"]').find('button').contains('Clear all').click();
  //   cy.get('div[class*="NewModal"]').find('button').contains('Save').click();
  //   cy.get('span[class*="FilterButton__Number"]').should('not.exist');
  // } else {
  //   cy.get('button') // Click on clear all
  //     .contains('Clear all')
  //     .click();
  //   cy.get('button')
  //     .contains('Save')
  //     .click({ force: true });
  //   cy.get('div[class*="FilterButton"]').contains(filterName.uiText);
  // }
  clickFilterButtons(viewPort, 'Clear');
  clickFilterButtons(viewPort, 'Save');
  if (viewPort === 'mobile') {
    cy.get('span[class*="FilterButton__Number"]').should('not.exist');
  } else {
    cy.get('div[class*="FilterButton"]').contains(lapHeader.uiText);
  }
};


//* Result Set Logics

// Accepts previous result count , and validate if present and previous count are different
const validateChangeInResultSet = (previousResultCount) => {
  cy.log('Validate Result');
  cy.wait(2000);
  cy.get('div')
    .contains('results')
    .invoke('text')
    .then((text) => {
      const textCount = parseFloat(text);
      // expect(textCount !== Number(previousResultCount));
      expect(textCount).not.eql(Number(previousResultCount));
    });
};

const validateNoResultCheck = () => {
  cy.contains('No results');
};

// Accepts count, and check it matches with present result count
const validateResultSetCount = (currentList, totalCount) => {
  if (currentList && currentList.length) {
    cy.get('div')
      .contains('results')
      .invoke('text')
      .then((text) => {
        const textCount = parseFloat(text);
        expect(Number(textCount)).to.eql(totalCount);
      });
  } else {
    validateNoResultCheck();
  }
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
    currentUrl = url.substr(url.indexOf('assisted'));
    // http://www.lvh.me/assisted-living/california/san-francisco
    // extract only relative url , as environment changes
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

const searchText = 'San Francisco, CA';
const cityName = 'San Francisco';
const urlCity = 'san-francisco';

//! First Set
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
  let totalResultCount = 0;


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
      toSearchPage(searchText);
      // Url check
      cy.url().should('have.string', urlCity);
      cy.wait('@communitySearch').then((res) => {
        res.response.body.text().then((text) => {
          const responseBody = JSON.parse(text);
          if (responseBody.data && responseBody.data.length) {
            currentList = responseBody.data;
            totalResultCount = responseBody.meta['filtered-count'];
          }
        });
      });
    });

    it('Title check', () => {
      // Heading check
      cy.contains(`Senior Living Communities in ${cityName}`);
    });

    it('Filter section check', () => {
      //! Filter Section
      cy.get('div[class*="FilterButton__"]')
        .its('length')
        .should('greaterThan', 4);
    });
    it('Results text check', () => {
      // Results text
      validateResultSetCount(currentList, totalResultCount);
    });

    it('Verify AD Tile', () => {
      checkForADTile(currentList);
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

// // ! Second Set
describe('Search Page Sections', () => {
  let currentList = [];
  let totalResultCount = 0;
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.server();
    cy.route({
      method: 'GET',
      url: '**/platform/community-search?filter**',
    }).as('communitySearch');
    cy.route('GET', '**/search?**').as('searchRequest');
  });

  responsive((viewport) => {
    it('Navigate to search page', () => {
      cy.visit('/');
      toSearchPage(searchText);
      // Url check
      cy.url().should('have.string', urlCity);
      cy.wait('@communitySearch').then((res) => {
        res.response.body.text().then((text) => {
          const responseBody = JSON.parse(text);
          if (responseBody.data && responseBody.data.length) {
            currentList = responseBody.data;
            totalResultCount = responseBody.meta['filtered-count'];
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
      applyGenericFilter(FilterNames.CommunityType, [
        CommunityTypes.AssistedLiving,
      ], viewport);
      // check for title change
      checkForTitle(CommunityTypes.AssistedLiving.uiText);

      validateChangeInResultSet(totalResultCount);

      clearGenericTypeFilter(
        FilterNames.CommunityType,
        CommunityTypes.AssistedLiving, viewport,
      );
    });

    it('Size Type Filter Check', () => {
      applyGenericFilter(FilterNames.Size, [SizeFilters.Small], viewport);
      validateChangeInResultSet(totalResultCount);
      clearGenericTypeFilter(FilterNames.Size, SizeFilters.Small, viewport);
    });

    it('Prize Type Filter Check', () => {
      applyGenericFilter(FilterNames.Price, [PriceFilter.Range1], viewport);
      validateChangeInResultSet(totalResultCount);
      clearGenericTypeFilter(FilterNames.Price, PriceFilter.Range1, viewport);
    });

    it('More Filter Check', () => {
      applyMoreFilter(FilterNames.MoreFilters, MoreFilters.CareServices, [MoreFilters.CareServices.MedicationManagement], viewport);

      // applyMoreFilter(FilterNames.MoreFilters.uiText, [
      //   MoreFilters.CareServices.MedicationManagement,
      // ]);

      validateChangeInResultSet(totalResultCount);
      clearMoreFilter(FilterNames.MoreFilters, MoreFilters.CareServices, viewport);
    });

    it('More Filter Check - No results', () => {
      applyMoreFilter(FilterNames.MoreFilters, MoreFilters.CareServices, [MoreFilters.CareServices.TransportArrangememt, MoreFilters.CareServices.MedicationManagement], viewport);
      validateNoResultCheck();
      clearMoreFilter(FilterNames.MoreFilters, MoreFilters.CareServices, viewport);
    });


    it('Navigate to page 2', () => {
      // cy.get('div[class*="SearchPagination"]')
      //   .find('button')
      //   .contains('2')
      //   .click();
      cy.get('div[class*="Pagination"]').find('div[rotate="0"]').click();

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
});


//! Third Set

describe('Assisted Search Page Sections', () => {
  let currentList = [];
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.server();
    cy.route({
      method: 'GET',
      url: '**/platform/community-search?filter**',
    }).as('communitySearch');
  });

  responsive(() => {
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

    it('map check', () => {
      mapCheck(currentList, 'CONTENT');
    });

    it('Navigate from map popover', () => {
      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
      });

      mapCheck([currentList[0]], 'MARKER_NAVIGATION');
    });
  });
});
