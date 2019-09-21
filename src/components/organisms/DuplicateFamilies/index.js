import React from 'react';
import { func, arrayOf } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import clientPropType from 'sly/propTypes/client';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';
import FamilyEntry from 'sly/components/molecules/FamilyEntry';

const ClientsWrapper = styled.div`
  display: grid;
  grid-gap: ${size('spacing.large')};
`;

const DuplicateFamilies = ({
  onAddFamily, clients,
}) => (
  <ThreeSectionFormTemplate
    hasSubmit
    noFooter
    buttonsFullWidth
    heading="Duplicate families detected"
    description="Looks like there are leads with matching phone numbers and/or emails. If you still want to proceed, click Add Family below."
    submitButtonText="Add family"
    onSubmit={onAddFamily}
  >
    <ClientsWrapper>
      {clients.map(c => <FamilyEntry key={c.id} client={c} />)}
    </ClientsWrapper>
  </ThreeSectionFormTemplate>
);

DuplicateFamilies.propTypes = {
  onAddFamily: func,
  clients: arrayOf(clientPropType).isRequired,
};

export default DuplicateFamilies;
