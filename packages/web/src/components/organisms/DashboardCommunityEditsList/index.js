import React, { Component, useContext } from 'react';
import { arrayOf, object } from 'prop-types';
import styled from 'styled-components';

import { size, palette, columnWidth } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import {
  Block,
  Button,
  Table,
  TBody,
  Td,
  THead,
  Tr,
} from 'sly/web/components/atoms';
import Th from 'sly/web/components/molecules/Th';
import CommunityEditRowCard
  from 'sly/web/components/organisms/CommunityEditRowCard';
import communityPropType from 'sly/web/propTypes/community';
import { textAlign } from 'sly/web/components/helpers/text';

const StyledButton = pad(Button, 'regular');
StyledButton.displayName = 'StyledButton';

const Warning = pad(styled(Block)`
  background-color: ${palette('warning.filler')};
  border-radius: ${size('border.xxLarge')};
  text-align: center;
  padding: ${size('spacing.large')};
`, 'xLarge');
Warning.displayName = 'Warning';

const FormScrollSection = styled.div`
  // max-height: calc(100vh - 240px);
`;

const IntroInfo = textAlign(styled(Block)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('tabletLayout.gutter')};
    flex: 0 0 ${columnWidth(3, size('layout.gutter'))};
  }
`, 'left');
IntroInfo.displayName = 'IntroInfo';

const FormSection = styled.div`
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
  padding-bottom: 0;
  border-bottom: ${size('border.regular')} solid ${palette('slate', 'stroke')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
    padding-bottom: 0;
  }
`;

const NoResultMessage = styled(textAlign(Block))`
  padding-top: ${size('spacing.xxxLarge')};
  padding-bottom: ${size('spacing.xxxLarge')};
`;

const FormSectionHeading = pad(Block, 'large');

const TABLE_HEADINGS = [
  'Last change submitted',
  'User',
  'Status',
];

export default function DashboardCommunityEditsList({ suggestedEdits, community }) {
  return (
    <FormScrollSection>
      <FormSection>
        <FormSectionHeading weight="medium">Metadata</FormSectionHeading>
      </FormSection>
      <Table snap="all">
        <THead>
          <Tr>
            {TABLE_HEADINGS.map(text => <Th key={text}>{text}</Th>)}
          </Tr>
        </THead>
        <TBody>
          {suggestedEdits.map(suggestedEdit => (
            <CommunityEditRowCard
              key={suggestedEdit.id}
              community={community}
              suggestedEdit={suggestedEdit}
            />
          ))}
          {suggestedEdits.length === 0 && (
            <Tr>
              <Td colSpan={TABLE_HEADINGS.length}>
                <NoResultMessage>There are no edits</NoResultMessage>
              </Td>
            </Tr>
          )}
        </TBody>
      </Table>
    </FormScrollSection>
  );
}

DashboardCommunityEditsList.propTypes = {
  suggestedEdits: arrayOf(object),
  community: communityPropType,
};
