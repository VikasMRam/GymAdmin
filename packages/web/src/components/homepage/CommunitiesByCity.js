import React from 'react';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { gridColumns } from 'sly/web/components/themes';
import Heading from 'sly/common/components/atoms/Heading';
import Block from 'sly/common/components/atoms/Block';
import Link from 'sly/common/components/atoms/Link';
import { Centered, ResponsiveImage } from 'sly/web/components/atoms';
import Grid from 'sly/common/components/atoms/Grid';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';
import { startingWith } from 'sly/common/components/helpers/media';

const mostSearchedCities = [{
  to: '/assisted-living/california/los-angeles',
  image: 'react-assets/home/cities/LosAngeles.jpg',
  alt: 'Los Angeles assisted living seniorly',
  subtitle: 'Los Angeles, CA',
},{
  to: '/assisted-living/california/san-francisco',
  image: 'react-assets/home/cities/SanFrancisco.jpg',
  alt: 'san francisco assisted living seniorly',
  subtitle: 'San Francisco, CA',
},{
  to: '/assisted-living/new-york/new-york',
  image: 'react-assets/home/cities/NewYork.jpg',
  alt: 'New York assisted living seniorly',
  subtitle: 'New York, NY',
},{
  to: '/assisted-living/california/san-Diego',
  image: 'react-assets/home/cities/SanDiego.jpg',
  alt: 'San Diego assisted living seniorly',
  subtitle: 'San Diego, CA',
},{
  to: '/assisted-living/arizona/phoenix',
  image: 'react-assets/home/cities/Phoenix.jpg',
  alt: 'Phoenix assisted living seniorly',
  subtitle: 'Phoenix, AZ',
},{
  to: '/assisted-living/illinois/chicago',
  image: 'react-assets/home/cities/Chicago.jpg',
  alt: 'Chicago assisted living seniorly',
  subtitle: 'Chicago, IL',
},{
  to: '/assisted-living/georgia/Atlanta',
  image: 'react-assets/home/cities/Atlanta.jpg',
  alt: 'Atlanta assisted living seniorly',
  subtitle: 'Atlanta, GA',
},{
  to: '/assisted-living/california/san-jose',
  image: 'react-assets/home/cities/SanJose.jpg',
  alt: 'san jose assisted living seniorly',
  subtitle: 'San Jose, CA',
},{
  to: '/assisted-living/texas/Dallas',
  image: 'react-assets/home/cities/Dallas.jpg',
  alt: 'Dallas assisted living seniorly',
  subtitle: 'Dallas, TX',
},{
  to: '/assisted-living/texas/houston',
  image: 'react-assets/home/cities/Houston.jpg',
  alt: 'Houston assisted living seniorly',
  subtitle: 'Houston, TX',
},{
  to: '/assisted-living/california/sacramento',
  image: 'react-assets/home/cities/Sacramento.jpg',
  alt: 'Sacramento assisted living seniorly',
  subtitle: 'Sacramento, CA',
},{
  to: '/assisted-living/washington/seattle',
  image: 'react-assets/home/cities/Seattle.jpg',
  alt: 'Seattle assisted living seniorly',
  subtitle: 'Seattle, WA',
},{
  to: '/assisted-living/pennsylvania/philadelphia',
  image: 'react-assets/home/cities/Philidelphia.jpg',
  alt: 'Philadelphia assisted living seniorly',
  subtitle: 'Philadelphia, PA',
},{
  to: '/assisted-living/north-carolina/charlotte',
  image: 'react-assets/home/cities/Charlotte.jpg',
  alt: 'Charlotte assisted living seniorly',
  subtitle: 'Charlotte, NC',
},{
  to: '/assisted-living/florida/orlando',
  image: 'react-assets/home/cities/Orlando.jpg',
  alt: 'Orlando assisted living seniorly',
  subtitle: 'Orlando, Fl',
},{
  to: '/assisted-living/california/oakland',
  image: 'react-assets/home/cities/Oakland.jpg',
  alt: 'Oakland assisted living seniorly',
  subtitle: 'Oakland, CA',
},{
  to: '/assisted-living/colarado/denver',
  image: 'react-assets/home/cities/Denver.jpg',
  alt: 'Denver assisted living seniorly',
  subtitle: 'Denver, CO',
},{
  to: '/assisted-living/wisconsin/milwaukee',
  image: 'react-assets/home/cities/Milwaukee.jpg',
  alt: 'Milwaukee assisted living seniorly',
  subtitle: 'Milwaukee, WI',
},{
  to: '/assisted-living/florida/tampa',
  image: 'react-assets/home/cities/Tampa.jpg',
  alt: 'Tampa assisted living seniorly',
  subtitle: 'Tampa, FL',
},{
  to: '/assisted-living/florida/miami',
  image: 'react-assets/home/cities/Miami.jpg',
  alt: 'Miami assisted living seniorly',
  subtitle: 'Miami, FL',
},{
  to: '/assisted-living/massachusetts/boston',
  image: 'react-assets/home/cities/Boston.jpg',
  alt: 'Boston assisted living seniorly',
  subtitle: 'Boston, MA',
},{
  to: '/assisted-living/oregon/portland',
  image: 'react-assets/home/cities/Portland.jpg',
  alt: 'Portland assisted living seniorly',
  subtitle: 'Portland, OR',
},{
  to: '/assisted-living/arizona/tucson',
  image: 'react-assets/home/cities/Tucson.jpg',
  alt: 'Tucson assisted living seniorly',
  subtitle: 'Tucson, AZ',
},{
  to: '/assisted-living/texas/austin',
  image: 'react-assets/home/cities/Austin.jpg',
  alt: 'Austin assisted living seniorly',
  subtitle: 'Austin. TX',
},{
  to: '/assisted-living/pennsylvania/Pittsburgh',
  image: 'react-assets/home/cities/Pittsburgh.jpg',
  alt: 'Pittsburgh assisted living seniorly',
  subtitle: 'Pittsburgh, PA',
},{
  to: '/assisted-living/texas/san-antonio',
  image: 'react-assets/home/cities/SanAntonio.jpg',
  alt: 'san Antonio assisted living seniorly',
  subtitle: 'San Antonio, TX',
},{
  to: '/assisted-living/wisconsin/madison',
  image: 'react-assets/home/cities/Madison.jpg',
  alt: 'Madison assisted living seniorly',
  subtitle: 'Madison, WI',
},{
  to: '/assisted-living/michigan/Detroit',
  image: 'react-assets/home/cities/Detroit.jpg',
  alt: 'Detroit assisted living seniorly',
  subtitle: 'Detroit, MI',
},{
  to: '/assisted-living/arizona/scottsdale',
  image: 'react-assets/home/cities/Scottsdale.jpg',
  alt: 'Scottsdale assisted living seniorly',
  subtitle: 'Scottsdale, AZ',
},{
  to: '/assisted-living/north-carloina/raleigh',
  image: 'react-assets/home/cities/Raleigh.jpg',
  alt: 'Raleigh assisted living seniorly',
  subtitle: 'Raleigh, NC',
},
];

