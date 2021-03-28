
import { system, getCardinalValue } from 'sly/common/system'

const config = {
  border: {
    property: 'border',
    scale: 'border',
  },
  borderTop: {
    property: 'borderTop',
    scale: 'border',
  },
  borderRight: {
    property: 'borderRight',
    scale: 'border',
  },
  borderBottom: {
    property: 'borderBottom',
    scale: 'border',
  },
  borderLeft: {
    property: 'borderLeft',
    scale: 'border',
  },
  borderX: {
    properties: ['borderLeft', 'borderRight'],
    scale: 'border',
  },
  borderY: {
    properties: ['borderTop', 'borderBottom'],
    scale: 'border',
  },

  borderRadius: {
    property: 'borderRadius',
    scale: 'space',
  },
  borderTopLeftRadius: {
    property: 'borderTopLeftRadius',
    scale: 'space',
  },
  borderTopRightRadius: {
    property: 'borderTopRightRadius',
    scale: 'space',
  },
  borderBottomLeftRadius: {
    property: 'borderBottomLeftRadius',
    scale: 'space',
  },
  borderBottomRightRadius: {
    property: 'borderBottomRightRadius',
    scale: 'space',
  },

  borderWidth: {
    property: 'borderWidth',
    scale: 'border',
  },
  borderBottomWidth: {
    property: 'borderBottomWidth',
    scale: 'border',
  },
  borderLeftWidth: {
    property: 'borderLeftWidth',
    scale: 'border',
  },
  borderRightWidth: {
    property: 'borderRightWidth',
    scale: 'border',
  },
  borderTopWidth: {
    property: 'borderTopWidth',
    scale: 'border',
  },

  borderStyle: true,
  borderTopStyle: true,
  borderBottomStyle: true,
  borderLeftStyle: true,
  borderRightStyle: true,

  outline: true,
};

const border = system(config);
export default border;
