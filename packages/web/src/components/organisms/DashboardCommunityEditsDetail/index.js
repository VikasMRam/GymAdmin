import React, { useContext } from 'react';
import { bool, func, object } from 'prop-types';
import styled from 'styled-components';

import { size, palette, columnWidth } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import textAlign from 'sly/web/components/helpers/textAlign';
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
import { CardRow, CellWithLabel } from 'sly/web/components/atoms/TableCard';
import { EditContext } from 'sly/web/services/edits';
import { FormSection, SectionHeader } from 'sly/web/components/templates/DashboardWithSummaryTemplate';
import Link from 'sly/web/components/atoms/Link';
import {
  DASHBOARD_COMMUNITIES_DETAIL_PATH,
  PHOTOS,
} from 'sly/web/constants/dashboardAppPaths';
import { generatePath } from 'react-router';
import communityPropType from 'sly/web/propTypes/community';

const StyledButton = pad(Button, 'regular');
StyledButton.displayName = 'StyledButton';

const Warning = pad(styled(Block)`
  background-color: ${palette('warning.filler')};
  border-radius: ${size('border.xxLarge')};
  text-align: center;
  padding: ${size('spacing.large')};
`, 'xLarge');
Warning.displayName = 'Warning';

const IntroInfo = textAlign(styled(Block)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('tabletLayout.gutter')};
    flex: 0 0 ${columnWidth(3, size('layout.gutter'))};
  }
`, 'left');
IntroInfo.displayName = 'IntroInfo';

const TABLE_HEADINGS = [
  'Section',
  'Field',
  'Last edit',
  'Changed from',
];

const formatValue = value => typeof value === 'string' ? value : JSON.stringify(value);
const ChangeRow = ({ change, pathFor }) => {
  const { editConfig } = useContext(EditContext);
  const { sectionMap, fieldNames } = editConfig;
  return (
    <CardRow>
      <CellWithLabel label="Section">
        {sectionMap[change.path]}
      </CellWithLabel>
      <CellWithLabel label="Field">
        {fieldNames[change.path] || change.path}
      </CellWithLabel>
      {change.path === 'gallery.images' && (
        <CellWithLabel label="Last edit" colSpan={2}>
          <Link to={pathFor(PHOTOS)}>See in photos section</Link>
        </CellWithLabel>
      )}
      {change.path !== 'gallery.images' && (
        <>
          <CellWithLabel label="Last edit">
            {formatValue(change.rhs)}
          </CellWithLabel>
          <CellWithLabel label="Changed from">
            {formatValue(change.lhs)}
          </CellWithLabel>
        </>
      )}
    </CardRow>
  );
};

ChangeRow.propTypes = {
  change: object,
  pathFor: func,
};

export default function DashboardCommunityEditsDetail({ community, canEdit, approveEdit, rejectEdit }) {
  const { selectedEdit } = useContext(EditContext);
  const { id } = selectedEdit;
  const disabled = selectedEdit.status !== 'Initialized';
  const approve = () => approveEdit({ id }, {});
  const reject = () => rejectEdit({ id }, {});
  const actions = canEdit ? (
    <>
      <Button which="regular" ghost palette="danger" kind="label" disabled={disabled} onClick={reject}>Reject edits</Button>
      <Button which="regular" ghost palette="slate" kind="label" disabled={disabled} onClick={approve}>Accept edits</Button>
    </>
  ) : null;

  const pathFor = tab => generatePath(DASHBOARD_COMMUNITIES_DETAIL_PATH, {
    id: community.id,
    tab,
  });

  return (
    <>
      <SectionHeader actions={actions}>
        Metadata
      </SectionHeader>
      <Table>
        <THead>
          <Tr>
            {TABLE_HEADINGS.map(text => <Th key={text}>{text}</Th>)}
          </Tr>
        </THead>
        <TBody>
          {Object.values(selectedEdit.changes).map((change) => {
            return (
              <ChangeRow
                key={change.path}
                change={change}
                pathFor={pathFor}
              />
            );
          })}
        </TBody>
      </Table>
    </>
  );
}

DashboardCommunityEditsDetail.propTypes = {
  approveEdit: func,
  rejectEdit: func,
  canEdit: bool,
  community: communityPropType,
};