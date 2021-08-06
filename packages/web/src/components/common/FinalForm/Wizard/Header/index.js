import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';

import { Icon } from 'sly/common/components/atoms';
import { Heading, space, sx, Hr } from 'sly/common/system';
import cursor from 'sly/web/components/helpers/cursor';
import Block from 'sly/common/system/Block';


const CloseIcon = cursor(styled(Icon)`
  margin-left: auto;
`);

const Header = ({ description, heading, onClose }) => {
  return (
    <>
      <Block
        display="flex"
        sx={{
          p: description ? 'l 0' : 'l 0 0',
        }}
      >
        <div>
          {<Heading pad="l" font="title-m">{heading}</Heading>}

          {description && <Block fontSize="body-s">{description}</Block>}
        </div>
        <CloseIcon onClick={onClose} icon="close" palette="base" />
      </Block>
      <Hr pad="l" marginX={sx`-${space('l')}`} marginTop="0" />
    </>
  );
};

Header.propTypes = {
  onClose: func,
  heading: string,
  description: string,
};

Header.defaultProps = {
  onClick: () => {},
};


export default Header;

