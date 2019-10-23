import React, { Component, createRef } from 'react';
import { arrayOf, object, func, string, node } from 'prop-types';
import dayjs from 'dayjs';
import build from 'redux-object';
import styled from 'styled-components';
import { generatePath } from 'react-router';

import { size, palette } from 'sly/components/themes';
import { prefetch, withUser, query } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import messagePropType from 'sly/propTypes/conversation/conversationMessage';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import conversationParticipantPropType from 'sly/propTypes/conversation/conversationParticipant';
import { MESSAGES_UPDATE_LAST_READ_TIMEOUT, CONVERSATION_PARTICIPANT_TYPE_CLIENT } from 'sly/constants/conversations';
import { CONVERSTION_PARTICIPANT_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import { NOTIFY_MESSAGE_NEW } from 'sly/constants/notifications';
import withWS from 'sly/services/ws/withWS';
import Role from 'sly/components/common/Role';
import textAlign from 'sly/components/helpers/textAlign';
import fullHeight from 'sly/components/helpers/fullHeight';
import displayOnlyIn from 'sly/components/helpers/displayOnlyIn';
import fullWidth from 'sly/components/helpers/fullWidth';
import SlyEvent from 'sly/services/helpers/events';
import pad from 'sly/components/helpers/pad';
import { isAfter } from 'sly/services/helpers/date';
import {
  AGENT_DASHBOARD_MESSAGES_PATH,
  FAMILY_DASHBOARD_MESSAGES_PATH,
  AGENT_DASHBOARD_FAMILIES_DETAILS_PATH,
  SUMMARY,
} from 'sly/constants/dashboardAppPaths';
import { CUSTOMER_ROLE, AGENT_ND_ROLE } from 'sly/constants/roles';
import { Block, Button, Link } from 'sly/components/atoms';
import ConversationMessages from 'sly/components/organisms/ConversationMessages';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import IconButton from 'sly/components/molecules/IconButton';
import HeadingBoxSection from 'sly/components/molecules/HeadingBoxSection';
import BackLink from 'sly/components/molecules/BackLink';
import SendMessageFormContainer from 'sly/containers/SendMessageFormContainer';

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

@prefetch('messages', 'getConversationMessages', (req, { conversationId }) => req({
  'filter[conversationID]': conversationId,
  sort: '-created_at',
  'page-size': 1000, // todo: remove after api fix
}))

@prefetch('conversation', 'getConversation', (req, { conversationId }) => req({
  id: conversationId,
}))

@query('getConversationMessages', 'getConversationMessages')

@query('updateConversationParticipant', 'updateConversationParticipant')

@withWS

@withUser

export default class ConversationMessagesContainer extends Component {
  static propTypes = {
    ws: object,
    conversationId: string.isRequired,
    messages: arrayOf(messagePropType),
    conversation: conversationPropType,
    user: userPropType,
    status: object,
    viewingAsParticipant: conversationParticipantPropType,
    participants: arrayOf(conversationParticipantPropType),
    updateConversationParticipant: func.isRequired,
    getConversationMessages: func.isRequired,
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
    const { conversation, className, onCreateConversationSuccess, user } = this.props;
    const { messages, loadingMore } = this.state;

    if (!this.getHasFinished() && !this.alreadyLoaded) {
      return (
        <>
          <br />
          <FullHeightTextCenterBlock size="caption">Loading...</FullHeightTextCenterBlock>
        </>
      );
    }

    if (!conversation) {
      return (
        <>
          <br />
          <FullHeightTextCenterBlock size="caption">Conversation not found!</FullHeightTextCenterBlock>
        </>
      );
    }

    const { conversationParticipants } = conversation;
    const { id } = user;
    const viewingAsParticipant = conversationParticipants.find(p => p.participantID === id);
    const otherParticipant = conversationParticipants.find(p => p.participantID !== id);
    const name = otherParticipant && otherParticipant.participantInfo ? otherParticipant.participantInfo.name : '';
    const otherParticipantIsClient = otherParticipant.participantType === CONVERSATION_PARTICIPANT_TYPE_CLIENT;
    const sendMessageFormPlaceholder = otherParticipant && otherParticipant.participantInfo && `Message ${otherParticipant.participantInfo.name.split(' ').shift()}...`;

    const heading = (
      <HeaderWrapper>
        <Role is={CUSTOMER_ROLE}>
          <BackLink to={FAMILY_DASHBOARD_MESSAGES_PATH} />
        </Role>
        <Role is={AGENT_ND_ROLE}>
          <BackLink to={AGENT_DASHBOARD_MESSAGES_PATH} />
        </Role>
        <FullWidthTextCenterBlock size="subtitle" palette={otherParticipantIsClient && 'primary'}>
          {otherParticipantIsClient
            ? <Link size="subtitle" to={generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id: otherParticipant.participantID, tab: SUMMARY })}>{name}</Link>
            : name
          }
        </FullWidthTextCenterBlock>
      </HeaderWrapper>
    );

    const headingBoxSection = (
      <HeadingBoxSection heading={heading} hasNoBodyPadding hasNoBorder />
    );

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
                participants={conversationParticipants}
                newMessageRef={this.newMessageRef}
              />
            </>
          )}
        </MessagesWrapper>
        <StyledSendMessageFormContainer
          conversation={conversation}
          otherParticipantId={otherParticipant.id}
          otherParticipantType={otherParticipant.type}
          placeholder={sendMessageFormPlaceholder}
          disabled={!(otherParticipant.id && otherParticipant.type) && !viewingAsParticipant}
          onCreateConversationSuccess={onCreateConversationSuccess}
        />
      </ContainerWrapper>
    );
  }
}
