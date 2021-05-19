import { responsive } from '../../helpers/tests';
import { toSearchPage, toSearchPageFromCity } from '../../helpers/navigation';
import {
  CommunityTypes,
  SizeFilters,
  PriceFilter,
  MoreFilters,
  FilterNames,
} from '../../constants/SearchFilters';
import {
  applyGenericFilter,
  clearGenericTypeFilter,
  checkPopulationOfList,
  checkForListCount,
  checkForTitle,
  validateNoResultCheck,
  applyMoreFilter,
  validateChangeInResultSet,
  mapCheck,
} from '../../helpers/searchFlow';

// / <reference types="Cypress" />

describe('Search Page', () => {
  let currentList = [];
  responsive(() => {
    it('Check for near by cities links ', () => {
      cy.visit('/');
      cy.server();
      cy.route('GET', '**/search?**').as('searchRequest');

      it('Near by cities link check', () => {
        cy.visit('/');
        cy.get('a[class*="CommunitiesByCity"]').then((cityCards) => {
          expect(cityCards.length).to.eql(30);
        });
      });
    });

    it('Navigate to city search page', () => {
      cy.server();
      cy.route({
        method: 'GET',
        url: '**/platform/community-search?filter**',
      }).as('communitySearch');
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
      cy.contains('Senior Living Communities in San Francisco', {
        timeout: 5000,
      });
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
  // eslint-disable-next-line no-undef
  before(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '**/platform/community-search?filter**',
    }).as('communitySearch');
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
    cy.server();
    cy.route({
      method: 'GET',
      url: '**/platform/community-search?filter**',
    }).as('communitySearch');

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
  // eslint-disable-next-line no-undef
  before(() => {
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
