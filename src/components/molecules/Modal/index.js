import React from 'react';
import { node, bool, func, oneOf } from 'prop-types';
import styled, { css, injectGlobal } from 'styled-components';
import ReactModal from 'react-modal';
import { palette } from 'styled-theme';
import { ifProp, withProp, switchProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import IconButton from 'sly/components/molecules/IconButton';

const doubleModalWidth = withProp('layout', layout => size('modal', layout));

injectGlobal`
  body.ReactModal__Body--open {
    overflow: hidden;
  }
`;

const overlayStyles = css`
  position: fixed;
  background-color: ${palette('slate', 0)}e5;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9999;
  transition: opacity 250ms ease-in-out;
  opacity: 0;
  &[class*='after-open'] {
    opacity: 1;
  }
  &[class*='before-close'] {
    opacity: 0;
  }
`;

const ModalBox = styled(ReactModal)`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${ifProp('transparent', 'transparent', palette('white', 0))};
  border-radius: ${size('spacing.tiny')};
  color: ${ifProp('transparent', palette('white', 0), palette('slate', 0))};
  transition: transform 250ms ease-in-out;
  outline: none;
  padding: ${size('spacing.xxxLarge')};
  width: 100%;
  height: 100%;
  height: unset;
  top: calc(50% - 1rem);
  left: calc(50% - 1rem);
  right: auto;
  bottom: auto;
  margin: 1rem calc(-50% + 1rem) 1rem 1rem;
  transform: translate(-50%, 100%);
  max-height: calc(100% - 1rem);
  &[class*='after-open'] {
    transform: translate(-50%, -50%);
  }
  &[class*='before-close'] {
    transform: translate(-50%, 100%);
  }

  ${switchProp('layout', {
    single: css`
      overflow: auto;
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        width: ${size('modal.single')};
      }
    `,
    double: css`
      overflow: auto;
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        width: ${size('modal.single')};
      }

      @media screen and (min-width: ${size('breakpoint.doubleModal')}) {
        padding: 0;
        flex-direction: row;
        width: ${doubleModalWidth};
        overflow: unset;
      }`,
    gallery: css`
      padding: 0;
      overflow: auto;
      @media screen and (min-width: ${size('breakpoint.laptop')}) {
        width: ${doubleModalWidth};
        overflow: initial;
      }
    `,
  })}
`;

const StyledReactModal = styled(({ className, ...props }) => (
  <ModalBox overlayClassName={className} closeTimeoutMS={250} {...props} />
))`${overlayStyles};`;

const CloseButton = styled(IconButton)`
  ${switchProp('layout', {
    double: css`@media screen and (min-width: ${size('breakpoint.doubleModal')}) {
      margin-bottom: ${size('spacing.xLarge')};
    }`,
  })}
`;

const Heading = styled.div`
  width: 100%;
  padding-bottom: ${size('spacing.xLarge')};
  ${switchProp('layout', {
    double: css`@media screen and (min-width: ${size('breakpoint.doubleModal')}) {
      padding: ${size('spacing.xxxLarge')};
      width: ${size('modal.single')};
    }`,
    gallery: css`
      padding: 0;
      position: fixed;
      left: ${size('spacing.xLarge')};
      top: ${size('spacing.large')};
      z-index: 10000;`,
  })}
`;

const Content = styled.div`
  ${switchProp('layout', {
    double: css`@media screen and (min-width: ${size('breakpoint.doubleModal')}) {
      padding: ${size('spacing.xxxLarge')};
      width: ${size('modal.single')};
      overflow: auto;
    }`,
  })}
`;

export default class Modal extends React.Component {
  static propTypes = {
    layout: oneOf(['single', 'double', 'gallery']).isRequired,
    heading: node,
    children: node,
    closeable: bool,
    onClose: func.isRequired,
    transparent: bool,
  };

  static defaultProps = {
    layout: 'single',
    transparent: false,
  };

  componentDidMount() {
    ReactModal.setAppElement(document.getElementById('app'));
  }

  render() {
    const {
      heading, children, closeable, layout, onClose, transparent,
    } = this.props;
    const iconClose = (
      <CloseButton
        icon="close"
        iconOnly
        layout={layout}
        onClick={onClose}
        palette={transparent ? 'white' : 'slate'}
      />
    );

    return (
      <div>
        {(closeable || heading) && (layout === 'gallery') && (
          <Heading layout={layout}>
            {closeable && iconClose}
            {heading}
          </Heading>
        )}
        <StyledReactModal
          onRequestClose={onClose}
          layout={layout}
          transparent={transparent}
          onClose={onClose}
          {...this.props}
        >
          {(closeable || heading) && (layout !== 'gallery') && (
            <Heading layout={layout}>
              {closeable && iconClose}
              {heading}
            </Heading>
          )}
          <Content layout={layout}>
            {children}
          </Content>
        </StyledReactModal>
      </div>
    );
  }
}
