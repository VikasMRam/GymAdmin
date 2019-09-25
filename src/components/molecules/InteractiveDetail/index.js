import React from 'react';
import styled from 'styled-components';
import { string, number, shape, oneOf, oneOfType } from 'prop-types';
import NumberFormat from 'react-number-format';

import { size, palette } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import { Block, Link } from 'sly/components/atoms';

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
          <NumberFormat
            value={detail.value}
            format="(###) ###-####"
            displayType="text"
          />
        </Link>
      }
      {detail.type === 'email' && <Link href={`mailto:${detail.value}`}>{detail.value}</Link>}
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
