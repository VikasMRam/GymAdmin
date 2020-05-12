import React from 'react';
import styled from 'styled-components';
import { string, number, shape, oneOf, oneOfType } from 'prop-types';

import { size, palette } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { Block, Link } from 'sly/web/components/atoms';
import { phoneFormatter } from 'sly/web/services/helpers/phone';

const Label = pad(Block, 'regular');
Label.displayName = 'Label';

const Value = styled(Block)`
  background: ${palette('primary.stroke')};
  padding: ${size('spacing.large')};
  border-radius: ${size('border.xxLarge')};
`;

const InteractiveDetail = ({
  label, detail,
}) => (
  <div>
    <Label size="caption">{label}</Label>
    <Value palette="primary">
      {detail.type === 'phone' &&
        <Link href={`tel:${detail.value}`}>
          {phoneFormatter(detail.value, true)}
        </Link>
      }
      {detail.type === 'email' && <Link href={`mailto:${detail.value}`}>Click here to send Email</Link>}
    </Value>
  </div>
);

InteractiveDetail.propTypes = {
  label: string.isRequired,
  detail: shape({
    type: oneOf(['email', 'phone']).isRequired,
    value: oneOfType([string, number]).isRequired,
  }).isRequired,
};

export default InteractiveDetail;
