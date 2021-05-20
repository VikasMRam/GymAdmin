import React from 'react';
import { object, string, bool } from 'prop-types';


import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { Block, Box, Grid, Button } from 'sly/common/system';


const DashboardCommunityCTAPricingBox = ({ color, layout, buttonProps, ctaText, showButton, buttonText, ...props }) => (
  <Box {...props}>
    <Grid
      gridTemplateColumns="auto"
      sx$tablet={{
        gridTemplateColumns: showButton ? 'auto 10rem' : 'auto',
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
        font="body-m"
        danger
      >{ctaText}
      </Block>
      {showButton && <Button
        type="button"
        textDecoration="none"
        width="100%"
        height="max-content"
        color="slate"
        pallete="none"
        variant="neutral"
        background={color}
        textAlign="center"
        {...buttonProps}
      >
        {buttonText}
      </Button>}
    </Grid>
  </Box>
);

DashboardCommunityCTAPricingBox.propTypes = {
  layout: string.isRequired,
  color: palettePropType,
  buttonProps: object,
  buttonText: string,
  ctaText: string,
  showButton: bool,
};

DashboardCommunityCTAPricingBox.defaultProps = {
  layout: 'column',
  buttonProps: {},
  background: 'viridian.base',
  buttonText: 'Update Pricing',
  ctaText: 'Your community profile will use Seniorly’s Estimated Pricing until you update pricing.',
  color: 'white',
  padding: 'xl xxl',
  showButton: true,
};

export default DashboardCommunityCTAPricingBox;
