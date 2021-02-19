import React, { useState } from 'react';
import { bool, string } from 'prop-types';

import { Block, Hr, Icon } from 'sly/common/components/atoms';
import { getKey } from 'sly/common/components/themes';
import EditorValueWrapper from 'sly/web/components/resourceCenter/components/EditorValueWrapper';

const FAQItem = ({ title, description, withMarginBottom, withMarginTop }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Block
      marginTop={withMarginTop && getKey('sizes.spacing.xs')}
      marginBottom={withMarginBottom && getKey('sizes.spacing.xl')}
      width={`calc(100% - ${getKey('sizes.spacing.m')} * 2)`}
      startingWithTablet={{
        width: getKey('sizes.layout.col6'),
        margin: `${withMarginTop ? getKey('sizes.spacing.m') : 0} 0 ${withMarginBottom ? getKey('sizes.spacing.xxl') : 0}`,
      }}
      startingWithLaptop={{ width: getKey('sizes.layout.col8') }}
    >
      <Block
        marginBottom="l"
        startingWithTablet={{ marginBottom: 'xl' }}
      >
        <Hr size="large" />
      </Block>

      <Block display="flex" justifyContent="space-between">
        <Block
          palette="viridian.base"
          font="title-medium"
          width={`calc(100% - ${getKey('sizes.spacing.l')} - ${getKey('sizes.spacing.xl')})`}
        >
          {title}
        </Block>
        <Icon
          onClick={() => setIsOpen(!isOpen)}
          css={{ cursor: 'pointer' }}
          palette="viridian.base"
          icon={isOpen ? 'minus' : 'plus'}
          size="title"
        />
      </Block>

      {isOpen && (
        <Block
          marginTop="l"
          startingWithLaptop={{ marginTop: 'xl' }}
        >
          <EditorValueWrapper value={description} />
        </Block>
      )}

      <Block
        marginTop="l"
        startingWithTablet={{ marginTop: 'xl' }}
      >
        {withMarginBottom && <Hr size="large" />}
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
