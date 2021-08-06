import React, { memo } from 'react';
import { Widget, PopupButton, Sidetab } from '@typeform/embed-react';
import styled from 'styled-components';

import { Block, Button } from 'sly/common/system';
import { useAuth, withAuth, normalizeResponse, useQuery } from 'sly/web/services/api';
import { normJsonApi } from 'sly/web/services/helpers/jsonApi';


const wizardTypeWarpper = (props, onSubmit) => {
  const { wizardType, formId, onReadyHandler, onQuestionChangedHandler, onSubmitHandler, popupButtonName } = props;
  if (wizardType === 'WIDGET') {
    return <Widget id={formId} onReady={onReadyHandler} onSubmit={onSubmit} onQuestionChanged={onQuestionChangedHandler} style={{ width: '100%', height: '100%' }} />;
  } else if (wizardType === 'POPUP_BUTTON') {
    return <PopupButton id={formId} onReady={onReadyHandler} onSubmit={onSubmit} onQuestionChanged={onQuestionChangedHandler} style={{ width: '100%', height: '100%', padding: '0', border: 'none' }}><Button width="100%">{popupButtonName}</Button></PopupButton>;
  } else if (wizardType === 'SIDE_TAB') {
    return <Sidetab id={formId} onReady={onReadyHandler} onSubmit={onSubmit} onQuestionChanged={onQuestionChangedHandler} />;
  }
};


const SlyTypeform = (props) => {
  const { formId, onReadyHandler, onQuestionChangedHandler, onSubmitHandler } = props;
  const { createOrUpdateUser, user } = useAuth();
  const isClientside = (typeof window !== 'undefined');
  const getTypeformDetails = useQuery('getTypeformResponseDetails');
  const onSubmit = async (e) => {
    const { response_id } = e;
    if (response_id) {
      console.log('response_id', response_id);
      console.log('formId', formId);
      try {
        const res = await getTypeformDetails({ 'filter[form]': formId, 'filter[response]': response_id });
        const re = normJsonApi(res);
        const email = re.email;
        const name = re.name;
        const phone = re.phoneNumber;
        const userCreationRes = await createOrUpdateUser({
          name,
          phone,
          email,
        });
        console.log(userCreationRes);
      } catch (err) {
        console.log(err);
      }
    }
    if (onSubmitHandler) {
      onSubmitHandler();
    }
  };

  const widgetComponent  = wizardTypeWarpper(props, onSubmit);


  return (

    <>
      {
        isClientside &&  <Block height="100%"> {widgetComponent} </Block>
      }
      {
        // isClientside &&  <Block height="100%"><Widget
        //   id="dH3EjYYx"
        //   style={{ width: '100%', height: '100%' }}
        //   onReady={() => {
        //   console.log('form ready');
        // }}
        //   onQuestionChanged={(e) => {
        //   console.log('question change', e);
        // }}
        //   onSubmit={(e) => {
        //   console.log('submit', e);
        // }}
        // />
        // </Block>

        // isClientside &&  <Block height="100%"><PopupButton
        //   id="dH3EjYYx"
        //   style={{ width: '100%', height: '100%' }}
        //   onReady={() => {
        //   console.log('form ready');
        // }}
        //   onQuestionChanged={(e) => {
        //   console.log('question change', e);
        // }}
        //   onSubmit={(e) => {
        //   console.log('submit', e);
        // }}
        // >
        //   click to open form in popup
        // </PopupButton>
        // </Block>

        // isClientside &&  <Block height="100%"><Sidetab
        //   id="dH3EjYYx"
        //   style={{ width: '100%', height: '100%' }}
        //   onReady={() => {
        //   console.log('form ready');
        // }}
        //   onQuestionChanged={(e) => {
        //   console.log('question change', e);
        // }}
        //   onSubmit={(e) => {
        //   console.log('submit', e);
        // }}
        //   buttonText="click to open"
        // />
        // </Block>
      }

    </>
  );
};

export default memo(SlyTypeform);
