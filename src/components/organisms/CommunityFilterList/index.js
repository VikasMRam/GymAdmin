import React from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';

import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';
import Field from 'sly/components/molecules/Field';
import Radio from 'sly/components/molecules/Radio';
import IconButton from 'sly/components/molecules/IconButton';
import { Hr, Link } from "sly/components/atoms";
import { tocs, budgets, sizes, filterLinkPath } from 'sly/services/helpers/search';

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border: solid 1px ${palette('grayscale', 2)};
  padding: ${size('spacing.large')};
`;
const StyledLink = styled(Link)`
  display: flex;
  margin-bottom: ${size('spacing.regular')};

  span {
    margin-right: ${size('spacing.small')};
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
    const currentBudget = (searchParams.filters || '').split('/')
      .reduce((cumul, filter) => {
        return budgets
          .reduce((cumul, budget) => {
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
    const { path, selected } = filterLinkPath(searchParams, { selected: elem.segment });
    return generateRadioLink(elem, 'size', path, selected);
  });

  const { sort } = searchParams;
  return (
    <SectionWrapper>
      {isMapView && toggleMap &&
        <IconButton icon="list" onClick={toggleMap}>
          Show List
        </IconButton>
      }
      {!isMapView &&
        <IconButton icon="map" onClick={toggleMap} >
          Show Map
        </IconButton>
      }
      <Hr />
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
