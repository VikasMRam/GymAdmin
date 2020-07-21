import React, { Component, useContext } from 'react';
import { arrayOf, object } from 'prop-types';

import {
  Block,
  Table,
  TBody,
  Td,
  THead,
  Tr,
} from 'sly/web/components/atoms';
import Th from 'sly/web/components/molecules/Th';
import CommunityEditRowCard
  from 'sly/web/components/organisms/CommunityEditRowCard';
import communityPropType from 'sly/common/propTypes/community';
import { Section, SectionHeader } from 'sly/web/components/templates/DashboardWithSummaryTemplate';

const TABLE_HEADINGS = [
  'Last change submitted',
  'User',
  'Status',
];

export default function DashboardCommunityEditsList({ suggestedEdits, community }) {
  return (
    <Section>
      <SectionHeader>
        Images
      </SectionHeader>
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
                <Block
                  padding="xxxLarge"
                  align="center"
                >
                  There are no edits
                </Block>
              </Td>
            </Tr>
          )}
        </TBody>
      </Table>
    </Section>
  );
}

DashboardCommunityEditsList.propTypes = {
  suggestedEdits: arrayOf(object),
  community: communityPropType,
};
