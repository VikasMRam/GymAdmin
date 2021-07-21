import React, { useCallback, useState, forwardRef, useMemo } from 'react';
import { bool, func, node, object, string } from 'prop-types';

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
  MORE_FILTERS,
  ALL_FILTERS,
  PAGINATION_FILTERS,
} from './constants';
import FilterButton from './FilterButton';
import FilterChoice from './FilterChoice';

import { Block } from 'sly/common/system';
import Modal, {
  HeaderWithClose,
  ModalActions,
  ModalBody,
} from 'sly/web/components/atoms/NewModal';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';
import useDimensions from 'sly/common/components/helpers/useLiveDimensions';
import Button from 'sly/common/components/atoms/Button';
import Popover from 'sly/web/components/molecules/NewPopover';
import Collapsible from 'sly/web/components/search/Filters/Collapsible';
import SlyEvent from 'sly/web/services/helpers/events';

const eventCategory = 'filters';
const sendEvent = (action, label, value) => SlyEvent.getInstance().sendEvent({
  category: eventCategory,
  action,
  label,
  value,
});

const TOC_OPTIONS = Object.values(TOCS);
const SIZE_OPTIONS = Object.values(SIZES);
const BUDGET_OPTIONS = Object.values(BUDGETS);

const countFilters = (currentFilters, list) => Object.entries(currentFilters)
  .filter(([key]) => list.includes(key))
  .reduce((acc, [key, value]) => {
    if (key === TOC && value === NH) {
      return acc;
    }
    return Array.isArray(value)
      ? acc + value.length
      : (value && (acc + 1) || acc);
  }, 0);

const CollapsiblePopoverSwitch = ({ isPopOver, showIf, children, ...props }) => {
  if (!showIf) {
    return null;
  }
  if (isPopOver) {
    return (
      <Block
        paddingTop="l"
        {...props}
      >
        {children}
      </Block>
    );
  }
  return (
    <Collapsible
      borderBottom="s"
      upToTablet={{
        collapsedDefault: true,
      }}
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
  onClearFilters,
  currentFilters,
  showTOC,
  children,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const closeModal = useCallback(() => sendEvent('close-filter', isOpen.toString()) || setIsOpen(false), [isOpen]);
  const clearFilters = useCallback(() => {
    sendEvent('clear-filters', isOpen.toString());
    typeof isOpen === 'string' ? onClearFilters([...PAGINATION_FILTERS, isOpen]) : onClearFilters([...PAGINATION_FILTERS, ...isOpen]);
  }, [isOpen]);
  const breakpoint = useBreakpoint();
  const showIf = useCallback(
    type => Boolean(isOpen === type || (breakpoint?.isMobile() && isOpen)),
    [isOpen, breakpoint],
  );
  const liveMeasure = true;
  const [priceButtonRef, priceButtonCoords] = useDimensions({ liveMeasure });
  const [sizeButtonRef, sizeButtonCoords] = useDimensions({ liveMeasure });
  const popOverCss = useMemo(() => {
    if (breakpoint?.atLeastTablet() && [BUDGET, SIZE].includes(isOpen)) {
      const coords = ({
        [BUDGET]: priceButtonCoords,
        [SIZE]: sizeButtonCoords,
      })[isOpen];
      return {
        position: 'fixed',
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
  const onBudgetFilterChange = useCallback((filter, value) => {
    onFilterChange(filter, value.length === 0 ? null : value);
  }, [currentFilters]);

  const createOpenFilters = (section = true) => (e) => {
    e.stopPropagation();
    sendEvent('open-filter', section.toString());
    setIsOpen(section);
  };

  const disableMoreFiltersCollapse = showIf(MORE_FILTERS) && breakpoint?.atLeastTablet();

  const totalNumberOfFilters = countFilters(currentFilters, ALL_FILTERS);
  const totalMoreFilters = countFilters(currentFilters, MORE_FILTERS);
  const currentTocText = currentFilters[TOC] === 'nursing-homes' || currentFilters[TOC] === 'care-home'
    ? ''
    : TOCS[currentFilters[TOC]].label;
  const currentSizeText = SIZES[currentFilters[SIZE]]?.label;
  const currentBudgetText = BUDGETS[currentFilters[BUDGET]]?.label;

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
          {showTOC &&
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
          }

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
              onChange={onBudgetFilterChange}
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
          <Button
            ghost
            border="none"
            onClick={clearFilters}
            disabled={totalNumberOfFilters === 0}
          >
            Clear all
          </Button>
          <Button
            marginLeft="auto"
            onClick={closeModal}
          >
            Save
          </Button>
        </ModalActions>
      </ModalPopoverSwitch>
      <Block
        ref={ref}
        gridArea="filters"
        display="flex"
        position="sticky"
        background="white"
        paddingY="m"
        paddingX="l"
        borderBottom="s"
        borderColor="slate.lighter-90"
        sx={{
          top: '4.9rem',
          zIndex: 100,
        }}
        {...props}
      >
        <FilterButton
          dispaly="flex"
          sx$tablet={{ display: 'none' }}
          onClick={createOpenFilters(ALL_FILTERS)}
          number={totalNumberOfFilters}
        >
          Filters
        </FilterButton>
        {showTOC &&
          <FilterButton
            display="none"
            sx$tablet={{
              display: 'flex',
            }}

            onClick={createOpenFilters(TOC)}
            selected={Boolean(currentTocText)}
          >
            {currentTocText || 'Community type'}
          </FilterButton>
        }
        <FilterButton
          ref={sizeButtonRef}
          display="none"
          sx$tablet={{
            display: 'flex',
            }}
          onClick={createOpenFilters(SIZE)}
          selected={Boolean(currentSizeText)}
        >
          {currentSizeText || 'Size'}
        </FilterButton>
        <FilterButton
          ref={priceButtonRef}
          display="none"
          sx$tablet={{
            display: 'flex',
            }}
          onClick={createOpenFilters(BUDGET)}
          selected={Boolean(currentBudgetText)}
        >
          {currentBudgetText || 'Price'}
        </FilterButton>
        <FilterButton
          display="none"
          sx$tablet={{
            display: 'flex',
          }}
          onClick={createOpenFilters(MORE_FILTERS)}
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
  onClearFilters: func,
  currentFilters: object,
  children: node,
};

export default Filters;
