import styled from 'styled-components';

import { Block, sx$laptop, sx$tablet } from 'sly/common/system';

const Section = styled(Block)`
  width: 100%;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
 ${sx$tablet({
    width: 'col8',
    paddingX: '0' })} 
 ${sx$laptop({ width: 'col12' })}) 
`;

export default Section;