const Bottom = styled.div`
  position: absolute;
  bottom: 0; 
  left: 0;
  padding: ${size('spacing.regular')};
`;

const CityTile = styled(({
  title, to, alt, image, children, ...props
}) => (
  <Link key={title} to={to} {...props}>
    <ResponsiveImage path={image} alt={alt} aspectRatio="3:2">
      <Bottom>
        {children}
      </Bottom>
    </ResponsiveImage>
  </Link>
))`
  overflow: hidden;
  border-radius: ${size('spacing.regular')};
`;

const CommunitiesByCity = (onLocationSearch) => {
  return (
    <Block padding="large">
      <Grid gap="large" overflow="auto" dimensions={['repeat(15,240px)']}>
        {mostSearchedCities.map(mostSearchedCity => (
          <CityTile key={mostSearchedCity.subtitle} size="body" {...mostSearchedCity}>
            <Heading palette="white" size="subtitle" level="subtitle" pad="0">{mostSearchedCity.subtitle}</Heading>
            <Block palette="white">Explore now ></Block>
          </CityTile>
        ))}
      </Grid>
      <Block
        display="flex"
        alignItems="center"
        flexDirection="column"
        padding="xLarge"
        paddingBottom="xxxLarge"
      >
        <Heading size="title" level="subtitle">Find communities in your area.</Heading>
        <Block
          width="100%"
          startingWithTablet={{
            maxWidth: '360px',
          }}
        >
          <SearchBoxContainer
            layout="homeHero"
            onLocationSearch={(e) => {
              onLocationSearch(e, true);
            }}
          />
        </Block>
      </Block>
    </Block>
  );
};

export default CommunitiesByCity;
