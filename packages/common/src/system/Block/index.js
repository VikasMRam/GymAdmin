import styled from 'styled-components';

import { createShouldForwardProp } from 'sly/common/system';
import { withSystem } from 'sly/common/system/sx';

const shouldForwardProp = createShouldForwardProp(withSystem);

const Block = styled.div.withConfig({ shouldForwardProp })(withSystem);

Block.displayName = 'Block';

export default Block;

