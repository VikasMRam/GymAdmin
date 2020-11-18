import React, { useCallback, useState, forwardRef, useMemo } from 'react';
import { bool, func, node, object, string } from 'prop-types';
import styled from 'styled-components';

import {
  SIZE,
  BUDGET,
  TOC,
  TOCS,
  NH,
  SIZES,
  BUDGETS,
  CARE_SERVICES,
  NON_CARE_SERVICES,
  ROOM_AMENITIES,
  COMMUNITY_AMENITIES,
  CARE_SERVICES_OPTIONS,
  NON_CARE_SERVICES_OPTIONS,
  ROOM_AMENITIES_OPTIONS,
  COMMUNITY_AMENITIES_OPTIONS,
} from './constants';
import FilterButton from './FilterButton';
import FilterChoice from './FilterChoice';

import Block from 'sly/common/components/atoms/Block';
import Modal, {
  HeaderWithClose,
  ModalActions,
  ModalBody,
} from 'sly/web/components/atoms/NewModal';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';
import { MORE_FILTERS } from 'sly/web/components/search/constants';
import useDimensions from 'sly/common/components/helpers/useDimensions';
import Button from 'sly/common/components/atoms/Button';
import Popover from 'sly/web/components/molecules/NewPopover';
import Collapsible from 'sly/web/components/search/Filters/Collapsible';

const TOC_OPTIONS = Object.values(TOCS);
const SIZE_OPTIONS = Object.values(SIZES);
const BUDGET_OPTIONS = Object.values(BUDGETS);

const addFilterReducer = (acc, [_, value]) => {
  return Array.isArray(value)
    ? acc + value.length
    : (value && (acc + 1) || acc);
};

const CollapsiblePopoverSwitch = ({ isPopOver, showIf, children, ...props }) => {
  if (!showIf) {
    return null;
  }
  if (isPopOver) {
    return (
      <Block
        paddingTop="xLarge"
        {...props}
      >
        {children}
      </Block>
    );
  }
  return (
    <Collapsible
      borderBottom="regular"
      {...props}
    >
      {children}
    </Collapsible>
  );
};

const ModalPopoverSwitch = ({ isPopOver, children, ...props }) => {
  const Component = isPopOver
    ? Popover
    : Modal;
  return (
    <Component
      {...props}
    >
      {children}
    </Component>
  );
};

