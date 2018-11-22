import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';

import { ifProp } from 'styled-tools';

import { size, assetPath, palette } from 'sly/components/themes';
import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';
import Field from 'sly/components/molecules/Field';
import Radio from 'sly/components/molecules/Radio';
import IconButton from 'sly/components/molecules/IconButton';
import { Link, Image, Box, Hr, Button } from 'sly/components/atoms';

import {
  tocs,
  budgets,
  sizes,
  filterLinkPath,
  getFiltersApplied,
  getEvtHandler,
} from 'sly/services/helpers/search';

const StyledWrapper = styled.div`
  padding-top: ${size('spacing.large')};

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
  color: ${palette('slate', 0)};

  span {
    margin-right: ${size('spacing.small')};
  }
`;

const ImageButtonWrapper = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: ${size('spacing.large')};

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
  margin-bottom: ${size('spacing.regular')};
`;

const getSortHandler = (origFn) => {
  return (uiEvt) => {
    const changedParams = { sort: uiEvt.target.value };
    origFn({ origUiEvt: uiEvt, changedParams });
  };
};

const generateRadioLink = (elem, type, path, selected, nofollow) => {
  if (nofollow === true) {
    return (
      <StyledLink
        to={path}
        id={`${type}-${elem.value}`}
        key={`${type}-${elem.value}`}
        selected={selected}
        rel="nofollow"
      >
        <Radio checked={selected}/>{elem.label}
      </StyledLink>
    );
  }
  return (
    <StyledLink
      to={path}
      id={`${type}-${elem.value}`}
      key={`${type}-${elem.value}`}
      selected={selected}
    >
      <Radio checked={selected} />{elem.label}
    </StyledLink>
  );
};

export const ClearAllButton = styled(Button)`
  color: ${palette('primary', 0)};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const CommunityFilterList = ({
  toggleMap,
  isMapView,
  isModalView,
  searchParams,
  onFieldChange,
  onParamsRemove,
}) => {
  const nofollow = searchParams.hasOwnProperty('budget') || searchParams.hasOwnProperty('size');

  const tocFields = tocs.map((elem) => {
    const { path, selected } = filterLinkPath(searchParams, { toc: elem.value });
    return generateRadioLink(elem, 'toc', path, selected);
  });
  const budgetFields = budgets.map((elem) => {
    const { path, selected } = filterLinkPath(searchParams, { budget: elem.value });
    return generateRadioLink(elem, 'budget', path, selected, nofollow);
  });
  const sizeFields = sizes.map((elem) => {
    const { path, selected } = filterLinkPath(searchParams, { size: elem.value });
    return generateRadioLink(elem, 'size', path, selected, nofollow);
  });
  const { sort } = searchParams;
  const WrapperElement = (isModalView) ? StyledWrapper : StyledBox;

  const filtersApplied = getFiltersApplied(searchParams);

  return (
    <WrapperElement>
      {!isModalView &&
        <Fragment>
          {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
          <ImageButtonWrapper isMapView={isMapView}>
            {isMapView && toggleMap &&
            <IconButton icon="list" onClick={toggleMap} palette="primary" ghost>
              View List
            </IconButton>
            }
            {!isMapView &&
            <Fragment>
              {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
              <StyledImage src={assetPath('images/map-placeholder.png')} />
              <IconButton icon="map" onClick={toggleMap} palette="primary" ghost>
                View Map
              </IconButton>
            </Fragment>
            }
          </ImageButtonWrapper>
          <StyledHr />
        </Fragment>
      }
      <CollapsibleSection size="small" title="Type of care" noHr>
        {tocFields}
      </CollapsibleSection>
      <CollapsibleSection size="small" title="Budget" noHr>
        {budgetFields}
      </CollapsibleSection>
      <CollapsibleSection size="small" title="Size" noHr>
        {sizeFields}
      </CollapsibleSection>
      <CollapsibleSection size="small" title="Sort" noHr>
        <Field
          name="Sort"
          type="select"
          value={sort}
          onChange={getSortHandler(onFieldChange)}
        >
          <option value="distance">
            Distance
          </option>
          <option value="price-l-h">
            Price: Low to High
          </option>
          <option value="price-h-l">
            Price: High to Low
          </option>
          <option value="relevance">
            Relevance
          </option>
        </Field>
      </CollapsibleSection>
      {filtersApplied.length > 0 && (
        <ClearAllButton
          onClick={getEvtHandler(filtersApplied, onParamsRemove)}
          transparent
        >
          Clear all filters
        </ClearAllButton>
      )}
    </WrapperElement>
  );
};

CommunityFilterList.propTypes = {
  toggleMap: func.isRequired,
  isMapView: bool.isRequired,
  isModalView: bool,
  searchParams: object.isRequired,
  onFieldChange: func.isRequired,
  onParamsRemove: func.isRequired,
};

CommunityFilterList.defaultProps = {
  isModalView: false,
};

export default CommunityFilterList;
