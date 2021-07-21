import React from 'react';
import { useLocation } from 'react-router';

import SlyTypeform from './Typeform';

import { Block } from 'sly/common/system';
import { parseURLQueryParams } from 'sly/web/services/helpers/url';


const TypeformLandingPage = (props) => {
  const { search } = useLocation();
  const { formid } = parseURLQueryParams(search);

  return (
    <>
      <Block height="100vh">
        <SlyTypeform formId={formid} wizardType="WIDGET" />
      </Block>
    </>
  );
};


export default TypeformLandingPage;
