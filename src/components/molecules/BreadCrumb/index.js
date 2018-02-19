import React from 'react';
import styled from "styled-components";


const BcWrapper = styled.div`
ul {
    list-style-type:none;
    li{
      display:inline-block;
    }
  }
`;

const BcOul= (props) => {
  return <BcWrapper> <ul itemscope itemtype="http://schema.org/BreadcrumbList">{props.children}</ul></BcWrapper>
};
const BcLi = (props)=>{

  return <li key={props.path} itemprop="itemListElement" itemscope
             itemtype="http://schema.org/ListItem">
    <a itemprop="item" href={props.path}>
      <span itemprop="name">{props.label}</span></a>
    <meta itemprop="position" content={props.position}/> >
  </li>;
};

const BreadCrumb =(in_ob) => {
  let bcs = in_ob.bcs;
  bcs.push(in_ob.curr);

  let position = 1;
  let listItems = [];
  let path = '';
  for (let i = 0; i < bcs.length; i++ ) {
    let elem = bcs[i];
    let label = elem.label;
    position += 1;
    path += `/${elem.path}`;
    listItems.push(<BcLi key={path} path={path} label={label} position={position}></BcLi>)
  }
  return <BcOul>{listItems}</BcOul>

};

export default BreadCrumb;
