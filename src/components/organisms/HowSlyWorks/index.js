import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {  Heading } from 'sly/components/atoms';
import TileImage from "sly/components/atoms/TileImage";
import CollapsibleSection from "sly/components/molecules/CollapsibleSection";
import Block from "sly/components/atoms/Block";

import {size} from "sly/components/themes";
import ReasonTile from "sly/components/molecules/ReasonTile";

const defaultImage =
  'https://d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';

const reason1 = {
  title:"Get the Info You Want",
  text :"Our powerful search engine is " +
  "designed to give you unlimited " +
  "access to all the information " +
  "you want- pricing, floor plans, " +
  "photos, ratings and more.",
  to:"/how-it-works/consumers"
};

const reason2 = {
  title:"Connect with Communities",
  text :"We connect you directly to " +
  "each senior community you " +
  "choose and we guarantee " +
  "no other properties will obtain " +
  "your personal information.",
  to:"/how-it-works/consumers"
};

const reason3 = {
  title:"Access Local Support",
  text :"We’ve partnered with top " +
  "senior living experts to " +
  "help you find local options, " +
  "accompany you on tours, " +
  "and coordinate the move.",
  to:"/how-it-works/consumers"
};

const reason4 = {
  title:"Personalized Service",
  text :"We listen in your time of need " +
  "because we have been there. " +
  "We are available to you via " +
  "email, online chat, text " +
  "message or telephone.",
  to:"/how-it-works/consumers"
};



const StyledCollapsibleSection = styled(CollapsibleSection)`
  display:flex;
  flex-direction: column;
    @media screen and (min-width: ${size('breakpoint','tablet')}) {
        flex-flow: row wrap;
        >a {
          flex: 1;
          margin-right: ${size('spacing.regular')};  
        }
      }
`
const HowSlyWorks = ({
  ...props
}) => {
  return (
    <StyledCollapsibleSection title={'How Seniorly Works'} {...props} >
      <ReasonTile image={defaultImage} title={reason1.title} text={reason1.text} to={reason1.to}/>
      <ReasonTile image={defaultImage} title={reason2.title} text={reason2.text} to={reason2.to}/>
      <ReasonTile image={defaultImage} title={reason3.title} text={reason3.text} to={reason3.to}/>
      <ReasonTile image={defaultImage} title={reason4.title} text={reason4.text} to={reason4.to}/>
    </StyledCollapsibleSection>
  );
};


export default HowSlyWorks;
