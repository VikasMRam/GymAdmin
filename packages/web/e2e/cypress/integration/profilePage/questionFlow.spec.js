import { responsive, select, waitForHydration } from '../../helpers/tests';
import { toJson } from '../../helpers/request';
import { TEST_COMMUNITY } from '../../constants/community';

const randHash = () => Math.random().toString(36).substring(7);

describe('Ask Question Community', () => {
  let community;
  let user;

  beforeEach(() => {
    cy.server();

    if (!community) {
      cy.getCommunity(TEST_COMMUNITY).then((response) => {
        community = response;
      });
    }

    if (!user) {
      cy.fixture('user-slytest-admin').then((response) => {
        user = response;
      });
    }

    cy.request('DELETE', '/v0/platform/auth/logout');
  });

  const portal = selector => select(`.ReactModalPortal ${selector}`);

  const lastQuestion = selector => select('.CommunityQuestionAnswers__StyledButton')
    .parent()
    .get('article:first')
    .get(`${selector}`);

  const addQuestion = () => {
    cy.route('POST', '**/questions').as('postQuestions');
    cy.route('POST', '**/uuid-actions').as('postUuidActions');

    cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

    cy.wait('@postUuidActions');

    // waitForHydration(cy.get('button').contains('Ask a Question')).click();

    waitForHydration(cy.get('button[class*="CommunityQuestionAnswers__StyledButton"]').contains('Ask a Question').click());

    const questionText = `my comments ${randHash()}`;
    let questionId;

    // portal('h3').contains(`Ask your Local Senior Living Expert about services provided at ${community.name}`).should('exist');
    portal('h3').contains(`Ask our experts about ${community.name}`).should('exist');
    portal('textarea[name="question"]').type(questionText);
    portal('input[name="name"]').type('Fonz');
    portal('input[name="email"]').type('fonz@seniorly.com');
    portal('button[type="submit"]').click();

    cy.wait('@postQuestions').then(async (xhr) => {
      expect(xhr.status).to.equal(200);
      expect(xhr.requestBody).to.deep.equal({
        communitySlug: community.id,
        question: questionText,
        email: 'fonz@seniorly.com',
        name: 'Fonz',
      });
      const response = await toJson(xhr.response);
      questionId = response.data.id;
    });

    cy.wait('@postUuidActions').then((xhr) => {
      expect(xhr.requestBody).to.deep.equal({
        data: {
          type: 'UUIDAction',
          attributes: {
            actionInfo: {
              slug: community.id,
              email: 'fonz@seniorly.com',
              name: 'Fonz',
              questionId,
              questionText,
            },
            actionPage: `/assisted-living/california/san-francisco/${community.id}`,
            actionType: 'profileAskQuestion',
          },
        },
      });
    });

    portal('.Modal.Body .Thankyou').contains('A Seniorly Guide will reach out to you with local expertise and support to ensure you find the right fit for your needs. There is no cost to you!').should('exist');

    portal('.Modal__Head button').click();

    cy.wait(30000);

    cy.request('POST', '/v0/platform/auth/login', user)
      .then(() => cy.visit(`/content/${questionId}/approve`));


    cy.get('div[class*="AuthContainer__ModalBody"]').within(() => {
      cy.get('input[name="email"]').type('slytest+admin@seniorly.com');
      cy.get('input[name="password"]').type('nopassword');
      cy.get('button').contains('Log in').click();
    });


    cy.get('div').contains('Status: Success').should('exist');

    cy.request('DELETE', '/v0/platform/auth/logout');

    return {
      questionId,
      questionText,
    };
  };

  const leaveAnswer = (questionText) => {
    waitForHydration(
      select('h3')
        .contains(`Questions About ${community.name}`)
        .parent()
        .get('article')
        .contains(questionText)
        .parent()
        .next()
        .next(),
    ).click();

    const commentText = `my replay ${randHash()}`;

    portal('h3').contains('Provide an Answer').should('exist');
    portal('.CommunityLeaveAnAnswerForm__QuestionTextDiv').should('contain', questionText);
    portal('textarea[name="answer"]').type(commentText);
    portal('button[type="submit"]').click();

    return commentText;
  };

  responsive(() => {
    it('should ask a question', () => {
      const { questionText } = addQuestion();

      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      lastQuestion('div').contains(questionText).should('exist');
    });

    it('should leave an answer', () => {
      // add answer to question added in previous test
      cy.route('POST', '**/answers').as('postAnswers');
      cy.route('POST', '**/auth/login').as('postLogin');

      const { questionText } = addQuestion();

      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      let commentText = leaveAnswer(questionText);

      // guest user answer must fail and show sign in
      cy.wait('@postAnswers').then((xhr) => {
        expect(xhr.status).to.equal(401);
      });

      portal('.Modal__Head button').click();

      cy.request('POST', '/v0/platform/auth/login', user);

      commentText = leaveAnswer(questionText);

      cy.wait('@postAnswers')
        .then((xhr) => {
          expect(xhr.status).to.equal(200);
        });

      lastQuestion('div')
        .parent()
        .next()
        .should('contain', commentText);
    });
  });
});
