import React from 'react';
import { number, any } from 'prop-types';
import styled from 'styled-components';

import { space } from 'sly/common/system';

const Svg = styled.svg`
  filter: drop-shadow(0 ${space('xxs')} ${space('xs')} #00000030);
`;

export const PinDefs = () => (
  <Svg
    css={{
      display: 'none',
    }}
  >
    <defs>
      <filter x="-25%" y="-16.7%" width="150%" height="144.7%" filterUnits="objectBoundingBox" id="pinFilter">
        <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1" />
        <feOffset dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" in="shadowBlurOuter1" />
      </filter>
      <path
        id="pinPath"
        strokeWidth="2"
        d="M18-1C12.757-1 8.012 1.055 4.577 4.374 1.13 7.704-1 12.307-1 17.388c0 5.086 2.133 9.692 5.575 13.034l13.426 12.969 13.411-12.978C34.866 27.083 37 22.475 37 17.388c0-5.081-2.13-9.684-5.577-13.014C27.988 1.055 23.243-1 18-1z"
      />
      <path
        id="verifiedPath"
        stroke="#FFF"
        d="M 28.5845 -4.6127 L 28.743 -4.5503 L 33.4097 -2.4769 C 33.7398 -2.3302 34.0127 -2.0919 34.2029 -1.7995 C 34.3611 -1.5562 34.462 -1.2755 34.4912 -0.9793 L 34.5 -0.8 L 34.5 2.3333 C 34.5 4.2983 33.8195 6.1999 32.6799 7.7193 C 31.5406 9.2384 29.9443 10.3733 28.1186 10.8191 C 26.0557 10.3733 24.4594 9.2384 23.3201 7.7193 C 22.2476 6.2893 21.5817 4.5207 21.507 2.6794 L 21.5 2.3333 L 21.5 -0.8 C 21.5 -1.1617 21.6072 -1.5075 21.7971 -1.7995 C 21.9556 -2.0432 22.1715 -2.2493 22.4301 -2.3961 L 22.5903 -2.4769 L 27.2544 -4.5491 C 27.6717 -4.7373 28.1544 -4.7582 28.5845 -4.6127 Z M 31.0567 0.8317 C 31.0145 0.8317 30.9724 0.848 30.9402 0.8802 L 30.9402 0.8802 L 26.6676 5.1528 L 25.0541 3.5478 L 25.0183 3.5203 C 24.9929 3.5056 24.9648 3.4983 24.9367 3.4983 C 24.8945 3.4983 24.8524 3.5147 24.8202 3.5469 C 24.788 3.5791 24.7717 3.6212 24.7717 3.6633 C 24.7717 3.7055 24.788 3.7476 24.8202 3.7798 L 24.8202 3.7798 L 26.5469 5.5064 L 26.5827 5.5336 C 26.6085 5.548 26.6373 5.555 26.6658 5.555 C 26.7054 5.555 26.7456 5.5415 26.7752 5.5111 L 26.7752 5.5111 L 31.1731 1.1131 L 31.2 1.078 C 31.2144 1.0529 31.2217 1.0248 31.2217 0.9967 C 31.2217 0.9545 31.2053 0.9124 31.0567 0.8317 Z"
      />
    </defs>
  </Svg>
);

const Pin = ({ number, active, markerHover, isVerified, isPlus, ...props }) => {
  const primaryColor = active || markerHover ? '#E9EBED' : 'white';
  const secondaryColor = active || markerHover ? 'white' : '#E9EBED';
  const activeColor = active ? '#1A7473' : primaryColor;
  const verifiedColor = '#9f8352';
  const textColor = active ? 'white' : '#253348';
  const plusColor = isPlus ? '#9f8352' : activeColor;
  const plusText = isPlus ? 'white' : textColor;
  return (
    // eslint-disable-next-line
    <Svg
      width="48"
      height="54"
      css={{
        transform: 'translate(-50%, -100%)',
        position: 'absolute',
        zIndex: markerHover || active ? 900 : (800 - number),
      }}
      {...props}
    >
      <g transform="translate(6 4)">
        <use
          xlinkHref="#pinPath"
          fill="#000"
          filter="url(#pinFilter)"
        />
        <use
          xlinkHref="#pinPath"
          fill={plusColor}
          stroke={secondaryColor}
        />
        {(isVerified || isPlus) &&
          <use
            xlinkHref="#verifiedPath"
            fill={verifiedColor}
            stroke={secondaryColor}
          />
        }

      </g>
      <text
        fill={plusText}
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Azo Sans"
        fontSize="16"
        fontWeight="500"
        x="50%"
        y="24"
      >
        {number}
      </text>
    </Svg>
  );
};

Pin.propTypes = {
  number,
  active: any,
};

export default Pin;

