import React, { useEffect, useRef, useMemo } from 'react';
import { createPopup } from '@typeform/embed';
import Helmet from 'react-helmet';
import { func, object, string } from 'prop-types';

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

  console.log(style);

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

SlyTypeformPopupButton.propTypes = {
  id: string.isRequired,
  className: string,
  style: object,
  popupButtonName: string.isRequired,
  popupButtonClickHandler: func,
  popupButtonCloseHandler: func,
  onsubmit: func,
  onSubmit: func,

};

export default SlyTypeformPopupButton;
