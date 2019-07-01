import React, { Fragment } from 'react';
import { arrayOf } from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import messagePropType from 'sly/propTypes/conversation/conversationMessage';
import participantPropType from 'sly/propTypes/conversation/conversationParticipant';
import pad from 'sly/components/helpers/pad';
import HrWithText from 'sly/components/molecules/HrWithText';
import Message from 'sly/components/molecules/Message';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMessage = pad(styled(Message)`
  align-self: ${ifProp('isRightAligned', 'flex-end', 'flex-start')};
  margin-left: ${size('spacing.xLarge')};
  margin-right: ${size('spacing.xLarge')};

  animation: fadeIn 1.5s;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`, 'large');
StyledMessage.displayName = 'StyledMessage';

const PaddedHrWithText = pad(HrWithText, 'large');
PaddedHrWithText.displayName = 'PaddedHrWithText';

dayjs.extend(advancedFormat);
dayjs.extend(utc);

const ConversationMessages = ({
  messages, participants, viewingAsParticipant,
}) => {
  const today = dayjs().utc();
  const todayDDMMYYYY = today.format('DD-MM-YYYY');
  const thisYear = dayjs().format('YYYY');
  const participantsById = participants.reduce((a, b) => {
    a[b.id] = b;
    return a;
  }, {});
  const messagesWithDay = messages.map((m) => {
    const parsedDate = dayjs(m.createdAt).utc();
    m.createdAtDayjs = parsedDate;
    m.createdAtDate = parsedDate.isValid() ? parsedDate.format('DD-MM-YYYY') : todayDDMMYYYY;
    return m;
  });
  const dayNames = {};
  const messagesByDay = messagesWithDay.reduce((a, b) => {
    (a[b.createdAtDate] = a[b.createdAtDate] || []).push(b);
    const latestDay = b.createdAtDayjs.isBefore(today) ? today : b.createdAtDayjs;
    const previousDay = b.createdAtDayjs.isBefore(today) ? b.createdAtDayjs : today;
    const dayDiff = latestDay.diff(previousDay, 'day');
    const createdAtYear = b.createdAtDayjs.format('YYYY');
    let dayName = 'Today';
    if (dayDiff === 1) {
      dayName = 'Yesterday';
    } else if (dayDiff !== 0) {
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
    let messagesInDay = messagesByDay[d];
    messagesInDay = messagesInDay.sort((a, b) => a.createdAtDayjs.diff(b.createdAtDayjs));
    const components = messagesInDay.map((m) => {
      const isRightAligned = viewingAsParticipant.id === m.conversationParticipantID;
      const props = {
        message: m,
        isRightAligned,
        dark: isRightAligned,
      };
      if (!isRightAligned) {
        const participant = participantsById[m.conversationParticipantID];
        props.participant = participant;
      }

      return <StyledMessage key={m.id} {...props} />;
    });
    return (
      <Fragment key={d}>
        <PaddedHrWithText text={dayNames[d]} />
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
};

export default ConversationMessages;
