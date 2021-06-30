import React, { useState } from 'react';
import { bool, string } from 'prop-types';

import EditorValueWrapper from '../resourceCenter/components/ArticleContent/EditorValueWrapper';

import Hr from 'sly/common/system/Hr';
import Block from 'sly/common/system/Block';
import Flex from 'sly/common/system/Flex';
import { sx, space } from 'sly/common/system/sx';
import Minus from 'sly/common/icons/Minus';
import Plus from 'sly/common/icons/Plus';

const FAQItem = ({ title, description, withMarginBottom, withMarginTop }) => {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = isOpen ? Minus : Plus;
  return (
    <Block
      marginTop={withMarginTop && 'xs'}
      marginBottom={withMarginBottom && 'xl'}
      width={sx`calc(100% - ${space('m')} * 2)`}
      sx$tablet={{
        width: 'col6',
        margin: `${withMarginTop ? 'm' : 0} 0 ${withMarginBottom ? 'xxl' : 0}`,
      }}
      sx$laptop={{ width: 'col8' }}
    >
      <Hr mb={['l', 'xl']} />

      <Flex
        sx={{
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Block
          color="viridian.base"
          font="title-m"
          width={sx`calc(100% - ${space('l')} - ${space('xl')})`}
        >
          {title}
        </Block>
        <Icon
          color="viridian.base"
          size="l"
        />
      </Flex>

      {isOpen && (
        <Block marginTop={['l', null, 'xl']}>
          <EditorValueWrapper value={description} />
        </Block>
      )}

      <Block
        marginTop="l"
        marginBottom={!withMarginBottom && 'l'}
        sx$tablet={{ marginTop: 'xl', marginBottom: !withMarginBottom && 'xl' }}
      >
        {withMarginBottom && <Hr />}
      </Block>
    </Block>
  );
};

FAQItem.propTypes = {
  title: string,
  description: string,
  withMarginBottom: bool,
  withMarginTop: bool,
};

export default FAQItem;
