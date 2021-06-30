import React from 'react';
import { string } from 'prop-types';
import { generatePath } from 'react-router';

import listingPropType from 'sly/common/propTypes/listing';
import { Link } from 'sly/web/components/atoms';
import { formatAddress } from 'sly/web/services/helpers/community';
import {
  SummaryRow,
  SummarySection, SummarySectionBody,
  SummarySectionHeader,
} from 'sly/web/dashboard/DashboardWithSummaryTemplate';
import { DASHBOARD_LISTINGS_DETAIL_PATH, PROFILE } from 'sly/web/dashboard/dashboardAppPaths';

export default class DashboardListingSummary extends React.Component {
  static propTypes = {
    listing: listingPropType,
    className: string,
  };

  render() {
    const { listing, className } = this.props;
    const { id, info } = listing;

    const pathFor = (tab, field) => `${generatePath(DASHBOARD_LISTINGS_DETAIL_PATH, { id, tab })}#${field}`;
    const linkTo = (name, tab, field) => <Link to={pathFor(tab, field)}>Set {name}...</Link>;

    const address = formatAddress(listing.address) || linkTo();
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
          <SummaryRow label="Front desk phone">
            {info.phoneNumber || linkTo(
              'phone',
              PROFILE,
              'info.phoneNumber',
            )}
          </SummaryRow>
        </SummarySectionBody>
      </SummarySection>
    );
  }
}
