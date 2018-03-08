import React from 'react';
import styled from 'styled-components';

const BcWrapper = styled.div`
  ul {
    list-style-type: none;
    li {
      display: inline-block;
    }
  }
`;

const BcOul = (props) => {
  return (
    <BcWrapper>
      {' '}
      <ul itemScope itemType="http://schema.org/BreadcrumbList">
        {props.children}
      </ul>
    </BcWrapper>
  );
};
const BcLi = (props) => {
  return (
    <li
      key={props.path}
      itemProp="itemListElement"
      itemScope
      itemType="http://schema.org/ListItem"
    >
      <a itemProp="item" href={props.path}>
        <span itemProp="name">{props.label}</span>
      </a>
      <meta itemProp="position" content={props.position} /> >
    </li>
  );
};

const BreadCrumb = (in_ob) => {
  const bcs = in_ob.bcs;
  bcs.push(in_ob.curr);

  let position = 1;
  const listItems = [];
  let path = '';
  for (let i = 0; i < bcs.length; i++) {
    const elem = bcs[i];
    const label = elem.label;
    position += 1;
    path += `/${elem.path}`;
    listItems.push(<BcLi key={path} path={path} label={label} position={position} />);
  }
  return <BcOul>{listItems}</BcOul>;
};

export default BreadCrumb;
