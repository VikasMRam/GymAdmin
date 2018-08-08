import React from 'react';
import { node, bool, func, oneOf } from 'prop-types';
import styled, { css, injectGlobal } from 'styled-components';
import ReactModal from 'react-modal';
import { palette, key } from 'styled-theme';
import { ifProp, withProp, switchProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import IconButton from 'sly/components/molecules/IconButton';

injectGlobal`
  body.ReactModal__Body--open {
    overflow: hidden;
  }
`;

const overlayStyles = css`
  position: fixed;
  // for old browsers
  background-color: ${palette('slate', 0)};
  background-color: ${palette('slate', 0)}e5;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: ${key('zIndexes.modal.overlay')};
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
  padding: ${size('spacing.xLarge')};
  width: 100%;
  height: 100%;
  height: unset;
  top: calc(50% );
  left: calc(50% );
  right: auto;
  bottom: auto;
  margin: 1rem calc(-50% ) 1rem 1rem;
  max-height: calc(100% );
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xxxLarge')};
  };

  ${switchProp('layout', {
    single: css`
      overflow: auto;
      border-radius: ${size('spacing.small')};
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        width: ${size('modal.single')};
      }`,
    searchBox: css`
      // same as single without overflow auto
      border-radius: ${size('spacing.small')};
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        width: ${size('modal.single')};
      }`,
    gallery: css`
      padding: 0;
      border-radius: ${size('spacing.small')};
      @media screen and (min-width: ${size('breakpoint.laptop')}) {
        width: ${size('modal.gallery')};
        overflow: initial;
      }`,
    sidebar: css`
      top: 0;
      left: 0;
      margin: 0;
      height: 100%;
      max-height: 100%;
      padding: ${size('spacing.xLarge')};
      width: 100%;
      overflow: auto;
      @media screen and (min-width: ${size('breakpoint.mobile')}) {
        width: auto;
      }
    `,
    wizard: css`
      padding: 0!important;
      overflow: hidden;
      border-radius: ${size('spacing.small')};
      height: 90%;
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        width: ${size('modal.single')};
      }
    `,
  })}
`;

const StyledReactModal = styled(({ className, ...props }) => (
  <ModalBox overlayClassName={className} closeTimeoutMS={250} {...props} />
))`${overlayStyles};`;

const Heading = styled.div`
  padding-bottom: ${size('spacing.xLarge')};
  padding: 0;
  position: fixed;
  left: ${size('spacing.xLarge')};
  top: ${size('spacing.large')};
  z-index: ${key('zIndexes.modal.galleryLayoutHeading')};
`;

export default class Modal extends React.Component {
  static propTypes = {
    layout: oneOf(['single', 'gallery', 'sidebar', 'searchBox', 'wizard']).isRequired,
    heading: node,
    children: node,
    closeable: bool,
    onClose: func.isRequired,
    transparent: bool,
    closeButtonPalette: oneOf(['white', 'slate']),
  };

  static defaultProps = {
    layout: 'single',
    transparent: false,
    closeButtonPalette: 'white',
  };

  componentDidMount() {
    ReactModal.setAppElement(document.getElementById('app'));
  }

  render() {
    const {
      heading, children, closeable, layout, onClose, transparent, closeButtonPalette,
    } = this.props;
    const iconClose = (
      <IconButton
        icon="close"
        iconOnly
        layout={layout}
        onClick={onClose}
        palette={closeButtonPalette}
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
          {(closeable || heading) && (
            <Heading layout={layout}>
              {closeable && iconClose}
              {heading}
            </Heading>
          )}
          {/* apply centering css positioning only to modal content as in gallery
              layout the close button should be fixed at screen top left corner */}
          <ModalContext layout={layout} transparent={transparent}>
            {children}
          </ModalContext>
        </StyledReactModal>
      </div>
    );
  }
}
