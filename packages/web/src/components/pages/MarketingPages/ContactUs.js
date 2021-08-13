import React from 'react';
import { array } from 'prop-types';

import ContactUsFormContainer from 'sly/web/components/common/ContactUsForm/ContactUsFormContainer.js';
import ListContent from './ListContent';
import MarketingPageTitle from './MarketingPageTitle';
import { Flex, Block, Hr } from 'sly/common/system';

const ContactUs = ({
  blockList,
  infoBlockList,
}) => (
  <>
    <Flex
      margin="xxl m"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx$tablet={{
        margin: 'xxxl l',
      }}
      sx$laptop={{
        flexDirection: 'row',
        margin: '5.5rem 0 7rem',
        alignItems: 'baseline',
      }}
    >
      <MarketingPageTitle title="Send us a message" />
      <Block
        border="box"
        padding="l"
        sx$tablet={{
          width: 'col6',
        }}
      >
        <ContactUsFormContainer />
      </Block>
      <Block
        display='none'
        sx$laptop={{
          width: 'col2',
          display: 'block'
        }}/>
    </Flex>
    <Hr />
    <ListContent
      contentBlock={blockList}
      infoBlockList={infoBlockList}
    />
  </>
);

ContactUs.propTypes = {
  blockList: array,
};

export default ContactUs;
