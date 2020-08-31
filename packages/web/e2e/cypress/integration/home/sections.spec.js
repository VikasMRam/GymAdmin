import { responsive, select } from '../../helpers/tests';

describe('Community Profile Sections', () => {
  responsive(() => {
    it('Should have required components', () => {
      cy.visit('/');

      // Header should exists
      select('.Header').should('exist');

      // Main image with search box and credit should exists
      select('.ContentOverImage__Wrapper').should('exist');
      select('.ContentOverImage__StyledImage').should('exist');
      select('.HomePage__SearchBoxWrapper').should('exist');
      select('.HomePage__ImageCreditDiv').should('exist');

      // Watch Video section and Sly Phone Number should exists
      select('.HomePage__StyledSection').contains('How Seniorly Can Help You Find The Best Senior Living Options').should('exist');
      select('.HomePage__StyledSection').contains('Call us at (855) 866-4515.').should('exist');
      select('.VideoThumbnail__Wrapper').should('exist');

      // Type of Care tiles should exists
      select('.HomePage__StyledSection').contains('Discover The Best Senior Living Near You').should('exist');
      select('.DiscoverHomeTile__Wrapper').contains('Assisted Living').should('exist');
      select('.DiscoverHomeTile__Wrapper').contains('Board and Care Home').should('exist');
      select('.DiscoverHomeTile__Wrapper').contains('Luxury Assisted Living').should('exist');
      select('.DiscoverHomeTile__Wrapper').contains('Memory Care Options').should('exist');
      select('.DiscoverHomeTile__Wrapper').contains('More Senior Living').should('exist');

      // User Reviews section should exits
      select('.HomePage__StyledSection').contains('Let Us Help You Find The Best Senior Living').should('exist');
      select('.MeetOthersTile__Wrapper').contains('Sharon T.').should('exist');
      select('.MeetOthersTile__Wrapper').contains('Aileen H.').should('exist');
      select('.MeetOthersTile__Wrapper').contains('Henry W.').should('exist');
      select('.MeetOthersTile__Wrapper').each(($el) => {
        cy.wrap($el).contains('Call us at (855) 866-4515.').should('exist');
      });

      // Type of care tiles should exists
      select('.HomePage__StyledSection').contains('Useful Senior Living Resources').should('exist');
      select('.HomePage__UIColumnWrapper').get('a[href="/independent-living"]').contains('Independent Living').should('exist');
      select('.HomePage__UIColumnWrapper').get('a[href="/assisted-living"]').contains('Assisted Living').should('exist');
      select('.HomePage__UIColumnWrapper').get('a[href="/memory-care"]').contains('Memory Care').should('exist');
      select('.HomePage__UIColumnWrapper').get('a[href="/board-and-care-home"]').contains('Board and Care Home').should('exist');
      select('.HomePage__UIColumnWrapper').get('a[href="/continuing-care-retirement-community"]').contains('CCRC / Life Plan').should('exist');
      select('.HomePage__UIColumnWrapper').get('a[href="/resources"]').contains('More Resources').should('exist');

      // Most Searched Cities should exists
      select('.HomePage__StyledSection').contains('Most Searched Cities for Senior Living').should('exist');
      select('.HomePage__MSCColumnWrapper').get('a[href="/assisted-living/california/san-francisco"]').contains('San Francisco, CA').should('exist');
      select('.HomePage__MSCColumnWrapper').get('a[href="/assisted-living/california/los-angeles"]').contains('Los Angeles, CA').should('exist');
      select('.HomePage__MSCColumnWrapper').get('a[href="/assisted-living/california/san-diego"]').contains('San Diego, CA').should('exist');
      select('.HomePage__MSCColumnWrapper').get('a[href="/assisted-living/texas/dallas"]').contains('Dallas, TX').should('exist');
      select('.HomePage__MSCColumnWrapper').get('a[href="/assisted-living/florida/miami"]').contains('Miami, FL').should('exist');
      select('.HomePage__MSCColumnWrapper').get('a[href="/assisted-living/arizona/phoenix"]').contains('Phoenix, AZ').should('exist');
      select('.HomePage__MSCColumnWrapper').get('a[href="/assisted-living/florida/orlando"]').contains('Orlando, FL').should('exist');
      select('.HomePage__MSCColumnWrapper').get('a[href="/assisted-living/florida/sacramento"]').contains('Sacramento, CA').should('exist');

      // Footer should exists
      select('.Footer').should('exist');
    });
  });
});
