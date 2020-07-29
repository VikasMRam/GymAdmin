import React from 'react';
import styled, { css } from 'styled-components';
import { func, string, bool, object } from 'prop-types';

import { size, palette } from 'sly/common/components/themes';
import contactPropType from 'sly/common/propTypes/contact';
import mobileOnly from 'sly/web/components/helpers/mobileOnly';
import pad from 'sly/web/components/helpers/pad';
import borderRadius from 'sly/web/components/helpers/borderRadius';
import { Link, ClampedText } from 'sly/web/components/atoms';
import { Td, Tr } from 'sly/web/components/atoms/Table';
import { getAppPathForEntity } from 'sly/web/services/helpers/appPaths';
import { phoneFormatter } from 'sly/web/services/helpers/phone';
import IconButton from 'sly/web/components/molecules/IconButton';

const Wrapper = mobileOnly(
  borderRadius(pad(Tr, 'large'), 'small'),
  css`
    display: flex;
    flex-direction: column;
    padding: ${size('spacing.large')};
    background: ${palette('white', 'base')};
    border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
  `,
);

const StyledNameCell = ({ disabled, contact, to, ...props }) => (
  <Td disabled={disabled} {...props}>
    <ClampedText>
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

const NameCell = mobileOnly(
  pad(StyledNameCell, 'regular'),
  css`
    order: 1;
  `,
);
NameCell.displayName = 'NameCell';

const twoColumnCss = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: ${size('text.caption')};

  span:first-child {
    display: inline !important;
  }
`;

const StyledTd = styled(Td)`
  > span:first-child {
    display: none;
  }
`;

const CommunityCell = pad(
  mobileOnly(
    StyledTd,
    css`
      ${twoColumnCss};
      order: 2;
    `,
  ),
  'regular',
);
CommunityCell.displayName = 'CommunityCell';

const EmailCell = pad(
  mobileOnly(
    StyledTd,
    css`
      ${twoColumnCss};
      order: 3;
    `,
  ),
  'regular',
);
EmailCell.displayName = 'EmailCell';

const PhoneCell = pad(
  mobileOnly(
    StyledTd,
    css`
      ${twoColumnCss};
      order: 4;
    `,
  ),
  'regular',
);
PhoneCell.displayName = 'PhoneCell';

const DeleteCell = pad(
  mobileOnly(
    StyledTd,
    css`
      ${twoColumnCss};
      order: 5;
    `,
  ),
  'regular',
);
DeleteCell.displayName = 'DeleteCell';

const RemoveButton = styled(IconButton)`
  width: ${size('element.regular')};
  height: ${size('element.regular')};
  margin: 0 ${size('spacing.large')};
`;

const ContactRowCard = ({ contact, entity, editContactUrl, onContactClick, deleteContact }) => {
  return (
    <Wrapper>
      <NameCell
        contact={contact}
        to={editContactUrl}
        onClick={() => onContactClick(contact)}
      />
      <CommunityCell>
        <span>Community</span>
        {entity && (
          <Link
            to={getAppPathForEntity(entity)}
            block
            clamped
          >
            {entity.label}
          </Link>
        )}
      </CommunityCell>
      <EmailCell>
        <span>Email</span>
        <ClampedText>
          {contact.email}
        </ClampedText>
      </EmailCell>
      <PhoneCell>
        <span>Phone number</span>
        <ClampedText>
          {contact.mobilePhone && phoneFormatter(contact.mobilePhone)}
        </ClampedText>
      </PhoneCell>
      <DeleteCell>
        <span>Delete</span>
        <RemoveButton icon="trash" onClick={() => deleteContact(contact)} />
      </DeleteCell>
    </Wrapper>
  );
};

ContactRowCard.propTypes = {
  contact: contactPropType.isRequired,
  editContactUrl: string.isRequired,
  onContactClick: func.isRequired,
  entity: object.isRequired,
  deleteContact: func.isRequired,
};

export default ContactRowCard;
