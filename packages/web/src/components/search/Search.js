import React from 'react';
import styled from 'styled-components';

import { withDisplay } from 'sly/common/components/helpers';

const MiniBlock = styled.div`
  ${withDisplay}
`;

function Search() {
  return (
    <MiniBlock
      display="flex"
    >

    </MiniBlock>
  );
}

export default Search;
