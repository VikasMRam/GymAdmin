import { system } from 'sly/common/system';

const config = {
  font: {
    property: 'font',
    scale: 'fonts',
  },
  fontFamily: true,
  fontSize: true,
  fontWeight: true,
  fontStyle: true,
  lineHeight: true,
  letterSpacing: true,
  textAlign: true,
  textTransform: true,
  textDecoration: true,
  whiteSpace: true,
  textOverflow: true,
};

const text = system(config);

export default text;
