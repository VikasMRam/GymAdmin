import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, object } from 'prop-types';

import { size } from 'sly/components/themes';
import { text as textPropType } from 'sly/propTypes/text';
import { Link, Span } from 'sly/components/atoms';

const getSize = p => size('text', p.size);

const Wrapper = styled.nav`
  margin-bottom: ${size('spacing.large')};

  ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-size: ${getSize};

    li {
      display: inline-block;
      text-transform: capitalize;
      font-size: ${getSize};

      span:not(:first-child) {
        margin: 0 ${size('spacing.regular')};
      }
    }
  }
`;

const BreadCrumb = ({ items, innerRef, size }) => (
  <Wrapper innerRef={innerRef} size={size}>
    <ol itemScope itemType="http://schema.org/BreadcrumbList">
      {
        items.map((item, key) => {
          const { label, path } = item;

          return (
            <li
              key={path}
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              {key === items.length - 1 ?
                <Link itemProp="item" to={path} >
                  <meta itemProp="position" content={key + 1} />
                  <Span itemProp="name" size={size}>{label}</Span>
                </Link>
              :
                <Link itemProp="item" to={path}>
                  <meta itemProp="position" content={key + 1} />
                  <Span itemProp="name" palette="primary" size={size}>{label}</Span>
                </Link>
              }

              {key < items.length - 1 ? <Span size={size}>/</Span> : null}
            </li>
          );
        })
      }
    </ol>
  </Wrapper>
);

BreadCrumb.propTypes = {
  items: arrayOf(shape({
    label: string.isRequired,
    path: string.isRequired,
  })).isRequired,
  innerRef: object,
  size: textPropType,
};

BreadCrumb.defaultProps = {
  size: 'tiny',
};

export default BreadCrumb;
