import React from 'react';
import styled, { css } from 'styled-components';
import { func, string, bool, object } from 'prop-types';

import { size, palette } from 'sly/common/components/themes';
import userPropType from 'sly/common/propTypes/user';
import mobileOnly from 'sly/web/components/helpers/mobileOnly';
import pad from 'sly/web/components/helpers/pad';
import borderRadius from 'sly/web/components/helpers/borderRadius';
import { Link, ClampedText } from 'sly/web/components/atoms';
import { Td, Tr } from 'sly/web/components/atoms/Table';
import { getAppPathForEntity } from 'sly/web/services/helpers/appPaths';
import { phoneFormatter } from 'sly/web/services/helpers/phone';
import IconButton from 'sly/common/components/molecules/IconButton';

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

const StyledNameCell = ({ disabled, user, to, ...props }) => (
  <Td disabled={disabled} {...props}>
    <ClampedText>
      <Link to={to} {...props}>
        {user.name}
      </Link>
    </ClampedText>
  </Td>
);

StyledNameCell.propTypes = {
  disabled: bool,
  user: userPropType,
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

const OrganizationCell = pad(
  mobileOnly(
    StyledTd,
    css`
      ${twoColumnCss};
      order: 2;
    `,
  ),
  'regular',
);
OrganizationCell.displayName = 'OrganizationCell';

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

const UserRowCard = ({ user, organization, editUserUrl, onUserClick, deleteUser }) => {
  return (
    <Wrapper>
      <NameCell
        user={user}
        to={editUserUrl}
        onClick={() => onUserClick(user)}
      />
      <OrganizationCell>
        <span>Organization</span>
        {organization && (
          <Link
            to={getAppPathForEntity(organization)}
            block
            clamped
          >
            {organization.name}
          </Link>
        )}
      </OrganizationCell>
      <EmailCell>
        <span>Email</span>
        <ClampedText>
          {user.email}
        </ClampedText>
      </EmailCell>
      <PhoneCell>
        <span>Phone number</span>
        <ClampedText>
          {user.phoneNumber && phoneFormatter(user.phoneNumber)}
        </ClampedText>
      </PhoneCell>
      <DeleteCell>
        <span>Delete</span>
        <RemoveButton icon="trash" onClick={() => deleteUser(user)} />
      </DeleteCell>
    </Wrapper>
  );
};

UserRowCard.propTypes = {
  user: userPropType.isRequired,
  editUserUrl: string.isRequired,
  onUserClick: func.isRequired,
  organization: object.isRequired,
  deleteUser: func.isRequired,
};

export default UserRowCard;
