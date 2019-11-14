import React from 'react';
import { func, arrayOf, string, bool } from 'prop-types';
import styled from 'styled-components';
import { generatePath } from 'react-router';

import { size } from 'sly/components/themes';
import clientPropType from 'sly/propTypes/client';
import { AGENT_DASHBOARD_FAMILIES_DETAILS_PATH } from 'sly/constants/dashboardAppPaths';
import { Link } from 'sly/components/atoms';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';
import FamilyEntry from 'sly/components/molecules/FamilyEntry';

const ClientsWrapper = styled.div`
  display: grid;
  grid-gap: ${size('spacing.large')};
`;

const DuplicateFamilies = ({
  handleSubmit, clients, heading, description, hasButton, className, noTopSpacing,
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
      {clients.map(c => <Link key={c.id} target="_blank" to={generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id: c.id })}><FamilyEntry client={c} /></Link>)}
    </ClientsWrapper>
  </ThreeSectionFormTemplate>
);

DuplicateFamilies.propTypes = {
  handleSubmit: func,
  clients: arrayOf(clientPropType).isRequired,
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
