import React from 'react';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { gridColumns } from 'sly/web/components/themes';
import Heading from 'sly/common/components/atoms/Heading';
import Paragraph from 'sly/common/components/atoms/Paragraph';
import Block from 'sly/common/components/atoms/Block';
import Link from 'sly/common/components/atoms/Link';
import { Centered, ResponsiveImage } from 'sly/web/components/atoms';

const mostSearchedCities = [
  {
    to: '/assisted-living/california/san-francisco',
    image: 'react-assets/cities/SanFrancisco.jpeg',
    alt: 'san francisco assisted living seniorly',
    subtitle: 'San Francisco, CA',
    title: '95+ communities',
  },
  {
    to: '/assisted-living/california/los-angeles',
    image: 'react-assets/cities/LosAngeles.jpeg',
    alt: 'los angeles assisted living seniorly',
    subtitle: 'Los Angeles, CA',
    title: '105+ communities',
  },
  {
    to: '/assisted-living/california/san-diego',
    image: 'react-assets/cities/SanDiego.jpeg',
    alt: 'san diego assisted living seniorly',
    subtitle: 'San Diego, CA',
    title: '75+ communities',
  },
  {
    to: '/assisted-living/texas/dallas',
    image: 'react-assets/cities/Dallas.jpeg',
    alt: 'dallas assisted living seniorly',
    subtitle: 'Dallas, TX',
    title: '90+ communities',
  },
  {
    to: '/assisted-living/florida/miami',
    image: 'react-assets/cities/Miami.jpeg',
    alt: 'miami assisted living seniorly',
    subtitle: 'Miami, FL',
    title: '150+ communities',
  },
  {
    to: '/assisted-living/arizona/phoenix',
    image: 'react-assets/cities/Pheonix.jpeg',
    alt: 'phoenix assisted living seniorly',
    subtitle: 'Phoenix, AZ',
    title: '151+ communities',
  },
  {
    to: '/assisted-living/florida/orlando',
    image: 'react-assets/cities/Orlando.jpeg',
    alt: 'orlando assisted living seniorly',
    subtitle: 'Orlando, FL',
    title: '60+ communities',
  },
  {
    to: '/assisted-living/florida/sacramento',
    image: 'react-assets/cities/Sacramento.jpeg',
    alt: 'sacramento assisted living seniorly',
    subtitle: 'Sacramento, CA',
    title: '150+ communities',
  },
];

const MSCColumnWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
  ${gridColumns(1, size('spacing.xLarge'))};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    ${gridColumns(2, size('spacing.xLarge'))};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    ${gridColumns(3, size('spacing.xLarge'))};
  }
`;

const CenteredTile = styled(({
  title, to, alt, image, children, ...props
}) => (
  <Link key={title} to={to} {...props}>
    <ResponsiveImage path={image} alt={alt} aspectRatio="3:2">
      <Centered>
        {children}
      </Centered>
    </ResponsiveImage>
  </Link>
))`
  overflow: hidden;
  border-radius: ${size('spacing.small')};
`;

const CommunitiesByCity = () => {
  return (
    <MSCColumnWrapper>
      {mostSearchedCities.map(mostSearchedCity => (
        <CenteredTile key={mostSearchedCity.subtitle} size="body" {...mostSearchedCity}>
          <Heading palette="white" size="subtitle" level="subtitle">{mostSearchedCity.subtitle}</Heading>
          <Block palette="white">{mostSearchedCity.title}</Block>
        </CenteredTile>
      ))}
    </MSCColumnWrapper>
  );
};

export default CommunitiesByCity;