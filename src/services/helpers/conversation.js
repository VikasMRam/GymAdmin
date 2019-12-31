import { CONVERSATION_PARTICIPANT_TYPE_ORGANIZATION } from 'sly/constants/conversations';

export const getConversationName = (conversation, user) => {
  const { conversationParticipants, info } = conversation;
  if (info.Name) {
    return info.Name;
  }
  const { id: userId } = user;
  const nameList = conversationParticipants
    .filter(conversationParticipant => conversationParticipant.participantID !== userId)
    .filter(conversationParticipant => conversationParticipant.participantType !== CONVERSATION_PARTICIPANT_TYPE_ORGANIZATION)
    .reduce((accumulator, conversationParticipant) => {
      const { participantInfo } = conversationParticipant;
      const { name } = participantInfo;
      if (name !== '' && accumulator.indexOf(name) === -1) {
        accumulator.push(name);
      }
      return accumulator;
    }, []);
  const name = nameList.sort().join(', ');
  return name;
};
