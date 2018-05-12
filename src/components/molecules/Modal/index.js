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
  background-color: ${ifProp('transparent', 'transparent', palette('white', 0))};
  outline: none;

  > article {
    transition: transform 250ms ease-in-out;
    transform: translate(-50%, 100%);
  }
  &[class*='after-open'] > article {
    transform: translate(-50%, -50%);
    ${switchProp('layout', {
      sidebar: css`transform: translate(0%, 0%);`,
    })};
  }
  &[class*='before-close'] > article {
    transform: translate(-50%, 100%);
  }
`;

const ModalContext = styled.article`
  background-color: ${ifProp('transparent', 'transparent', palette('white', 0))};
  color: ${ifProp('transparent', palette('white', 0), palette('slate', 0))};
  position: absolute;
  display: flex;
  flex-direction: column;
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
  max-height: calc(100% - 1rem);
  overflow: auto;

  ${switchProp('layout', {
    single: css`
      border-radius: ${size('spacing.small')};
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        width: ${size('modal.single')};
      }`,
    double: css`
      border-radius: ${size('spacing.small')};
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
      border-radius: ${size('spacing.small')};
      @media screen and (min-width: ${size('breakpoint.laptop')}) {
        width: ${doubleModalWidth};
        overflow: initial;
      }`,
    sidebar: css`
      top: 0;
      left: 0;
      width: auto;
      margin: 0;
      height: 100%;
      max-height: 100%;
      padding: ${size('spacing.xLarge')};
    `,
  })}
`;

const StyledReactModal = styled(({ className, ...props }) => (
  <ModalBox overlayClassName={className} closeTimeoutMS={250} {...props} />
))`${overlayStyles};`;

const CloseButton = styled(IconButton)`
  ${switchProp('layout', {
    double: css`@media screen and (min-width: ${size('breakpoint.doubleModal')}) {
      margin-bottom: ${size('spacing.xxLarge')};
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
    sidebar: css`
      padding-bottom: ${size('spacing.regular')};
    `,
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
    layout: oneOf(['single', 'double', 'gallery', 'sidebar']).isRequired,
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
        <StyledReactModal
          onRequestClose={onClose}
          layout={layout}
          transparent={transparent}
          onClose={onClose}
          {...this.props}
        >
          {(closeable || heading) && (layout === 'gallery') && (
            <Heading layout={layout}>
              {closeable && iconClose}
              {heading}
            </Heading>
          )}
          {/* apply centering css positioning only to modal content as in gallery
              layout the close button should be fixed at screen top left corner */}
          <ModalContext layout={layout} transparent={transparent}>
            {(closeable || heading) && (layout !== 'gallery') && (
              <Heading layout={layout}>
                {closeable && iconClose}
                {heading}
              </Heading>
            )}
            <Content layout={layout}>
              {children}
            </Content>
          </ModalContext>
        </StyledReactModal>
      </div>
    );
  }
}
