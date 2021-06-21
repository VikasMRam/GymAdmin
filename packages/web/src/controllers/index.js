import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { object, func, string, bool } from 'prop-types';

import { randomHexNumber } from 'sly/web/services/helpers/utils';
import { set, unset, reset } from 'sly/web/store/controller/actions';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

const makeDispatches = (dispatch, actionCreators) => Object.entries(actionCreators)
  .reduce((acc, [key, actionCreator]) => {
    acc[key] = (...args) => dispatch(actionCreator(...args));
    return acc;
  }, {});

// TODO: tests
export function connectController(parentMapStateToProps, parentDispatchToProps) {
  if (typeof parentDispatchToProps === 'function' && parentDispatchToProps.length > 1) {
    throw new Error('dispatchToProps should not use ownProps');
  }

  return function controllerCreator(WrappedComponent) {
    const generatedControllerKey = `${WrappedComponent.name}_${randomHexNumber()}`;

    const mapDispatchToProps = (dispatch) => {
      return makeDispatches(dispatch, {
        ...parentDispatchToProps,
        set,
        unset,
        reset,
      });
    };

    const mapStateToProps = (state, ownProps) => {
      const controllerKey = ownProps.controllerKey || generatedControllerKey;
      const controller = get(state, ['controller', controllerKey]) || {};
      const props = {
        ...ownProps,
        controllerKey,
        controller,
      };
      return {
        ...props,
        ...parentMapStateToProps(state, {
          ...props,
        }),
      };
    };

    @connect(mapStateToProps, mapDispatchToProps)
    class ConnectedController extends React.Component {
      static displayName = `controller(${getDisplayName(WrappedComponent)})`;
      static WrappedComponent = WrappedComponent.WrappedComponent || WrappedComponent;

      static propTypes = {
        useLocalStorage: bool,
        defaultData: object,
        set: func.isRequired,
        controllerKey: string.isRequired,
        unset: func.isRequired,
        reset: func.isRequired,
      };

      componentDidMount() {
        let { defaultData } = this.props;
        const { useLocalStorage, controllerKey } = this.props;
        if (useLocalStorage) {
          defaultData = JSON.parse(localStorage.getItem(controllerKey));
        }
        if (defaultData) {
          this.set(defaultData);
        }
      }

      set = (data) => {
        const { set, controllerKey, useLocalStorage } = this.props;
        if (useLocalStorage) {
          const currentData = JSON.parse(localStorage.getItem(controllerKey) || '{}');
          localStorage.setItem(controllerKey, JSON.stringify({ ...currentData, ...data }));
        }
        return set({
          data,
          controller: controllerKey,
        });
      };

      unset = (data) => {
        const { unset, controllerKey } = this.props;
        return unset({
          data,
          controller: controllerKey,
        });
      };

      resetController = () => {
        const { reset, controllerKey } = this.props;
        return reset({
          controller: controllerKey,
        });
      };

      render() {
        return (
          <WrappedComponent
            {...this.props}
            set={this.set}
            unset={this.unset}
            resetController={this.resetController}
          />
        );
      }
    }

    hoistNonReactStatic(ConnectedController, WrappedComponent);

    return ConnectedController;
  };
}
