import React from 'react';
import { CodeBlock, ocean } from "react-code-blocks";
import { string } from 'prop-types';

import Block from 'sly/common/system/Block';
import Heading from 'sly/common/system/Heading';
import Paragraph from 'sly/common/system/Paragraph';


const Example = ({ title, text, language='jsx', ...props }) => (
  <Block
    border="box"
    borderColor="slate.lighter-90"
    pad="xxl"
    overflow="hidden"
    {...props}
  >
    <Heading
      p="s"
      font="title-xs-azo"
    >
      {title}
    </Heading>
    <CodeBlock
      text={text}
      language={language}
      theme={ocean}
      wrapLines
      customStyle={{
        borderRadius: '0',
        fontFamily: 'monospace',
      }}
    />
  </Block>
);

Example.propTypes = {
  title: string,
  text: string,
  language: string,
};

export default Example;
