import React, { forwardRef, useMemo, useCallback, useState, useEffect } from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

import CarrousselButton from './CarrousselButton';
import Section from './Section';


import { Heading, Block, Grid, space, color, Link, Image } from 'sly/common/system';
import { Chevron } from 'sly/common/icons';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';
import useScrollObserver from 'sly/common/components/helpers/useScrollObserver';


const mostSearchedCities = [{
  href: '/assisted-living/california/los-angeles',
  image: 'react-assets/home/cities/LosAngeles.jpg',
  alt: 'Los Angeles assisted living seniorly',
  subtitle: 'Los Angeles, CA',
}, {
  href: '/assisted-living/california/san-francisco',
  image: 'react-assets/home/cities/SanFrancisco.jpg',
  alt: 'san francisco assisted living seniorly',
  subtitle: 'San Francisco, CA',
}, {
  href: '/assisted-living/new-york/new-york',
  image: 'react-assets/home/cities/NewYork.jpg',
  alt: 'New York assisted living seniorly',
  subtitle: 'New York, NY',
}, {
  href: '/assisted-living/california/san-diego',
  image: 'react-assets/home/cities/SanDiego.jpg',
  alt: 'San Diego assisted living seniorly',
  subtitle: 'San Diego, CA',
}, {
  href: '/assisted-living/arizona/phoenix',
  image: 'react-assets/home/cities/Phoenix.jpg',
  alt: 'Phoenix assisted living seniorly',
  subtitle: 'Phoenix, AZ',
}, {
  href: '/assisted-living/illinois/chicago',
  image: 'react-assets/home/cities/Chicago.jpg',
  alt: 'Chicago assisted living seniorly',
  subtitle: 'Chicago, IL',
}, {
  href: '/assisted-living/georgia/atlanta',
  image: 'react-assets/home/cities/Atlanta.jpg',
  alt: 'Atlanta assisted living seniorly',
  subtitle: 'Atlanta, GA',
}, {
  href: '/assisted-living/california/san-jose',
  image: 'react-assets/home/cities/SanJose.jpg',
  alt: 'san jose assisted living seniorly',
  subtitle: 'San Jose, CA',
}, {
  href: '/assisted-living/texas/dallas',
  image: 'react-assets/home/cities/Dallas.jpg',
  alt: 'Dallas assisted living seniorly',
  subtitle: 'Dallas, TX',
}, {
  href: '/assisted-living/texas/houston',
  image: 'react-assets/home/cities/Houston.jpg',
  alt: 'Houston assisted living seniorly',
  subtitle: 'Houston, TX',
}, {
  href: '/assisted-living/california/sacramento',
  image: 'react-assets/home/cities/Sacramento.jpg',
  alt: 'Sacramento assisted living seniorly',
  subtitle: 'Sacramento, CA',
}, {
  href: '/assisted-living/washington/seattle',
  image: 'react-assets/home/cities/Seattle.jpg',
  alt: 'Seattle assisted living seniorly',
  subtitle: 'Seattle, WA',
}, {
  href: '/assisted-living/pennsylvania/philadelphia',
  image: 'react-assets/home/cities/Philidelphia.jpg',
  alt: 'Philadelphia assisted living seniorly',
  subtitle: 'Philadelphia, PA',
}, {
  href: '/assisted-living/north-carolina/charlotte',
  image: 'react-assets/home/cities/Charlotte.jpg',
  alt: 'Charlotte assisted living seniorly',
  subtitle: 'Charlotte, NC',
}, {
  href: '/assisted-living/florida/orlando',
  image: 'react-assets/home/cities/Orlando.jpg',
  alt: 'Orlando assisted living seniorly',
  subtitle: 'Orlando, Fl',
}, {
  href: '/assisted-living/california/oakland',
  image: 'react-assets/home/cities/Oakland.jpg',
  alt: 'Oakland assisted living seniorly',
  subtitle: 'Oakland, CA',
}, {
  href: '/assisted-living/colorado/denver',
  image: 'react-assets/home/cities/Denver.jpg',
  alt: 'Denver assisted living seniorly',
  subtitle: 'Denver, CO',
}, {
  href: '/assisted-living/wisconsin/milwaukee',
  image: 'react-assets/home/cities/Milwaukee.jpg',
  alt: 'Milwaukee assisted living seniorly',
  subtitle: 'Milwaukee, WI',
}, {
  href: '/assisted-living/florida/tampa',
  image: 'react-assets/home/cities/Tampa.jpg',
  alt: 'Tampa assisted living seniorly',
  subtitle: 'Tampa, FL',
}, {
  href: '/assisted-living/florida/miami',
  image: 'react-assets/home/cities/Miami.jpg',
  alt: 'Miami assisted living seniorly',
  subtitle: 'Miami, FL',
}, {
  href: '/assisted-living/massachusetts/boston',
  image: 'react-assets/home/cities/Boston.jpg',
  alt: 'Boston assisted living seniorly',
  subtitle: 'Boston, MA',
}, {
  href: '/assisted-living/oregon/portland',
  image: 'react-assets/home/cities/Portland.jpg',
  alt: 'Portland assisted living seniorly',
  subtitle: 'Portland, OR',
}, {
  href: '/assisted-living/arizona/tucson',
  image: 'react-assets/home/cities/Tucson.jpg',
  alt: 'Tucson assisted living seniorly',
  subtitle: 'Tucson, AZ',
}, {
  href: '/assisted-living/texas/austin',
  image: 'react-assets/home/cities/Austin.jpg',
  alt: 'Austin assisted living seniorly',
  subtitle: 'Austin. TX',
}, {
  href: '/assisted-living/pennsylvania/pittsburgh',
  image: 'react-assets/home/cities/Pittsburgh.jpg',
  alt: 'Pittsburgh assisted living seniorly',
  subtitle: 'Pittsburgh, PA',
}, {
  href: '/assisted-living/texas/san-antonio',
  image: 'react-assets/home/cities/SanAntonio.jpg',
  alt: 'san Antonio assisted living seniorly',
  subtitle: 'San Antonio, TX',
}, {
  href: '/assisted-living/wisconsin/madison',
  image: 'react-assets/home/cities/Madison.jpg',
  alt: 'Madison assisted living seniorly',
  subtitle: 'Madison, WI',
}, {
  href: '/assisted-living/michigan/detroit',
  image: 'react-assets/home/cities/Detroit.jpg',
  alt: 'Detroit assisted living seniorly',
  subtitle: 'Detroit, MI',
}, {
  href: '/assisted-living/arizona/scottsdale',
  image: 'react-assets/home/cities/Scottsdale.jpg',
  alt: 'Scottsdale assisted living seniorly',
  subtitle: 'Scottsdale, AZ',
}, {
  href: '/assisted-living/north-carolina/raleigh',
  image: 'react-assets/home/cities/Raleigh.jpg',
  alt: 'Raleigh assisted living seniorly',
  subtitle: 'Raleigh, NC',
}];

