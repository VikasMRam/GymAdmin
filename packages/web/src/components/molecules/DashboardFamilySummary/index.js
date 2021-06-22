import React from 'react';
import { string, bool, func } from 'prop-types';

import clientPropType from 'sly/common/propTypes/client';
import { Link } from 'sly/web/components/atoms';
import Role from 'sly/web/components/common/Role';
import { AGENT_ND_ROLE, PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/common/constants/roles';
import { clickEventHandler } from 'sly/web/services/helpers/eventHandlers';
import { FAMILY_STAGE_NEW } from 'sly/web/constants/familyDetails';
import { phoneFormatter } from 'sly/web/services/helpers/phone';
import FamilyStage from 'sly/web/components/molecules/FamilyStage';
import {
  SummaryRow,
  SummarySection, SummarySectionBody,
  SummarySectionHeader,
} from 'sly/web/dashboard/DashboardWithSummaryTemplate';
import userPropType from 'sly/common/propTypes/user';

const DashboardFamilySummary = ({
  snap,
  client,
  isAgentUser,
  to,
  stageText,
  onAcceptClick,
  onRejectClick,
  onUpdateClick,
  onAddNoteClick,
  user,
  className,
}) => (
  <SummarySection className={className}>
    <SummarySectionHeader snap={snap} startingWith="laptop">
      Stage
    </SummarySectionHeader>

    <SummarySectionBody
      startingWith="laptop"
      snap="vertical"
    >
      <FamilyStage
        client={client}
        user={user}
        stageText={stageText}
        onAcceptClick={onAcceptClick}
        onRejectClick={onRejectClick}
        onUpdateClick={onUpdateClick}
        onAddNoteClick={onAddNoteClick}
      />
    </SummarySectionBody>

    <SummarySectionHeader>
      Summary
    </SummarySectionHeader>

    <SummarySectionBody>
      {client.uuidAux && client.uuidAux.uuidInfo && client.uuidAux.uuidInfo.residentInfo.fullName &&
        <SummaryRow label="Resident name">
          {client.uuidAux.uuidInfo.residentInfo.fullName}
        </SummaryRow>
      }
      {client.stage !== FAMILY_STAGE_NEW && client.clientInfo && client.clientInfo.phoneNumber &&
        <SummaryRow label="Phone number">
          <Link href={`tel:+1${client.clientInfo.phoneNumber}`} onClick={clickEventHandler('fdetails-summary', 'phone')} target="_blank">
            {phoneFormatter(client.clientInfo.phoneNumber, true)}
          </Link>
        </SummaryRow>
      }
      {client.stage !== FAMILY_STAGE_NEW && client.clientInfo && client.clientInfo.email &&
        <SummaryRow label="Email">
          <Link href={`mailto:${client.clientInfo.email}`} onClick={clickEventHandler('fdetails-summary', 'email')} target="_blank" >Click To Send Email</Link>
        </SummaryRow>
      }
      {client.clientInfo && client.clientInfo.referralSource &&
        <SummaryRow label="Source">
          {client.clientInfo.referralSource}
        </SummaryRow>
      }
      {!isAgentUser && client.uuidAux && client.uuidAux.uuidInfo && client.uuidAux.uuidInfo.financialInfo.medicaid &&
        <SummaryRow label="Medicaid">
          Chose Qualifies on Wizard
        </SummaryRow>
      }
      {client.uuidAux && client.uuidAux.uuidInfo && client.uuidAux.uuidInfo.housingInfo.lookingFor &&
        <SummaryRow label="Looking for">
          {client.uuidAux.uuidInfo.housingInfo.lookingFor}
        </SummaryRow>
      }
      {client.uuidAux && client.uuidAux.uuidInfo && client.uuidAux.uuidInfo.residentInfo.gender &&
        <SummaryRow label="Gender">
          {client.uuidAux.uuidInfo.residentInfo.gender}
        </SummaryRow>
      }
      {client.uuidAux && client.uuidAux.uuidInfo && client.uuidAux.uuidInfo.locationInfo &&
        <SummaryRow label="Preferred location">
          {client.uuidAux.uuidInfo.locationInfo.city ? [client.uuidAux.uuidInfo.locationInfo.city, client.uuidAux.uuidInfo.locationInfo.state].filter(v => v).join(', ') : 'None'}
        </SummaryRow>
      }
      {client.uuidAux && client.uuidAux.uuidInfo && client.uuidAux.uuidInfo.housingInfo.moveTimeline &&
        <SummaryRow label="Time to move">
          {client.uuidAux.uuidInfo.housingInfo.moveTimeline}
        </SummaryRow>
      }
      {client.clientInfo && client.clientInfo.slyMessage &&
        <SummaryRow label="Seniorly introduction" collapsible>
          {client.clientInfo.slyMessage}
        </SummaryRow>
      }
      {client.clientInfo && client.clientInfo.slyAgentMessage &&
       /* eslint-disable-next-line no-bitwise */
      <Role is={PLATFORM_ADMIN_ROLE | AGENT_ND_ROLE}>
        <SummaryRow label="Message" collapsible>
          {client.clientInfo.slyAgentMessage}
        </SummaryRow>
      </Role>
       }
      {client.clientInfo && client.clientInfo.slyCommunityMessage &&
         /* eslint-disable-next-line no-bitwise */
        <Role is={PLATFORM_ADMIN_ROLE | PROVIDER_OD_ROLE}>
          <SummaryRow label="Message" collapsible>
            {client.clientInfo.slyCommunityMessage}
          </SummaryRow>
        </Role>
      }

      {client.admin &&
        <SummaryRow label="Assigned to">
          {client.admin.name}
        </SummaryRow>
      }

      {client.organization &&
        <SummaryRow label="Business name">
          {client.organization.name}
        </SummaryRow>
      }
      <Link
        to={to}
        event={{ category: 'fdetails-summary', label: 'seeMoreFamilyDetails' }}
        size="caption"
      >
        See more family details
      </Link>
    </SummarySectionBody>
  </SummarySection>
);

DashboardFamilySummary.propTypes = {
  client: clientPropType,
  user: userPropType,
  isAgentUser: bool,
  to: string.isRequired,
  className: string,
  stageText: string,
  onAcceptClick: func,
  snap: string,
  onRejectClick: func,
  onUpdateClick: func,
  onAddNoteClick: func,
};

DashboardFamilySummary.defaultProps = {
  noHeading: false,
};

export default DashboardFamilySummary;
