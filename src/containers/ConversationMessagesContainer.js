import React, { Component, Fragment, createRef } from 'react';
import { arrayOf, object, func, string } from 'prop-types';
import dayjs from 'dayjs';
import build from 'redux-object';

import { prefetch, withUser, query } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import messagePropType from 'sly/propTypes/conversation/conversationMessage';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import conversationParticipantPropType from 'sly/propTypes/conversation/conversationParticipant';
import { MESSAGES_UPDATE_LAST_READ_TIMEOUT } from 'sly/constants/conversations';
import { CONVERSTION_PARTICIPANT_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import { NOTIFY_MESSAGE_NEW } from 'sly/constants/notifications';
import withWS from 'sly/services/ws/withWS';
import textAlign from 'sly/components/helpers/textAlign';
import fullHeight from 'sly/components/helpers/fullHeight';
import { Block } from 'sly/components/atoms';
import ConversationMessages from 'sly/components/organisms/ConversationMessages';

const TextCenterBlock = textAlign(Block);
const FullHeightTextCenterBlock = fullHeight(TextCenterBlock);

@prefetch('messages', 'getConversationMessages', (req, { conversation }) => req({
  'filter[conversationID]': conversation.id,
  sort: '-created_at',
}))

@query('getConversationMessages', 'getConversationMessages')

@query('updateConversationParticipant', 'updateConversationParticipant')

@withWS

@withUser

export default class ConversationMessagesContainer extends Component {
  static propTypes = {
    ws: object,
    messages: arrayOf(messagePropType),
    conversation: conversationPropType.isRequired,
    user: userPropType,
    status: object,
    viewingAsParticipant: conversationParticipantPropType,
    participants: arrayOf(conversationParticipantPropType),
    updateConversationParticipant: func.isRequired,
    getConversationMessages: func.isRequired,
    className: string,
  };

  static getDerivedStateFromProps(props, state) {
    const { messages } = state;

    if (!messages) {
      return {
        messages: props.messages,
      };
    }
    return null;
  }

  state = {
    messages: null,
    loadingMore: false,
  };

  componentDidMount() {
    const {
      updateLastReadMessageAt, handleScroll, messagesRef, scrolled,
    } = this;
    const {
      ws, messages, conversation, user,
    } = this.props;

    ws.on(NOTIFY_MESSAGE_NEW, this.onMessage, { capture: true });

    if (messages && messages.length) {
      const parsedLastestMessageCreatedAt = dayjs(messages[0].createdAt).utc();
      const { conversationParticipants } = conversation;
      const { id: userId } = user;
      const viewingAsParticipant = conversationParticipants.find(p => p.participantID === userId);
      const parsedViewedCreatedAt = dayjs(viewingAsParticipant.stats.lastReadMessageAt).utc();
      if (parsedLastestMessageCreatedAt.isAfter(parsedViewedCreatedAt)) {
        setTimeout(updateLastReadMessageAt, MESSAGES_UPDATE_LAST_READ_TIMEOUT);
      }

      if (messagesRef.current && !scrolled) {
        messagesRef.current.addEventListener('scroll', handleScroll);
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        this.scrolled = true;
      }
    }
  }

  componentWillUnmount() {
    const { handleScroll, messagesRef } = this;
    const { ws } = this.props;

    ws.off(NOTIFY_MESSAGE_NEW, this.onMessage);
    if (messagesRef.current) {
      messagesRef.current.removeEventListener('scroll', handleScroll);
    }
  }

  onMessage = (message) => {
    const { conversation, status } = this.props;
    const { id } = conversation;
    if (message.payload.conversationId === id) {
      status.messages.refetch();
      // prevent more handlers to be called if page is visible
      return document.hidden;
    }
    return true;
  };

  getHasFinished = () => {
    const { status } = this.props;
    const { hasFinished } = status.messages;

    return hasFinished;
  };

  pageNumber = 0;

  updateLastReadMessageAt = () => {
    const {
      updateConversationParticipant, conversation, user,
    } = this.props;
    const { conversationParticipants } = conversation;
    const { id: userId } = user;
    const viewingAsParticipant = conversationParticipants.find(p => p.participantID === userId);
    const { id } = viewingAsParticipant;
    const payload = {
      type: CONVERSTION_PARTICIPANT_RESOURCE_TYPE,
      attributes: viewingAsParticipant,
    };
    payload.attributes.stats.unreadMessageCount = 0;
    payload.attributes.stats.lastReadMessageAt = dayjs().utc().format();

    return updateConversationParticipant({ id }, payload)
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
      });
  };

  handleScroll = () => {
    const { conversation, getConversationMessages } = this.props;
    const { messages } = this.state;
    const { info, id } = conversation;
    const { messageCount } = info;

    if (this.messagesRef.current && !this.messagesRef.current.scrollTop && messages.length < messageCount) {
      this.setState({
        loadingMore: true,
      });
      this.pageNumber++;
      getConversationMessages({
        'filter[conversationID]': id,
        sort: '-created_at',
        'page-number': this.pageNumber,
      }).then((resp) => {
        const result = resp.body.data.reduce((acc, item) => {
          if (!acc[item.type]) {
            acc[item.type] = {};
          }
          acc[item.type][item.id] = item;
          return acc;
        }, {});
        let allMessages = messages;
        let newMessages = [];
        const lastDate = dayjs(allMessages[0].createdAt).utc();

        resp.body.data.forEach((elem) => {
          const elemDayjs = dayjs(elem.createdAt).utc();
          if (elemDayjs.isAfter(lastDate)) {
            newMessages.push(elem);
          }
        });
        newMessages = newMessages.map(elem => build(result, elem.type, elem.id));
        allMessages = [...allMessages, ...newMessages];

        this.setState({
          messages: allMessages,
          loadingMore: false,
        });
      });
    }
  };

  messagesRef = createRef();

  render() {
    const {
      viewingAsParticipant, participants, className,
    } = this.props;
    const { messages, loadingMore } = this.state;

    if (!this.getHasFinished()) {
      return (
        <Fragment>
          <br />
          <FullHeightTextCenterBlock size="caption">Loading...</FullHeightTextCenterBlock>
        </Fragment>
      );
    }

    if (!messages.length) {
      return (
        <Fragment>
          <br />
          <FullHeightTextCenterBlock size="caption">No messages</FullHeightTextCenterBlock>
        </Fragment>
      );
    }

    return (
      <div ref={this.messagesRef} className={className}>
        {loadingMore &&
          <Fragment>
            <br />
            <TextCenterBlock size="caption">Loading more messages...</TextCenterBlock>
            <br />
          </Fragment>
        }
        <ConversationMessages
          viewingAsParticipant={viewingAsParticipant}
          messages={messages}
          participants={participants}
        />
      </div>
    );
  }
}
