import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, shape, bool, string, func, number } from 'prop-types';
import { ifNotProp } from 'styled-tools';

import StickyFooter from 'sly/components/atoms/StickyFooter/index';
import Stage from 'sly/components/molecules/Stage/index';
import Button from 'sly/components/atoms/Button/index';
import IconItem from 'sly/components/molecules/IconItem/index';
import Icon from 'sly/components/atoms/Icon/index';
import { size } from 'sly/components/themes/index';
import cursor from 'sly/components/helpers/cursor';

const FooterWrapper = styled.div`
  ${ifNotProp('showAcceptRejectButtons', css`
    display: flex;
  `)}
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

const OptionItemWrapper = cursor(styled.div`
  margin: ${size('spacing.regular')} 0;
`);
OptionItemWrapper.displayName = 'OptionItemWrapper';

const ClearIconWrapper = styled.div`
  display: flex;
`;

const ClearIcon = cursor(styled(Icon)`
  margin-left: auto;
`);
ClearIcon.displayName = 'ClearIcon';

const AcceptRejectButtonsWrapper = styled.div`
  > Button {
    width: 100%;
    margin-bottom: ${size('spacing.regular')};
  }

  > Button:last-child {
    margin-bottom: 0;
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;

    > Button {
      width: 100%;
      margin-bottom: 0;
      margin-right: ${size('spacing.regular')};
    }
  
    > Button:last-child {
      margin-right: 0;
    }
  }
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
  palette: string,
  onClick: func,
};

OptionsList.propTypes = {
  options: arrayOf(shape(optionsShape)),
  onCloseClick: func,
};

const DashboardMyFamilyStickyFooter = ({
  stage, showOptions, options, onOptionsClick, showAcceptRejectButtons,
}) => {
  return (
    <StickyFooter>
      {!showOptions && (
        <FooterWrapper showAcceptRejectButtons={showAcceptRejectButtons}>
          {!showAcceptRejectButtons && (
            <Fragment>
              <Stage stage={stage} />
              <OptionsButton onClick={onOptionsClick} >...</OptionsButton>
              <RightSideButtons>
                {options.slice(0).reverse().map(option => (<Button key={option.text} onClick={option.onClick} ghost={option.ghost}>{option.text}</Button>))}
              </RightSideButtons>
            </Fragment>
          )}
          {showAcceptRejectButtons &&
            <AcceptRejectButtonsWrapper>
              {options.map(option => (<Button key={option.text} onClick={option.onClick} palette={option.palette} ghost={option.ghost}>{option.text}</Button>))}
            </AcceptRejectButtonsWrapper>
          }
        </FooterWrapper>
      )}
      {showOptions && <OptionsList options={options} onCloseClick={onOptionsClick} />}
    </StickyFooter>
  );
};

DashboardMyFamilyStickyFooter.propTypes = {
  showOptions: bool,
  options: arrayOf(shape(optionsShape)).isRequired,
  stage: string.isRequired,
  onOptionsClick: func,
  showAcceptRejectButtons: bool,
};

export default DashboardMyFamilyStickyFooter;
