import React from 'react';
import pick from 'lodash/pick';
import { func, bool } from 'prop-types';

import { useQuery } from 'sly/web/services/api';
import clientPropType from 'sly/common/propTypes/client';
import UpdateStageQuestionnaireForm from 'sly/web/dashboard/families/updateStageQuestionnaireWizard/UpdateStageQuestionnaireForm';


const UpdateStageQuestionnaireContainer = ({ client, refetchClient, hideModal, withInitialValues = false }) => {
  const updateUuidAux = useQuery('updateUuidAux');
  const { uuidAux: { uuidInfo: rawUuidAux, id }, uuid, clientInfo: { name } } =  client;

  // TODO:  make it reuseable
  const assignConditionalField = (result) => {
    if (result.housingInfo.lookingFor === 'Other') {
      const data = Object.assign({}, result);
      data.housingInfo.lookingFor = result.housingInfo.other;
      delete data.housingInfo.other;
      return data;
    }
    return result;
  };

  const handleSubmit = (result) => {
    const data = assignConditionalField(result);
    const payload = {
      id,
      attributes: {
        uuid,
        uuidInfo: Object.assign(rawUuidAux, data),
      },
      type: 'UUIDAux',
    };
    const clientPromise = () => refetchClient();

    updateUuidAux({ id }, payload)
      .then(clientPromise)
      .then(hideModal);
  };
  const initialValues = pick(
    rawUuidAux,
    [
      'housingInfo.lookingFor',
      'housingInfo.moveTimeline',
      'housingInfo.typeCare',
      'referralInfo.leadMedium',
      'referralInfo.leadExpectation',
      'referralInfo.leadStage',
      'referralInfo.leadQuality',
    ],
  );

  return (
    <UpdateStageQuestionnaireForm
      initialValues={withInitialValues ? initialValues : {}}
      handleSubmit={handleSubmit}
      hideModal={hideModal}
      name={name}
    />
  );
};

UpdateStageQuestionnaireContainer.propTypes = {
  client: clientPropType,
  refetchClient: func,
  hideModal: func,
  withInitialValues: bool,

};

export default UpdateStageQuestionnaireContainer;
