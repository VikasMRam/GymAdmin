import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { Thumbnail, Paragraph, Heading } from 'sly/components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 1rem;
  box-sizing: border-box;
  opacity: ${ifProp('soon', 0.4, 1)};
  @media screen and (max-width: 640px) {
    padding: 0.5rem;
  }
`;

const StyledThumb = styled(Thumbnail)`
  flex: auto;
  @media screen and (max-width: 640px) {
    width: 32px;
  }
`;

const Text = styled.div`
  margin-left: 1rem;
  overflow: auto;
  > :first-child {
    margin: 0;
  }
`;

const RgsCard = ({ ...attributes }) => {
  return (
    <Wrapper {...attributes}>
      {attributes.mainImage && (
        <StyledThumb
          src={attributes.mainImage}
          alt={attributes.name}
          width={200}
        />
      )}
      <Text>
        <Heading level={2}>
          {attributes.url ? (
            <a href={`/community/${attributes.id}`}>{attributes.name}</a>
          ) : (
            attributes.name
          )}
        </Heading>
        <Paragraph>{attributes.slogan}</Paragraph>
      </Text>
    </Wrapper>
  );
};

RgsCard.propTypes = {
  attributes: PropTypes.any,
};

export default RgsCard;
