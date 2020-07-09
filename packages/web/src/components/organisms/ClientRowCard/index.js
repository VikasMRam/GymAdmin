import React from 'react';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import { object } from 'prop-types';
import { ifProp, ifNotProp } from 'styled-tools';
import { generatePath } from 'react-router';

import {
  Block,
  Link,
  Icon,
  ClampedText,
} from 'sly/web/components/atoms';
import {
  DoubleLineTd,
  Td,
  TextTd,
  Tr,
} from 'sly/web/components/atoms/Table';
import Stage from 'sly/web/components/molecules/Stage';
import { FAMILY_STATUS_ON_PAUSE } from 'sly/web/constants/familyDetails';
import { AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, SUMMARY } from 'sly/web/constants/dashboardAppPaths';
import clientPropType from 'sly/web/propTypes/client';
import mobileOnly from 'sly/web/components/helpers/mobileOnly';
import { size, palette } from 'sly/web/components/themes';
import SlyEvent from 'sly/web/services/helpers/events';

const Wrapper = mobileOnly(Tr, css`
  display: flex;

  flex-direction: column;

  border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
  padding: ${size('spacing.large')};

  background: ${palette('white', 'base')};

  margin-bottom: ${size('spacing.large')};

  ${ifProp('disabled', css`
    background-color: ${palette('grey', 'background')};
    color: ${palette('slate', 'filler')};
  `)}
`);

const ClampedTextWrapper = styled.div`
  display: flex;
`;

const StyledNameCell = styled(({ disabled, seniorlySourced, client, to, ...props }) => {
  return (
    <Td disabled={disabled} {...props}>
      <ClampedTextWrapper>
        <ClampedText size="caption">
          <Link to={to} {...props} >
            {client.clientInfo.name}
          </Link>
        </ClampedText>
        { disabled && <Icon icon="pause" palette="danger" size="caption" />}
        { seniorlySourced && <Icon icon="logo" palette="primary" size="caption" />}
      </ClampedTextWrapper>
    </Td>
  );
})`
  ${Icon} {
    margin-left: ${size('spacing.small')};
  }
`;

StyledNameCell.displayName = 'StyledNameCell';

const NameCell = mobileOnly(StyledNameCell, css`
  margin-bottom: ${size('spacing.regular')};
`);

NameCell.displayName = 'NameCell';

const ResidentCell = mobileOnly(TextTd, css`display: none`);

ResidentCell.displayName = 'ResidentCell';


const StageCell = mobileOnly(Td, css`
  order: 3;
  border-top: ${size('border.regular')} solid ${palette('grey.filler')};
  margin: ${size('spacing.large')} -${size('spacing.large')} 0 -${size('spacing.large')};
  padding: ${size('spacing.regular')} ${size('spacing.large')} 0;
`);

StageCell.displayName = 'StageCell';

const NoteCell = mobileOnly(({ disabled, note, ...props }) => (
  <>
    {note && (
      <DoubleLineTd firstLine={note.body} secondLine={dayjs(note.createdAt).format('MM/DD/YYYY')} disabled={disabled} {...props} />
    )}
    {!note && (
      <TextTd disabled={disabled} {...props} />
    )}
  </>
), css`
  ${ifNotProp('note', css`display: none;`)}

  & > ${Block} + ${Block} {
    margin-top: ${size('spacing.small')};
  }

`);

NoteCell.displayName = 'NoteCell';

const DateAddedCell = mobileOnly(TextTd, css`display: none`);

DateAddedCell.displayName = 'DateAddedCell';

const onClientClick = (clientName, to) => {
  const event = {
    category: 'TableRow',
    action: 'click',
    label: clientName,
    value: to,
  };
  SlyEvent.getInstance().sendEvent(event);
};

const genFamilyDetailsPath = (id, extraPathParams = {}) => generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, ...extraPathParams });
const ClientRowCard = ({ client }) => {
  const {
    clientInfo, residentName, stage, status, createdAt, lastNote,
  } = client;
  const { referralSource } = clientInfo || {};
  const seniorlySourced = referralSource === 'Seniorly';
  // const { uuidInfo } = uuidAux;
  // let residentName = '';
  // if (uuidInfo) {
  //   // const { residentInfo } = uuidInfo;
  //   // const { fullName } = residentInfo;
  //   residentName = fullName;
  // }
  const createdAtStr = dayjs(createdAt).format('MM/DD/YYYY');
  const disabled = status === FAMILY_STATUS_ON_PAUSE;
  // const lastNote = notes[0];
  const to = genFamilyDetailsPath(client.id, { tab: SUMMARY });

  return (
    <Wrapper disabled={disabled}>
      <NameCell seniorlySourced={seniorlySourced} disabled={disabled} to={to} client={client} onClick={() => onClientClick(clientInfo.name, to)} />
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
  breakpoint: object,
  client: clientPropType.isRequired,
};

export default ClientRowCard;
