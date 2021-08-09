import React, { useEffect, useRef, useMemo } from 'react';
import { createPopup } from '@typeform/embed';
import Helmet from 'react-helmet';

import PopupStyles from './SlyTypeformPopupButtonStyle';

import { Button } from 'sly/common/system';

const emptyEmbed = {
  unmount: () => {},
  open: () => {},
};

const SlyTypeformPopupButton = ({ id, className, style, popupButtonName, popupButtonClickHandler, popupButtonCloseHandler, ...props }) => {
  const ref = useRef(emptyEmbed);

  useEffect(() => {
    ref.current = createPopup(id, props); // onSubmit
  }, [id, props.onSubmit]);

  useEffect(() => {
    () => ref.current.unmount();
    if (popupButtonCloseHandler) {
      popupButtonCloseHandler();
    }
  }, []);

  const handleClick = useMemo(() => () => ref.current.open(), []);

  const clickHandler = () => {
    handleClick();
    if (popupButtonClickHandler) {
      popupButtonClickHandler();
    }
  };

  return (
    <>
      <Helmet>
        <style type="text/css">{PopupStyles}</style>
      </Helmet>
      <Button onClick={clickHandler} className={className} style={style}>
        {popupButtonName}
      </Button>
    </>
  );
};

export default SlyTypeformPopupButton;
