import React, { Component } from 'react';
import { object, string, arrayOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import { withUser, prefetch } from 'sly/services/api';
import userPropType from 'sly/propTypes/user';
import { Heading, Box } from 'sly/components/atoms';
import EmailListItem from 'sly/components/molecules/EmailListItem';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import Pagination from 'sly/components/molecules/Pagination';
import { getDetailedPaginationData } from 'sly/services/helpers/pagination';
import { withDatatable } from 'sly/services/datatable';

const HeadingWrapper = styled.div`
  padding: ${size('spacing', 'xLarge')};
  background-color: ${palette('white', 'base')};
  border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
  border-top-left-radius: ${size('border.xLarge')};
  border-top-right-radius: ${size('border.xLarge')};
`;

const EmailsWrapper = styled(Box)`
  background-color: ${palette('white', 'base')};
  padding: ${ifProp('hasEmails', 0, null)};
  border: ${ifProp('hasEmails', 0, null)};

  > * {
    border-top: 0;
  }
`;

const EmptyResultWrapper = styled.div`
  padding: ${size('spacing', 'large')};
  text-align: center;
`;

const CenteredPagination = styled(Pagination)`
  padding: ${size('spacing.large')};
  justify-content: center;
`;

const StyledPagination = styled(mobileOnly(CenteredPagination, css`
  position: sticky;
  bottom: 0;
  background-color: ${palette('grey.background')};
`))`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    border-bottom: ${size('border.regular')} solid ${palette('slate.stroke')};
  }
`;

@withUser
@withDatatable('emails')
@prefetch('emails', 'getEmails', (req, { clientId, agentId, datatable }) => {
  const payload = datatable.query;
  if (clientId) {
    payload['filter[client]'] = clientId;
  } else if (agentId) {
    payload['filter[agent]'] = agentId;
  }
  return req(payload);
})
export default class DashboardEmailsContainer extends Component {
  static propTypes = {
    heading: string,
    user: userPropType,
    status: object,
    datatable: object,
    emails: arrayOf(object),
  };

  onEmailClick = (email) => {
    window.open(`/email/view/${email.id}`, '_blank');
  }

  render() {
    const { heading, datatable, status, emails } = this.props;
    const { emails: emailsStatus } = status;
    const { hasFinished: emailsHasFinished, meta } = emailsStatus;
    const isLoading = !emailsHasFinished;
    const pagination = getDetailedPaginationData(emailsStatus, 'emails');

    let emailsComponent = null;
    let hasEmails = false;
    if (isLoading && !emails) {
      emailsComponent = <EmptyResultWrapper>Loading...</EmptyResultWrapper>;
    } else if (emails.length === 0) {
      emailsComponent = <EmptyResultWrapper>No Emails</EmptyResultWrapper>;
    } else {
      hasEmails = true;
      emailsComponent = emails.map(email => (
        <EmailListItem
          key={email.id}
          name={email.from}
          subject={email.subject}
          body={email.html}
          timestamp={email.createdAt}
          onClick={() => this.onEmailClick(email)}
        />
      ));
    }
    const modelConfig = { name: 'Email', defaultSearchField: 'subject' };
    return (
      <>
        <HeadingWrapper>
          <Heading size="subtitle">{heading}</Heading>
        </HeadingWrapper>
        <TableHeaderButtons
          datatable={datatable}
          modelConfig={modelConfig}
          meta={meta || {}}
        />
        <EmailsWrapper snap="top" hasEmails={hasEmails}>
          {emailsComponent}
        </EmailsWrapper>
        {pagination.show && (
          <StyledPagination
            current={pagination.current}
            total={pagination.total}
            range={1}
            basePath={datatable.basePath}
            pageParam="page-number"
          />
        )}
      </>
    );
  }
}
