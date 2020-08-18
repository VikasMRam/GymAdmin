import React from 'react';
import { func, arrayOf, string, bool } from 'prop-types';
import styled from 'styled-components';
import { generatePath } from 'react-router';

import { size } from 'sly/common/components/themes';
import clientPropType from 'sly/common/propTypes/client';
import { AGENT_DASHBOARD_FAMILIES_DETAILS_PATH } from 'sly/web/constants/dashboardAppPaths';
import { phoneFormatter } from 'sly/web/services/helpers/phone';
import { Link, Block } from 'sly/common/components/atoms';
import ThreeSectionFormTemplate from 'sly/web/components/molecules/ThreeSectionFormTemplate';
import FamilyEntry from 'sly/web/components/molecules/FamilyEntry';

const ClientsWrapper = styled.div`
  display: grid;
  grid-gap: ${size('spacing.large')};
`;

const DuplicateInfoWrapper = styled.div`
  display: grid;
  grid-gap: ${size('spacing.xLarge')};
  grid-template-columns: 1fr 1fr;
`;

const DuplicateFamilies = ({
  handleSubmit, clients, currentClient, heading, description, hasButton, className, noTopSpacing,
}) => (
  <ThreeSectionFormTemplate
    hasSubmit={hasButton}
    noFooter
    buttonsFullWidth
    heading={heading}
    description={description}
    submitButtonText="Add family"
    onSubmit={handleSubmit}
    className={className}
    noTopSpacing={noTopSpacing}
  >
    <ClientsWrapper>
      {clients.filter(c => c.id !== currentClient.id).map(c => (
        <Link key={c.id} target="_blank" to={generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id: c.id })}>
          <FamilyEntry client={c}>
            {c.clientInfo.phoneNumber && currentClient.clientInfo.phoneNumber === c.clientInfo.phoneNumber &&
              <DuplicateInfoWrapper>
                <Block palette="grey" size="caption">Duplicate phone number</Block>
                <Block size="caption">{phoneFormatter(c.clientInfo.phoneNumber)}</Block>
              </DuplicateInfoWrapper>
            }
            {c.clientInfo.email && currentClient.clientInfo.email === c.clientInfo.email &&
              <DuplicateInfoWrapper>
                <Block palette="grey" size="caption">Duplicate email</Block>
                <Block size="caption">{c.clientInfo.email}</Block>
              </DuplicateInfoWrapper>
            }
          </FamilyEntry>
        </Link>
      ))}
    </ClientsWrapper>
  </ThreeSectionFormTemplate>
);

DuplicateFamilies.propTypes = {
  handleSubmit: func,
  clients: arrayOf(clientPropType).isRequired,
  currentClient: clientPropType.isRequired,
  heading: string.isRequired,
  description: string,
  hasButton: bool,
  className: string,
  noTopSpacing: bool,
};

DuplicateFamilies.defaultProps = {
  heading: 'Duplicate families detected',
};

export default DuplicateFamilies;
