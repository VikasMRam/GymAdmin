import React from 'react';
import { object, string } from 'prop-types';


import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { Block, Box, Grid, Button, space } from 'sly/common/system';


const GetAssessmentBox = ({ color, layout, buttonProps: { to, ...buttonProps }, ...props }) => (
  <Box sx={{ padding: 'l !important' }} {...props}>
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
      <Button
        as="a"
        textDecoration="none"
        width="100%"
        height="max-content"
        color="slate"
        pallete="none"
        variant="neutral"
        textAlign="center"
        background={color}
        href={to}
        {...buttonProps}
      >
        Take the quiz
      </Button>
    </Grid>
  </Box>
);

GetAssessmentBox.propTypes = {
  layout: string.isRequired,
  color: palettePropType,
  buttonProps: object,
};

GetAssessmentBox.defaultProps = {
  layout: 'column',
  buttonProps: {},
  background: 'primary',
  color: 'white',
  padding: 'xl xxl',
  'data-testid': 'GetAssessmentBox',
};

export default GetAssessmentBox;
