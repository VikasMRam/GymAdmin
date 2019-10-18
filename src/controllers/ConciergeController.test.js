import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import SlyEvent from '../services/helpers/events';

import ConciergeController, {
  CONVERSION_FORM,
  ADVANCED_INFO,
} from './ConciergeController';

import { ASSESSMENT, REQUEST_CALLBACK } from 'sly/services/api/actions';
import { CONCIERGE } from 'sly/constants/modalType';

jest.mock('../services/helpers/events');

const dig = (wrapper, name) => {
  const tries = [];
  try {
    while (wrapper.name() !== name) {
      tries.push(wrapper.name());
      wrapper = wrapper.dive();
    }
    return wrapper;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Component with name: ${name} not found in this list`, tries);
    throw e;
  }
};

const asyncMiddleware = () => next => (action) => {
  if (action.then) return action.then(next);
  return next(action);
};

describe('ConciergeController', () => {
  const mockStore = configureStore([asyncMiddleware]);
  const initStore = (props = {}, conciergeProps = {}) => mockStore({
    controller: { concierge: { ...conciergeProps } },
    ...props,
  });

  const community = {
    id: 'my-community',
    url: 'foo',
  };

  const otherCommunity = {
    id: 'other-community',
    url: 'baz',
  };

  const bees = {};

  const authenticated = {};

  const resource = {
    userAction: {
      detail: { id: 'xx' },
    },
  };

  const userAction = {
    xx: {
      attributes: {
        profilesContacted: [
          { slug: 'my-community', contactType: REQUEST_CALLBACK },
        ],
        userDetails: { email: 'xxx@xxx.xxx', fullName: 'Fonz', phone: '9087654321' },
      },
    },
  };

  const avdInfoSentUserAction = {
    xx: {
      attributes: {
        ...userAction.xx.attributes,
        userDetails: {
          typeOfCare: true,
          typeOfRoom: true,
          timeToMove: 4,
          budget: 5000,
        },
      },
    },
  };

  const onlyEmailUserAction = {
    xx: {
      attributes: {
        ...userAction.xx.attributes,
        userDetails: {
          email: 'xxx@xxx.xxx',
        },
      },
    },
  };

  const entities = { userAction };
  const emailOnlyEntities = { userAction: onlyEmailUserAction };

  const history = {
    push: jest.fn(),
  };
  const spy = jest.fn().mockReturnValue('ok');
  const setQueryParams = jest.fn();

  const childProps = () => spy.mock.calls.pop()[0];

  const createOrUpdateUser = jest.fn().mockImplementation(() => Promise.resolve());
  const createAction = jest.fn().mockImplementation(() => Promise.resolve());
  const registerUser = jest.fn().mockImplementation(() => Promise.resolve());
  const getUuidAux = jest.fn().mockImplementation(() => Promise.resolve());
  const updateUuidAux = jest.fn().mockImplementation(() => Promise.resolve());
  const api = {
    createUuidAction: createAction,
    getUuidAux,
    updateUuidAux,
  };

  beforeEach(() => {
    spy.mockClear();
    createAction.mockClear();
    updateUuidAux.mockClear();
    setQueryParams.mockClear();
    history.push.mockClear();
  });

  const userRequestInfo = {
    hasStarted: true,
    isLoading: false,

    normalized: {},
  };

  const uuidAuxRequestInfo = userRequestInfo;

  const match = { url: '/myurl' };

  const router = {
    history,
    route: {
      location: {
        pathname: '/my-url',
      },
      match: {
        url: '/my-url',
      },
    },
  };

  describe('Container', () => {
    const wrap = (communitySlug, store) => dig(shallow(
      <ConciergeController
        communitySlug={communitySlug}
        store={store}
        api={api}
        userRequestInfo={userRequestInfo}
        uuidAuxRequestInfo={uuidAuxRequestInfo}
        queryParams={{}}
        setQueryParams={setQueryParams}
        history={history}
      >
        {spy}
      </ConciergeController>, { context: { router } }), 'ConciergeController').dive();

    it('should pass default values', () => {
      const store = initStore({ bees, resource, entities, authenticated });
      wrap(community.id, store);
      const { currentStep } = childProps().concierge;
      expect(setQueryParams).not.toBeCalled();
      expect(currentStep).toBe(CONVERSION_FORM);
    });

    it('should know when a community has been converted', () => {
      const store = initStore({ bees, resource, entities, authenticated });

      wrap(community.id, store);
      expect(childProps().concierge.contactRequested).toBe(true);

      wrap(otherCommunity.id, store);
      expect(childProps().concierge.contactRequested).toBe(false);
    });

    // TODO REENABLE
    // it('should go to express conversion when express mode', () => {
    //   const store = initStore({ resource, entities: emailOnlyEntities });
    //   const wrapper = wrap(otherCommunity, store);
    //   wrapper.instance().next(true);
    //   expect(getControllerAction(store)).toEqual({
    //     currentStep: EXPRESS_CONVERSION_FORM,
    //     modalIsOpen: true,
    //   });
    // });

    it('should redirect to custom piricing wizard', () => {
      const store = initStore({ bees, resource, entities: emailOnlyEntities, authenticated });
      const wrapper = wrap(otherCommunity.id, store);
      wrapper.instance().next(true);

      expect(history.push).toBeCalledWith(`/custom-pricing/${otherCommunity.id}`);
    });

    it('should go to conversion form mode when express mode', () => {
      const store = initStore({ bees, resource, entities: emailOnlyEntities, authenticated });
      const wrapper = wrap(null, store);
      wrapper.instance().next(true);
      expect(setQueryParams).toBeCalledWith({ modal: CONCIERGE, currentStep: CONVERSION_FORM });
    });

    it('should not shortcircuit to thankYou when in express mode', () => {
      const store = initStore({ bees, resource, entities, authenticated });
      const wrapper = wrap(null, store);
      wrapper.instance().next(true);
      expect(setQueryParams).toBeCalledWith({ modal: CONCIERGE, currentStep: ADVANCED_INFO });
    });
  });

  describe('Controller', () => {
    const sendEvent = jest.fn();
    const gotoGetCustomPricing = jest.fn();
    const events = {
      sendEvent,
    };
    const lastEvent = () => sendEvent.mock.calls[
      sendEvent.mock.calls.length - 1
    ][0];

    const lastUuidPost = () => createAction.mock.calls.pop()[0];
    const lastUuidAuxUpdate = () => updateUuidAux.mock.calls.pop()[1];

    SlyEvent.getInstance.mockImplementation(() => events);

    const submit = jest.fn().mockImplementation((...args) => Promise.resolve(args));
    const lastSubmit = () => submit.mock.calls.pop()[0];

    const set = jest.fn();

    beforeEach(() => {
      sendEvent.mockRestore();
      set.mockClear();
    });

    const setPricingEvent = {
      action: 'click-gcp-button',
      category: 'PricingWizard',
      label: 'my-community',
    };

    const advancedInfoData = {
      message: 'MESSAGE',
      user: 'USER',
      type_of_care: ['none'],
      type_of_room: ['room1'],
      time_to_move: 1,
      budget: 5000,
      medicaid_coverage: false,
    };

    const status = {
      uuidAux: {
        result: {
          id: 'uuidAuxId',
          type: 'UUIDAux',
          attributes: {
            uuidInfo: {
              housingInfo: {},
              financialInfo: {},
            },
          },
        },
      },
    };

    const wrap = (props = {}) => {
      const component = shallow((
        <ConciergeController.WrappedComponent
          {...props}
          set={set}
          api={api}
          queryParams={{}}
          match={match}
          setQueryParams={setQueryParams}
          gotoGetCustomPricing={gotoGetCustomPricing}
          userRequestInfo={userRequestInfo}
          uuidAuxRequestInfo={uuidAuxRequestInfo}
          createAction={createAction}
          createOrUpdateUser={createOrUpdateUser}
          registerUser={registerUser}
          updateUuidAux={updateUuidAux}
          history={history}
          status={status}
        >
          {spy}
        </ConciergeController.WrappedComponent>
      ));

      const instance = component.instance();
      instance.next = jest.fn().mockImplementation(instance.next);

      return component;
    };

    it('should prompt the user if is not converted', async () => {
      wrap({
        userDetails: avdInfoSentUserAction.xx.attributes.userDetails,
        pathName: 'my-community',
        concierge: { advancedInfoSent: true },
      });

      await childProps().getPricing();

      expect(lastEvent()).toEqual(setPricingEvent);
      expect(setQueryParams).toBeCalledWith({ modal: CONCIERGE, currentStep: CONVERSION_FORM });
    });

    it('should ask for advanced info when explicitly called', () => {
      wrap({ communitySlug: community.id, userDetails: {}, concierge: {} });
      childProps().gotoAdvancedInfo();
      expect(setQueryParams).toBeCalledWith({ modal: CONCIERGE, currentStep: ADVANCED_INFO });
    });

    it('should ask for conversionForm', () => {
      wrap({
        userDetails: {},
        pathName: 'my-community',
        concierge: {
          contactRequested: true,
        },
      });
      childProps().getPricing();
      expect(lastEvent()).toEqual(setPricingEvent);
      expect(setQueryParams).toBeCalledWith({ modal: CONCIERGE, currentStep: CONVERSION_FORM });
    });

    it('should show thank you', () => {
      wrap({
        userDetails: avdInfoSentUserAction.xx.attributes.userDetails,
        pathName: 'my-community',
        concierge: {
          contactRequested: true,
          advancedInfoSent: true,
        },
      });
      childProps().getPricing();
      expect(lastEvent()).toEqual(setPricingEvent);
      expect(setQueryParams).toBeCalledWith({ modal: CONCIERGE, currentStep: CONVERSION_FORM });
    });

    // TODO REENABLE

    // it('should show thank you', () => {
    //   wrap({
    //     userDetails: avdInfoSentUserAction.xx.attributes.userDetails,
    //     community,
    //     concierge: {
    //       contactRequested: true,
    //       advancedInfoSent: true,
    //     }
    //   });
    //   childProps().getPricing();
    //   expect(lastEvent()).toEqual(setPricingEvent);
    //   expect(lastSet()).toEqual({
    //     currentStep: WHAT_NEXT,
    //     modalIsOpen: true,
    //   });
    // });

    it('should submit conversion', async () => {
      wrap({
        communitySlug: community.id,
        submit,
        concierge: {},
      });

      const data = { full_name: 'Fonz',  email: 'fonz@fonz.io', phone: '0987654321' };
      await childProps().submitRegularConversion(data);

      // expect(lastEvent()).toEqual({
      //   action: 'contactCommunity',
      //   category: 'requestCallback',
      //   label: 'my-community',
      // });
      //
      // expect(lastSubmit()).toEqual({
      //   action: 'LEAD/REQUEST_CALLBACK',
      //   value: {
      //     user: { data: 'DATA' },
      //     propertyIds: [ 'my-community' ],
      //   },
      // });

      expect(lastUuidPost()).toEqual({
        type: 'UUIDAction',
        attributes: {
          actionInfo: {
            name: data.full_name,
            phone: data.phone,
            email: data.email,
          },
          actionPage: '/myurl',
          actionType: 'consultationRequested',
        },
      });

      expect(lastEvent()).toEqual({
        action: 'contactCommunity',
        category: 'requestConsultation',
        label: 'my-community',
      });

      expect(lastSubmit()).toEqual({
        action: 'LEAD/REQUEST_CONSULTATION',
        value: {
          user: data,
          propertyIds: ['my-community'],
        },
      });

      expect(gotoGetCustomPricing).toHaveBeenCalled();
    });

    it('should submit conversion when community not passed', async () => {
      const wrapper = wrap({
        userDetails: avdInfoSentUserAction.xx.attributes.userDetails,
        pathName: 'blah',
        submit,
        concierge: {},
      });

      const data = { full_name: 'Fonz',  email: 'fonz@fonz.io', phone: '0987654321' };

      await childProps().submitRegularConversion(data);

      expect(lastUuidPost()).toEqual({
        type: 'UUIDAction',
        attributes: {
          actionInfo: {
            name: data.full_name,
            phone: data.phone,
            email: data.email,
          },
          actionPage: '/myurl',
          actionType: 'consultationRequested',
        },
      });

      expect(lastEvent()).toEqual({
        action: 'contactCommunity',
        category: 'requestConsultation',
        label: 'blah',
      });

      expect(lastSubmit()).toEqual({
        action: 'LEAD/REQUEST_CONSULTATION',
        value: {
          user: data,
          propertyIds: [],
        },
      });

      expect(wrapper.instance().next).toHaveBeenCalled();
    });

    it('should submit express conversion when community is passed', async () => {
      wrap({
        userDetails: avdInfoSentUserAction.xx.attributes.userDetails,
        communitySlug: community.id,
        submit,
        concierge: {},
      });

      const data = { data: 'DATA' };
      await childProps().submitExpressConversion(data);

      expect(lastEvent()).toEqual({
        action: 'contactCommunity',
        category: 'requestAvailability',
        label: 'my-community',
      });

      expect(lastSubmit()).toEqual({
        action: 'LEAD/REQUEST_AVAILABILITY',
        value: {
          user: { data: 'DATA' },
          propertyIds: ['my-community'],
        },
      });

      expect(gotoGetCustomPricing).toHaveBeenCalled();
    });

    it('should submit express conversion', async () => {
      const wrapper = wrap({
        userDetails: avdInfoSentUserAction.xx.attributes.userDetails,
        pathName: 'Blah',
        submit,
        concierge: {},
      });
      const data = { data: 'DATA' };

      await childProps().submitExpressConversion(data);

      expect(lastEvent()).toEqual({
        action: 'contactCommunity',
        category: 'requestAvailability',
        label: 'Blah',
      });

      expect(lastSubmit()).toEqual({
        action: 'LEAD/REQUEST_AVAILABILITY',
        value: {
          user: { data: 'DATA' },
          propertyIds: [],
        },
      });

      expect(wrapper.instance().next).toHaveBeenCalled();
    });

    it('should submit advanced info', async () => {
      const wrapper = wrap({ communitySlug: community.id, concierge: {} });
      wrapper.setProps({ submit });
      await childProps().submitAdvancedInfo(advancedInfoData);

      expect(lastUuidPost()).toEqual({
        type: 'UUIDAction',
        attributes: {
          actionInfo: {
            contactType: 'advancedInfo',
            notes: 'MESSAGE',
            slug: 'my-community',
          },
          actionPage: '/myurl',
          actionType: 'profileContacted',
        },
      });

      expect(lastUuidAuxUpdate()).toEqual({
        id: 'uuidAuxId',
        type: 'UUIDAux',
        attributes: {
          uuidInfo: {
            financialInfo: {
              maxMonthlyBudget: 5000,
              medicare: false,
            },
            housingInfo: {
              moveTimeline: '1',
              roomPreference: ['room1'],
              typeCare: ['none'],
            },
          },
        },
      });

      expect(lastSubmit()).toEqual({
        action: ASSESSMENT,
        value: {
          message: 'MESSAGE',
          propertyIds: ['my-community'],
          user: {
            user: 'USER',
            type_of_care: ['none'],
            type_of_room: ['room1'],
            time_to_move: 1,
            budget: 5000,
            medicaid_coverage: false,
          },
        },
      });

      expect(wrapper.instance().next).toHaveBeenCalled();
    });
  });
});
