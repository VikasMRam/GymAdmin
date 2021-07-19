import React from 'react';
import { array } from 'prop-types';

import ContactUsFormContainer from 'sly/web/components/common/ContactUsForm/ContactUsFormContainer.js';
import ListContent from './ListContent';
import { Flex, Heading, Block, Hr } from 'sly/common/system';

const ContactUs = ({
  blockList,
}) => (
  <>
    <Flex
      margin="l m"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx$laptop={{
        flexDirection: 'row',
        margin: 'xxxl m',
        alignItems: 'baseline',
      }}
    >
      <Heading
        sx$laptop={{  width: 'col4' }}
        font="title-m"
        paddingBottom="l"
      >
        Send us a message
      </Heading>
      <Block
        border="box"
        padding="m"
        sx$laptop={{ width: 'col6'}}
      >
        <ContactUsFormContainer />
      </Block>
    </Flex>
    <Hr />
    <ListContent contentBlock={blockList} />
  </>
);

ContactUs.propTypes = {
  blockList: array,
};

export default ContactUs;