const Filters = forwardRef(({
  isOpen: defaultIsOpen,
  onFilterChange,
  currentFilters,
  children,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const openFilters = useCallback((section = true) => setIsOpen(section), []);
  const breakpoint = useBreakpoint();
  const showIf = useCallback(
    type => Boolean(isOpen === type || (breakpoint?.isMobile() && isOpen)),
    [isOpen, breakpoint],
  );
  const [priceButtonRef, priceButtonCoords] = useDimensions();
  const [sizeButtonRef, sizeButtonCoords] = useDimensions();
  const popOverCss = useMemo(() => {
    if (breakpoint?.atLeastTablet() && [BUDGET, SIZE].includes(isOpen)) {
      const coords = ({
        [BUDGET]: priceButtonCoords,
        [SIZE]: sizeButtonCoords,
      })[isOpen];
      return {
        position: 'absolute',
        top: coords.top + coords.height + 16,
        left: coords.left,
      };
    }
    return null;
  }, [breakpoint, isOpen, priceButtonCoords, sizeButtonCoords]);

  const title = useMemo(() => {
    if (breakpoint?.isMobile()) {
      return 'Filters';
    }
    switch (isOpen) {
      case TOC: return 'Filter by community type';
      case MORE_FILTERS: return 'More filters';
      default: return null;
    }
  }, [breakpoint, isOpen]);

  const onTocFilterChange = useCallback((filter, value) => {
    onFilterChange(filter, value.length === 0 ? [NH] : value);
  }, [currentFilters]);

  const disableMoreFiltersCollapse = showIf(MORE_FILTERS) && breakpoint?.atLeastTablet();

  const totalNumberOfFilters = Object.entries(currentFilters).reduce(addFilterReducer, 0);
  const totalMoreFilters = Object.entries(currentFilters).filter(([key]) => [
    CARE_SERVICES,
    NON_CARE_SERVICES,
    ROOM_AMENITIES,
    COMMUNITY_AMENITIES,
  ].includes(key))
    .reduce(addFilterReducer, 0);
  const currentTocText = currentFilters[TOC] === 'nursing-homes'
    ? ''
    : TOCS[currentFilters[TOC]].label;

  return (
    <>
      <ModalPopoverSwitch
        isOpen={!!isOpen}
        isPopOver={!!popOverCss}
        css={popOverCss}
        onClose={closeModal}
      >
        {title && (
          <HeaderWithClose onClose={closeModal}>
            {title}
          </HeaderWithClose>
        )}
        <ModalBody padding="0 xLarge">
          <CollapsiblePopoverSwitch
            isPopOver={breakpoint?.atLeastTablet()}
            showIf={showIf(TOC)}
            title="Type of community"
          >
            <FilterChoice
              type="radio"
              options={TOC_OPTIONS}
              filter={TOC}
              onChange={onTocFilterChange}
              value={currentFilters[TOC]}
            />
          </CollapsiblePopoverSwitch>
          <CollapsiblePopoverSwitch
            isPopOver={!!popOverCss}
            showIf={showIf(SIZE)}
            title="Size"
          >
            <FilterChoice
              type="radio"
              options={SIZE_OPTIONS}
              filter={SIZE}
              onChange={onFilterChange}
              value={currentFilters[SIZE]}
            />
          </CollapsiblePopoverSwitch>
          <CollapsiblePopoverSwitch
            isPopOver={!!popOverCss}
            showIf={showIf(BUDGET)}
            title="Price"
          >
            <FilterChoice
              type="radio"
              options={BUDGET_OPTIONS}
              filter={BUDGET}
              onChange={onFilterChange}
              value={currentFilters[BUDGET]}
            />
          </CollapsiblePopoverSwitch>
          <Collapsible
            showIf={showIf(MORE_FILTERS)}
            title="Care services"
            disabled={disableMoreFiltersCollapse}
          >
            <FilterChoice
              type="checkbox"
              options={CARE_SERVICES_OPTIONS}
              filter={CARE_SERVICES}
              onChange={onFilterChange}
              value={currentFilters[CARE_SERVICES]}
            />
          </Collapsible>
          <Collapsible
            showIf={showIf(MORE_FILTERS)}
            title="Non-care services"
            disabled={disableMoreFiltersCollapse}
          >
            <FilterChoice
              type="checkbox"
              options={NON_CARE_SERVICES_OPTIONS}
              filter={NON_CARE_SERVICES}
              onChange={onFilterChange}
              value={currentFilters[NON_CARE_SERVICES]}
            />
          </Collapsible>
          <Collapsible
            showIf={showIf(MORE_FILTERS)}
            title="Amenities"
            disabled={disableMoreFiltersCollapse}
          >
            <FilterChoice
              type="checkbox"
              options={ROOM_AMENITIES_OPTIONS}
              filter={ROOM_AMENITIES}
              onChange={onFilterChange}
              value={currentFilters[ROOM_AMENITIES]}
            />
          </Collapsible>
          <Collapsible
            showIf={showIf(MORE_FILTERS)}
            title="Community space"
            borderBottom="none"
            disabled={disableMoreFiltersCollapse}
          >
            <FilterChoice
              type="checkbox"
              options={COMMUNITY_AMENITIES_OPTIONS}
              filter={COMMUNITY_AMENITIES}
              onChange={onFilterChange}
              value={currentFilters[COMMUNITY_AMENITIES]}
            />
          </Collapsible>
        </ModalBody>
        <ModalActions>
          <Button>
            Clear all
          </Button>
          <Button
            marginLeft="auto"
          >
            Show results
          </Button>
        </ModalActions>
      </ModalPopoverSwitch>
      <Block
        ref={ref}
        display="flex"
        flexGap="regular"
        {...props}
      >
        <FilterButton
          upTo="tablet"
          onClick={openFilters}
          number={totalNumberOfFilters}
        >
          Filters
        </FilterButton>
        <FilterButton
          startingWith="tablet"
          onClick={() => openFilters(TOC)}
          selected={currentTocText}
        >
          {currentTocText || 'Community type'}
        </FilterButton>
        <FilterButton
          ref={sizeButtonRef}
          startingWith="tablet"
          onClick={() => openFilters(SIZE)}
        >
          Size
        </FilterButton>
        <FilterButton
          ref={priceButtonRef}
          startingWith="tablet"
          onClick={() => openFilters(BUDGET)}
        >
          Price
        </FilterButton>
        <FilterButton
          startingWith="tablet"
          onClick={() => openFilters(MORE_FILTERS)}
          number={totalMoreFilters}
        >
          More filters
        </FilterButton>

        {children}
      </Block>
    </>
  );
});

Filters.propTypes = {
  isOpen: bool,
  nextShow: string,
  toggleShow: func,
  onFilterChange: func,
  currentFilters: object,
  children: node,
};

export default Filters;
