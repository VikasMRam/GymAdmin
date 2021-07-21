import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { array } from 'prop-types';

import { Flex, color, Hr, Block, Paragraph, Heading, } from 'sly/common/system';
import Minus from 'sly/common/icons/Minus';
import Plus from 'sly/common/icons/Plus';

const ElementLink = styled(Block)`
  p {
    a {
      color: ${color('viridian.base')};
      text-decoration: none;
    }
  }
`;

const FaqBox = ({ faqs }) => {
  const faqItems = faqs?.[0]?.FaqItem?.map(({id, title, description}) => ({
      question: title,
      answer: description,
      open: false,
      id,
  }));
  const [faq, setFaq] = useState(faqItems);

  const toggle = useCallback((index) => {
    const newFaq = faq?.map((item, i) => {
      if (i === index) {
        item.open = !item.open
      }
      return item;
    });
    setFaq(newFaq);
  }, [faqs]);
  return (
    <Flex
      flexDirection="column"
      width="100%"
      sx$tablet={{ width: 'col8' }}
      sx$laptop={{ width: 'col12', flexDirection: 'row' }}
    >
      <Heading
        width="100%"
        sx$tablet={{ width: 'col4' }}
        marginBottom="xxl"
        >
          {faqs?.[0]?.head}
        </Heading>
        {faq?.length && (
          <Flex
            width="100%"
            flexDirection="column"
            sx$laptop={{ width: 'col8'}}
          >
            {faq?.map((item, index) => (
              <Block
                key={item.id}
                onClick={() => toggle(index)}
                marginBottom="xl"
              >
                <Flex
                  font="title-s"
                  color="viridian.base"
                  justifyContent="space-between"
                  marginBottom="m"
                >
                  <Paragraph>{item.question}</Paragraph>
                  {item.open ? <Minus /> : <Plus />}
                </Flex>
                  {item.open && (
                    <ElementLink
                      font="body-m"
                      marginBottom="m"
                      dangerouslySetInnerHTML={{
                        __html: item.answer,
                      }}
                    />
                  )}
                  <Hr />
              </Block>
            )
          )}
        </Flex>
      )}
    </Flex>
  )
};

FaqBox.propTypes = {
  faqs: array,
}
export default FaqBox;
