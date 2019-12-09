import { CONVERSATION_PARTICIPANT_TYPE_ORGANIZATION } from 'sly/constants/conversations';
import { titleize } from 'sly/services/helpers/strings';

export const getConversationName = (conversation, user) => {
  const { conversationParticipants } = conversation;
  const { id: userId } = user;
  const nameList = conversationParticipants
    .filter(conversationParticipant => conversationParticipant.participantID !== userId)
    .filter(conversationParticipant => conversationParticipant.participantType !== CONVERSATION_PARTICIPANT_TYPE_ORGANIZATION)
    .reduce((accumulator, conversationParticipant) => {
      const { participantInfo } = conversationParticipant;
      const { name, roleName } = participantInfo;
      if (name !== '' && roleName !== 'slyUser') {
        const result = `[${titleize(roleName)}]: ${name}`;
        if (accumulator.indexOf(name) === -1) {
          accumulator.push(result);
        }
      }
      return accumulator;
    }, []);
  const name = nameList.sort().join(', ');
  return name;
};
