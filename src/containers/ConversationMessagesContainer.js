import React, { Component, createRef } from 'react';
import { arrayOf, object, func, string, node } from 'prop-types';
import dayjs from 'dayjs';
import build from 'redux-object';
import styled from 'styled-components';
import { branch } from 'recompose';

import { size, palette } from 'sly/components/themes';
import { prefetch, withUser, query } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import messagePropType from 'sly/propTypes/conversation/conversationMessage';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import conversationParticipantPropType from 'sly/propTypes/conversation/conversationParticipant';
import { MESSAGES_UPDATE_LAST_READ_TIMEOUT, CONVERSATION_PARTICIPANT_TYPE_USER } from 'sly/constants/conversations';
import { CONVERSTION_PARTICIPANT_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import { NOTIFY_MESSAGE_NEW } from 'sly/constants/notifications';
import withWS from 'sly/services/ws/withWS';
import textAlign from 'sly/components/helpers/textAlign';
import fullHeight from 'sly/components/helpers/fullHeight';
import displayOnlyIn from 'sly/components/helpers/displayOnlyIn';
import SlyEvent from 'sly/services/helpers/events';
import pad from 'sly/components/helpers/pad';
import { isAfter } from 'sly/services/helpers/date';
import { Block, Button } from 'sly/components/atoms';
import ConversationMessages from 'sly/components/organisms/ConversationMessages';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import IconButton from 'sly/components/molecules/IconButton';
import SendMessageFormContainer from 'sly/containers/SendMessageFormContainer';

const categoryName = 'conversation-messages';

const TextCenterBlock = textAlign(Block);
const FullHeightTextCenterBlock = fullHeight(TextCenterBlock);

const SmallScreen = displayOnlyIn(styled(Block)`
  > * {
    display: flex;
    align-items: center;
  }
`, ['mobile']);

const BigScreen = displayOnlyIn(styled(Block)`
  width: 100%;

  > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`, ['tablet', 'laptop']);

const ContainerWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${palette('white.base')};
`;

const Wrapper = styled.div`
  margin: ${size('spacing.large')};
  position: sticky;
  top: ${size('spacing.large')};
  z-index: 1;
`;

const StyledButton = styled(Button)`
  padding: 0;
`;

const MessagesWrapper = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const StyledSendMessageFormContainer = pad(styled(SendMessageFormContainer)`
  margin-left: ${size('spacing.xLarge')};
  margin-right: ${size('spacing.xLarge')};
  margin-top: ${size('spacing.xLarge')};
  flex-grow: 0;
`, 'large');


@branch(
  props => props.conversation,
  prefetch('messages', 'getConversationMessages', (req, { conversation }) => req({
    'filter[conversationID]': conversation.id,
    sort: '-created_at',
    'page-size': 1000, // todo: remove after api fix
  }))
)

@query('getConversationMessages', 'getConversationMessages')

@query('updateConversationParticipant', 'updateConversationParticipant')

@query('getConversations', 'getConversations')

@withWS

@withUser

export default class ConversationMessagesContainer extends Component {
  static propTypes = {
    ws: object,
    messages: arrayOf(messagePropType),
    conversation: conversationPropType,
    user: userPropType,
    status: object,
    viewingAsParticipant: conversationParticipantPropType,
    participants: arrayOf(conversationParticipantPropType),
    updateConversationParticipant: func.isRequired,
    getConversationMessages: func.isRequired,
    getConversations: func.isRequired,
    sendMessageFormPlaceholder: string,
    headingBoxSection: node,
    className: string,
    otherParticipantId: string,
    otherParticipantType: string,
    onCreateConversationSuccess: func,
  };

  static defaultProps = {
    messages: [],
  }

  static getDerivedStateFromProps(props, state) {
    const { messages } = state;
    if (!messages || (props.messages && props.messages.length !== messages.length)) {
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
    const { ws } = this.props;

    ws.on(NOTIFY_MESSAGE_NEW, this.onMessage, { capture: true });
  }

  componentDidUpdate() {
    const { messages } = this.state;

    if (!this.timeoutInst) {
      this.timeoutInst = this.checkAndPatchLastReadMessage(MESSAGES_UPDATE_LAST_READ_TIMEOUT);
    }
    if (messages && messages.length && this.messagesRef.current) {
      if (!this.scrolled) {
        this.messagesRef.current.addEventListener('scroll', this.handleScroll);
        this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
        this.scrolled = true;
      } else if (this.wasScrollAtBottom) {
        // on new message if scroll position is at bottom keep scrolling
        this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
      }
    }
  }

  componentWillUnmount() {
    const { ws } = this.props;

    ws.off(NOTIFY_MESSAGE_NEW, this.onMessage);
    if (this.messagesRef.current) {
      this.messagesRef.current.removeEventListener('scroll', this.handleScroll);
    }
  }

  // FIXME: query should not use redux
  onMessage = (message) => {
    const {
      conversation, status, getConversations, user,
    } = this.props;
    if (conversation) {
      const { id } = conversation;
      if (message.payload.conversationId === id) {
        this.gotNewMessage = true;
        status.messages.refetch();
        // We need to fetch conversation when a new message appears as it contains total message
        getConversations({ 'filter[participant_id]': user.id, 'filter[participant_type]': CONVERSATION_PARTICIPANT_TYPE_USER });
        // Patch last read message immediately if the user is active on that conversation
        // if scroll at bottom
        if (!document.hidden && this.wasScrollAtBottom) {
          this.updateLastReadMessageAt();
        }
        // prevent more handlers to be called if page is visible
        return document.hidden;
      }
      return true;
    }
    return true;
  };

  // FIXME: query should normalize this
  onNewMessagesLoaded = (resp) => {
    const { pageNumber } = this.state;
    // TODO: utilize logic from helper.
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
    // Returning true if we dont load messages as conversation is not present
    if (!status.messages) {
      return true;
    }
    const { hasFinished } = status.messages;

    return hasFinished;
  };

  isScrollAtBottom = () => this.messagesRef.current && (this.messagesRef.current.scrollHeight -
    this.messagesRef.current.scrollTop === this.messagesRef.current.clientHeight);

  checkAndPatchLastReadMessage = (timeout) => {
    const {
      messages, viewingAsParticipant,
    } = this.props;
    if (messages && messages.length) {
      const parsedLastestMessageCreatedAt = dayjs(messages[0].createdAt).utc();
      if (viewingAsParticipant) {
        const parsedViewedCreatedAt = dayjs(viewingAsParticipant.stats.lastReadMessageAt).utc();

        if (parsedLastestMessageCreatedAt.isAfter(parsedViewedCreatedAt)) {
          return setTimeout(this.updateLastReadMessageAt, timeout);
        }
      }
    }
    return null;
  };

  updateLastReadMessageAt = () => {
    const {
      updateConversationParticipant, viewingAsParticipant,
    } = this.props;
    if (viewingAsParticipant) {
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
    }
    return null;
  };

  handleScroll = () => {
    const { conversation, getConversationMessages } = this.props;
    if (conversation) {
      const { messages, pageNumber } = this.state;
      const { info, id } = conversation;
      const { messageCount } = info;

      this.wasScrollAtBottom = this.isScrollAtBottom();
      if (this.messagesRef.current && !this.messagesRef.current.scrollTop && messages && (messages.length < messageCount)) {
        this.setState({
          loadingMore: true,
        });
        getConversationMessages({
          'filter[conversationID]': id,
          sort: '-created_at',
          'page-number': pageNumber + 1,
        }).then(this.onNewMessagesLoaded);
      }
      if (this.gotNewMessage && this.wasScrollAtBottom) {
        this.timeoutInst = this.checkAndPatchLastReadMessage(0);
        this.gotNewMessage = false;
      }
    }
  };

  scrollToNewMessages = () => {
    if (this.newMessageRef.current) {
      const { messages } = this.state;
      const { viewingAsParticipant } = this.props;
      if (viewingAsParticipant) {
        const lastMessageReadAt = viewingAsParticipant.stats.lastReadMessageAt;
        const firstUnreadMessage = [...messages].reverse().find(m => isAfter(m.createdAt, lastMessageReadAt));
        const event = {
          action: 'jump-to-new-messages',
          category: categoryName,
          label: firstUnreadMessage.id,
        };
        SlyEvent.getInstance().sendEvent(event);
        this.newMessageRef.current.scrollIntoView(true);
      }
    }
  };

  handleMarkAsRead = () => {
    const { conversation } = this.props;
    const { id } = conversation;
    const event = {
      action: 'mark-as-read',
      category: categoryName,
      label: id,
    };
    SlyEvent.getInstance().sendEvent(event);
    this.updateLastReadMessageAt();
  };

  messagesRef = createRef();
  newMessageRef = createRef();

  render() {
    const {
      conversation, otherParticipantId, otherParticipantType, viewingAsParticipant, participants, className, sendMessageFormPlaceholder, headingBoxSection, onCreateConversationSuccess,
    } = this.props;
    const { messages, loadingMore } = this.state;

    if (!this.getHasFinished() && !this.alreadyLoaded) {
      return (
        <>
          <br />
          <FullHeightTextCenterBlock size="caption">Loading...</FullHeightTextCenterBlock>
        </>
      );
    }

    this.alreadyLoaded = true;
    const viewingAsParticipantUnreadMessageCount = viewingAsParticipant ? viewingAsParticipant.stats.unreadMessageCount : 0;
    const unreadMessagesNumber = viewingAsParticipantUnreadMessageCount > 12 ? `${viewingAsParticipantUnreadMessageCount}+` : viewingAsParticipantUnreadMessageCount;
    const lastReadMessageFormattedDate = dayjs(viewingAsParticipantUnreadMessageCount).format('hh:mm A on MMMM Do');

    return (
      <ContainerWrapper className={className}>
        {headingBoxSection}
        <MessagesWrapper innerRef={this.messagesRef}>
          {!messages.length && (
            <>
              <br />
              <FullHeightTextCenterBlock size="caption">No messages</FullHeightTextCenterBlock>
            </>
          )}
          {messages && messages.length > 0 && (
            <>
              {viewingAsParticipantUnreadMessageCount > 0 &&
                <Wrapper >
                  <BannerNotification hasBorderRadius palette="warning" padding="small" onCloseClick={this.handleMarkAsRead}>
                    <SmallScreen weight="medium" size="caption">
                      <div>
                        <IconButton icon="arrow-up" size="caption" palette="slate" kind="plain" transparent />
                        {unreadMessagesNumber} unread messages
                      </div>
                    </SmallScreen>
                    <BigScreen weight="medium" size="caption">
                      <div>
                        <IconButton icon="arrow-up" size="caption" palette="slate" kind="plain" transparent onClick={this.scrollToNewMessages}>Jump</IconButton>
                        {unreadMessagesNumber} new messages since {lastReadMessageFormattedDate}
                        <StyledButton size="caption" palette="slate" transparent onClick={this.handleMarkAsRead}>Mark as read</StyledButton>
                      </div>
                    </BigScreen>
                  </BannerNotification>
                </Wrapper>
              }
              {loadingMore &&
                <>
                  <br />
                  <TextCenterBlock size="caption">Loading more messages...</TextCenterBlock>
                  <br />
                </>
              }
              <ConversationMessages
                viewingAsParticipant={viewingAsParticipant}
                messages={messages}
                participants={participants}
                newMessageRef={this.newMessageRef}
              />
            </>
          )}
        </MessagesWrapper>
        <StyledSendMessageFormContainer
          conversation={conversation}
          otherParticipantId={otherParticipantId}
          otherParticipantType={otherParticipantType}
          placeholder={sendMessageFormPlaceholder}
          disabled={!(otherParticipantId && otherParticipantType) && !viewingAsParticipant}
          onCreateConversationSuccess={onCreateConversationSuccess}
        />
      </ContainerWrapper>
    );
  }
}
