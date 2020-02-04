import {
    doCustomPricingTalkToAdvisorFlow,
    doCustomPricingExploreAffordableOptionsFlow,
} from '../../helpers/customPricing';
import { assertUserActionsForGetAvailability } from '../../helpers/userActions';
import { responsive, select, waitForHydration } from '../../helpers/tests';
import { TEST_COMMUNITY } from '../../constants/community';
import randomUser from '../../helpers/randomUser';


describe('Sending Referral to Agent', () => {
    responsive(() => { 
        it('Creating Lead - Lead Conversion on Get Pricing flow', () => {
            const communitySlug = TEST_COMMUNITY
            cy.visit(`/assisted-living/california/san-francisco/${communitySlug}`);
            waitForHydration(cy.get('button[kind*="jumbo"]').contains('Get')).click();
    
            waitForHydration(cy.get('div').contains('1 - 3 months')).click();
            waitForHydration(cy.get('div').contains('Medication management')).click();
            waitForHydration(cy.get('div').contains(/^No$/)).click();
    
            waitForHydration(cy.get('button[kind*="jumbo"]').contains('Continue')).click();
    
            waitForHydration(cy.get('form input[name="name"]')).type('Julene Test Lead');
            waitForHydration(cy.get('form input[name="phone"]')).type('4155432123');
    
            waitForHydration(cy.get('button[kind*="jumbo"]').contains('Continue')).click();
            cy.wait(1000);
    
        });
    });



    it('Creating Lead - Lead Conversion on Get Pricing flow', () => {
        const communitySlug = TEST_COMMUNITY
        cy.visit(`/assisted-living/california/san-francisco/${communitySlug}`);
        waitForHydration(cy.get('button[kind*="jumbo"]').contains('Get Pricing')).click();

        waitForHydration(cy.get('div').contains('1 - 3 months')).click();
        waitForHydration(cy.get('div').contains('Medication management')).click();
        waitForHydration(cy.get('div').contains(/^No$/)).click();

        waitForHydration(cy.get('button[kind*="jumbo"]').contains('Continue')).click();

        waitForHydration(cy.get('form input[name="name"]')).type('Julene Test Lead');
        waitForHydration(cy.get('form input[name="phone"]')).type('4155432123');

        waitForHydration(cy.get('button[kind*="jumbo"]').contains('Continue')).click();
        cy.wait(1000);

    });

//     it('Logging in to Admin Account', () => {
//         cy.visit('/dashboard/agent/my-families/new');
//         waitForHydration(cy.get('form input[name="emailOrPhone"]')).type('julene@seniorly.com');
//         waitForHydration(cy.get('button').contains('Continue')).click();

//         waitForHydration(cy.get('form input[type="password"]')).type('julene123');
//         waitForHydration(cy.get('button').contains('Log in')).click();
//         cy.wait(1000);
    
//     }); 
    
//     // it('Creating New Family', () => {
//     //     cy.contains('Add family').click();
        
//     //     cy.get('form input[name="name"]').type('Julene Test');
//     //     cy.get('form input[name="phone"]').type('5555555555');
//     //     cy.get('form input[class*=SearchBox__SearchTextBox]').type('San Francisco, CA, USA');
//     //     cy.get('form select[name="source"]').select('Direct Call').should('have.value', 'Direct Call')
//     //     waitForHydration(cy.get('button').contains('Create')).click();

//     // });

//     it('Send Referral', () => {
//         cy.reload();
//         waitForHydration(cy.get('table').find('tbody').find('tr a[class*="Link__StyledLink"]').first()).click(); 
//         cy.get('div[class*="Tabs__Wrapper"]').find('li a[class*="Link__StyledLink"]').contains('Agents').click();
//         waitForHydration(cy.get('button').contains('Search for agents')).click();
//         waitForHydration(cy.get('div input[placeholder="Search by name"]')).type('Test Agent Profile');
//         waitForHydration(cy.get('div button[type="submit"]')).click();
//         waitForHydration(cy.get('div[class*="DashboardAgentReferralSearch__StyledDashboardAdminReferralAgentTile"]').first()).click('right');
//         waitForHydration(cy.get('form').find('textarea')).type('This is a message');
//         waitForHydration(cy.get('button').contains('Send Referral')).click();
//         cy.wait(2000);
//     })

//     it('Logging in to Agent Account', () => {
//         waitForHydration(cy.get('div[class*="Header__SeniorlyIconMenu"]')
//             .find('div[class*="Header__OnlyInTablet"]')
//             .find('a span[data-cy="logo"]')
//             .find('svg'))
//             .click({force: true});

//         waitForHydration(cy.get('span[data-cy="menu"]')).click({force: true});
//         waitForHydration(cy.get('a').contains('Log Out')).click();
//         cy.wait(1000);

//         waitForHydration(cy.get('span[data-cy="menu"]')).click({force: true});
//         waitForHydration(cy.get('div[class*="Header__HeaderMenu"]').find('a[class*="Link__Anchor"]').contains('Sign in')).click();

//         waitForHydration(cy.get('form input[name="emailOrPhone"]')).type('stephanie.marie.filas+providerseconduseragent@gmail.com');
//         waitForHydration(cy.get('button').contains('Continue')).click();
//         waitForHydration(cy.get('form input[type="password"]')).type('seniorly1');
//         waitForHydration(cy.get('button').contains('Log in')).click();
//         cy.wait(1000);
//     }) 

//     it('Accepting Referral', () => {
//         waitForHydration(cy.get('span[data-cy="menu"]')).click({force: true});
//         cy.get('div[class*="Header__HeaderMenu"]').find('a[class*="Link__StyledLink"]').contains('My Families').click();
//         cy.wait(1000);
//         cy.reload();

//         waitForHydration(cy.get('form input[name="emailOrPhone"]')).type('stephanie.marie.filas+providerseconduseragent@gmail.com');
//         waitForHydration(cy.get('button').contains('Continue')).click();
//         waitForHydration(cy.get('form input[type="password"]')).type('seniorly1');
//         waitForHydration(cy.get('button').contains('Log in')).click();
//         waitForHydration(cy.get('table').find('tbody').get('tr a[class*="Link__StyledLink"]').first()).click();
//         waitForHydration(cy.get('button[class*="Button__StyledButton"]').contains('Accept and contact this family')).click({force: true});
//         cy.wait(1000);
//         waitForHydration(cy.get('button[class*="Button__StyledButton"]').contains('Continue to family details')).click({force: true});
//         cy.wait(1000);
//     })

});
