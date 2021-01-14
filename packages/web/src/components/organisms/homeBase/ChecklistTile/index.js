import React from 'react';
import { oneOf, object, arrayOf } from 'prop-types';

import { Block, Grid } from 'sly/common/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';

const ChecklistTile = ({ layout, itemList }) => {
  const numSteps = itemList.length;
  let numChecked = 0;
  const items = itemList.map((e, i) => {
    if (e.checked && e.checked === true) {
      numChecked = i + 1;
    }
    // eslint-disable-next-line react/no-array-index-key
    return <IconItem iconPalette={e.checked ? 'primary' : 'grey'} marginBottom="regular" key={`icon-check-${i}`} icon="checkmark-circle">{e.text}</IconItem>;
  });
  return (
    <Block
      as="article"
      position="relative"
    >
      <Grid
        flow={layout}
        gap="large"
        clamped
      >
        <Block width="50%">
          <Block palette="primary">{(numChecked / numSteps) * 100}% </Block><ProgressBar totalSteps={numSteps} currentStep={numChecked} />
        </Block>
        <Block marginBottom="regular" border="1px solid" >
          {items}
        </Block>
      </Grid>
    </Block>
  );
};

ChecklistTile.propTypes = {
  itemList: arrayOf(object).isRequired,
  layout: oneOf(['column', 'row']),
};

ChecklistTile.defaultProps = {
  layout: 'row',
};

export default ChecklistTile;
