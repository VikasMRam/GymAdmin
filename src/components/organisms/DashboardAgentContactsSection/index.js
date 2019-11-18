import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, object, string, bool, func } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import pad from 'sly/components/helpers/pad';
import SlyEvent from 'sly/services/helpers/events';
import contactPropType from 'sly/propTypes/contact';
import textAlign from 'sly/components/helpers/textAlign';
import { Box, Table, THead, TBody, Tr, Td, Heading, Block } from 'sly/components/atoms';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import Pagination from 'sly/components/molecules/Pagination';
import Th from 'sly/components/molecules/Th';
import IconButton from 'sly/components/molecules/IconButton';
import ContactRowCard from 'sly/components/organisms/ContactRowCard';

const TABLE_HEADINGS = [
  { text: 'Contact name' },
  { text: 'Community' },
  { text: 'Email' },
  { text: 'Phone number' },
];

const Section = styled.section`
  background-color: ${palette('grey.background')};
  padding: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0;
    background-color: ${palette('white.base')};
    border: ${size('border.regular')} solid ${palette('slate.stroke')};
    border-top: 0;
    border-bottom: 0;
  }
`;

const StyledTable = styled(Table)`
  border-right: 0;
  border-left: 0;
`;

const CenteredPagination = styled(Pagination)`
  padding: ${size('spacing.large')};
  justify-content: center;
`;

const StyledPagination = styled(mobileOnly(CenteredPagination, css`
  position: sticky;
`))`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    border-bottom: ${size('border.regular')} solid ${palette('slate.stroke')};
  }
`;

const FamiliesCountStatusBlock = pad(styled(Box)`
  border-radius: 0;
  padding-left: ${size('spacing.regular')};
  padding-left: ${size('spacing.large')};
  background-color: ${palette('white.base')};
`, 'large');

const StyledFamiliesCountStatusBlock = styled(FamiliesCountStatusBlock)`
  margin-bottom: 0;
  border-left: none;
  border-right: none;
  border-bottom: none;
`;

const TwoColumn = pad(styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  ${Heading} {
    margin-bottom: 0;
  }
`);

const NoResultMessage = styled(textAlign(Block))`
  padding-top: ${size('spacing.xxxLarge')};
  padding-bottom: ${size('spacing.xxxLarge')};
`;

const StyledTableHeaderButtons = styled(TableHeaderButtons)`
  border: none;
`;

const StyledSection = styled(Section)`
  border: none;
`;

export default class DashboardAgentContactsSection extends Component {
  static propTypes = {
    datatable: object,
    contacts: arrayOf(contactPropType),
    contactsRaw: arrayOf(object),
    pagination: object,
    paginationString: string,
    showPagination: bool,
    isPageLoading: bool,
    meta: object,
    refetchContacts: func,
  };

  handleAddContactClick = () => {
    SlyEvent.getInstance().sendEvent({
      category: 'AgentDashboardContacts',
      action: 'click',
      label: 'addContact',
    });
  };

  handleContactClick = (contact) => {
    SlyEvent.getInstance().sendEvent({
      category: 'AgentDashboardContacts',
      action: 'click',
      label: 'viewContact',
    });
  };

  render() {
    const { contacts, pagination, isPageLoading, noBorder, meta, datatable } = this.props;

    return (
      <>
        <TwoColumn>
          <Heading level="subtitle">Contacts</Heading>
          <IconButton icon="plus" hideTextInMobile onClick={this.handleAddContactClick}>
            Add contact
          </IconButton>
        </TwoColumn>
        <StyledTableHeaderButtons
          datatable={datatable}
          modelConfig={{ name: 'Contact', defaultSearchField: 'name' }}
          meta={meta}
        />

        <StyledSection>
          {!isPageLoading && (
            <>
              <StyledTable>
                <THead>
                  <Tr>
                    {TABLE_HEADINGS.map(({ text }) => <Th key={text}>{text}</Th>)}
                  </Tr>
                </THead>
                <TBody>
                  {contacts.map(contact => (
                    <ContactRowCard key={contact.id} contact={contact} onContactClick={() => this.handleContactClick(contact)} />
                  ))}
                  {contacts.length === 0 &&
                    <Tr>
                      <Td colSpan={TABLE_HEADINGS.length} borderless={noBorder}>
                        <NoResultMessage>Nice! You are on top of all your tasks here.</NoResultMessage>
                      </Td>
                    </Tr>
                  }
                </TBody>
              </StyledTable>
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
          )}
          {isPageLoading && 'Loading...'}
        </StyledSection>

        {!isPageLoading && contacts.length > 0 &&
          <StyledFamiliesCountStatusBlock padding="regular" size="caption" snap="top">
            {pagination.text}
          </StyledFamiliesCountStatusBlock>
        }
      </>
    );
  }
}
