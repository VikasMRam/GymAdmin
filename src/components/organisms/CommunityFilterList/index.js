import React from 'react';
import styled from 'styled-components';
import { object, func, bool, array } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, assetPath, palette } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
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

const StyledWrapper = pad(styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col4')};
  }
`);

const StyledBox = styled(Box)`
  padding: ${size('spacing.large')};
  width: ${size('layout.col3')};
`;

const StyledLink = pad(styled(Link)`
  display: flex;
  color: ${palette('slate', 'base')};

  span {
    margin-right: ${size('spacing.small')};
  }
`, 'regular');

const ImageButtonWrapper = pad(styled.div`
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
`, 'large');

const StyledImage = styled(Image)`
  max-width: 100%;
`;

const StyledHr = pad(Hr, 'regular');

const getSortHandler = (origFn) => {
  return (uiEvt) => {
    // todo uncomment after enabling react select const changedParams = { sort: uiEvt.value };
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
        <Radio checked={selected} />{elem.label}
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
  color: ${palette('primary', 'base')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const sortOptions = [
  { label: 'Distance', value: 'distance' },
  { label: 'Price: Low to High', value: 'price-l-h' },
  { label: 'Price: High to Low', value: 'price-h-l' },
  { label: 'Relevance', value: 'relevance' },
];

const CommunityFilterList = ({
  toggleMap,
  isMapView,
  isModalView,
  searchParams,
  onFieldChange,
  onParamsRemove,
  geoGuideList,
}) => {
  const nofollow = searchParams.budget || searchParams.size;

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
        <>
          <ImageButtonWrapper isMapView={isMapView}>
            {isMapView && toggleMap &&
            <IconButton icon="list" onClick={toggleMap} iconPalette="primary" ghost>
              View List
            </IconButton>
            }
            {!isMapView &&
            <>
              <StyledImage src={assetPath('images/map-placeholder.png')} />
              <IconButton icon="map" iconSize="regular" onClick={toggleMap} iconPalette="primary" ghost>
                View Map
              </IconButton>
            </>
            }
          </ImageButtonWrapper>
          <StyledHr />
        </>
      }
      <CollapsibleSection size="small" title="Type of care" borderless>
        {tocFields}
      </CollapsibleSection>
      <CollapsibleSection size="small" title="Budget" collapsedDefault borderless>
        {budgetFields}
      </CollapsibleSection>
      <CollapsibleSection size="small" title="Size" collapsedDefault borderless>
        {sizeFields}
      </CollapsibleSection>
      <CollapsibleSection size="small" title="Sort" collapsedDefault borderless>
        <Field
          name="Sort"
          type="select"
          value={sort}
          // options={sortOptions} todo pass as option after enabling react select
          onChange={getSortHandler(onFieldChange)}
        >
          {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Field>
      </CollapsibleSection>
      { geoGuideList && geoGuideList.length > 0 &&
        <CollapsibleSection size="small" title="Guides" borderless>
          {geoGuideList.map((elem) => {
            return (<StyledLink href={elem.to} >{elem.title}</StyledLink>);
          })}
        </CollapsibleSection>
      }
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
  geoGuideList: array,
};

CommunityFilterList.defaultProps = {
  isModalView: false,
};

export default CommunityFilterList;
