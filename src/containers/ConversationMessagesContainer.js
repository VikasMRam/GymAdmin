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

@query('getConversations', 'getConversations')

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
    getConversations: func.isRequired,
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
    pageNumber: 0,
    loadingMore: false,
  };

  componentDidMount() {
    const { messagesRef, scrolled } = this;
    const { ws, messages } = this.props;

    ws.on(NOTIFY_MESSAGE_NEW, this.onMessage, { capture: true });

    if (messages && messages.length) {
      if (messagesRef.current && !scrolled) {
        messagesRef.current.addEventListener('scroll', this.handleScroll);
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        this.scrolled = true;
      }
    }
  }

  componentDidUpdate() {
    this.checkAndPatchLastReadMessage(MESSAGES_UPDATE_LAST_READ_TIMEOUT);
  }

  componentWillUnmount() {
    const { messagesRef } = this;
    const { ws } = this.props;

    ws.off(NOTIFY_MESSAGE_NEW, this.onMessage);
    if (messagesRef.current) {
      messagesRef.current.removeEventListener('scroll', this.handleScroll);
    }
  }

  onMessage = (message) => {
    const {
      conversation, status, getConversations, user,
    } = this.props;
    const { id } = conversation;
    if (message.payload.conversationId === id) {
      status.messages.refetch();
      getConversations({ 'filter[participant_id]': user.id });
      // Patch last read message immediately if the user is active on that conversation
      if (document.hidden) {
        this.checkAndPatchLastReadMessage(0);
      }
      // prevent more handlers to be called if page is visible
      return document.hidden;
    }
    return true;
  };

  onNewMessagesLoaded = (resp) => {
    const { pageNumber } = this.state;
    let messages = [...this.state.messages];
    const result = resp.body.data.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = {};
      }
      acc[item.type][item.id] = item;
      return acc;
    }, {});
    const ids = messages.map(({ id }) => id);
    messages = resp.body.data.reduce((acc, elem) => {
      if (!ids.includes(elem.id)) {
        acc.push(build(result, elem.type, elem.id));
      }
      return acc;
    }, messages);

    this.setState({
      messages,
      loadingMore: false,
      pageNumber: pageNumber + 1,
    });
  };

  getHasFinished = () => {
    const { status } = this.props;
    const { hasFinished } = status.messages;

    return hasFinished;
  };

  checkAndPatchLastReadMessage(timeout) {
    if (!this.timeoutInst) {
      const {
        messages, conversation, user,
      } = this.props;
      const parsedLastestMessageCreatedAt = dayjs(messages[0].createdAt).utc();
      const { conversationParticipants } = conversation;
      const { id: userId } = user;
      const viewingAsParticipant = conversationParticipants.find(p => p.participantID === userId);
      const parsedViewedCreatedAt = dayjs(viewingAsParticipant.stats.lastReadMessageAt).utc();

      if (parsedLastestMessageCreatedAt.isAfter(parsedViewedCreatedAt)) {
        this.timeoutInst = setTimeout(this.updateLastReadMessageAt, timeout);
      }
    }
  }

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
    const { messages, pageNumber } = this.state;
    const { info, id } = conversation;
    const { messageCount } = info;

    if (this.messagesRef.current && !this.messagesRef.current.scrollTop && messages.length < messageCount) {
      this.setState({
        loadingMore: true,
      });
      getConversationMessages({
        'filter[conversationID]': id,
        sort: '-created_at',
        'page-number': pageNumber + 1,
      }).then(this.onNewMessagesLoaded);
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
