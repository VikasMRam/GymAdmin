import { system } from 'sly/common/system';

const config = {
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

const layout = system(config);

export default layout;

