import React from 'react';
import { number, any } from 'prop-types';
import styled from 'styled-components';

import { getKey } from 'sly/common/components/themes';
import { withShadow } from 'sly/common/components/helpers';

const Svg = styled.svg(
  withShadow,
);

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
    </defs>
  </Svg>
);

const Pin = ({ number, active, ...props }) => {
  const primaryColor = active ? 'white' : '#1A7473';
  const secondaryColor = active ? '#1A7473' : 'white';

  return (
    // eslint-disable-next-line
    <Svg
      width="48"
      height="54"
      css={{
        transform: 'translate(-50%, -100%)',
        position: 'absolute',
        zIndex: active ? 900 : (800 - number),
        filter: `drop-shadow(0 ${getKey('sizes.spacing.small')} ${getKey('sizes.spacing.regular')} ${getKey('palette.black.base')}30)`,
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
          fill={primaryColor}
          stroke={secondaryColor}
        />
      </g>
      <text
        fill={secondaryColor}
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

