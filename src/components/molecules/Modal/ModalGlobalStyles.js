// https://www.drupal.org/project/drupal/issues/2707291#comment-12797758
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body.ReactModal__Body--open {
    overflow: hidden;
    width: 100%;
  }

  // safari only fix
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    ::i-block-chrome, body.ReactModal__Body--open {
      position: fixed;
    }
  }
`;

