import styled from 'styled-components';

import { size } from 'sly/components/themes';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  position: relative;
  margin-bottom: ${size('spacing.large')};
  
  td, th {
    white-space: nowrap;
  }

  th:first-child, td:first-child {
    left: 0;
    position: sticky;
    top: auto;
  }
`;

export default Table;
