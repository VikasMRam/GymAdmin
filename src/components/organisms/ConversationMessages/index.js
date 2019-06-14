import React, { Fragment } from 'react';
import { oneOfType, arrayOf } from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { ifProp } from 'styled-tools';

import { CONVERSATION_PARTICIPANT_TYPE_USER, CONVERSATION_PARTICIPANT_TYPE_CLIENT } from 'sly/constants/conversations';
import messagePropType from 'sly/propTypes/conversation/conversationMessage';
import participantPropType from 'sly/propTypes/conversation/conversationParticipant';
import clientPropType from 'sly/propTypes/client';
import userPropType from 'sly/propTypes/user';
import pad from 'sly/components/helpers/pad';
import HrWithText from 'sly/components/molecules/HrWithText';
import Message from 'sly/components/molecules/Message';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMessage = pad(styled(Message)`
  align-self: ${ifProp('isRightAligned', 'flex-end', 'flex-start')};
`, 'large');
StyledMessage.displayName = 'StyledMessage';

const PaddedHrWithText = pad(HrWithText, 'large');
PaddedHrWithText.displayName = 'PaddedHrWithText';

dayjs.extend(advancedFormat);

const ConversationMessages = ({
  messages, participants, viewingAsParticipant, participantClients, participantUsers,
}) => {
  const today = dayjs().format('DD-MM-YYYY');
  const thisYear = dayjs().format('YYYY');
  const participantsById = participants.reduce((a, b) => {
    a[b.id] = b;
    return a;
  }, {});
  const participantClientsById = participantClients.reduce((a, b) => {
    a[b.id] = b;
    return a;
  }, {});
  const participantUsersById = participantUsers.reduce((a, b) => {
    a[b.id] = b;
    return a;
  }, {});
  const messagesWithDay = messages.map((m) => {
    const parsedDate = dayjs(m.createdAt);
    m.createdAtDayjs = parsedDate;
    m.createdAtDate = parsedDate.isValid() ? parsedDate.format('DD-MM-YYYY') : today;
    return m;
  });
  const dayNames = {};
  const messagesByDay = messagesWithDay.reduce((a, b) => {
    (a[b.createdAtDate] = a[b.createdAtDate] || []).push(b);
    const dayDiff = b.createdAtDayjs.diff(today, 'day');
    const createdAtYear = b.createdAtDayjs.format('YYYY');
    let dayName = 'Today';
    if (dayDiff === 1) {
      dayName = 'Yesterday';
    } else {
      dayName = b.createdAtDayjs.format('dddd, MMMM Do');
      if (createdAtYear !== thisYear) {
        dayName += `, ${createdAtYear}`;
      }
    }
    dayNames[b.createdAtDate] = dayName;
    return a;
  }, {});
  let days = Object.keys(messagesByDay);
  days = days.sort((a, b) => {
    const aa = a.split('-').reverse().join();
    const bb = b.split('-').reverse().join();
    const r = aa > bb ? 1 : 0;
    return aa < bb ? -1 : r;
  });

  const messageComponents = days.map((d) => {
    const messagesInDay = messagesByDay[d];
    const components = messagesInDay.map((m) => {
      const isRightAligned = viewingAsParticipant.id === m.conversationParticipantID;
      const props = {
        message: m,
        isRightAligned,
        dark: isRightAligned,
      };
      if (!isRightAligned) {
        const participant = participantsById[m.conversationParticipantID];
        if (participant.participantType === CONVERSATION_PARTICIPANT_TYPE_CLIENT) {
          const client = participantClientsById[participant.participantID];
          props.client = client;
        } else if (participant.participantType === CONVERSATION_PARTICIPANT_TYPE_USER) {
          const user = participantUsersById[participant.participantID];
          props.user = user;
        }
      }

      return <StyledMessage key={m.id} {...props} />;
    });
    return (
      <Fragment key={d}>
        {d !== today && <PaddedHrWithText text={dayNames[d]} />}
        {components}
      </Fragment>
    );
  });

  return (
    <Wrapper>
      {messageComponents}
    </Wrapper>
  );
};

ConversationMessages.propTypes = {
  messages: arrayOf(messagePropType).isRequired,
  participants: arrayOf(participantPropType).isRequired,
  viewingAsParticipant: participantPropType.isRequired,
  participantClients: arrayOf(clientPropType),
  participantUsers: arrayOf(userPropType),
};

ConversationMessages.defaultProps = {
  participantClients: [],
  participantUsers: [],
};

export default ConversationMessages;
