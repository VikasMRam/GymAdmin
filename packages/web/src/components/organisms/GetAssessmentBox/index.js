import React from 'react';
import { object, string } from 'prop-types';

import { getKey } from 'sly/common/components/themes';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { Heading, Box, Icon, Button, Grid, Block } from 'sly/common/components/atoms';

const GetAssessmentBox = ({ palette, layout, buttonProps, ...props }) => (
  <Box {...props}>
    <Grid
      dimensions={['max-content', '1fr', 'max-content']}
      justifyContent="center"
      alignItems="center"
      flow={layout}
      upToTablet={{
        gridTemplateColumns: 'auto!important',
      }}
    >
      <Block
        position="relative"
        marginRight={layout === 'column' ? 'large' : null}
        marginBottom={layout === 'row' ? 'large' : null}
        upToTablet={{
          marginRight: 0,
          marginBottom: getKey('sizes.spacing.large'),
        }}
      >
        <Icon icon="house" palette={palette} size="title" />
        <Icon icon="search" palette="warning" marginLeft="-large" marginTop="small" />
      </Block>
      <Block
        marginRight={layout === 'column' ? 'xLarge' : null}
        marginBottom={layout === 'row' ? 'xLarge' : null}
        upToTablet={{
          marginRight: 0,
          marginBottom: getKey('sizes.spacing.large'),
        }}
      >
        <Heading level="subtitle" size="subtitle" pad="regular" palette={palette}>
          Need help finding senior living options?
        </Heading>
        <Block palette={palette}>
          Complete this 2-minute quiz to get personalized senior living and care options.
        </Block>
      </Block>
      <Button
        width="100%"
        height="max-content"
        palette="slate"
        background={palette}
        {...buttonProps}
      >
        Take the quiz
      </Button>
    </Grid>
  </Box>
);

GetAssessmentBox.propTypes = {
  layout: string.isRequired,
  palette: palettePropType,
  buttonProps: object,
};

GetAssessmentBox.defaultProps = {
  layout: 'column',
  buttonProps: {},
  background: 'blue',
  palette: 'white',
  padding: ['xxLarge', 'xLarge'],
  'data-testid': 'GetAssessmentBox',
};

export default GetAssessmentBox;
