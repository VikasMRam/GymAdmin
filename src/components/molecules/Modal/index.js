import React from 'react';
import { node, bool, func, oneOf } from 'prop-types';
import styled, { css, injectGlobal } from 'styled-components';
import ReactModal from 'react-modal';
import { ifProp, switchProp } from 'styled-tools';

import { size, palette, key } from 'sly/components/themes';
import IconButton from 'sly/components/molecules/IconButton';

injectGlobal`
  body.ReactModal__Body--open {
    overflow: hidden;
  }
`;

const ModalBox = styled(ReactModal)`
  outline: none;

  > article {
    transition: transform ${key('transitions.slow.inOut')};
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

const StyledReactModal = styled(({ className, ...props }) => (
  <ModalBox overlayClassName={className} closeTimeoutMS={250} {...props} />
))`
  position: fixed;
  // for old browsers
  background-color: ${palette('slate', 'base')};
  background-color: ${palette('slate', 'base')}e5;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: ${key('zIndexes.modal.overlay')};
  transition: opacity ${key('transitions.slow.inOut')};
  opacity: 0;
  &[class*='after-open'] {
    opacity: 1;
  }
  &[class*='before-close'] {
    opacity: 0;
  }
`;

const ModalContext = styled.article`
  background-color: ${palette('white', 'base')};
  color: ${palette('slate', 'base')};
  position: absolute;
  display: flex;
  flex-direction: column;
  outline: none;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  overflow: auto;
  max-height: calc(100% - ${size('spacing.small')});
  border-radius: ${size('spacing.small')};
  width: calc(100% - ${size('spacing.xxLarge')});
  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    width: ${size('layout.col4')};
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col6')};
  }

  ${switchProp('layout', {
    searchBox: css`
      // same as single without overflow auto
      overflow: visible;
    `,
    gallery: css`
      background-color: transparent;
      max-height: 100%;
      width: calc(100% - ${size('spacing.large')})!important;
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        width: ${size('layout.col10')}!important;
        overflow: initial;
      }`,
    sidebar: css`
      top: 0;
      left: 0;
      margin: 0;
      border-radius: 0;
      height: 100%;
      max-height: 100%;
      width: 100%;
      overflow: auto;
      display: block;
      @media screen and (min-width: ${size('breakpoint.mobile')}) {
        width: auto;
      }
    `,
    wizard: css`
      overflow: hidden;
      height: 90%;
    `,
  })}
`;

const Head = styled.div`
  padding: ${size('spacing.large')};

${switchProp('layout', {
    gallery: css`
      padding: 0;
      position: fixed;
      left: ${size('spacing.large')};
      top: ${size('spacing.large')};
      z-index: ${key('zIndexes.modal.galleryLayoutHeading')};`,
  })}
`;

const Body = styled.div`
  padding: ${ifProp('noPadding', 0, size('spacing.xxLarge'))};
  padding-top: 0;
`;

const Modal = ({
  children, closeable, layout, onClose, noPadding, ...props
}) => {
  const iconClose = (palette = 'slate') => (
    <IconButton
      icon="close"
      palette={palette}
      iconOnly
      layout={layout}
      onClick={onClose}
    />
  );

  return (
    <StyledReactModal
      onRequestClose={onClose}
      layout={layout}
      onClose={onClose}
      {...props}
    >
      {(closeable && layout === 'gallery') && (
        <Head layout={layout}>
          {closeable && iconClose('white')}
        </Head>
      )}
      <ModalContext layout={layout}>
        {(closeable && layout !== 'gallery') && (
          <Head layout={layout}>
            {closeable && iconClose()}
          </Head>
        )}
        <Body noPadding={noPadding || layout === 'gallery'}>
          {children}
        </Body>
      </ModalContext>
    </StyledReactModal>
  );
};

Modal.propTypes = {
  layout: oneOf(['default', 'gallery', 'sidebar', 'wizard', 'searchBox']).isRequired,
  children: node,
  closeable: bool,
  onClose: func.isRequired,
  noPadding: bool,
};

Modal.defaultProps = {
  layout: 'default',
  noPadding: false,
};

export default Modal;
