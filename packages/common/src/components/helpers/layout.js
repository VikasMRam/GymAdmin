import { system, get } from 'sly/common/system';

const isNumber = n => typeof n === 'number' && !isNaN(n)
const getWidth = (n, scale) =>
  get(scale, n, !isNumber(n) || n > 1 ? n : n * 100 + '%')

const config = {
  width: {
    property: 'width',
    scale: 'layout',
    transform: getWidth,
  },
  height: {
    property: 'height',
    scale: 'layout',
  },
  minWidth: {
    property: 'minWidth',
    scale: 'layout',
  },
  minHeight: {
    property: 'minHeight',
    scale: 'layout',
  },
  maxWidth: {
    property: 'maxWidth',
    scale: 'layout',
  },
  maxHeight: {
    property: 'maxHeight',
    scale: 'layout',
  },
  size: {
    properties: ['width', 'height'],
    scale: 'layout',
  },
  elementSize: {
    property: 'minHeight',
    scale: 'elementSize',
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,

  visibility: true,

  // flexbox
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  // item
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  justifySelf: true,
  alignSelf: true,
  order: true,
  position: true,
}

export const withLayout = system(config);