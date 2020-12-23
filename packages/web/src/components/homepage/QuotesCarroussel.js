import React, { useCallback, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

import Icon from 'sly/common/components/atoms/Icon';
import IconButton from 'sly/common/components/molecules/IconButton'
import Block from 'sly/common/components/atoms/Block';
import Heading from 'sly/common/components/atoms/Heading';
import Paragraph from 'sly/common/components/atoms/Paragraph';

import {
  withColor,
  withDisplay,
  withBorder,
  withSpacing,
  startingWith,
  withTransition,
} from 'sly/common/components/helpers/index';

const quotes = [
  { id: '1', author: 'Annie', text: 'This whole experience has changed our viewpoint of senior living. We thank Seniorly for the immediate, thorough, and compassionate care you provided.' },
  { id: '2', author: 'Sheryl', text: 'How could I give anything but a 10/10? Mom is moving to a great home with wonderful women- and she\'s stunned she has this opportunity.' },
  { id: '3', author: 'Amy', text: 'Sandy was really helpful, He didn\'t tell me what I wanted or hoped to hear, but told me what I needed to know, which was even better!' },
  { id: '4', author: 'Cindy', text: 'Rachelle responded promptly and got right to work sending us recommendations. After we found a spot she checked back in to see if we needed any help or any other assistance. Polite, respectful and very professional.' },
  { id: '5', author: 'Ronna', text: 'Donlyn was so helpful and very quilckly contacted several homes for us to tour. We found a perfect fit fpr my mom and could not be happier. Thank you, Donlyn and Seniorly. It was wonderful to know that I am not on this journey alone.' },
  { id: '6', author: 'Gretchen', text: 'Lisa called me and was very encouraging. At the end of our conversation I felt more peaceful and less anxious. Thankful for all you folks who care and advise during life\'s inevitable difficult seasons.' },
  { id: '7', author: 'Pam', text: 'Kriste Kidd was amazing. I truely believe that she was an angel sent to help me. She was caring, knowledgable and honest. I am so blessed to have her as my advisor! I plan on contacting her again for help placing my mom in a home in the spring.' },
];

function mod(n, m) {
  return ((n % m) + m) % m;
}

const Wrapper = styled.div(
  withSpacing,
  css`
    width: 100%;
    overflow: hidden;
    position: relative;
    height: 485px;
    ${startingWith('tablet', css`
      height: 520px;
    `)} 
  `,
);

const Card = styled.div(
  withColor,
  withSpacing,
  withBorder,
  withDisplay,
  withTransition,
  css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    position: absolute;
    opacity: calc(${({ position }) => 1 - 0.33 * Math.abs(position)});

    top: calc(${({ position }) => 32 - 16 * Math.abs(position)}px);

    left: calc(50% + ${({ position }) => (position * (264 + 16))}px - 132px);
    width: 264px;
    height: 452px;

    svg {
      width: 32px;
      height: 32px;
    }

    p {
      font-size: 20px;
      line-height: 28px;
    }

    ${startingWith('tablet', css`
      svg {
        width: 48px;
        height: 48px;
      }
      p {
        font-size: 24px;
        line-height: 36px;
      }
      left: calc(50% + ${({ position }) => (position * (378 + 24))}px - 189px);
      width: 378px;
      height: 487px;
    `)}
  `,
);

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > :first-child {
    margin-right: 48px;
  }
`;

const Button = styled(Icon)`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  background: white;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, .1));
`;

export default function QuotesCarroussel ({
  heading,
  ...props
}) {
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
        font="title-xlarge"
        textAlign="center"
        margin="0 auto"
        maxWidth={450}
      >
        Families love the Seniorly experience.
      </Heading>
      <Wrapper pad="xLarge">
        {quotes.map(({ id, author, text }, index) => {
          const iCenter = mod(index + center, quotes.length);
          const isEdge = iCenter < above
            ? iCenter === above - 1
            : quotes.length - iCenter === below;
          const position = iCenter < above
            ? iCenter
            : iCenter - quotes.length;
          return (
            <Card
              key={id}
              background="harvest.lighter-90"
              borderRadius="regular"
              padding="xLarge"
              position={position}
              transition={isEdge ? null : 'all'}
            >
              <Icon
                icon="quote-round"
                palette="harvest"
                pad="xLarge"
              />
              <Paragraph>
                {text}
              </Paragraph>
              <Block marginTop="auto">
                {author}
              </Block>
            </Card>
          );
        })}
      </Wrapper>
      <Controls>
        <Button
          rotate={2}
          icon="chevron"
          size="caption"
          palette="slate"
          onClick={() => move()}
        />
        <Button
          rotate={0}
          icon="chevron"
          size="caption"
          palette="slate"
          onClick={() => move(true)}
        />
      </Controls>
    </Block>
  );
}
