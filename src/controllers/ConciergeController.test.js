import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';

import { ASSESSMENT, REQUEST_CALLBACK } from 'sly/services/api/actions';

import SlyEvent from '../services/helpers/events';

import ConciergeControllerContainer, {
  ConciergeController,
  CONVERSION_FORM,
  ADVANCED_INFO,
  THANKYOU,
} from './ConciergeController';

jest.mock('../services/helpers/events');

describe('ConciergeController', function() {
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
        userDetails: {},
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

  const entities = { userAction };
  const avdInfoSentEntities = { userAction: avdInfoSentUserAction };

  const spy = jest.fn();

  const childProps = () => spy.mock.calls.pop()[0];

  beforeEach(() => {
    spy.mockClear();
  });

  describe('Container', () => {
    const wrap = (community, store) => shallow(
      <ConciergeControllerContainer
        community={community}
        store={store}
        children={spy} />
    ).dive().dive();

    it('should pass default values', () => {
      const store = initStore({ resource, entities });
      wrap(community, store);
      const { modalIsOpen, currentStep } = childProps().concierge;
      expect(modalIsOpen).toBe(false);
      expect(currentStep).toBe(CONVERSION_FORM);
    });

    it('should know when a community has been converted', () => {
      const store = initStore({ resource, entities });

      wrap(community, store);
      expect(childProps().concierge.callbackRequested).toBe(true);

      wrap(otherCommunity, store);
      expect(childProps().concierge.callbackRequested).toBe(false);
    });

    it('should know when advancedInfo has been sent', () => {
      wrap(community, initStore({ resource, entities: avdInfoSentEntities }));
      expect(childProps().concierge.advancedInfoSent).toBe(true);

      wrap(community, initStore({ resource, entities }));
      expect(childProps().concierge.advancedInfoSent).toBe(false);
    });
  });
  
  describe('Controller', () => {
    const set = jest.fn();
    const lastSet = () => set.mock.calls.pop()[0];

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

    beforeEach(() => {
      set.mockClear();
      sendEvent.mockRestore();
    });

    const setPricingEvent = {
      action: 'submit',
      category: 'requestavailability',
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
      />
    );

    it('should prompt the user if is not converted', () => {
      wrap({ community, concierge: {} });
      childProps().getPricing();
      expect(lastEvent()).toEqual(setPricingEvent);
      expect(lastSet()).toEqual({
        currentStep: CONVERSION_FORM,
        modalIsOpen: true,
      });
    });

    it('should ask for advancedInfo', () => {
      wrap({ community, concierge: {
        callbackRequested: true,
      }});
      childProps().getPricing();
      expect(lastEvent()).toEqual(setPricingEvent);
      expect(lastSet()).toEqual({
        currentStep: ADVANCED_INFO,
        modalIsOpen: true,
      });
    });

    it('should show thank you', () => {
      wrap({ community, concierge: {
        callbackRequested: true,
        advancedInfoSent: true,
      }});
      childProps().getPricing();
      expect(lastEvent()).toEqual(setPricingEvent);
      expect(lastSet()).toEqual({
        currentStep: THANKYOU,
        modalIsOpen: true,
      });
    });

    it('should submit conversion', () => {
      let wrapper = wrap({
        expressConversionMode: false,
        community,
        submit,
        concierge: {}
      });

      const then = jest.fn();
      promise = { then };

      const data = { data: 'DATA' };
      
      childProps().submitConversion(data);
    
      expect(lastEvent()).toEqual({
        action: 'contactCommunity',
        category: 'requestCallback',
        label: 'my-community',
      });
      
      expect(lastSubmit()).toEqual({
        action: 'LEAD/REQUEST_CALLBACK',
        value: {
          user: { data: 'DATA' },
          propertyIds: [ 'my-community' ],
        },
      });

      expect(then).toHaveBeenCalledWith(wrapper.instance().next);
    });

    it('should submit conversion in express mode and when callback is not requested', () => {
      let wrapper = wrap({
        expressConversionMode: true,
        community,
        submit,
        concierge: { callbackRequested: false }
      });

      const then = jest.fn();
      promise = { then };

      const data = { data: 'DATA' };
      
      childProps().submitConversion(data);
    
      expect(lastEvent()).toEqual({
        action: 'contactCommunity',
        category: 'requestCallback',
        label: 'my-community',
      });
      
      expect(lastSubmit()).toEqual({
        action: 'LEAD/REQUEST_CALLBACK',
        value: {
          user: { data: 'DATA' },
          propertyIds: [ 'my-community' ],
        },
      });

      expect(then).toHaveBeenCalledWith(wrapper.instance().next);
    });

    it('should not submit conversion when in express mode and when callback was sent', () => {
      let wrapper = wrap({
        expressConversionMode: true,
        community,
        submit,
        concierge: { callbackRequested: true }
      });

      wrapper.instance().next = jest.fn();
      wrapper.update();

      const then = jest.fn();
      promise = { then };

      const data = { data: 'DATA' };
      
      childProps().submitConversion(data);
    
      expect(lastEvent()).toEqual({
        action: 'contactCommunity',
        category: 'requestCallback',
        label: 'my-community',
      });

      expect(submit).not.toHaveBeenCalled();
      
      expect(then).not.toHaveBeenCalled();
      expect(wrapper.instance().next).toHaveBeenCalled();
    });

    it('should submit advanced info', () => {
      const wrapper = wrap({ community, submit, concierge: {} });
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
      expect(then).toHaveBeenCalledWith(wrapper.instance().next);
    });

  });
});