import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, object } from 'prop-types';

import { size } from 'sly/components/themes';
import { Link } from 'sly/components/atoms';

const Wrapper = styled.nav`
  margin-bottom: ${size('spacing.large')};

  ol {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;
      text-transform: capitalize;

      span:not(:first-child) {
        margin: 0 ${size('spacing.regular')};
      }
    }
  }
`;

const BreadCrumb = ({ items, innerRef }) => (
  <Wrapper innerRef={innerRef}>
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
                <span itemProp="name">{label}</span>
              :
                <Link itemProp="item" to={path}>
                  <span itemProp="name">{label}</span>
                </Link>
              }
              {key < items.length - 1 ? <span>/</span> : null}
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
};

export default BreadCrumb;
