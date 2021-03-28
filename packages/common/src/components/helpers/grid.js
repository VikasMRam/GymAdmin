import { system } from 'sly/common/system';

const config = {
  gridGap: {
    property: 'gridGap',
    scale: 'layout',
  },
  gridColumnGap: {
    property: 'gridColumnGap',
    scale: 'layout',
  },
  gridRowGap: {
    property: 'gridRowGap',
    scale: 'layout',
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
}

export const withGrid = system(config);