const Body = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 24px;
  text-align: center;
`;

const GridButton = forwardRef(({ direction, ...props }, ref) => {
  const css = {
    position: 'absolute',
    top: 160,
    [direction]: 24,
    cursor: 'pointer',
  };
  return (
    <CarrousselButton
      ref={ref}
      sx={css}
      display="none!important"
      sx$laptop={{
        display: 'flex!important',
      }}
      rotation={direction === 'left' ? 270 : 90}
      {...props}
    />
  );
});

const CityTile = styled(({
  title, to, alt, image, children, ...props
}) => (
  <Link
    event={{
    category: 'homepage-community-tiles',
    action: 'link-click',
    label: title,
  }}
    key={title}
    to={to}
    {...props}
  >
    <Image path={image} alt={alt} sources={[240, 480]} sizes="240px" aspectRatio="3:2">
      <div className="legend">
        {children}
      </div>
    </Image>
  </Link>
))`
  overflow: hidden;
  border-radius: ${space('xs')};
  .legend {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    padding: 12px;
    padding-top: 96px;
    background-color: ${color('black.base')}10;
    &:hover {
      background-color: ${color('black.base')}33;
    }
  }
`;


const CommunitiesByCity = ({ onLocationSearch }) => {
  const [ref, dimensions] = useScrollObserver();
  const [max, step] = useMemo(() => {
    return [
      (dimensions.scrollX + 48) / (240 + 16),
      Math.floor(dimensions.clientWidth / (240 + 16)),
    ];
  }, [dimensions]) || 0;

  const [position, setPosition] = useState(0);
  const move = useCallback((direction) => {
    const newPos = Math.min(Math.max(0, position + (direction * step)), max);
    setPosition(newPos);
  }, [max, step, position]);

  useEffect(() => {
    ref.current.scroll({
      left: position * (240 + 16),
      behavior: 'smooth',
    });
  }, [position]);

  return (
    <>
      <Body>
        <Heading font="title-xl" pad="m">
          Explore communities by city.
        </Heading>
        <Block font="body-l">
          See our exclusive photos, monthly pricing, and expert insights for each community. You can learn more about the places you like or speak with a Seniorly Local Advisor in that city.
        </Block>
      </Body>

      <Block position="relative">
        <Grid
          ref={ref}
          gridGap="m"
          padding="l"
          gridTemplateColumns={['repeat(15,240px)']}
          overflow="auto"
          sx$laptop={{
            overflow: 'hidden',
          }}
        >
          {mostSearchedCities.map(mostSearchedCity => (
            <CityTile key={mostSearchedCity.subtitle} {...mostSearchedCity}>
              <Heading font="title-s-azo" color="white" pad="0">{mostSearchedCity.subtitle}</Heading>
              <Block font="body-s" color="white">Explore now <Chevron color="white" rotation="90" size="s" /></Block>
            </CityTile>
          ))}
        </Grid>

        <GridButton direction="left" onClick={() => move(-1)} />
        <GridButton direction="right" onClick={() => move(+1)} />
      </Block>

      <Block
        display="flex"
        alignItems="center"
        flexDirection="column"
        padding="m"
        paddingBottom="xxl"
        sx$tablet={{
          paddingBottom: 'xxxl',
        }}
      >
        <Heading
          font="title-m"
          pad="m"
        >
          Find communities in your area.
        </Heading>
        <SearchBoxContainer
          layout="homeHero"
          width="100%"
          startingWithTablet={{
            maxWidth: '360px',
          }}
          onLocationSearch={onLocationSearch}
        />
      </Block>
    </>
  );
};

CommunitiesByCity.propTypes = {
  onLocationSearch: func.isRequired,
};

export default CommunitiesByCity;

