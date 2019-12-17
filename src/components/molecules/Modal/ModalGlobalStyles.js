export default `
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

