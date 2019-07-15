import React from 'react';
import { arrayOf, string } from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
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

  :last-child {
    margin-bottom: 0;
  }

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

const today = dayjs().utc();
const thisYear = dayjs().utc().format('YYYY');

const getDateText = (date) => {
  date = dayjs(date).utc();
  const createdAtYear = date.format('YYYY');

  switch (date.startOf('day').diff(today.startOf('day'), 'day')) {
    case 0: return 'Today';
    case 1: return 'Yesterday';
    default:
      if (createdAtYear !== thisYear) {
        return `${date.format('dddd, MMMM Do')}, ${createdAtYear}`;
      }
      return date.format('dddd, MMMM Do');
  }
};
const isSameDay = (a, b) => a.substr(0, 10) === b.substr(0, 10);
const isAfter = (a, b) => dayjs(a).utc().isAfter(dayjs(b).utc());

const ConversationMessages = ({
  messages, participants, viewingAsParticipant, className,
}) => {
  const lastMessageReadAt = viewingAsParticipant.stats.lastReadMessageAt;
  const participantsById = participants.reduce((a, b) => {
    a[b.id] = b;
    return a;
  }, {});
  const messageComponents = [];
  let prevMessage = null;

  for (let i = messages.length - 1; i >= 0; --i) {
    const message = messages[i];
    if ((prevMessage && !isSameDay(prevMessage.createdAt, message.createdAt)) ||
      !prevMessage) {
      const dayName = getDateText(message.createdAt);
      const hrProps = {
        text: dayName,
      };
      if (isAfter(message.createdAt, lastMessageReadAt)) {
        hrProps.badgeText = 'New';
        hrProps.palette = 'warning';
        hrProps.variation = 'base';
      }

      messageComponents.push(<PaddedHrWithText key={`hr-${message.id}`} {...hrProps} />);
    }
    const isRightAligned = viewingAsParticipant.id === message.conversationParticipantID;
    const props = {
      message,
      isRightAligned,
      dark: isRightAligned,
    };
    if (!isRightAligned) {
      const participant = participantsById[message.conversationParticipantID];
      props.participant = participant;
    }

    messageComponents.push(<StyledMessage key={message.id} {...props} />);
    prevMessage = message;
  }

  return (
    <Wrapper className={className}>
      {messageComponents}
    </Wrapper>
  );
};

ConversationMessages.propTypes = {
  messages: arrayOf(messagePropType).isRequired,
  participants: arrayOf(participantPropType).isRequired,
  viewingAsParticipant: participantPropType.isRequired,
  className: string,
};

export default ConversationMessages;
