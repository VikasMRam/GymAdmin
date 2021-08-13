import React from 'react';
import { object, string } from 'prop-types';

import SlyTypeform from 'sly/web/profile/Typeform/Typeform';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { Block, Box, Grid, Button, space } from 'sly/common/system';


const SlyTypeformGetAssessmentBox = ({ color, layout, ...props }) => (

  <Box sx={{ padding: 'xxl !important' }} {...props}>
    <Grid
      gridTemplateColumns="auto"
      sx$tablet={{
        gridTemplateColumns: 'auto 9.2rem',
        gridGap: 'xl',
      }}
      justifyContent="center"
      alignItems="center"
      flexDirectionw={layout}
    >

      <Block
        marginBottom="l"
        sx$tablet={{
            marginRight: layout === 'column' ? 'l' : null,
            marginBottom: layout === 'row' ? 'l' : '0',
          }}
        color={color}
      >
        <Block font="title-xs-azo">Need help finding senior living options?</Block>
        Take our quiz to get personalized senior living and care options.

      </Block>

      <SlyTypeform {...props} />
      {/* <SlyTypeformAssessmentContainer
        community={community}
        wizardType="POPUP_BUTTON"
        formId={formId}
        popupButtonName="Take the quiz"
        slug={community.id}
        hideButton
        popupButtonStyle={{
        width: '100%',
        height: 'max-content%',
        color: 'black',
        pallete: 'none !important',
        variant: 'neutral !important',
        textAlign: 'center',
        padding: 0,
        borderColor: 'white !important',
        border: '1px solid !important',
        background: 'white',
      }}
      /> */}
    </Grid>
  </Box>
);

SlyTypeformGetAssessmentBox.propTypes = {
  layout: string.isRequired,
  color: palettePropType,
  buttonProps: object,
};

SlyTypeformGetAssessmentBox.defaultProps = {
  layout: 'column',
  buttonProps: {},
  background: 'primary',
  color: 'white',
  padding: 'xl xxl',
  'data-testid': 'SlyTypeformGetAssessmentBox',
};

export default SlyTypeformGetAssessmentBox;
