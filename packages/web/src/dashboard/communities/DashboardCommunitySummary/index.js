import React from 'react';
import { string } from 'prop-types';
import { generatePath } from 'react-router';

import communityPropType from 'sly/common/propTypes/community';
import { Link } from 'sly/web/components/atoms';
import { formatAddress } from 'sly/web/services/helpers/community';
import {
  SummaryRow,
  SummarySection, SummarySectionBody,
  SummarySectionHeader,
} from 'sly/web/dashboard/DashboardWithSummaryTemplate';
import { DASHBOARD_COMMUNITIES_DETAIL_PATH, PROFILE } from 'sly/web/dashboard/dashboardAppPaths';

export default class DashboardCommunitySummary extends React.Component {
  static propTypes = {
    community: communityPropType,
    className: string,
  };

  render() {
    const { community, className } = this.props;
    const { id, propInfo: info } = community;

    const pathFor = (tab, field) => `${generatePath(DASHBOARD_COMMUNITIES_DETAIL_PATH, { id, tab })}#${field}`;
    const linkTo = (name, tab, field) => <Link to={pathFor(tab, field)}>Set {name}...</Link>;

    const address = formatAddress(community.address) || linkTo();
    const email = info.ownerEmail || info.websiteEmail;
    // contact email address and capacity information
    return (
      <SummarySection className={className}>
        <SummarySectionHeader>
          Summary
        </SummarySectionHeader>
        <SummarySectionBody>
          <SummaryRow label="Address">
            {address || linkTo(
              'address',
              PROFILE,
              'address.line1',
            )}
          </SummaryRow>
          <SummaryRow label="License number">
            {info.licenseNumber || linkTo(
              'license number',
              PROFILE,
              'propInfo.licenseNumber',
            )}
          </SummaryRow>
          <SummaryRow label="Front desk phone">
            {info.communityPhone || linkTo(
              'phone',
              PROFILE,
              'propInfo.communityPhone',
            )}
          </SummaryRow>
          <SummaryRow label="Email">
            {email || linkTo(
              'email',
              PROFILE,
              'propInfo.ownerEmail',
            )}
          </SummaryRow>
          <SummaryRow label="Capacity">
            {info.communitySize || linkTo(
              'community size',
              PROFILE,
              'propInfo.communitySize',
            )}
          </SummaryRow>
        </SummarySectionBody>
      </SummarySection>
    );
  }
}
