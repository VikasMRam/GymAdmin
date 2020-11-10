import React, { useCallback, useState, forwardRef, useMemo } from 'react';
import { bool, func, string } from 'prop-types';
import styled, { css } from 'styled-components';

import FilterButton from './FilterButton';

import { palette, size } from 'sly/common/components/themes';
import Block from 'sly/common/components/atoms/Block';
import Modal, { HeaderWithClose } from 'sly/web/components/atoms/NewModal';
import CollapsibleSection
  from 'sly/web/components/molecules/CollapsibleSection';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';
import Icon from 'sly/common/components/atoms/Icon';
import {
  COMMUNITY_TYPE,
  MORE_FILTERS,
  PRICE,
  SIZE,
  LIST,
  MAP,
  SHOW_OPTIONS,
} from 'sly/web/components/search/constants';
import useDimensions from 'sly/common/components/helpers/useDimensions';
import Button from 'sly/common/components/atoms/Button';
import Popover from 'sly/web/components/molecules/NewPopover';

const Buttons = styled(Block)`
  > * {
    margin-right: ${size('spacing.medium')};

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      border-color: ${palette('slate.lighter-60')};
    }
  }
`;

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
    if (breakpoint?.atLeastLaptop() && [PRICE, SIZE].includes(isOpen)) {
      const coords = ({
        [PRICE]: priceButtonCoords,
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
          showIf={showIf(COMMUNITY_TYPE)}
          title="Type of community"
          borderless
        >
          Type of community
        </CollapsibleSection>
        <CollapsibleSectionPopoverSwitch
          isPopOver={!!popOverCss}
          showIf={showIf(SIZE)}
          title="Size"
          borderless
        >
          Size
        </CollapsibleSectionPopoverSwitch>
        <CollapsibleSectionPopoverSwitch
          isPopOver={!!popOverCss}
          showIf={showIf(PRICE)}
          title="Price"
          borderless
        >
          Price
        </CollapsibleSectionPopoverSwitch>
        <CollapsibleSection
          showIf={showIf(MORE_FILTERS)}
          title="Care services"
          borderless
        >
          Care services
        </CollapsibleSection>
        <CollapsibleSection
          showIf={showIf(MORE_FILTERS)}
          title="Non-care services"
          borderless
        >
          Non-care services
        </CollapsibleSection>
        <CollapsibleSection
          showIf={showIf(MORE_FILTERS)}
          title="Amenities"
          borderless
        >
          Amenities
        </CollapsibleSection>
        <CollapsibleSection
          showIf={showIf(MORE_FILTERS)}
          title="Community space"
          borderless
        >
          CommunitySpace
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
      <Buttons
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
          onClick={() => openFilters(COMMUNITY_TYPE)}
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
          onClick={() => openFilters(PRICE)}
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
      </Buttons>
    </>
  );
});

Filters.propTypes = {
  isOpen: bool,
  nextShow: string,
  toggleShow: func,
};

export default Filters;
