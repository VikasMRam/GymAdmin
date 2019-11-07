import React from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, bool, string, func, object } from 'prop-types';
import { ifNotProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Button, StickyFooter } from 'sly/components/atoms';
import Stage from 'sly/components/molecules/Stage';

const FooterWrapper = styled.div`
  ${ifNotProp('showAcceptRejectButtons', css`
    display: flex;
  `)}
`;

const OptionsButton = styled(Button)`
  margin-left: auto;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-left: initial;
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

const DashboardMyFamilyStickyFooter = ({
  stage, options, onOptionsClick, showAcceptRejectButtons, stageLabel,
}) => (
  <StickyFooter>
    <FooterWrapper showAcceptRejectButtons={showAcceptRejectButtons}>
      {!showAcceptRejectButtons &&
        <>
          <Stage stage={stage} stageLabel={stageLabel} />
          {options.length > 1 &&
            <>
              <RightSideButtons>
                <Button
                  key={options[options.length - 1].text}
                  onClick={options[options.length - 1].onClick}
                  ghost={options[options.length - 1].ghost}
                >
                  {options[options.length - 1].text}
                </Button>
              </RightSideButtons>
              <OptionsButton onClick={onOptionsClick} >...</OptionsButton>
            </>
          }
        </>
      }
      {showAcceptRejectButtons &&
        <AcceptRejectButtonsWrapper>
          {options.map(option => <Button key={option.text} onClick={option.onClick} palette={option.palette} ghost={option.ghost}>{option.text}</Button>)}
        </AcceptRejectButtonsWrapper>
      }
    </FooterWrapper>
  </StickyFooter>
);

DashboardMyFamilyStickyFooter.propTypes = {
  options: arrayOf(object),
  stage: string.isRequired,
  stageLabel: string,
  onOptionsClick: func,
  showAcceptRejectButtons: bool,
};

export default DashboardMyFamilyStickyFooter;
