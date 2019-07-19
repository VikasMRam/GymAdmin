import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
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
import mobileDisplay from 'sly/components/helpers/mobileDisplay';
import { size, palette } from 'sly/components/themes';
import { ifNotProp } from 'styled-tools';

const Wrapper = mobileDisplay(styled(Tr)`
  flex-direction: column;
  
  border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
  padding: ${size('spacing.large')};
  
  background: ${palette('white', 'base')};
  margin: ${size('spacing.large')};
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
     
  }
`, 'flex', 'table-row');

const NameCell = styled(({ disabled, children, ...props }) => (
  <Fragment>
    {disabled && (
      <TextIconTd
        disabled
        icon="pause"
        iconPalette="danger"
        {...props}
      >
        {children}
      </TextIconTd>
    )}
    {!disabled && (
      <LinkTd {...props}>
        {children}
      </LinkTd>
    )}
  </Fragment>
))`
  font-weight: ${size('weight.medium')};
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    font-weight: ${size('weight.regular')};
  }
`;

const ResidentCell = mobileDisplay(TextTd, 'none', 'table-cell');

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

const DateAddedCell = mobileDisplay(TextTd, 'none', 'table-cell');

const ClientRowCard = ({ client, onClientClick }) => {
  const {
    id, clientInfo, uuidAux, stage, status, createdAt, notes,
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
  const to = AGENT_DASHBOARD_FAMILIES_DETAILS_PATH.replace(':id/:tab?', id);
  const lastNote = notes[0];

  return (
    <Wrapper>
      <NameCell to={to} onClick={() => onClientClick(clientInfo.name, to)}>
        {clientInfo.name}
      </NameCell>
      <ResidentCell disabled={disabled}>{residentName}</ResidentCell>
      <StageCell disabled={disabled}>
        <Stage text={stage} currentStage={level} disabled={disabled} palette={palette} />
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
