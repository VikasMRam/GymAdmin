import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const Iframe = styled.iframe`
  border: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default function EmailViewPage({ html }) {
  return (
    <Iframe
      title="Email View"
      sandbox=""
      srcDoc={html}
    />
  );
}

EmailViewPage.propTypes = {
  html: string,
};
