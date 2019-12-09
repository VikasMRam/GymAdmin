import React from 'react';
import styled from 'styled-components';
import { object, func, bool, array } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';
import Field from 'sly/components/molecules/Field';
import Radio from 'sly/components/molecules/Radio';
import { Link, Button } from 'sly/components/atoms';
import {
  tocs,
  budgets,
  sizes,
  filterLinkPath,
  getFiltersApplied,
} from 'sly/services/helpers/search';
import { withRedirectTo } from 'sly/services/redirectTo';
import withGenerateFilterLinkPath from 'sly/services/search/withGenerateFilterLinkPath';

const StyledLink = pad(styled(Link)`
  display: flex;
  color: ${palette('slate', 'base')};

  span {
    margin-right: ${size('spacing.small')};
  }
`, 'regular');

const generateRadioLink = (elem, type, path, selected, nofollow) => {
    return (
      <StyledLink
        to={path}
        id={`${type}-${elem.value}`}
        key={`${type}-${elem.value}`}
        selected={selected}
        rel={nofollow && "nofollow"}
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
  searchParams,
  generateFilterLinkPath,
  geoGuideList,
  redirectTo,
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

  const filtersApplied = getFiltersApplied(searchParams);

  return (
    <>
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
          onChange={(e) => {
            redirectTo(generateFilterLinkPath({ origUiEvt: e, changedParams: { sort: e.target.value } }));
          }}
        >
          {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Field>
      </CollapsibleSection>
      { geoGuideList && geoGuideList.length > 0 &&
        <CollapsibleSection size="small" title="Guides" borderless>
          {geoGuideList.map((elem) => <StyledLink href={elem.to} key={elem.to} >{elem.title}</StyledLink>)}
        </CollapsibleSection>
      }
      {filtersApplied.length > 0 && (
        <ClearAllButton
          onClick={(e) => redirectTo(generateFilterLinkPath({ origUiEvt: e, paramsToRemove: filtersApplied }))}
          transparent
        >
          Clear all filters
        </ClearAllButton>
      )}
    </>
  );
};

CommunityFilterList.propTypes = {
  searchParams: object.isRequired,
  geoGuideList: array,
  generateFilterLinkPath: func,
  redirectTo: func,
};

export default withRedirectTo(withGenerateFilterLinkPath(CommunityFilterList));
