import React from 'react';
import styled from 'styled-components';
import { string, bool, oneOf } from 'prop-types';

import { size, palette } from 'sly/web/components/themes';
import { Icon, Box, Block } from 'sly/web/components/atoms';

const Wrapper = styled.div`
  display: flex;
  padding: ${p => p.noPadding ? 0 : size('spacing.xLarge')};
  border: ${p => (p.borderless ? 0 : size('border.regular'))} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.tiny')};
  flex-direction: row;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    flex-direction: ${p => p.layout === 'iconTop' ? 'column' : 'row'};
  }
`;

const HeadingContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledIcon = styled(Icon)`
  margin-right: ${p => !p.iconBorder ? size('spacing.xLarge') : 0};
`;

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledBox = styled(Box)`
  align-self: flex-start;
  margin-bottom: ${p => p.layout === 'iconTop' ? size('spacing.large') : 0};
  margin-right: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-right: 0;
  }
`;

const IconInfoTile = ({
  icon, iconPalette, iconVariation, heading, content, borderless,
  noPadding, layout, iconBorder,
}) => {
  return (
    <Wrapper layout={layout} borderless={borderless} noPadding={noPadding}>
      {iconBorder &&
        <StyledBox padding="regular" layout={layout}>
          <StyledIcon icon={icon} palette={iconPalette} variation={iconVariation} iconBorder={iconBorder} />
        </StyledBox>
      }
      {!iconBorder && <StyledIcon icon={icon} palette={iconPalette} variation={iconVariation} iconBorder={iconBorder} />}
      <HeadingContentWrapper>
        <StyledBlock size={layout === 'iconTop' ? 'subtitle' : 'body'} weight={layout === 'iconTop' ? 'medium' : 'bold'}>{heading}</StyledBlock>
        <div>{content}</div>
      </HeadingContentWrapper>
    </Wrapper>
  );
};

IconInfoTile.propTypes = {
  icon: string.isRequired,
  iconPalette: string,
  iconVariation: string,
  iconBorder: bool,
  heading: string.isRequired,
  content: string.isRequired,
  borderless: bool,
  noPadding: bool,
  layout: oneOf(['default', 'iconTop']),
};

IconInfoTile.defaultProps = {
  iconPalette: 'slate',
  borderless: false,
  noPadding: false,
  layout: 'default',
};

export default IconInfoTile;
