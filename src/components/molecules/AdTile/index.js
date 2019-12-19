import React from 'react';
import { bool, func, string, shape, arrayOf, number } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Icon, Button } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    transform: scale(1);
    padding: ${size('spacing.large')};
    flex-direction: row;
    border: ${p => (p.borderless ? 0 : size('border.regular'))} solid ${palette('slate', 'stroke')};
    border-radius: ${size('spacing.tiny')};
  }

  &:hover {
    cursor: pointer;
    background: ${palette('white', 'base')};
    box-shadow: 0 ${size('spacing.tiny')} ${size('spacing.small')} ${palette('slate', 'filler')}80;

    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      transform: scale(1.002);
      border-radius: ${size('spacing.small')};
    }
  }
`;

const AdImage = styled.div`
  display: flex;
  background:  ${palette('secondary', 'dark35')};
  height: ${size('tile', 'large', 'height')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tile.regular.width')};
    height: ${size('tile.regular.height')};
  }
`;

export const StyledIcon = styled(Icon)`
  margin: auto;
`;

const AdInfo = styled.div`
  border: ${size('border.regular')} solid ${palette('slate', 'filler')};
  border-top: 0;
  padding: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    border: 0;
    padding: 0 ${size('spacing.large')};
  }
`;

const AdInfoHeader = styled.div`
  font-size: ${size('text.subtitle')};
  font-weight: bold;
  margin-bottom: ${size('spacing.large')};
`;

const AdInfoUnorderedList = styled.ul`
  margin-bottom: ${size('spacing.large')};
`;

const AdTile = ({
  borderless, onClick, title, items, buttonText,
}) => {
  const itemComponents = items.map(item => <li key={item.index}>{item.text}</li>);
  return (
    <Wrapper onClick={onClick} borderless={borderless}>
      <AdImage >
        <StyledIcon icon="logo" palette="white" size="xxLarge" />
      </AdImage>
      <AdInfo>
        {title && <AdInfoHeader>{title}</AdInfoHeader>}
        {items && items.length > 0 &&
          <AdInfoUnorderedList>
            {itemComponents}
          </AdInfoUnorderedList>}
        <Button>{buttonText}</Button>
      </AdInfo>
    </Wrapper>
  );
};

AdTile.propTypes = {
  onClick: func,
  borderless: bool,
  title: string,
  items: arrayOf(shape({
    index: number,
    text: string,
  })),
  buttonText: string.isRequired,
};

AdTile.defaultProps = {
  borderless: false,
};

export default AdTile;
