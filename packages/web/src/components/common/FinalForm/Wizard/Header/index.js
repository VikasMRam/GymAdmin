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

const Header = ({ description, heading, onClose, headerTitle }) => {
  return (
    <>
      <Block
        display="flex"
        sx={{
          p: 'l 0',
        }}
      >
        <Block>
          {!!headerTitle && 
            <Block 
              as="span"
              font="body-xs"
              color="slate.lighter-40"
              sx={{
                fontWeight: '500',
                textTransform: 'uppercase',
              }}
            >
              {headerTitle}
            </Block>
          }   
          <Heading 
            pad="l"
            font="title-m" 
            sx={{ marginBottom: description ? 'xs' : '0', marginTop: 's' }}
          >
            {heading}
          </Heading>
          {description && 
            <Block 
              fontSize="body-s"
            >
              {description}
            </Block>
          }
        </Block>
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

