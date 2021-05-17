import { CommunityTypes } from "./../constants/community";
import { waitForHydration } from "./tests";

//* List Logics

// Accepts list data (Array of json) and validates,
// if a card with each json object is rendered in Ui or not
export const checkPopulationOfList = data => {
  cy.get("a article picture")
    .parents("article")
    .each((item, index) => {
      cy.wrap(item)
        .invoke("text")
        .then(text => {
          let textFound = false;
          data.forEach(dataObj => {
            if (text.includes(dataObj["attributes"]["name"])) {
              textFound = true;
            }
          });
          expect(textFound).to.be.true;
        });
    });
};

// Validates expected list count to renered list count
export const checkForListCount = count => {
  cy.get("a article img").then(elements => {
    expect(elements.length).to.eql(count);
  });
};

// Accepts array of text and validates that each text should be present in all list items
export const checkForListText = arrayOfText => {
  cy.get("a article picture")
    .parents("article")
    .each((item, index) => {
      cy.wrap(item)
        .invoke("text")
        .then(text => {
          let textFound = false;
          arrayOfText.forEach(listText => {
            if (text.includes(listText)) {
              textFound = true;
            }
          });
          expect(textFound).to.be.true;
        });
    });
};

//* Filter Logics

//Accepts name of the filter, and clicks it.
const applyFilter = text => {
  waitForHydration(cy.get('div[class*="FilterButton"]').contains(text)).click();
};

export const applyGenericFilter = (filterName, selectionTypes) => {
  applyFilter(filterName); // Click on filter
  cy.wait(300);

  // Select the choices
  selectionTypes.forEach(communityType => {
    let searchText = communityType.uiText;
    cy.get('label[class*="FilterChoice"]')
      .contains(searchText)
      .click();
  });

  cy.wait(500);

  // Click on Save button
  cy.get("button")
    .contains("Save")
    .click();

  cy.wait(500);

  // wait for filter applied to reflect in UI
  waitForHydration(
    cy.get('div[class*="FilterButton"]').contains(selectionTypes[0].uiText)
  );
  cy.wait(1000);
};

export const clearGenericTypeFilter = (filterName, selectionValue) => {
  applyFilter(selectionValue); // Click on filter
  cy.wait(500);
  cy.get("button") // Click on clear all
    .contains("Clear all")
    .click();
  cy.wait(500);
  cy.get("button")
    .contains("Save")
    .click({ force: true });
  cy.wait(500);
  waitForHydration(cy.get('div[class*="FilterButton"]').contains(filterName));
};

export const applyMoreFilter = (filterName, selectionTypes) => {
  applyFilter(filterName);
  selectionTypes.forEach(communityType => {
    let searchText = communityType.uiText;
    cy.get('label[class*="FilterChoice"]')
      .contains(searchText)
      .click();
  });
  cy.wait(1000);
  cy.get("button")
    .contains("Save")
    .click();

  cy.log("Save Button Clicked");
  cy.wait(1000);
  waitForHydration(cy.get('span[class*="FilterButton__Number"]').eq(1));
  cy.wait(1000);
};

//* Result Set Logics

// Accepts previous result count , and validate if present and previous count are different
export const validateChangeInResultSet = previousResultCount => {
  cy.get("div")
    .contains("results")
    .invoke("text")
    .then(text => {
      let textCount = parseFloat(text);
      expect(textCount != Number(previousResultCount));
    });
};

// Accepts count, and check it matches with present result count
export const validateResultSetCount = count => {
  cy.get("div")
    .contains("results")
    .invoke("text")
    .then(text => {
      let textCount = parseFloat(text);
      expect(Number(textCount)).to.eql(count);
    });
};

export const validateNoResultCheck = () => {
  cy.get("h3")
    .contains("No results")
    .should("exist");
};

export const checkForTitle = titleText => {
  cy.get("h1").contains(titleText);
};

//* Map Logics

export const mapCheck = (list, mode) => {
  // Check if is map view filter button present or not
  // If it is present then click that button else continue assertions
  cy.get('div[class*="FilterButton"]').each(filterButton => {
    cy.wrap(filterButton)
      .invoke("text")
      .then(text => {
        if (text.includes("Map") && filterButton.is(":visible")) {
          cy.wrap(filterButton).click();
        }
      });
  });
  if (mode == "Markers") {
    countMapMarkers(list);
  } else {
    mapAssertions(list);
  }
};

// Accepts list's data, and check no of markers equal to list length
// Click on markers and validate data
export const mapAssertions = list => {
  cy.get('button[class*="gm-control"]', { timeout: 50000 }).then(element => {
    cy.get('div[class*="Marker__"]').each((marker, index) => {
      cy.wait(200);
      waitForHydration(cy.wrap(marker).find("svg")).click({ force: true });
      cy.wrap(marker)
        .invoke("text")
        .then(text => {
          cy.get("h3")
            .contains(list[index]["attributes"]["name"])
            .should("exist");
        });
    });
  });
  closeMapView();
};
export const countMapMarkers = list => {
  cy.get('button[class*="gm-control"]', { timeout: 50000 }).then(element => {
    cy.get('div[class*="Marker__"]').then(markers => {
      expect(list.length).to.eql(markers.length);
    });
  });
  closeMapView();
};

export const closeMapView = () => {
  // check if map button is present in filter buttons
  cy.get('div[class*="FilterButton"]').each(filterButton => {
    cy.wrap(filterButton)
      .invoke("text")
      .then(text => {
        if (text.includes("List")) {
          cy.wrap(filterButton).click();
        }
      });
  });
};
