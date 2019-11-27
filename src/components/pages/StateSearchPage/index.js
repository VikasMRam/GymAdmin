import React from 'react';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import { titleize } from 'sly/services/helpers/strings';
import { getHelmetForSearchPage } from 'sly/services/helpers/html_headers';
import CommunitySearchPageTemplate from 'sly/components/templates/CommunitySearchPageTemplate';
import { Heading } from 'sly/components/atoms';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import SeoLinks from 'sly/components/organisms/SeoLinks';
import { getTocSeoLabel } from 'sly/services/helpers/search';
import SearchMap from 'sly/components/organisms/SearchMap';
import IconButton from 'sly/components/molecules/IconButton';
import StateSearchFilterList from 'sly/components/organisms/StateSearchFilterList';

/**
* Order of appearance as in editor :
* description, <p>1</p>
guide, <p>2</p>
hospitals, <p>3</p>
resources, <p>4</p>
neighborhoods, <p>5</p>
hospitals, <p>6</p>
reviews, <p>7</p>
*/
const guideTypes = ['description', 'guide', 'hospitals', 'transportation', 'sports', 'cultural', 'weather', 'reviews'];

const TopWrapper = styled.div`
  display: flex;
  padding-bottom: ${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.xLarge')};
  border-bottom: ${size('border.regular')} solid ${palette('slate', 'stroke')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }

  > button {
    margin-right: ${size('spacing.large')};
  }
`;
const SearchMapContainer = styled(SearchMap)`
  width: 100%;
  height: 100%;
`;

const StateSearchPage = ({
  isMapView,
  toggleMap,
  searchParams,
  onParamsChange,
  requestMeta,
  communityList,
  geoGuide,
  location,
  showModal,
  hideModal,
}) => {
  const listSize = requestMeta['filtered-count'];
  const state = titleize(searchParams.state);
  const tocLabel = getTocSeoLabel(searchParams.toc);

  let latitude = 0;
  let longitude = 0;
  if (communityList.length > 0) {
    ([{ latitude, longitude }] = communityList);
  }
  if (searchParams.searchOnMove && searchParams.latitude && searchParams.longitude) {
    latitude = parseFloat(searchParams.latitude);
    longitude = parseFloat(searchParams.longitude);
  }

  const gg = geoGuide.guideContent ? geoGuide.guideContent : {};
  const seoLinks = gg.seoLinks || [];
  const stateSeachFilterList = isModalView => (
    <StateSearchFilterList
      seoLinks={seoLinks}
      isMapView={isMapView}
      toggleMap={toggleMap}
      isModalView={isModalView}
      onToggleModalFilterPanel={hideModal}
    />
  );

  const handleModalFilterClick = () => {
    const modalContent = (
      <>
        {stateSeachFilterList(true)}
      </>
    );

    showModal(modalContent, null, 'sidebar');
  };

  return (
    <>
      {getHelmetForSearchPage({
        ...searchParams, url: location, communityList, listSize, geoGuide,
      })}
      <CommunitySearchPageTemplate
        column={stateSeachFilterList()}
      >
        {!isMapView && (
          <>
            <Heading level="hero" size="title">{listSize} {tocLabel} in {state}</Heading>s
            {(gg.autoDescription) && <div dangerouslySetInnerHTML={{ __html: gg.autoDescription }} />}
          </>
        )}
        <TopWrapper>
          {isMapView && (
            <IconButton icon="list" ghost transparent onClick={toggleMap}>
              View List
            </IconButton>
          )}
          {!isMapView && (
            <IconButton icon="map" iconSize="regular" ghost transparent onClick={toggleMap}>
              View Map
            </IconButton>
          )}
          {seoLinks.length > 0 && (
            <IconButton
              icon="tweak"
              ghost
              transparent
              onClick={handleModalFilterClick}
            >
              Cities
            </IconButton>
          )}
        </TopWrapper>

        {!isMapView && (
          <>
            <CommunitySearchList
              communityList={communityList}
              searchParams={searchParams}
              requestMeta={requestMeta}
              location={location}
            />
            {guideTypes.map((key) => (gg[key] ? <div dangerouslySetInnerHTML={{ __html: gg[key] }} key={key} /> : null))}
            {gg.seoLinks && <SeoLinks title="Assisted Living in Nearby Cities" links={gg.seoLinks} />}
          </>
        )}
        {isMapView && (
          <SearchMapContainer
            latitude={latitude}
            longitude={longitude}
            communityList={communityList}
            searchParams={searchParams}
            onParamsChange={onParamsChange}
          />
        )}
      </CommunitySearchPageTemplate>
    </>
  );
};

StateSearchPage.propTypes = {
  communityList: array.isRequired,
  geoGuide: object,
  requestMeta: object.isRequired,
  isMapView: bool,
  toggleMap: func,
  onParamsChange: func,
  location: object,
  searchParams: object,
  showModal: func,
  hideModal: func,
};

export default StateSearchPage;
