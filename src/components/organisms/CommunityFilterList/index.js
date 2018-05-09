import React from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';

import { size } from 'sly/components/themes';
import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';
import Field from 'sly/components/molecules/Field';
import IconButton from 'sly/components/molecules/IconButton';
import { Hr, Link } from "sly/components/atoms";
import CollapsibleSection from "sly/components/molecules/CollapsibleSection";
import Field from "sly/components/molecules/Field";
import IconButton from "sly/components/molecules/IconButton";
import { tocs, budgets, sizes, filterLinkPath } from 'sly/services/helpers/search';

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border: solid 1px;
  padding: ${size('spacing.large')};
`;

const tocs = [
  { label: 'All Communities',    value: 'retirement-community' , segment: 'retirement-community'},
  { label: 'Assisted Living',    value: 'assisted-living'      , segment: 'assisted-living'},
  { label: 'Independent Living', value: 'independent-living'   , segment: 'independent-living'},
  { label: 'Memory Care',        value: 'alzheimers-care'      , segment: 'alzheimers-care'},
];

const communitySizes = [
  { label: 'Small', segment: 'less-than-20-beds', value: 'small' },
  { label: 'Medium', segment: '20-to-51-beds', value: 'medium' },
  { label: 'Large', segment: 'greater-than-51-beds', value: 'large' },
];

const budgets = [
  { label: 'Up to $2500', segment: '2500-dollars', value: 2500 },
  { label: 'Up to $3000', segment: '3000-dollars', value: 3000 },
  { label: 'Up to $3500', segment: '3500-dollars', value: 3500 },
  { label: 'Up to $4000', segment: '4000-dollars', value: 4000 },
  { label: 'Up to $4500', segment: '4500-dollars', value: 4500 },
  { label: 'Up to $5000', segment: '5000-dollars', value: 5000 },
  { label: 'Up to $5500', segment: '5500-dollars', value: 5500 },
  { label: 'Up to $6000', segment: '6000-dollars', value: 6000 },
];

const getEvtHandler = (changedParams, origFn) => {
  return (uiEvt) => {
    origFn({ origUiEvt: uiEvt, changedParams });
  };
};

const getSortHandler = (origFn) => {
  return (uiEvt) => {
    const changedParams = { sort: uiEvt.target.value };
    origFn({ origUiEvt: uiEvt, changedParams });
  };
};

const CommunityFilterList = ({ toggleMap, isMapView, searchParams, onFieldChange }) => {
  const tocFields = tocs.map((elem)=> {
    const { path, selected } = filterLinkPath(searchParams, {toc: elem.value});
    return (
      <Link
        to={path}
        id={elem.value}
        key={`toc-${elem.value}`}
        selected={selected}>
        {selected ? '[x]' : '[ ]'}{elem.label}
      </Link>
    );
  });

  const budgetFields = budgets.map((elem)=> {
    const { path, selected } = filterLinkPath(searchParams, { budget: elem.segment });
    return (
      <Link
        to={path}
        id={`budget-${elem.value}`}
        key={`budget-${elem.value}`}
        selected={selected}>
        {selected ? '[x]' : '[ ]'}{elem.label}
      </Link>
    );
  });

  const sizeFields = sizes.map((elem)=>{
    const { path, selected } = filterLinkPath(searchParams, { selected: elem.segment });
    return (
      <Link
        to={path}
        id={`size-${elem.value}`}
        key={`size-${elem.value}`}
        selected={selected}>
        {selected ? '[x]' : '[ ]'}{elem.label}
      </Link>
    );
  });

  const { sort } = searchParams;
const filterLinkPath = (currentFilters, nextFilters) => {
  const filters = {
    ...currentFilters,
    ...nextFilters,
  };

  const key = Object.keys(nextFilters)[0];
  const selected = currentFilters[key] === nextFilters[key];
  const size = filters.size ? `/${filters.size}` : '';
  const budget = filters.budget ? `/${filters.budget}` : '';
  const filtersSegment = (size || budget)
    ? `/filters${size}${budget}`
    : '';

  return {
    path: `/${filters.toc}/${filters.state}/${filters.city}${filtersSegment}`,
    selected,
  };
};

const CommunityFilterList = ({
  toggleMap,
  isMapView,
  searchParams,
  onFieldChange,
}) => {
  const {
    toc, size, budget, sort,
  } = searchParams;
  const intBudget = parseInt(budget);

  const tocFields = tocs.map((elem)=> {
    const { path, selected } = filterLinkPath(searchParams, { toc: elem.value });
    return (
      <Link
        to={path}
        id={elem.value}
        key={`toc-${elem.value}`}
        selected={selected}>
        {selected ? '[x]' : '[ ]'}{elem.label}
      </Link>
    );
  });
  const budgetFields = budgets.map((elem)=> {
    const currentBudget = (searchParams.filters || '').split('/')
      .reduce((cumul, filter) => {
        return budgets
          .reduce((cumul, budget) => {
            if (budget.segment === filter) return budget.segment;
            return cumul;
          }, cumul)
      }, undefined);
    const params = {
      ...searchParams,
      budget: currentBudget,
    };

    const { path, selected } = filterLinkPath(params, {budget: elem.segment});

    return (
      <Link
        to={path}
        id={`budget-${elem.value}`}
        key={`budget-${elem.value}`}
        selected={selected}>
        {selected ? '[x]' : '[ ]'}{elem.label}
      </Link>
    );
  });
  const sizeFields = communitySizes.map((elem)=>
    <Field name={'size'} id={`size-${elem.value}`} key={`size-${elem.value}`} onChange={getEvtHandler({ 'size':elem.value},onFieldChange)}
      type={'radio'} value={elem.value} label={elem.label} checked={elem.value===size}/>
  );

  return (
    <SectionWrapper>
      {isMapView &&
        toggleMap && (
          <IconButton icon="list" onClick={toggleMap}>
            Show List
          </IconButton>
        )}
      {!isMapView && (
        <IconButton icon="map" onClick={toggleMap}>
          Show Map
        </IconButton>
      )}
      <CollapsibleSection size="small" title="Type of Care">
        {tocFields}
      </CollapsibleSection>
      <CollapsibleSection
        collapsedDefault
        size="small"
        title="Maximum Starting Rate"
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
