import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';

import { ASSESSMENT, REQUEST_CALLBACK } from 'sly/services/api/actions';
import { CONCIERGE } from 'sly/constants/modalType';

import SlyEvent from '../services/helpers/events';

import ConciergeControllerContainer, {
  ConciergeController,
  CONVERSION_FORM,
  EXPRESS_CONVERSION_FORM,
  ADVANCED_INFO,
  WHAT_NEXT,
} from './ConciergeController';

jest.mock('../services/helpers/events');

describe('ConciergeController', () => {
  const mockStore = configureStore();
  const initStore = (props={}, conciergeProps={}) => mockStore({
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
        }
      }
    }
  };

  const entities = { userAction };
  const avdInfoSentEntities = { userAction: avdInfoSentUserAction };
  const emailOnlyEntities = { userAction: onlyEmailUserAction };

  const spy = jest.fn();
  const setQueryParams = jest.fn();

  const childProps = () => spy.mock.calls.pop()[0];

  beforeEach(() => {
    spy.mockClear();
  });

  // Logic to get Data from controller for Asserting
  //
  // const getControllerAction = store => {
  //   const { payload, ...lastAction } = store.getActions().pop();
  //   expect(lastAction.type).toBe('controller/SET');
  //   expect(payload.controller.indexOf('ConciergeController')).toBe(0);
  //   return payload.data;
  // };
  //
  // USAGE :
  //   expect(getControllerAction(store)).toEqual({
  //   currentStep: CONVERSION_FORM,
  // });

  describe('Container', () => {
    const wrap = (community, store) => shallow(
      <ConciergeControllerContainer
        community={community}
        store={store}
        children={spy}
        queryParams={{}}
        setQueryParams={setQueryParams}
      />
    ).dive().dive();

    it('should pass default values', () => {
      const store = initStore({ resource, entities });
      wrap(community, store);
      const { currentStep } = childProps().concierge;
      expect(setQueryParams).not.toBeCalled();
      expect(currentStep).toBe(CONVERSION_FORM);
    });

    it('should know when a community has been converted', () => {
      const store = initStore({ resource, entities });

      wrap(community, store);
      expect(childProps().concierge.contactRequested).toBe(true);

      wrap(otherCommunity, store);
      expect(childProps().concierge.contactRequested).toBe(false);
    });

    //TODO REENABLE
    // it('should go to express conversion when express mode', () => {
    //   const store = initStore({ resource, entities: emailOnlyEntities });
    //   const wrapper = wrap(otherCommunity, store);
    //   wrapper.instance().next(true);
    //   expect(getControllerAction(store)).toEqual({
    //     currentStep: EXPRESS_CONVERSION_FORM,
    //     modalIsOpen: true,
    //   });
    // });

    it('should go to conversion form mode when express mode', () => {
      const store = initStore({ resource, entities: emailOnlyEntities });
      const wrapper = wrap(otherCommunity, store);
      wrapper.instance().next(true);
      expect(setQueryParams).toBeCalledWith({ modal: CONCIERGE, currentStep: CONVERSION_FORM });
    });

    it('should not shortcircuit to thankYou when in express mode', () => {
      const store = initStore({ resource, entities });
      const wrapper = wrap(community, store);
      wrapper.instance().next(true);
      expect(setQueryParams).toBeCalledWith({ modal: CONCIERGE, currentStep: ADVANCED_INFO });
    });
  });

  describe('Controller', () => {
    const sendEvent = jest.fn();
    const events = {
      sendEvent,
    };

    const lastEvent = () => sendEvent.mock.calls[
      sendEvent.mock.calls.length - 1
    ][0];

    SlyEvent.getInstance.mockImplementation(() => events);

    let promise;
    const submit = jest.fn().mockImplementation(() => promise);
    const lastSubmit = () => submit.mock.calls.pop()[0];
    const lastSubmitResult = () => submit.mock.results.pop()[0];

    const set = jest.fn();
    const lastSet = () => set.mock.calls.pop()[0];

    beforeEach(() => {
      sendEvent.mockRestore();
      set.mockClear();
    });

    const setPricingEvent = {
      action: 'click',
      category: 'getPricing',
      label: 'my-community',
    };

    const advancedInfoData = {
      message: 'MESSAGE',
      user: 'USER',
    };

    const wrap = (props={}) => shallow(
      <ConciergeController
        {...props}
        set={set}
        children={spy}
        queryParams={{}}
        setQueryParams={setQueryParams}
      />
    );

    it('should prompt the user if is not converted', () => {
      wrap({ userDetails: avdInfoSentUserAction.xx.attributes.userDetails,
        community, concierge: { advancedInfoSent: true } });
      childProps().getPricing();
      expect(lastEvent()).toEqual(setPricingEvent);
      expect(setQueryParams).toBeCalledWith({ modal: CONCIERGE, currentStep: CONVERSION_FORM });
    });

    it('should ask for advanced info when explicitly called', () => {
      wrap({ community, userDetails: {}, concierge: {} });
      childProps().gotoAdvancedInfo();
      expect(setQueryParams).toBeCalledWith({ modal: CONCIERGE, currentStep: ADVANCED_INFO });
    });

    it('should ask for conversionForm', () => {
      wrap({ userDetails: {}, community, concierge: {
        contactRequested: true,
      }});
      childProps().getPricing();
      expect(lastEvent()).toEqual(setPricingEvent);
      expect(setQueryParams).toBeCalledWith({ modal: CONCIERGE, currentStep: CONVERSION_FORM });
    });

    it('should show thank you', () => {
      wrap({
        userDetails: avdInfoSentUserAction.xx.attributes.userDetails,
        community,
        concierge: {
          contactRequested: true,
          advancedInfoSent: true,
        }
      });
      childProps().getPricing();
      expect(lastEvent()).toEqual(setPricingEvent);
      expect(setQueryParams).toBeCalledWith({ modal: CONCIERGE, currentStep: CONVERSION_FORM });
    });

    //TODO REENABLE

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

    it('should submit conversion', () => {
      const wrapper = wrap({
        community,
        submit,
        concierge: {}
      });
      const instance = wrapper.instance();
      instance.next = jest.fn();
      const then = jest.fn();
      promise = { then };
      const data = { data: 'DATA' };

      childProps().submitRegularConversion(data);

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
      expect(lastEvent()).toEqual({
        action: 'contactCommunity',
        category: 'requestConsultation',
        label: 'my-community',
      });

      expect(lastSubmit()).toEqual({
        action: 'LEAD/REQUEST_CONSULTATION',
        value: {
          user: { data: 'DATA' },
          propertyIds: [ 'my-community' ],
        },
      });

      then.mock.calls.pop()[0]();
      expect(instance.next).toHaveBeenCalledWith(false);
    });

    it('should submit express conversion', () => {
      const wrapper = wrap({
        community,
        submit,
        concierge: {}
      });
      const instance = wrapper.instance();
      instance.next = jest.fn();
      const then = jest.fn();
      promise = { then };
      const data = { data: 'DATA' };

      childProps().submitExpressConversion(data);

      expect(lastEvent()).toEqual({
        action: 'contactCommunity',
        category: 'requestAvailability',
        label: 'my-community',
      });

      expect(lastSubmit()).toEqual({
        action: 'LEAD/REQUEST_AVAILABILITY',
        value: {
          user: { data: 'DATA' },
          propertyIds: [ 'my-community' ],
        },
      });

      then.mock.calls.pop()[0]();
      expect(instance.next).toHaveBeenCalledWith(true);
    });

    it('should submit advanced info', () => {
      const wrapper = wrap({ community, submit, concierge: {} });
      const instance = wrapper.instance();
      instance.next = jest.fn();
      const then = jest.fn();
      promise = { then };
      childProps().submitAdvancedInfo(advancedInfoData);
      expect(lastSubmit()).toEqual({
        action: ASSESSMENT,
        value: {
          message: 'MESSAGE',
          propertyIds: ['my-community'],
          user: { user: 'USER' },
        }
      });
      then.mock.calls.pop()[0]();
      expect(instance.next).toHaveBeenCalledWith(false);
    });
  });
});
