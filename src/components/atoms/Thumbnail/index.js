import React from 'react';
import PropTypes from 'prop-types';

const Thumbnail = props => <img {...props} />;
// const Thumbnail = (imgParams) => <img  src={imgParams.src} alt={imgParams.alt} />

Thumbnail.propTypes = {
  props: PropTypes.any,
};

export default Thumbnail;
