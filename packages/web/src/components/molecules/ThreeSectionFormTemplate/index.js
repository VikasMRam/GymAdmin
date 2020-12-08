import React from 'react';
import { func, node, string, bool, arrayOf, shape } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifNotProp, ifProp, prop } from 'styled-tools';

import { size, palette } from 'sly/common/components/themes';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { Heading, Button, Block, Icon, Hr } from 'sly/common/components/atoms';
import cursor from 'sly/web/components/helpers/cursor';

const Head = styled.div`
  display: flex;
  padding: 0 ${size('spacing.xLarge')};
  padding-top: ${ifProp('noTopSpacing', 0, size('spacing.xLarge'))};
`;

const Wrapper = styled.div`
  padding: 0 ${size('spacing.xLarge')};
  padding-bottom: ${size('spacing.xLarge')};
  overflow-y: auto;
  max-height: 70vh;
`;

const Bottom = styled.div`
  padding: ${size('spacing.large')} ${size('spacing.xLarge')};
  background: ${ifNotProp('noFooter', palette('grey.background'))};
  border-top: ${ifNotProp('noFooter', css`${size('border.regular')} solid ${palette('grey.stroke')}`)};
  display: flex;
  justify-content: space-between;
`;

const ActionButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${prop('noOfColumns')}, auto);
  grid-gap: ${size('spacing.large')};
`;

const FullWidthActionButtonsWrapper = fullWidth(ActionButtonsWrapper);

const PaddedHeading = pad(Heading, 'large');

const TopRightIconButton = cursor(styled(Icon)`
  margin-left: auto;
`);

const ThreeSectionFormTemplate = ({
  onCancelClick, submitButtonText, cancelButtonText, children, heading, description, hasCancel, hasSubmit,
  onSubmit, pristine, submitting, invalid, extraActionButtonsAfterSubmit, noFooter, buttonsFullWidth,
  topRightIcon, topRightIconOnClick, topRightIconPalette, noTopSpacing,
}) => {
  const ACWrapperComponent = buttonsFullWidth ? FullWidthActionButtonsWrapper : ActionButtonsWrapper;

  return (
    <form onSubmit={onSubmit}>
      <Head noTopSpacing={noTopSpacing}>
        <div>
          {!description && <Heading size="subtitle">{heading}</Heading>}
          {description && <PaddedHeading size="subtitle">{heading}</PaddedHeading>}
          {description && <Block size="caption">{description}</Block>}
        </div>
        {topRightIcon && topRightIconOnClick && <TopRightIconButton onClick={topRightIconOnClick} icon={topRightIcon} palette={topRightIconPalette} />}
      </Head>
      <Hr marginTop="0"/>
      <Wrapper>
        {children}
      </Wrapper>
      <Bottom noFooter={noFooter}>
        {hasCancel && <Button secondary onClick={onCancelClick}>{cancelButtonText}</Button>}
        {!hasCancel && <div />}
        <ACWrapperComponent buttonsFullWidth={buttonsFullWidth} noOfColumns={hasSubmit ? extraActionButtonsAfterSubmit.length + 1 : extraActionButtonsAfterSubmit.length}>
          {hasSubmit && <Button ghost={extraActionButtonsAfterSubmit.length > 0} type="submit" disabled={invalid || pristine || submitting}>{submitButtonText}</Button>}
          {extraActionButtonsAfterSubmit.map(b => <Button key={b.text} disabled={submitting} onClick={b.onClick}>{b.text}</Button>)}
        </ACWrapperComponent>
      </Bottom>
    </form>
  );
};

ThreeSectionFormTemplate.propTypes = {
  onCancelClick: func,
  children: node,
  heading: string,
  description: string,
  hasCancel: bool,
  hasSubmit: bool,
  submitButtonText: string.isRequired,
  cancelButtonText: string.isRequired,
  buttonsFullWidth: bool,
  onSubmit: func,
  pristine: bool,
  submitting: bool,
  invalid: bool,
  noFooter: bool,
  extraActionButtonsAfterSubmit: arrayOf(shape({
    onClick: func,
    text: string.isRequired,
  })),
  topRightIcon: string,
  topRightIconOnClick: func,
  topRightIconPalette: string,
  noTopSpacing: bool,
};

ThreeSectionFormTemplate.defaultProps = {
  submitButtonText: 'Submit',
  cancelButtonText: 'Cancel',
  extraActionButtonsAfterSubmit: [],
};

export default ThreeSectionFormTemplate;
