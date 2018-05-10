import React from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';

import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';
import Field from 'sly/components/molecules/Field';
import Radio from 'sly/components/molecules/Radio';
import IconButton from 'sly/components/molecules/IconButton';
import {
  tocs,
  budgets,
  sizes,
  filterLinkPath,
} from 'sly/services/helpers/search';
import { Link, Image } from 'sly/components/atoms';

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  =width: ${size('filtersMenu.width.mobile')};
  border-bottom: solid 1px ${palette('grayscale', 2)};
  padding: 0 ${size('spacing.large')};
  padding-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('filtersMenu.width.laptop')};
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
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;

    position: relative;
    text-align: center;

    img {
      width: 100%;
    }

    button {
      border: ${size('border.regular')} solid ${palette('grayscale', 2)};
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
  }
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
    <Radio checked={selected} />
    {elem.label}
  </StyledLink>
);

const CommunityFilterList = ({
  toggleMap,
  isMapView,
  searchParams,
  onFieldChange,
}) => {
  const tocFields = tocs.map((elem) => {
    const { path, selected } = filterLinkPath(searchParams, {
      toc: elem.value,
    });
    return generateRadioLink(elem, 'toc', path, selected);
  });
  const budgetFields = budgets.map((elem) => {
    const currentBudget = (searchParams.filters || '')
      .split('/')
      .reduce((cumul, filter) => {
        return budgets.reduce((cumul, budget) => {
          if (budget.segment === filter) return budget.segment;
          return cumul;
        }, cumul);
      }, undefined);
    const params = {
      ...searchParams,
      budget: currentBudget,
    };

    const { path, selected } = filterLinkPath(params, { budget: elem.segment });
    return generateRadioLink(elem, 'budget', path, selected);
  });

  const sizeFields = sizes.map((elem) => {
    const { path, selected } = filterLinkPath(searchParams, {
      selected: elem.segment,
    });
    return generateRadioLink(elem, 'size', path, selected);
  });

  const { sort } = searchParams;
  return (
    <SectionWrapper>
      <ImageButtonWrapper isMapView={isMapView}>
        {isMapView &&
          toggleMap && (
            <IconButton
              icon="list"
              onClick={toggleMap}
              palette="secondary"
              ghost
            >
              View List
            </IconButton>
          )}
        {!isMapView && (
          <React.Fragment>
            {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
            <Image src={assetPath('map-placeholder.png')} />
            <IconButton
              icon="map"
              onClick={toggleMap}
              palette="secondary"
              ghost
            >
              View Map
            </IconButton>
          </React.Fragment>
        )}
      </ImageButtonWrapper>
      <br />
      {/* TODO: Top bottom padding must be 16px in CollapsibleSection */}
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
    </SectionWrapper>
  );
};

CommunityFilterList.propTypes = {
  toggleMap: func.isRequired,
  isMapView: bool.isRequired,
  searchParams: object.isRequired,
  onFieldChange: func.isRequired,
};

export default CommunityFilterList;
