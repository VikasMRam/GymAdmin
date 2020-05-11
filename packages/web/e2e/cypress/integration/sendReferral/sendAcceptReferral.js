import { responsive, waitForHydration } from '../../helpers/tests';
import { TEST_COMMUNITY } from '../../constants/community';


describe('Sending Referral to Agent', () => {
  responsive(() => {
    it('Creating Lead - Lead Conversion on Get Pricing flow', () => {
      cy.visit(`/assisted-living/california/san-francisco/${TEST_COMMUNITY}`);

      cy.get('button').then(($a) => {
        if ($a.text().includes('Get Pricing')) {
          cy.contains('Get Pricing')
            .click({ force: true }).wait(200);
          waitForHydration(cy.get('div').contains('1 - 3 months')).click();
          waitForHydration(cy.get('div').contains('Medication management')).click();
          waitForHydration(cy.get('div').contains(/^No$/)).click();

          waitForHydration(cy.get('button[kind*="jumbo"]').contains('Continue')).click();
          waitForHydration(cy.get('form input[name="name"]')).type('Julene Test Lead');
          waitForHydration(cy.get('form input[name="phone"]')).type('4155432123');
          waitForHydration(cy.get('form input[name="email"]')).type('julene+testlead@seniorly.com');

          waitForHydration(cy.get('button[kind*="jumbo"]').contains('Continue')).click();
          cy.wait(1000);
        } else if ($a.text().includes('Get Help Now')) {
          cy.get('form select[type="select"]').select('Get Detailed Pricing');
          cy.contains('Get Help Now')
            .click({ force: true });
          waitForHydration(cy.get('div').contains('1 - 3 months')).click();
          waitForHydration(cy.get('div').contains('Medication management')).click();
          waitForHydration(cy.get('div').contains(/^No$/)).click();

          waitForHydration(cy.get('button[kind*="jumbo"]').contains('Continue')).click();
          waitForHydration(cy.get('form input[name="name"]')).type('Julene Test Lead');
          waitForHydration(cy.get('form input[name="phone"]')).type('4155432123');

          waitForHydration(cy.get('button[kind*="jumbo"]').contains('Continue')).click();
          cy.wait(1000);
        }
      });
    });

    it('Logging in to Admin Account', () => {
      cy.visit('/dashboard/agent/my-families/new');
      waitForHydration(cy.get('form input[name="emailOrPhone"]')).type('julene@seniorly.com');
      waitForHydration(cy.get('button').contains('Continue')).click();

      waitForHydration(cy.get('form input[type="password"]')).type('julene123');
      waitForHydration(cy.get('button').contains('Log in')).click();
      cy.wait(1000);

      waitForHydration(cy.get('table').find('tbody').find('tr a[class*="Link__StyledLink"]').first()).click();
      cy.get('div[class*="Tabs__Wrapper"]').find('li a[class*="Link__StyledLink"]').contains('Agents').click();

      cy.get('button').then(($a) => {
        if ($a.text().includes('Search for agents')) {
          cy.contains('Search for agents')
            .click({ force: true });
          waitForHydration(cy.get('div input[placeholder="Search by name"]')).type('Tier 1 Agent A');
          waitForHydration(cy.get('div button[type="submit"]')).click();
          waitForHydration(cy.get('div[class*="DashboardAgentReferralSearch__StyledDashboardAdminReferralAgentTile"]').first()).click('right');
          waitForHydration(cy.get('form').find('textarea')).type('This is a message');
          waitForHydration(cy.get('button').contains('Send Referral')).click();
          cy.wait(2000);
        } else if ($a.text().includes('Send a new referral')) {
          cy.contains('Send a new referral')
            .click({ force: true });
          waitForHydration(cy.get('div input[placeholder="Search by name"]')).type('Tier 1 Agent A');
          waitForHydration(cy.get('div button[type="submit"]')).click();
          waitForHydration(cy.get('div[class*="DashboardAgentReferralSearch__StyledDashboardAdminReferralAgentTile"]').first()).click('right');
          waitForHydration(cy.get('form').find('textarea')).type('This is a message');
          waitForHydration(cy.get('button').contains('Send Referral')).click();
          cy.wait(2000);
        }
      });
    });
    it('Logging in to Agent Account', () => {
      waitForHydration(cy.get('div[class*="Header__SeniorlyIconMenu"]')
        .find('div[class*="Header__OnlyInTablet"]')
        .find('a span[data-cy="logo"]')
        .find('svg'))
        .click({ force: true });

      waitForHydration(cy.get('span[data-cy="menu"]')).click({ force: true });
      waitForHydration(cy.get('a').contains('Log Out')).click();
      cy.wait(1000);

      waitForHydration(cy.get('span[data-cy="menu"]')).click({ force: true });
      waitForHydration(cy.get('div[class*="Header__HeaderMenu"]').find('a[class*="Link__Anchor"]').contains('Sign in')).click();

      waitForHydration(cy.get('form input[name="emailOrPhone"]')).type('sushanthr+2020tier1a@seniorly.com');
      waitForHydration(cy.get('button').contains('Continue')).click();
      waitForHydration(cy.get('form input[type="password"]')).type('tier1aagent');
      waitForHydration(cy.get('button').contains('Log in')).click();
      cy.wait(1000);
    });

    it('Accepting Referral', () => {
      waitForHydration(cy.get('span[data-cy="menu"]')).click({ force: true });
      cy.get('div[class*="Header__HeaderMenu"]').find('a[class*="Link__StyledLink"]').contains('My Families').click();
      cy.wait(1000);
      cy.reload();

      waitForHydration(cy.get('form input[name="emailOrPhone"]')).type('sushanthr+2020tier1a@seniorly.com');
      waitForHydration(cy.get('button').contains('Continue')).click();
      waitForHydration(cy.get('form input[type="password"]')).type('tier1aagent');
      waitForHydration(cy.get('button').contains('Log in')).click();
      waitForHydration(cy.get('table').find('tbody').get('tr a[class*="Link__StyledLink"]').first()).click();
      waitForHydration(cy.get('button[class*="Button__StyledButton"]').contains('Accept and contact this family')).click({ force: true });
      cy.wait(1000);
      waitForHydration(cy.get('button[class*="Button__StyledButton"]').contains('Continue to family details')).click({ force: true });
      cy.wait(1000);
    });
  });
});
