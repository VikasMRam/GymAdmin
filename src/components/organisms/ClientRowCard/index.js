import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import { func } from 'prop-types';
import { ifProp, ifNotProp } from 'styled-tools';
import { generatePath } from 'react-router';

import {
  Block,
  Link,
  Icon,
  Stage,
  Hr,
} from 'sly/components/atoms';

import {
  DoubleLineTd,
  Td,
  TextTd,
  Tr,
} from 'sly/components/atoms/Table';

import { FAMILY_STATUS_ON_HOLD } from 'sly/constants/familyDetails';
import { AGENT_DASHBOARD_FAMILIES_DETAILS_PATH } from 'sly/constants/dashboardAppPaths';
import clientPropType from 'sly/propTypes/client';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import { size, palette } from 'sly/components/themes';

const Wrapper = mobileOnly(Tr, css`
  display: flex;
  
  flex-direction: column;
  
  border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
  padding: ${size('spacing.large')};
  
  background: ${palette('white', 'base')};
  margin: ${size('spacing.large')};
  
  ${ifProp('disabled', css`
    background-color: ${palette('grey', 'background')};
    color: ${palette('slate', 'filler')};
  `)}
`);

const genFamilyDetailsPath = id => generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id });
const StyledNameCell = styled(({ disabled, client, ...props }) => (
  <Td disabled={disabled} {...props}>
    <Link to={genFamilyDetailsPath(client.id)} {...props}>
      {client.clientInfo.name}
      {disabled && <Icon icon="pause" palette="danger" size="caption" />}
    </Link>
  </Td>
))`
  ${Icon} {
    margin-left: ${size('spacing.small')}; 
  } 
`;

const NameCell = mobileOnly(StyledNameCell, css`
  margin-bottom: ${size('spacing.regular')};
  font-weight: ${size('weight.medium')};
`);

const ResidentCell = mobileOnly(TextTd, css`display: none`);

const StageCell = mobileOnly(Td, css`
  order: 3;
  border-top: ${size('border.regular')} solid ${palette('grey.filler')};
  margin: ${size('spacing.large')} -${size('spacing.large')} 0 -${size('spacing.large')};
  padding: ${size('spacing.regular')} ${size('spacing.large')} 0;
`);

const NoteCell = mobileOnly(({ disabled, note, ...props }) => (
  <Fragment>
    {note && (
      <DoubleLineTd firstLine={note.body} secondLine={dayjs(note.createdAt).format('MM/DD/YYYY')} disabled={disabled} {...props} />
    )}
    {!note && (
      <TextTd disabled={disabled} {...props} />
    )}
  </Fragment>
), css`
  ${ifNotProp('note', css`display: none;`)}
  
  & > ${Block} + ${Block} {
    margin-top: ${size('spacing.small')}; 
  }
    
`);

const DateAddedCell = mobileOnly(TextTd, css`display: none`);

const ClientRowCard = ({ client, onClientClick }) => {
  const {
    clientInfo, uuidAux, stage, status, createdAt, notes,
  } = client;
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
    <Wrapper disabled={disabled}>
      <NameCell disabled={disabled} client={client} onClick={() => onClientClick(clientInfo.name, to)} />
      <ResidentCell disabled={disabled}>{residentName}</ResidentCell>
      <StageCell disabled={disabled}>
        <Stage stage={stage} />
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
