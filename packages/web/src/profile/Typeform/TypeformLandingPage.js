import React from 'react';
import { useLocation, useHistory  } from 'react-router';

import SlyTypeform from './Typeform';

import { Block } from 'sly/common/system';
import { parseURLQueryParams } from 'sly/web/services/helpers/url';


const TypeformLandingPage = () => {
  const { search } = useLocation();
  const history = useHistory();

  const allQueryParams = parseURLQueryParams(search);
  const { formid } = allQueryParams;

  const goToHome = () => {
    history.push('/');
  };

  const onSubmitHandler = () => {
    goToHome();
  };

  if (!formid) {
    goToHome();
  }


  return (
    <>
      <Block height="100vh">
        <SlyTypeform formId={formid} wizardType="WIDGET" onSubmitHandler={onSubmitHandler} {...allQueryParams} />
      </Block>
    </>
  );
};


export default TypeformLandingPage;
