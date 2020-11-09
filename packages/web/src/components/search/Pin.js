import React from 'react';
import { number } from 'prop-types';

import Block from 'sly/common/components/atoms/Block';

const Pin = ({ number, ...props }) => (
  // eslint-disable-next-line
  <Block
    as="div"
    width="48px"
    height="54px"
    {...props}
  />
  // <Svg xmlns="http://www.w3.org/2000/svg" width="48px" height="54px" viewBox="0 0 48 54" {...props}>
  //   <defs>
  //     <path d="M18,0 C27.9411255,0 36,7.78493344 36,17.3881355 C36,22.1951316 33.9807514,26.5465384 30.7169375,29.6940061 L30.7279221,29.7047315 L18,42 L5.27207794,29.7047315 L5.28306251,29.6940061 C2.01924863,26.5465384 0,22.1951316 0,17.3881355 C0,7.78493344 8.0588745,0 18,0 Z" id="path-1" />
  //     <filter x="-25.0%" y="-16.7%" width="150.0%" height="144.7%" filterUnits="objectBoundingBox" id="filter-2">
  //       <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1" />
  //       <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
  //       <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
  //       <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1" />
  //       <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0" type="matrix" in="shadowBlurOuter1" />
  //     </filter>
  //   </defs>
  //   <g id="Search" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
  //     <g id="Community-pins" transform="translate(-42.000000, -110.000000)">
  //       <g id="Group-3-Copy-19" transform="translate(48.000000, 114.000000)">
  //         <g id="Combined-Shape">
  //           <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1" />
  //           <path stroke="#FFFFFF" strokeWidth="2" d="M18,-1 C12.7573559,-1 8.0124692,1.05524335 4.57730095,4.37364174 C1.12939883,7.70434115 -1,12.3065479 -1,17.3881355 C-1,22.474116 1.13317182,27.0800339 4.575485,30.422198 L18.000603,43.3909678 L31.4123379,30.4126286 C34.8658256,27.0822505 37,22.4754186 37,17.3881355 C37,12.3065479 34.8706012,7.70434115 31.4226991,4.37364174 C27.9875308,1.05524335 23.2426441,-1 18,-1 Z" fill="#1A7473" fillRule="evenodd" />
  //         </g>
  //         <text id="11" fontFamily="AzoSans-Medium, Azo Sans" fontSize="16" fontWeight="400" fill="#FFFFFF">
  //           <tspan x="9.792" y="20">{number}</tspan>
  //         </text>
  //       </g>
  //     </g>
  //   </g>
  // </Svg>
);

Pin.propTypes = {
  number,
};

export default Pin;

