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
  cy.get('nav').find('input[placeholder="Search by city, zip, community name"]').click().type(address);
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
  cy.get('a article h3')
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


const genericCheckPopulationOfList = () => {
  cy.get('a article h3').then((matchedCards) => {
    expect(matchedCards.length).to.greaterThan(0);
  });
};

// Validates expected list count to renered list count
const checkForListCount = (count) => {
  cy.get('a article img').should('have.length', count);
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

//* Filter Logics

// Accepts name of the filter, and clicks it.

const clickFilterButtons  = (viewPort, buttonName) => {
  if (viewPort === 'mobile') {
    if (buttonName === 'Save') {
      cy.get('div[class*="NewModal"]').find('button').contains('Save').click({ force: true });
    } else if (buttonName === 'Clear') {
      cy.get('div[class*="NewModal"]').find('button').contains('Clear all').click({ force: true });
    }
  } else if (buttonName === 'Save') {
    cy.get('button')
      .contains('Save')
      .click({ force: true });
  } else if (buttonName === 'Clear') {
    cy.get('button') // Click on clear all
      .contains('Clear all')
      .click({ force: true });
  }
};

const applyFilter = (filterName, viewPort) => {
  cy.get('div[class*="FilterButton"]').each((filterButton) => {
    cy.wrap(filterButton)
      .invoke('text')
      .then((text) => {
        if (text.includes('Filters') && filterButton.is(':visible')) {
          cy.wrap(filterButton).click({ force: true });
        }
      });
  }).then(() => {
    if (viewPort === 'mobile') {
      cy.get('div[class*="Collapsible__Header"]').contains(filterName.mobileUiText).click({ force: true });
    } else {
      cy.get('div[class*="FilterButton"]').contains(filterName.uiText).click({ force: true });
    }
  });
};


const applyGenericFilter = (filterName, selectionTypes, viewPort) => {
  applyFilter(filterName, viewPort); // Click on filter

  // Select the choices
  selectionTypes.forEach((communityType) => {
    const searchText = communityType.uiText;
    cy.get('div[class*="FilterChoice"]')
      .contains(searchText)
      .click({ force: true });
  });
  cy.wait('@searchResults');
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
  clickFilterButtons(viewPort, 'Clear');
  cy.wait('@searchResults');
  clickFilterButtons(viewPort, 'Save');
  if (viewPort === 'mobile') {
    cy.get('span[class*="FilterButton__Number"]').should('not.exist');
  } else {
    cy.get('div[class*="FilterButton"]').contains(filterName.uiText);
  }
};

const applyMoreFilter = (lapHeader, filterName, selectionTypes, viewPort, previousSelections = 0) => {
  return new Promise((resolve, reject) => {
    if (viewPort === 'mobile') {
      applyFilter(filterName, viewPort);
    } else {
      applyFilter(lapHeader, viewPort);
    }
    selectionTypes.forEach((communityType) => {
      const searchText = communityType.uiText;
      cy.get('div[class*="FilterChoice"]')
        .contains(searchText)
        .click();
    });
    // cy.wait('@searchResults');
    let responseData = [];
    cy.wait('@searchResults').then((res) => {
      const responseBody = res.response.body;
      responseData = responseBody.data ? responseBody.data  : [];
      clickFilterButtons(viewPort, 'Save');
      cy.log('Save Button Clicked');
      cy.get('span[class*="FilterButton__Number"]').contains(selectionTypes.length + previousSelections);
      resolve(responseData);
    }, (err) => {
      reject(err);
    });
  });
};

const clearMoreFilter = (lapHeader, filterName, viewPort) => {
  if (viewPort === 'mobile') {
    applyFilter(filterName, viewPort);
  } else {
    applyFilter(lapHeader, viewPort);
  }
  clickFilterButtons(viewPort, 'Clear');
  cy.wait('@searchResults');
  clickFilterButtons(viewPort, 'Save');
  console.log('clear view port,', viewPort);
  if (viewPort === 'mobile') {
    cy.get('span[class*="FilterButton__Number"]').should('not.exist');
  } else {
    cy.get('div[class*="FilterButton"]').contains(lapHeader.uiText);
  }
};


//* Result Set Logics

// Accepts previous result count , and validate if present and previous count are different
const validateChangeInResultSet = (previousResultCount) => {
  cy.get('div').contains('results').should('not.have.value', previousResultCount);
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
  cy.get('div[class*="Marker__"]').then((markers) => {
    expect(list.length).to.eql(markers.length);
  });
  closeMapView();
};


const navigateAndCheckTitles  = (data) => {
  let currentUrl;
  cy.url().then((url) => {
    // extract only relative url , as environment changes
    currentUrl = url.substr(url.indexOf('assisted'));
    // [data[0]].forEach((dataObj, index) => {
    //   cy.visit(dataObj.url).then(() => {
    //     cy.waitForPageViewEvent();
    //   });
    //   checkForTitle(dataObj.title);
    //   if (index === data.length - 1) {
    //     cy.visit(currentUrl);
    //   }
    // });
  });
  // [data[0]].forEach((dataObj, index) => {
  //   cy.visit(dataObj.url).then(() => {
  //     cy.waitForPageViewEvent();
  //   });
  //   checkForTitle(dataObj.title);
  //   if (index === data.length - 1) {
  //     cy.visit(currentUrl);
  //   }
  // });
  cy.visit(data[0].url);
  cy.waitForPageViewEvent();
  checkForTitle(data[0].title);
  cy.visit(currentUrl);
};


// Accepts list's data, and check no of markers equal to list length
// Click on markers and validate data
const mapAssertions = (list) => {
  cy.get('div[class*="Marker__Wra"]').should('have.length', list.length);
  // Wait untill zoom button loads, here no api calls happening so
  // We have to give timeout option before cy.get resolves

  cy.get('button[title="Zoom in"]').click({ force: true, timeout: 10000 });
  cy.get('div[class*="Marker__Wra"]').each((marker) => {
    cy.wrap(marker).find('svg').click({ force: true });
  });

  cy.get('div[class*="Marker__"]').each((marker) => {
    cy.wrap(marker).find('svg').click({ force: true })
      .invoke('text')
      .then(() => {
        let textFound = false;
        cy.get('h5').invoke('text').then((title) => {
          title = title.replace(/ +(?= )/g, '').trim();
          list.forEach((dataObj) => {
            if (title.includes(dataObj.attributes.name.replace(/ +(?= )/g, '').trim())) {
              textFound = true;
            }
          });
          expect(textFound).to.be.true;
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

const checkForPresenceOfMarkers = () => {
  openMapView();
  cy.get('div[class*="Marker__"]').then((markers) => {
    expect(markers.length).to.greaterThan(0);
  });
  closeMapView();
};


const genericMarkerNavigation = () => {
  openMapView();
  const urlData = [];
  // cy.get('div[class*="Marker__Wra"]').should('have.length', list.length);
  cy.get('div[class*="Marker__"]').each((marker) => {
    cy.wrap(marker).find('svg').click({ force: true });
  });
  // Wait untill zoom button loads, here no api calls happening so
  // We have to give timeout option before cy.get resolves
  cy.get('button[title="Zoom in"]').click({ force: true, timeout: 10000 });
  cy.get('div[class*="Marker__"]').each((marker, markersIndex, markers) => {
    cy.wrap(marker).find('svg').click({ force: true })
      .then(() => {
        cy.get("a[href*='map']")
          .find('h5').then((element) => {
            const communityName = element.text().split('.')[1].replace(/ +(?= )/g, '').trim();
            cy.wrap(element).parents('a').then((aTags) => {
              urlData.push({
                url: aTags[0].href,
                title: communityName,
              });
              if (markersIndex === markers.length - 1) {
                navigateAndCheckTitles(urlData);
              }
            });
          });
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
    genericMarkerNavigation();
  } else {
    mapAssertions(list);
  }
};

const resultCheck = (currentList) => {
  if (currentList.length) {
    checkPopulationOfList(currentList);
  } else {
    validateNoResultCheck();
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
    cy.intercept('GET', '**/search?**').as('searchRequest');
    cy.intercept('GET', '**/search/searchpage?filter**').as('searchResults');
  });
  let currentList = [];
  let totalResultCount = 0;


  responsive(() => {
    it('Check for near by cities links ', () => {
      cy.intercept('GET', '**/events/new*').as('getEvent');
      cy.visit('/');
      cy.waitForPageViewEvent();
      cy.get('a[class*="CommunitiesByCity"]').then((cityCards) => {
        expect(cityCards.length).to.eql(30);
      });
    });

    it('Navigate to city search page', () => {
      toSearchPage(searchText);
      // Url check
      cy.url().should('have.string', urlCity);
      cy.wait('@searchResults').then((res) => {
        const responseBody = res.response.body;
        if (responseBody.data && responseBody.data.length) {
          currentList = responseBody.data;
          totalResultCount = responseBody.meta['filtered-count'];
        }
      });
    });

    it('Title check', () => {
      cy.contains(`Senior Living Communities in ${cityName}`);
    });

    it('Filter section check', () => {
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
      mapCheck(currentList, 'Markers');
    });
  });
});

// ! Second Set
describe('Search Page Sections', () => {
  let currentList = [];
  let totalResultCount = 0;
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.intercept('GET', '**/search/searchpage?filter**').as('searchResults');
    cy.intercept('GET', '**/search?**').as('searchRequest');
    cy.intercept('GET', '**platform/geo-guides?**').as('geoGuide');
  });

  responsive((viewport) => {
    it('Navigate to search page', () => {
      cy.intercept('GET', '**/events/new*').as('getEvent');
      cy.visit('/');
      cy.waitForPageViewEvent();
      toSearchPage(searchText);
      // Url check
      cy.url().should('have.string', urlCity);
      cy.wait('@searchResults').then((res) => {
        const responseBody = res.response.body;
        if (responseBody.data && responseBody.data.length) {
          currentList = responseBody.data;
          totalResultCount = responseBody.meta['filtered-count'];
        }
      });
    });

    it('Care types explanation check', () => {
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
      validateChangeInResultSet(totalResultCount);
      clearMoreFilter(FilterNames.MoreFilters, MoreFilters.CareServices, viewport);
    });

    it('More Filter Check - Fitness and beauty salon', () => {
      applyMoreFilter(FilterNames.MoreFilters, MoreFilters.NonCareservices, [MoreFilters.NonCareservices.FitnessPrograms], viewport);
      cy.wait(1000);
      applyMoreFilter(FilterNames.MoreFilters, MoreFilters.CommunitySpace, [MoreFilters.CommunitySpace.BeautySalon], viewport, 1).then((apiData) => {
        resultCheck(apiData);
        clearMoreFilter(FilterNames.MoreFilters, MoreFilters.NonCareservices, viewport);
      });
    });
    it('check list', () => {
      checkPopulationOfList(currentList);
    });
    it('map check', () => {
      mapCheck(currentList, 'CONTENT');
    });


    it('Navigate to page 2', () => {
      cy.get('div[class*="Pagination"]').find('button').contains('2').click({ force: true });
      cy.wait('@searchResults').then((res) => {
        const responseBody = res.response.body;
        if (responseBody.data && responseBody.data.length) {
          currentList = responseBody.data;
          totalResultCount = responseBody.meta['filtered-count'];
        }
      });
    });

    it('check contents of page 2', () => {
      // Here wait untill second list populates
      cy.contains('a article h3', '21.');
      checkPopulationOfList(currentList);
    });

    it('map check - page 2', () => {
      mapCheck(currentList, 'CONTENT');
    });
  });
});


//! Third Set

describe('Assisted Search Page Sections', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.intercept('GET', '**/search/searchpage?filter**').as('searchResults');
    cy.intercept('GET', '**/uuid-actions').as('postUuidActions');
  });

  responsive(() => {
    it('Navigate to search page', () => {
      cy.intercept('GET', '**/events/new*').as('getEvent');
      cy.visit('/');
      cy.waitForPageViewEvent();
      toSearchPageFromCity('San Francisco');
    });

    it('List population check', () => {
      genericCheckPopulationOfList();
    });

    it('map check', () => {
      checkForPresenceOfMarkers();
    });

    // it('Geo Guide', () => {
    //   cy.get('h2')
    //     .contains('Getting Ready to Move to Assisted Living')
    //     .should('exist');
    //   cy.get('h2')
    //     .contains('Costs Associated with Assisted Living')
    //     .should('exist');
    //   cy.get('h2')
    //     .contains('Comparing Assisted Living to Other Care communities')
    //     .should('exist');
    // });

    it.skip('Navigate from map popover', () => {
      mapCheck([], 'MARKER_NAVIGATION');
    });
  });
});

