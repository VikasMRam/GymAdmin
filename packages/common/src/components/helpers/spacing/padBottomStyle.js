import { css } from 'styled-components';

export default css`
  & > :not(*:only-child):last-child {
    margin-bottom: 0;
  }
`;
/* :not(*:only-child) is important so that if it comes as one of multiple children only the margin is reset
   for eg:
      <Block>
        <Block pad="regular">How are you</Block>
        Hello
      </Block>
   above shouldn't reset pad
*/
