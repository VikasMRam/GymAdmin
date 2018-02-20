import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import {ifProp} from "styled-tools";

const Paragraph =({ ...props }) => {
  return (<ParaWrapper {...props}>{props.children}</ParaWrapper>)
}
const ParaWrapper = styled.p`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
  font-size: 1rem;
  line-height: 1.3;
  margin: 1rem 0 0;
  display:${ifProp({shown:true},"inherit","none")}
`;

Paragraph.propTypes = {
  reverse: PropTypes.bool,
  shown:PropTypes.bool,
};

export default Paragraph
