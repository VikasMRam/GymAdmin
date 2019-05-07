import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, bool, string, func, number } from 'prop-types';

import StickyFooter from 'sly/components/atoms/StickyFooter/index';
import Stage from 'sly/components/atoms/Stage/index';
import Button from 'sly/components/atoms/Button/index';
import IconItem from 'sly/components/molecules/IconItem/index';
import Icon from 'sly/components/atoms/Icon/index';
import { size } from 'sly/components/themes/index';

const FooterWrapper = styled.div`
  display: flex;
`;

const OptionsButton = styled(Button)`
  margin-left: auto;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;

const RightSideButtons = styled.div`
  margin-left: auto;
  display: none;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
    > Button {
      margin-right: ${size('spacing.regular')};
    }
  }
`;

const OptionsListWrapper = styled.div`
  margin: ${size('spacing.large')};
`;

const OptionItemWrapper = styled.div`
  margin: ${size('spacing.regular')} 0;
`;

const ClearIconWrapper = styled.div`
  display: flex;
`;

const ClearIcon = styled(Icon)`
  margin-left: auto;
`;

const OptionsList = ({ options, onCloseClick }) => {
  return (
    <OptionsListWrapper>
      {options.map(option => (
        <OptionItemWrapper key={option.text} onClick={option.onClick}>
          <IconItem icon={option.icon} iconPalette={option.iconPalette} iconRightMarginSpacing="large">
            {option.text}
          </IconItem>
        </OptionItemWrapper>))}
      <ClearIconWrapper>
        <ClearIcon icon="clear" palette="slate" onClick={onCloseClick} />
      </ClearIconWrapper>
    </OptionsListWrapper>
  );
};

const optionsShape = {
  text: string,
  icon: string,
  iconPalette: string,
  onClick: func,
};

OptionsList.propTypes = {
  options: arrayOf(shape(optionsShape)),
  onCloseClick: func,
};

const DashboardMyFamilyStickyFooter = ({
  stageProps, showOptions, options, onOptionsClick,
}) => {
  return (
    <StickyFooter>
      {!showOptions && (
        <FooterWrapper>
          <Stage {...stageProps} />
          <OptionsButton onClick={onOptionsClick} >...</OptionsButton>
          <RightSideButtons>
            {options.slice(0).reverse().map(option => (<Button key={option.text} onClick={option.onClick} ghost={option.ghost}>{option.text}</Button>))}
          </RightSideButtons>
        </FooterWrapper>
      )}
      {showOptions && <OptionsList options={options} onCloseClick={onOptionsClick} />}
    </StickyFooter>
  );
};

DashboardMyFamilyStickyFooter.propTypes = {
  showOptions: bool,
  options: arrayOf(shape(optionsShape)).isRequired,
  stageProps: shape({
    text: string,
    currentStage: number,
    palette: string,
  }).isRequired,
  onOptionsClick: func,
};

export default DashboardMyFamilyStickyFooter;
