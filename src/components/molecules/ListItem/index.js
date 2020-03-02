import React from 'react';
import PropTypes, { string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { variation as variationPropType } from 'sly/propTypes/variation';
import pad from 'sly/components/helpers/pad';
import { Icon } from 'sly/components/atoms';

const ListItemWrapper = pad(styled.li`
  display: flex;
`, 'regular');

const ListItemIconDiv = styled.div`
  padding-right: ${size('spacing.regular')}
`;

const ListItem = ({
  children, icon, iconPalette, iconVariation
}) => (
  <ListItemWrapper>
    <ListItemIconDiv>
      <Icon icon={icon} palette={iconPalette} variation={iconVariation} />
    </ListItemIconDiv>
    {children}
  </ListItemWrapper>
);

ListItem.propTypes = {
  children: PropTypes.node,
  icon: string.isRequired,
  iconPalette: palettePropType,
  iconVariation: variationPropType,
};

ListItem.defaultProps = {
  icon: 'star',
};

export default ListItem;
