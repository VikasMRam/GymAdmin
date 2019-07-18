import React from 'react';
import dayjs from 'dayjs';
import { func } from 'prop-types';

import {
  DoubleLineTd,
  LinkTd,
  Td,
  TextIconTd,
  TextTd,
  Tr,
} from 'sly/components/atoms/Table';
import Stage from 'sly/components/atoms/Stage';
import { getStageDetails } from 'sly/services/helpers/stage';
import { FAMILY_STATUS_ON_HOLD } from 'sly/constants/familyDetails';
import { AGENT_DASHBOARD_FAMILIES_DETAILS_PATH } from 'sly/constants/dashboardAppPaths';
import clientPropType from 'sly/propTypes/client';

const ClientRowCard = ({ client, onClientClick }) => {
  const {
    id, clientInfo, uuidAux, stage, status, createdAt, notes,
  } = client;
  const { level, palette } = getStageDetails(stage);
  const { name: clientName } = clientInfo;
  const { uuidInfo } = uuidAux;
  let residentName = '';
  if (uuidInfo) {
    const { residentInfo } = uuidInfo;
    const { fullName } = residentInfo;
    residentName = fullName;
  }
  const createdAtStr = dayjs(createdAt).format('MM/DD/YYYY');
  const disabled = status === FAMILY_STATUS_ON_HOLD;
  const to = AGENT_DASHBOARD_FAMILIES_DETAILS_PATH.replace(':id/:tab?', id);
  const lastNote = notes[0];

  return (
    <Tr>
      {/* name */}
      {disabled && (
        <TextIconTd
          to={to}
          disabled
          icon="pause"
          iconPalette="danger"
          onClick={() => onClientClick(clientName, to)}
        >
          {clientInfo.name}
        </TextIconTd>
      )}
      {!disabled && (
        <LinkTd
          to={to}
          onClick={() => onClientClick(clientName, to)}
        >
          {clientInfo.name}
        </LinkTd>
      )}

      <TextTd disabled={disabled}>{residentName}</TextTd>
      <Td disabled={disabled}>
        <Stage text={stage} currentStage={level} disabled={disabled} palette={palette} />
      </Td>

      {/* notes */}
      {lastNote && (
        <DoubleLineTd firstLine={lastNote.body} secondLine={dayjs(lastNote.createdAt).format('MM/DD/YYYY')} disabled={disabled} />
      )}
      {!lastNote && (
        <TextTd disabled={disabled} />
      )}

      <TextTd disabled={disabled}>{createdAtStr}</TextTd>
    </Tr>
  );
};

ClientRowCard.propTypes = {
  client: clientPropType.isRequired,
  onClientClick: func.isRequired,
};

export default ClientRowCard;
