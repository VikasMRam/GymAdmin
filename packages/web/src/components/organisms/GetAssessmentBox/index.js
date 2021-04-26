import React from 'react';
import { object, string } from 'prop-types';


import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { Block, Box, Grid, Button } from 'sly/common/system';


const GetAssessmentBox = ({ color, layout, buttonProps: { to, ...buttonProps }, ...props }) => (
  <Box {...props}>
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
        marginBottom="m"
        sx$tablet={{
            marginRight: layout === 'column' ? 'l' : null,
            marginBottom: layout === 'row' ? 'l' : '0',
          }}
        color={color}
      >

        Need help finding senior living options?
        Complete this 2-minute quiz to get personalized senior living and care options.

      </Block>
      <Button
        as="a"
        textDecoration="none"
        width="100%"
        height="max-content"
        color="slate"
        pallete="none"
        variant="neutral"
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
  background: 'blue',
  color: 'white',
  padding: 'xl xxl',
  'data-testid': 'GetAssessmentBox',
};

export default GetAssessmentBox;
