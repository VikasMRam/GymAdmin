import React from 'react';
import styled from 'styled-components';
import { array, bool, func } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, assetPath, palette } from 'sly/components/themes';
import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';
import IconButton from 'sly/components/molecules/IconButton';
import { Link, Image, Box, Hr, Button } from 'sly/components/atoms';

const StyledWrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col4')};
  }
`;

const StyledBox = styled(Box)`
  padding: ${size('spacing.large')};
  width: ${size('layout.col3')};
`;

const StyledLink = styled(Link)`
  display: flex;
  margin-bottom: ${size('spacing.regular')};
  color: ${palette('slate', 'base')};

  span {
    margin-right: ${size('spacing.small')};
  }
`;

const ImageButtonWrapper = styled.div`
  position: relative;
  text-align: center;

  img {
    width: 100%;
  }

  button {
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  }

  ${ifProp('isMapView', '', `
    button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `)};
`;

const StyledImage = styled(Image)`
  max-width: 100%;
`;

const StyledHr = styled(Hr)`
  margin-top: ${size('spacing.large')};
  margin-bottom: ${size('spacing.regular')};
`;

export const ClearAllButton = styled(Button)`
  color: ${palette('primary', 'base')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const StateSearchFilterList = ({
  isMapView, isModalView, seoLinks, toggleMap, onToggleModalFilterPanel,
}) => {
  const tocFields = seoLinks.map(seoLink => (
    <StyledLink
      to={seoLink.to}
      id={seoLink.title}
      key={seoLink.title}
      selected={false}
      rel="nofollow"
      onClick={isModalView ? onToggleModalFilterPanel : null}
    >
      {seoLink.title}
    </StyledLink>
  ));
  const WrapperElement = (isModalView) ? StyledWrapper : StyledBox;
  return (
    <WrapperElement>
      {!isModalView &&
        <ImageButtonWrapper isMapView={isMapView}>
          {isMapView && toggleMap &&
          <IconButton icon="list" onClick={toggleMap} palette="primary" ghost>
            View List
          </IconButton>
          }
          {!isMapView &&
          <>
            <StyledImage src={assetPath('images/map-placeholder.png')} />
            <IconButton icon="map" iconSize="regular" onClick={toggleMap} palette="primary" ghost>
              View Map
            </IconButton>
          </>
          }
        </ImageButtonWrapper>
      }
      {seoLinks.length > 0 && (
        <>
          {!isModalView && <StyledHr />}
          <CollapsibleSection size="small" title="Cities" borderless>
            {tocFields}
          </CollapsibleSection>
        </>
      )}
    </WrapperElement>
  );
};

StateSearchFilterList.propTypes = {
  isMapView: bool.isRequired,
  isModalView: bool,
  seoLinks: array.isRequired,
  toggleMap: func.isRequired,
  onToggleModalFilterPanel: func.isRequired,
};

StateSearchFilterList.defaultProps = {
  isMapView: false,
};

export default StateSearchFilterList;
