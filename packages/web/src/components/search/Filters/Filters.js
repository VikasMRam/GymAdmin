import React, { useCallback, useState, forwardRef, useMemo } from 'react';
import { bool, func, string } from 'prop-types';
import styled from 'styled-components';

import {
  SIZE,
  BUDGET,
  TOC,
  TOCS,
  SIZES,
  BUDGETS,
  CARE_SERVICES_OPTIONS,
  NON_CARE_SERVICES_OPTIONS,
  ROOM_AMENITIES_OPTIONS,
  COMMUNITY_AMENITIES_OPTIONS,
} from './constants';
import FilterButton from './FilterButton';
import FilterChoice from './FilterChoice';

import Block from 'sly/common/components/atoms/Block';
import Modal, { HeaderWithClose } from 'sly/web/components/atoms/NewModal';
import CollapsibleSection
  from 'sly/web/components/molecules/CollapsibleSection';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';
import Icon from 'sly/common/components/atoms/Icon';
import {
  MORE_FILTERS,
  SHOW_OPTIONS,
} from 'sly/web/components/search/constants';
import useDimensions from 'sly/common/components/helpers/useDimensions';
import Button from 'sly/common/components/atoms/Button';
import Popover from 'sly/web/components/molecules/NewPopover';

const TOC_OPTIONS = Object.values(TOCS);
const SIZE_OPTIONS = Object.values(SIZES);
const BUDGET_OPTIONS = Object.values(BUDGETS);

const CollapsibleSectionPopoverSwitch = ({ isPopOver, children, ...props }) => {
  if (isPopOver) {
    return children;
  }
  return (
    <CollapsibleSection {...props}>
      {children}
    </CollapsibleSection>
  );
};

const ModalPopoverSwitch = ({ isPopOver, children, ...props }) => {
  const Component = isPopOver
    ? Popover
    : Modal;
  return (
    <Component {...props}>
      {children}
    </Component>
  );
};

const Filters = forwardRef(({
  isOpen: defaultIsOpen,
  nextShow,
  toggleShow,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const openFilters = useCallback((section = true) => setIsOpen(section), []);
  const breakpoint = useBreakpoint();
  const showIf = useCallback(
    type => isOpen === type || (breakpoint && breakpoint.isMobile() && isOpen),
    [isOpen, breakpoint],
  );
  const [priceButtonRef, priceButtonCoords] = useDimensions();
  const [sizeButtonRef, sizeButtonCoords] = useDimensions();
  const popOverCss = useMemo(() => {
    if (breakpoint?.atLeastLaptop() && [BUDGET, SIZE].includes(isOpen)) {
      const coords = ({
        [BUDGET]: priceButtonCoords,
        [SIZE]: sizeButtonCoords,
      })[isOpen];
      return {
        position: 'absolute',
        top: coords.top + coords.height,
        left: coords.left,
      };
    }
    return null;
  }, [breakpoint, isOpen, priceButtonCoords, sizeButtonCoords]);

  return (
    <>
      <ModalPopoverSwitch isOpen={!!isOpen} isPopOver={!!popOverCss} css={popOverCss} onClose={closeModal}>
        {!popOverCss && (
          <HeaderWithClose onClose={closeModal}>
            Filters
          </HeaderWithClose>
        )}
        <CollapsibleSection
          showIf={showIf(TOC)}
          title="Type of community"
          borderless
        >
          <FilterChoice type="radio" options={TOC_OPTIONS} />
        </CollapsibleSection>
        <CollapsibleSectionPopoverSwitch
          isPopOver={!!popOverCss}
          showIf={showIf(SIZE)}
          title="Size"
          borderless
        >
          <FilterChoice type="radio" options={SIZE_OPTIONS} />
        </CollapsibleSectionPopoverSwitch>
        <CollapsibleSectionPopoverSwitch
          isPopOver={!!popOverCss}
          showIf={showIf(BUDGET)}
          title="Price"
          borderless
        >
          <FilterChoice type="radio" options={BUDGET_OPTIONS} />
        </CollapsibleSectionPopoverSwitch>
        <CollapsibleSection
          showIf={showIf(MORE_FILTERS)}
          title="Care services"
          borderless
        >
          <FilterChoice type="checkbox" options={CARE_SERVICES_OPTIONS} />
        </CollapsibleSection>
        <CollapsibleSection
          showIf={showIf(MORE_FILTERS)}
          title="Non-care services"
          borderless
        >
          <FilterChoice type="checkbox" options={NON_CARE_SERVICES_OPTIONS} />
        </CollapsibleSection>
        <CollapsibleSection
          showIf={showIf(MORE_FILTERS)}
          title="Amenities"
          borderless
        >
          <FilterChoice type="checkbox" options={ROOM_AMENITIES_OPTIONS} />
        </CollapsibleSection>
        <CollapsibleSection
          showIf={showIf(MORE_FILTERS)}
          title="Community space"
          borderless
        >
          <FilterChoice type="checkbox" options={COMMUNITY_AMENITIES_OPTIONS} />
        </CollapsibleSection>
        <Block
          display="flex"
          padding="large xLarge"
        >
          <Button>
            Clear all
          </Button>
          <Button
            marginLeft="auto"
          >
            Show results
          </Button>
        </Block>
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
        >
          Filters
        </FilterButton>
        <FilterButton
          startingWith="tablet"
          onClick={() => openFilters(TOC)}
        >
          Community type
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
        >
          More filters
        </FilterButton>
        <FilterButton
          upTo="laptop"
          marginLeft="auto"
          onClick={toggleShow}
        >
          <Icon icon={nextShow} />&nbsp;{SHOW_OPTIONS[nextShow]}
        </FilterButton>
      </Block>
    </>
  );
});

Filters.propTypes = {
  isOpen: bool,
  nextShow: string,
  toggleShow: func,
};

export default Filters;
