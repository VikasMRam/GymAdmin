import React from 'react';
import { node, bool, func, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import ReactModal from 'react-modal';
import { ifProp, switchProp } from 'styled-tools';
import Helmet from 'react-helmet';

import { size, palette, key } from 'sly/web/components/themes';
import IconButton from 'sly/web/components/molecules/IconButton';
import NewModal from 'sly/web/components/atoms/NewModal';
import ModalGlobalStyles from 'sly/web/components/molecules/Modal/ModalGlobalStyles';


const closeButtonOutsideLayouts = ['gallery', 'fullScreen'];
const bottomCloseButtonLayouts = ['bottomDrawer'];
const noPaddingLayouts = ['noPadding', 'wizard', 'bottomDrawer', 'eBook', 'noPaddingWithOverflow'];

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
    bottomDrawer: css`transform: translate(-50%, 0%);`,
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
    noPaddingWithOverflow: css`
      overflow: visible;
    `,
    fullScreen: css`
      width: 100%!important;
      border-radius: 0!important;
      max-height: 100%;
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
    bottomDrawer: css`
      width: 100%!important;
      bottom: 0;
      top: auto;
    `,
  })}
`;

const fixedHeadStyles = css`
  padding: 0;
  position: fixed;
  left: ${size('spacing.large')};
  top: ${size('spacing.large')};
  z-index: ${key('zIndexes.modal.galleryLayoutHeading')};`;

const absoluteHeadStyles = css`
  position: absolute;`;

const Head = styled.div`
  padding: ${size('spacing.large')};
  padding-bottom: 0;
  text-align: right;

  ${switchProp('layout', {
    fullScreen: fixedHeadStyles,
    gallery: fixedHeadStyles,
    eBook: absoluteHeadStyles,
  })}
`;

const Body = styled.div`
  padding: ${ifProp('noPadding', 0, size('spacing.xxLarge'))};
  padding-top: 0;

${switchProp('layout', {
    wizard: css`
    height: 100%;`,
  })}
`;

const BottomIconClose = styled.div`
  float: right;
  margin: ${size('spacing.large')};
`;

const Modal = ({
  children, closeable, layout, onClose, isOpen, ...props
}) => {
  const noPadding = noPaddingLayouts.includes(layout) || closeButtonOutsideLayouts.includes(layout);
  const iconClose = (palette = 'slate') => (
    <IconButton
      icon="close"
      iconSize="regular"
      palette={palette}
      transparent
      layout={layout}
      onClick={onClose}
    />
  );

  if (isOpen && layout === 'letsmovetothismodaltypealltheothermodals') {
    return (
      <NewModal onClose={onClose}>
        {children}
      </NewModal>
    );
  }

  return (
    <StyledReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      layout={layout}
      onClose={onClose}
      {...props}
    >
      <Helmet>
        <style type="text/css">{ModalGlobalStyles}</style>
      </Helmet>
      {(closeable && closeButtonOutsideLayouts.includes(layout) && !bottomCloseButtonLayouts.includes(layout)) && (
        <Head layout={layout}>
          {iconClose('white')}
        </Head>
      )}
      <ModalContext layout={layout}>
        {(closeable && !closeButtonOutsideLayouts.includes(layout) && !bottomCloseButtonLayouts.includes(layout)) && (
          <Head layout={layout}>
            {iconClose(layout === 'eBook' ? 'white' : 'slate')}
          </Head>
        )}
        <Body noPadding={noPadding} layout={layout}>
          {children}
        </Body>
        {closeable && bottomCloseButtonLayouts.includes(layout) &&
          <BottomIconClose>
            {iconClose()}
          </BottomIconClose>
        }
      </ModalContext>
    </StyledReactModal>
  );
};

Modal.propTypes = {
  layout: oneOf(['letsmovetothismodaltypealltheothermodals', 'default', 'fullScreen', 'gallery', 'sidebar', 'wizard', 'searchBox', 'noPadding', 'bottomDrawer', 'eBook', 'noPaddingWithOverflow']).isRequired,
  children: node,
  isOpen: bool,
  closeable: bool,
  onClose: func.isRequired,
};

Modal.defaultProps = {
  layout: 'default',
};

export default Modal;
