import React, { Component, createRef } from 'react';
import { arrayOf, object, func, string } from 'prop-types';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { generatePath, withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as immutable from 'object-path-immutable';
import pick from 'lodash/pick';

import { size, palette } from 'sly/components/themes';
import { prefetch, withUser, query, invalidateRequests } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import messagePropType from 'sly/propTypes/conversation/conversationMessage';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import matchPropType from 'sly/propTypes/match';
import conversationParticipantPropType from 'sly/propTypes/conversation/conversationParticipant';
import {
  MESSAGES_UPDATE_LAST_READ_TIMEOUT,
  CONVERSATION_PARTICIPANT_TYPE_USER,
  CONVERSATION_PARTICIPANT_TYPE_CLIENT,
  CONVERSATION_PARTICIPANT_TYPE_ORGANIZATION,
  CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_AUTOMATED_RESPONSE,
} from 'sly/constants/conversations';
import { CONVERSTION_PARTICIPANT_RESOURCE_TYPE, CONVERSTION_MESSAGE_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import { NOTIFY_MESSAGE_NEW } from 'sly/constants/notifications';
import { newUuidAction } from 'sly/constants/payloads/uuidAction';
import { CONVERSATION_MESSAGE_BUTTONLIST_BUTTON_CLICKED } from 'sly/services/newApi/constants';
import { normJsonApi } from 'sly/services/helpers/jsonApi';
import withWS from 'sly/services/ws/withWS';
import textAlign from 'sly/components/helpers/textAlign';
import fullHeight from 'sly/components/helpers/fullHeight';
import displayOnlyIn from 'sly/components/helpers/displayOnlyIn';
import fullWidth from 'sly/components/helpers/fullWidth';
import SlyEvent from 'sly/services/helpers/events';
import pad from 'sly/components/helpers/pad';
import { isAfter } from 'sly/services/helpers/date';
import {
  AGENT_DASHBOARD_FAMILIES_DETAILS_PATH,
  SUMMARY,
} from 'sly/constants/dashboardAppPaths';
import { Block, Button, Link } from 'sly/components/atoms';
import ConversationMessages from 'sly/components/organisms/ConversationMessages';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import IconButton from 'sly/components/molecules/IconButton';
import HeadingBoxSection from 'sly/components/molecules/HeadingBoxSection';
import BackLink from 'sly/components/molecules/BackLink';
import SendMessageFormContainer from 'sly/containers/SendMessageFormContainer';
import { getConversationName } from 'sly/services/helpers/conversation';

const categoryName = 'conversation-messages';

const TextCenterBlock = textAlign(Block);
const FullHeightTextCenterBlock = fullHeight(TextCenterBlock);
const FullWidthTextCenterBlock = fullWidth(TextCenterBlock);

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

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledHeadingBoxSection = styled(HeadingBoxSection)`
  flex-grow: 0;
`;

const mapStateToProps = (state, { conversation, user }) => ({
  viewingAsParticipant: conversation && user && conversation.conversationParticipants.find(p => p.participantID === user.id),
});

@prefetch('messages', 'getConversationMessages', (req, { conversationId }) => req({
  'filter[conversationID]': conversationId,
  sort: '-created_at',
}))

@prefetch('conversation', 'getConversation', (req, { conversationId }) => req({
  id: conversationId,
}))

@query('getConversationMessages', 'getConversationMessages')
@query('createConversationMessage', 'createConversationMessage')
@query('updateConversationParticipant', 'updateConversationParticipant')
@query('updateConversationMessage', 'updateConversationMessage')
@query('createAction', 'createUuidAction')

@withWS
@withUser
@withRouter

@connect(mapStateToProps, {
  invalidateConversationMessages: () => invalidateRequests('getConversationMessages'),
})

export default class ConversationMessagesContainer extends Component {
  static propTypes = {
    ws: object,
    conversationId: string.isRequired,
    messages: arrayOf(messagePropType),
    conversation: conversationPropType,
    user: userPropType,
    status: object.isRequired,
    viewingAsParticipant: conversationParticipantPropType,
    updateConversationParticipant: func.isRequired,
    getConversationMessages: func.isRequired,
    createConversationMessage: func.isRequired,
    updateConversationMessage: func.isRequired,
    sendMessageFormPlaceholder: string,
    className: string,
    onCreateConversationSuccess: func,
    onBackClick: func,
    createAction: func.isRequired,
    match: matchPropType,
    invalidateConversationMessages: func.isRequired,
  };

  static defaultProps = {
    messages: [],
  };

  state = {
    messages: [],
    loadingMore: false,
  };

  static getDerivedStateFromProps(props, state) {
    const { messages } = state;

    if (!messages || !messages.length) {
      return {
        messages: props.messages,
      };
    }
    if (props.messages && messages[0].id !== props.messages[0].id) {
      const existingIds = messages.map(m => m.id);
      const newMessages = props.messages.filter(m => !existingIds.includes(m.id));
      return {
        messages: [...newMessages, ...messages],
      };
    }

    return null;
  }

  componentDidMount() {
    const { ws } = this.props;

    ws.on(NOTIFY_MESSAGE_NEW, this.onMessage, { capture: true });
    this.setHandlers();
  }

  componentDidUpdate() {
    this.setHandlers();
  }

  setHandlers = () => {
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
  };

  componentWillUnmount() {
    const { ws, invalidateConversationMessages } = this.props;

    ws.off(NOTIFY_MESSAGE_NEW, this.onMessage);
    if (this.messagesRef.current) {
      this.messagesRef.current.removeEventListener('scroll', this.handleScroll);
    }
    // this is required so that users who come back to this page after navigating will see new messages
    invalidateConversationMessages();
  }

  // FIXME: query should not use redux
  onMessage = (message) => {
    const { conversation, status } = this.props;
    if (conversation) {
      const { id } = conversation;
      if (message.payload.conversationId === id) {
        this.gotNewMessage = true;
        status.messages.refetch();
        // We need to fetch conversation when a new message appears as it contains total message
        status.conversation.refetch();
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
    const { messages } = this.state;
    const normMessages = normJsonApi(resp);
    const allMessages = [...messages, ...normMessages];

    this.setState({
      messages: allMessages,
      loadingMore: false,
    });
  };

  getHasFinished = () => {
    const { status } = this.props;
    const { hasFinished: messagesHasFinished } = status.messages;
    const { hasFinished: conversationHasFinished } = status.conversation;

    return messagesHasFinished && conversationHasFinished;
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
      updateConversationParticipant, viewingAsParticipant, status,
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
        .then(() => status.conversation.refetch())
        .catch((r) => {
          // TODO: Need to set a proper way to handle server side errors
          const { body } = r;
          const errorMessage = body.errors.map(e => e.title).join('. ');
          console.error(errorMessage);
        });
    }
    return null;
  };

  updateButtonListMessageSelectedButtons = (message, button) => {
    const { updateConversationMessage, status, createAction, match } = this.props;
    const { result } = status.messages;
    const { id, data } = message;
    const { valueButtonList } = data;
    const { selectedButtons } = valueButtonList;
    const newSelectedButtons = [...selectedButtons, button.text];

    const rawMessage = result.find(rMessage => rMessage.id === message.id);
    const conversationMessagePayload = immutable.wrap(pick(rawMessage, ['id', 'type', 'attributes.conversationID', 'attributes.conversationParticipantID', 'attributes.data']))
      .set('attributes.data.valueButtonList.selectedButtons', newSelectedButtons)
      .value();
    const uuidActionPayload = immutable.wrap(newUuidAction)
      .set('attributes.actionType', CONVERSATION_MESSAGE_BUTTONLIST_BUTTON_CLICKED)
      .set('attributes.actionPage', match.url)
      .set('attributes.actionInfo.slug', id)
      .set('attributes.actionInfo.buttonSelected', button.text)
      .set('attributes.actionInfo.entityType', conversationMessagePayload.type)
      .value();

    return Promise.all([
      updateConversationMessage({ id }, conversationMessagePayload),
      createAction(uuidActionPayload),
    ])
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
      });
  };

  handleScroll = () => {
    const { conversation, getConversationMessages } = this.props;
    if (conversation) {
      const { messages } = this.state;
      const { info, id } = conversation;
      const { messageCount } = info;

      this.wasScrollAtBottom = this.isScrollAtBottom();
      if (this.messagesRef.current && !this.messagesRef.current.scrollTop && messages && (messages.length < messageCount)) {
        const lastMessage = messages[messages.length - 1];
        this.setState({
          loadingMore: true,
        });
        getConversationMessages({
          'filter[conversationID]': id,
          sort: '-created_at',
          'filter[created_at]': `le:${lastMessage.createdAt}`,
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

  handleButtonClick = (message, button) => {
    const { text } = button;
    const { conversation, createConversationMessage } = this.props;
    const { id: conversationId } = conversation;
    const data = {
      type: CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_AUTOMATED_RESPONSE,
    };
    data[`value${CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_AUTOMATED_RESPONSE}`] = text;
    const payload = {
      type: CONVERSTION_MESSAGE_RESOURCE_TYPE,
      attributes: {
        data,
        conversationID: conversationId,
      },
    };
    const event = {
      action: 'buttonListMessageButtonClicked',
      category: categoryName,
      label: message.id,
      value: button.text,
    };

    SlyEvent.getInstance().sendEvent(event);
    createConversationMessage(payload).then(() => this.updateButtonListMessageSelectedButtons(message, button));
  };

  messagesRef = createRef();
  newMessageRef = createRef();

  render() {
    const { conversation, className, onCreateConversationSuccess, user, onBackClick } = this.props;
    const { messages, loadingMore } = this.state;

    if (!this.getHasFinished() && !this.alreadyLoaded) {
      return (
        <>
          <br />
          <FullHeightTextCenterBlock size="caption">Loading...</FullHeightTextCenterBlock>
          <br />
        </>
      );
    }

    if (!conversation) {
      return (
        <>
          <br />
          <FullHeightTextCenterBlock size="caption">Conversation not found!</FullHeightTextCenterBlock>
          <br />
        </>
      );
    }

    const { conversationParticipants } = conversation;
    const { id: userId, organization: userOrganization } = user;
    const { id: userOrganizationId } = userOrganization;
    const { viewingAsParticipant } = this.props;
    const otherClientParticipant = conversationParticipants.find(p => p.participantID !== userId && p.participantType === CONVERSATION_PARTICIPANT_TYPE_CLIENT);
    const userOrgParticipant = conversationParticipants.find(p => p.participantID === userOrganizationId && p.participantType === CONVERSATION_PARTICIPANT_TYPE_ORGANIZATION);
    const name = getConversationName(conversation, user);
    const otherParticipantIsClient = !!otherClientParticipant;
    const sendMessageFormPlaceholder = otherClientParticipant && otherClientParticipant.participantInfo && `Message ${otherClientParticipant.participantInfo.name.split(' ').shift()}...`;

    const heading = (
      <HeaderWrapper>
        <BackLink onClick={onBackClick} />
        <FullWidthTextCenterBlock size="subtitle" palette={otherParticipantIsClient ? 'primary' : 'slate'}>
          {otherParticipantIsClient
            ? <Link size="subtitle" to={generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id: otherClientParticipant.participantID, tab: SUMMARY })}>{name}</Link>
            : name
          }
        </FullWidthTextCenterBlock>
      </HeaderWrapper>
    );

    const headingBoxSection = (
      <StyledHeadingBoxSection heading={heading} hasNoBodyPadding hasNoBorder />
    );

    this.alreadyLoaded = true;
    const viewingAsParticipantUnreadMessageCount = viewingAsParticipant ? viewingAsParticipant.stats.unreadMessageCount : 0;
    const unreadMessagesNumber = viewingAsParticipantUnreadMessageCount > 12 ? `${viewingAsParticipantUnreadMessageCount}+` : viewingAsParticipantUnreadMessageCount;
    const lastReadMessageFormattedDate = dayjs(viewingAsParticipantUnreadMessageCount).format('hh:mm A on MMMM Do');

    return (
      <ContainerWrapper className={className}>
        {headingBoxSection}
        <MessagesWrapper ref={this.messagesRef}>
          {!messages.length && (
            <>
              <br />
              <FullHeightTextCenterBlock size="caption">No messages</FullHeightTextCenterBlock>
            </>
          )}
          {messages.length > 0 && (
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
                participants={conversationParticipants}
                newMessageRef={this.newMessageRef}
                onButtonClick={this.handleButtonClick}
              />
            </>
          )}
        </MessagesWrapper>
        <StyledSendMessageFormContainer
          conversation={conversation}
          placeholder={sendMessageFormPlaceholder}
          canCreateParticipant={!viewingAsParticipant && userOrgParticipant}
          otherParticipantId={userId}
          otherParticipantType={CONVERSATION_PARTICIPANT_TYPE_USER}
          disabled={!viewingAsParticipant && !userOrgParticipant}
          onCreateConversationSuccess={onCreateConversationSuccess}
        />
      </ContainerWrapper>
    );
  }
}
