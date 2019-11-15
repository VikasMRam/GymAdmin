import React from 'react';
import styled, { css } from 'styled-components';
import { func, string, bool } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import contactPropType from 'sly/propTypes/contact';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import pad from 'sly/components/helpers/pad';
import borderRadius from 'sly/components/helpers/borderRadius';
import { Link, ClampedText } from 'sly/components/atoms';
import { Td, Tr } from 'sly/components/atoms/Table';
import { getAppPathForEntity } from 'sly/services/helpers/appPaths';

const Wrapper = mobileOnly(borderRadius(pad(Tr, 'large'), 'small'), css`
  display: flex;
  flex-direction: column;
  padding: ${size('spacing.large')};
  background: ${palette('white', 'base')};
  border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
`);

const StyledNameCell = ({
  disabled, contact, to, ...props
}) => (
  <Td disabled={disabled} {...props}>
    <ClampedText size={size('weight.medium')}>
      <Link to={to} {...props}>
        {contact.name}
      </Link>
    </ClampedText>
  </Td>
);

StyledNameCell.propTypes = {
  disabled: bool,
  contact: contactPropType,
  to: string,
};

const NameCell = mobileOnly(pad(StyledNameCell, 'regular'), css`
  order: 1;
`);
NameCell.displayName = 'NameCell';

const twoColumnCss = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: ${size('text.caption')};

  span:first-child {
    display: inline!important;
  }
`;

const StyledTd = styled(Td)`
  span:first-child {
    display: none;
  }
`;

const CommunityCell = pad(mobileOnly(StyledTd, css`
  ${twoColumnCss};
  order: 3;
`), 'regular');
CommunityCell.displayName = 'CommunityCell';

const PriorityCell = pad(mobileOnly(StyledTd, css`
  ${twoColumnCss};
  order: 5;
`), 'regular');
PriorityCell.displayName = 'PriorityCell';

const ContactRowCard = ({ contact, onContactClick }) => {
  const relatedCommunity = contact.entities[0];

  return (
    <Wrapper>
      <NameCell contact={contact} onClick={() => onContactClick(contact)} />
      <CommunityCell>
        {relatedCommunity &&
          <Link to={getAppPathForEntity(relatedCommunity)}>
            {relatedCommunity.label}
          </Link>
        }
      </CommunityCell>
    </Wrapper>
  );
};

ContactRowCard.propTypes = {
  contact: contactPropType.isRequired,
  onContactClick: func.isRequired,
};

export default ContactRowCard;
