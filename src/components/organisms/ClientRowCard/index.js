import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import { func } from 'prop-types';

import {
  Block,
  Link,
  Icon,
  Stage,
} from 'sly/components/atoms';

import {
  DoubleLineTd,
  Td,
  TextTd,
  Tr,
} from 'sly/components/atoms/Table';

import { getStageDetails } from 'sly/services/helpers/stage';
import { FAMILY_STATUS_ON_HOLD } from 'sly/constants/familyDetails';
import { AGENT_DASHBOARD_FAMILIES_DETAILS_PATH } from 'sly/constants/dashboardAppPaths';
import clientPropType from 'sly/propTypes/client';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import { size, palette } from 'sly/components/themes';
import { ifNotProp } from 'styled-tools';

const Wrapper = mobileOnly(Tr, css`
  display: flex;
  
  flex-direction: column;
  
  border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
  padding: ${size('spacing.large')};
  
  background: ${palette('white', 'base')};
  margin: ${size('spacing.large')};
`);

const NameCell = mobileOnly(({ disabled, client, ...props }) => (
  <Td disabled={disabled} {...props}>
    <Link to={AGENT_DASHBOARD_FAMILIES_DETAILS_PATH.replace(':id/:tab?', client.id)} {...props}>
      {client.clientInfo.name}
      {disabled && <Icon icon="pause" palette="danger" />}
    </Link>
  </Td>
), css`
  font-weight: ${size('weight.medium')};
  Icon {
    margin-left: ${size('spacing.large')}; 
  } 
`);

const ResidentCell = mobileOnly(TextTd, css`display: none`);

const StageCell = styled(Td)`
  order: 3; 
`;

const NoteCell = styled(({ disabled, note, ...props }) => (
  <Fragment>
    {note && (
      <DoubleLineTd firstLine={note.body} secondLine={dayjs(note.createdAt).format('MM/DD/YYYY')} disabled={disabled} {...props} />
    )}
    {!note && (
      <TextTd disabled={disabled} {...props} />
    )}
  </Fragment>
))`
  ${ifNotProp('note', css`display: none;`)}
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: table-cell; 
  } 
`;

const DateAddedCell = mobileOnly(TextTd, css`display: none`);

const ClientRowCard = ({ client, onClientClick }) => {
  const {
    clientInfo, uuidAux, stage, status, createdAt, notes,
  } = client;
  const { level, palette } = getStageDetails(stage);
  const { uuidInfo } = uuidAux;
  let residentName = '';
  if (uuidInfo) {
    const { residentInfo } = uuidInfo;
    const { fullName } = residentInfo;
    residentName = fullName;
  }
  const createdAtStr = dayjs(createdAt).format('MM/DD/YYYY');
  const disabled = status === FAMILY_STATUS_ON_HOLD;
  const lastNote = notes[0];

  return (
    <Wrapper>
      <NameCell disabled={disabled} client={client} onClick={() => onClientClick(clientInfo.name, to)} />
      <ResidentCell disabled={disabled}>{residentName}</ResidentCell>
      <StageCell disabled={disabled}>
        <Stage text={stage} currentStage={level} />
      </StageCell>
      <NoteCell note={lastNote} disabled={disabled} />
      <DateAddedCell disabled={disabled}>{createdAtStr}</DateAddedCell>
    </Wrapper>
  );
};

ClientRowCard.propTypes = {
  client: clientPropType.isRequired,
  onClientClick: func.isRequired,
};

export default ClientRowCard;
