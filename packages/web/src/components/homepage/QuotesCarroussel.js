import React, { useCallback, useMemo, useState } from 'react';

import CarrousselButton from './CarrousselButton';

import { QuoteRound } from 'sly/common/icons/index';
import { Heading, Block, Flex } from 'sly/common/system';
import { clickEventHandler } from 'sly/web/services/helpers/eventHandlers';


const quotes = [
  { id: '1', author: 'Annie S.', text: 'This whole experience has changed our viewpoint of senior living. We thank Seniorly for the immediate, thorough, and compassionate care you provided.' },
  { id: '2', author: 'Sheryl O.', text: 'How could I give anything but a 10/10? Mom is moving to a great home with wonderful women- and she\'s stunned she has this opportunity.' },
  { id: '3', author: 'Amy B.', text: 'Sandy was really helpful, He didn\'t tell me what I wanted or hoped to hear, but told me what I needed to know, which was even better!' },
  { id: '4', author: 'Cindy H.', text: 'Rachelle responded promptly and got right to work sending us recommendations. After we found a spot she checked back in to see if we needed any help. Polite, respectful and very professional.' },
  { id: '5', author: 'Ronna S.', text: 'Donlyn was so helpful and quickly contacted several homes for us to tour. We found a perfect fit for my mom and couldn\'t be happier. It\'s wonderful to know that I am not on this journey alone.' },
  { id: '6', author: 'Gretchen H.', text: 'Lisa called me and was very encouraging. At the end of our conversation I felt more peaceful and less anxious. Thankful for all you folks who care and advise during life\'s inevitable difficult seasons.' },
  { id: '7', author: 'Pam E.', text: 'Kriste was amazing. I truely believe that she was an angel sent to help me. She was caring, knowledgable and honest. I am so blessed to have her as my advisor!' },
];

function mod(n, m) {
  return ((n % m) + m) % m;
}

export default function QuotesCarroussel(props) {
  const [below, above] = useMemo(() => {
    const above = Math.ceil(quotes.length / 2);
    const below = quotes.length - above;
    return [below, above];
  }, [quotes]);

  const [center, setCenter] = useState(0);

  const move = useCallback((reverse = false) => {
    setCenter(center + (reverse ? -1 : 1));
  }, [center, quotes]);

  return (
    <Block {...props}>
      <Heading
        font="title-xl"
        textAlign="center"
        margin="0 auto"
        maxWidth={450}
      >
        Families love the <br /> Seniorly experience.
      </Heading>
      <Block
        sx={{
          mb: 'l',
          overflow: 'hidden',
          position: 'relative',
          height: '485px',
        }}
        sx$tablet={{ height: '520px' }}
      >
        {quotes.map(({ id, author, text }, index) => {
          const iCenter = mod(index + center, quotes.length);
          const isEdge = iCenter < above
            ? iCenter === above - 1
            : quotes.length - iCenter === below;
          const position = iCenter < above
            ? iCenter
            : iCenter - quotes.length;
          return (
            <Flex
              key={id}
              sx={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                background: 'harvest.lighter-90',
                borderRadius: 'xs',
                padding: 'l',
                width: '264px',
                height: '452px',
                position: 'absolute',
                opacity: 1 - (0.33 * Math.abs(position)),
                top: `${32 - (16 * Math.abs(position))}px`,
                left: `calc(50% + ${position * (264 + 16)}px - 132px)`,
                transition: isEdge ? null : 'all 0.2s ease-out 0s',
                svg: {
                  width: '32px',
                  height: '32px',
                },
                '& > p': {
                  fontSize: '20px',
                  lineHeight: '28px',
                },
              }}
              sx$tablet={{
                svg: {
                  width: '48px',
                  height: '48px',
                },
                '& > p': {
                  fontSize: '24px',
                  lineHeight: '36px',
                },
                left: `calc(50% + ${position * (378 + 24)}px - 189px)`,
                width: '378px',
                height: '487px',
              }}
            >
              <QuoteRound color="harvest" pad="l" />
              <Block as="p">
                {text}
              </Block>
              <Block mt="auto">
                {author}
              </Block>
            </Flex>
          );
        })}
      </Block>
      <Flex
        alignItems="center"
        justifyContent="center"
        sx={{
          '& > :first-child': {
            mr: 'xxl',
          },
        }}
      >
        <CarrousselButton
          rotation="-90"
          onClick={() => {
            clickEventHandler('homepage-testimonial-caroussel', 'left-arrow')();
            move();
          }}
        />
        <CarrousselButton
          rotation="90"
          onClick={() => {
            clickEventHandler('homepage-testimonial-caroussel', 'right-arrow')();
            move(true);
          }}
        />
      </Flex>
    </Block>
  );
}
