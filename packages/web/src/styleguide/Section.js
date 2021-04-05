import React from 'react';

import Heading from 'sly/common/system/Heading';
import Paragraph from 'sly/common/system/Paragraph';
import Block from 'sly/common/system/Block';

const Section = ({ title, subtitle, children, anchor, ...props }) => {
  return (
    <Block {...props}>
      <Block
        background="harvest.lighter-90"
        padding="xxl 0"
      >
        <Block
          sx={{
            mx: 'gutter',
            sx$laptop: {
              mx: 'auto',
              maxWidth: 'col10',
            },
          }}
        >
          <Heading
            id={anchor}
            font="title-l"
            mb="m"
          >
            {title}
          </Heading>
          <Paragraph font="body-l">{subtitle}</Paragraph>
        </Block>
      </Block>

      <Block
        sx={{
          m: 'xxl gutter',
          sx$laptop: {
            m: 'xxl auto',
            maxWidth: 'col10',
          },
        }}
      >
        {children}
      </Block>
    </Block>
  );
};

export default Section;
