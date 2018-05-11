import React from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';

import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';
import Field from 'sly/components/molecules/Field';
import Radio from 'sly/components/molecules/Radio';
import IconButton from 'sly/components/molecules/IconButton';
import { Link, Image, Box } from "sly/components/atoms";
import { tocs, budgets, sizes, filterLinkPath } from 'sly/services/helpers/search';


const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  border: solid 1px ${palette('grayscale', 2)};
  padding: ${size('spacing.large')};
  width: 100%;
  background-color: ${palette('white', 0)};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.sideColumn')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.sideColumnSmall')};
  }

`;


const StyledLink = styled(Link)`
  display: flex;
  margin-bottom: ${size('spacing.regular')};
  color: ${palette('slate', 0)};

  span {
    margin-right: ${size('spacing.small')};
  }
`;
const ImageButtonWrapper = styled.div`
  position: relative;
  text-align: center;
  display: none;
    
  img {
    width: 100%;
  }

  button {
    border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;   
  }

  ${(props) => {
    if (!props.isMapView) {
      return `
        button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }`;
    }
    return '';
  }};
  
`;

const StyledImage = styled(Image)`
  max-width: 100%;
`;

const getSortHandler = (origFn) => {
  return (uiEvt) => {
    const changedParams = { sort: uiEvt.target.value };
    origFn({ origUiEvt: uiEvt, changedParams });
  };
};

const generateRadioLink = (elem, type, path, selected) => (
  <StyledLink
    to={path}
    id={`${type}-${elem.value}`}
    key={`${type}-${elem.value}`}
    selected={selected}
  >
    <Radio checked={selected} />{elem.label}
  </StyledLink>
);

const CommunityFilterList = ({
  toggleMap,
  isMapView,
  searchParams,
  onFieldChange,
}) => {
  const tocFields = tocs.map((elem) => {
    const { path, selected } = filterLinkPath(searchParams, { toc: elem.value });
    return generateRadioLink(elem, 'toc', path, selected);
  });
  const budgetFields = budgets.map((elem) => {

    const { path, selected } = filterLinkPath(searchParams, { budget: elem.value });
    return generateRadioLink(elem, 'budget', path, selected);
  });

  const sizeFields = sizes.map((elem) => {
    const { path, selected } = filterLinkPath(searchParams, { size: elem.value });
    return generateRadioLink(elem, 'size', path, selected);
  });

  const { sort } = searchParams;
  return (
    <StyledBox>
      <ImageButtonWrapper isMapView={isMapView}>
        {isMapView && toggleMap &&
          <IconButton icon="list" onClick={toggleMap} palette="secondary" ghost>
            View List
          </IconButton>
        }
        {!isMapView &&
          <React.Fragment>
            {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
            <StyledImage src={assetPath('map-placeholder.png')} />
            <IconButton icon="map" onClick={toggleMap} palette="secondary" ghost>
              View Map
            </IconButton>
          </React.Fragment>
        }
      </ImageButtonWrapper>
      <br />
      <CollapsibleSection size="small" title="Type of care" >
        {tocFields}
      </CollapsibleSection>
      <CollapsibleSection
        size="small"
        title="Budget"
      >
        {budgetFields}
      </CollapsibleSection>
      <CollapsibleSection size="small" title="Size">
        {sizeFields}
      </CollapsibleSection>
      <CollapsibleSection size="small" title="Sort">
        <Field
          name="Sort"
          type="select"
          onChange={getSortHandler(onFieldChange)}
        >
          <option selected={sort === 'price-l-h'} value="price-l-h">
            Price: Low to High
          </option>
          <option selected={sort === 'price-h-l'} value="price-h-l">
            Price: High to Low
          </option>
          <option selected={sort === 'distance'} value="distance">
            Distance
          </option>
          <option selected={sort === 'relevance'} value="relevance">
            Relevance
          </option>
        </Field>
      </CollapsibleSection>
    </StyledBox>
  );
};

CommunityFilterList.propTypes = {
  toggleMap: func.isRequired,
  isMapView: bool.isRequired,
  searchParams: object.isRequired,
  onFieldChange: func.isRequired,
};

export default CommunityFilterList;
