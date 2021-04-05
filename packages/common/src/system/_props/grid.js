import { system, getCardinalValue } from 'sly/common/system';

const config = {
  gridGap: {
    property: 'gridGap',
    scale: 'space',
  },
  gridColumnGap: {
    property: 'gridColumnGap',
    scale: 'space',
  },
  gridRowGap: {
    property: 'gridRowGap',
    scale: 'space',
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: {
    property: 'gridTemplateColumns',
    scale: 'layout',
    transform: getCardinalValue,
  },
  gridTemplateRows: {
    property: 'gridTemplateRows',
    scale: 'layout',
    transform: getCardinalValue,
  },
  gridTemplateAreas: true,
  gridArea: true,
};

const grid = system(config);

export default grid;
