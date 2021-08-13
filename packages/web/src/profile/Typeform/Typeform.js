import React, { memo, useCallback } from 'react';
import { Widget, Sidetab } from '@typeform/embed-react';
import { useHistory } from 'react-router';
import { func,  string } from 'prop-types';

import SlyTypeformPopupButton from './SlyTypeformPopupButton/SlyTypeformPopupButton';

import { Block } from 'sly/common/system';
import { useAuth, useQuery, useUser } from 'sly/web/services/api';
import { normJsonApi } from 'sly/web/services/helpers/jsonApi';
import { useChatbox } from 'sly/web/services/chatbox/ChatBoxContext';
import { getUUID } from 'sly/web/services/events/helpers';


const WizardTypeWrapper = (props) => {
  const { user } = useUser();
  const { wizardType, formId, onSubmit, popupButtonName, onReadyHandler, onQuestionChangedHandler } = props;
  const { setDisableChatBot } = useChatbox();
  const { location } = useHistory();

  const customOnReadyHandler = () => {
    setDisableChatBot(true);
    if (onReadyHandler) {
      onReadyHandler();
    }
  };

  const popupButtonCloseHandler = () => {
    setDisableChatBot(false);
  };

  const hiddenFields = { ...props, page: location.pathname };
  if (user) {
    hiddenFields.logged_in = true;
  } else {
    hiddenFields.logged_in = false;
  }
  hiddenFields.uuid = getUUID();

  if (wizardType === 'POPUP_BUTTON') {
    return (
      <SlyTypeformPopupButton
        id={formId}
        onSubmit={onSubmit}
        style={{ width: '100%', height: '100%', padding: '0', border: 'none' }}
        popupButtonName={popupButtonName}
        popupButtonCloseHandler={popupButtonCloseHandler}
        onReady={customOnReadyHandler}
        hidden={hiddenFields}
      />
    );
  } else if (wizardType === 'WIDGET') {
    return <Widget id={formId} onReady={customOnReadyHandler}  hidden={hiddenFields} onSubmit={onSubmit} onQuestionChanged={onQuestionChangedHandler} style={{ width: '100%', height: '100%' }} />;
  } else if (wizardType === 'SIDE_TAB') {
    return <Sidetab id={formId} onReady={customOnReadyHandler}  hidden={hiddenFields} onSubmit={onSubmit} onQuestionChanged={onQuestionChangedHandler} />;
  }
  return null;
};

WizardTypeWrapper.propTypes = {
  wizardType: string.isRequired,
  formId: string.isRequired,
  onSubmit: func.isRequired,
  popupButtonName: string,
  onReadyHandler: func,
  onQuestionChangedHandler: func,
  layout: string,
  sendEvent: func,
};

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const SlyTypeform = (props) => {
  const { onSubmitHandler, formId } = props;
  const { createOrUpdateUser, user } = useAuth();
  const isClientside = (typeof window !== 'undefined');
  const getTypeformDetails = useQuery('getTypeformResponseDetails');
  const getTypeformDetailsCall = (formId, responseId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const typeformDetails = await getTypeformDetails({ 'filter[form]': formId, 'filter[response]': responseId });
        resolve(typeformDetails);
      } catch (err) {
        reject(err);
      }
    });
  };

  const getTypeformDetailsWithRetry = async (retryLimit, formId, responseId, retriesCount = 0) => {
    return new Promise((resolve, reject) => {
      getTypeformDetailsCall(formId, responseId).then((res) => {
        resolve(res);
      }, (err) => {
        console.log('err', err);
        if (retriesCount < retryLimit) {
          delay(500).then(async () => {
            const res = await getTypeformDetailsWithRetry(retryLimit, formId, responseId, retriesCount + 1);
            resolve(res);
          });
        } else {
          reject(err);
        }
      });
    });
  };


  const onSubmit = useCallback(async (e) => {
    const { response_id: responseId } = e;
    if (responseId) {
      try {
        const res = await getTypeformDetailsWithRetry(5, formId, responseId);
        const re = normJsonApi(res);
        const email = re.email;
        const name = re.name;
        const phone = re.phoneNumber;
        await createOrUpdateUser({
          name,
          phone,
          email,
        });
      } catch (err) {
        console.log(err);
      }
    }
    if (onSubmitHandler) {
      onSubmitHandler();
    }
  }, [createOrUpdateUser]);

  return (
    <>
      {
        isClientside &&
        <Block height="100%">
          <WizardTypeWrapper
            onSubmit={onSubmit}
            {
              ...props
            }
          />
        </Block>
      }
    </>
  );
};

SlyTypeform.propTypes = {
  onSubmitHandler: func,
  formId: string,
};

export default memo(SlyTypeform);
