import React, { useCallback, useState } from 'react';
import { bool } from 'prop-types';
import { css } from 'styled-components';

import Button from './FilterButton';

import { palette, size } from 'sly/common/components/themes';
import Block from 'sly/common/components/atoms/Block';
import Modal, { HeaderWithClose } from 'sly/web/components/atoms/NewModal';
import CollapsibleSection
  from 'sly/web/components/molecules/CollapsibleSection';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';

const buttonsCss = css`
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

const COMMUNITY_TYPE = 'communityType';
const PRICE = 'price';
const SIZE = 'size';
const MORE_FILTERS = 'moreFilters';

const Filters = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(props.isOpen || false);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const openFilters = useCallback((section = true) => setIsOpen(section), []);
  const breakpoint = useBreakpoint();
  const showIf = useCallback(
    type => isOpen === type || (breakpoint && breakpoint.isMobile() && isOpen),
    [isOpen, breakpoint],
  );
  return (
    <>
      <Modal isOpen={!!isOpen} onClose={closeModal}>
        <HeaderWithClose onClose={closeModal} />
        <Block>
          <CollapsibleSection
            showIf={showIf(COMMUNITY_TYPE)}
            title="Type of community"
          >
            Type of community
          </CollapsibleSection>
          <CollapsibleSection
            showIf={showIf(SIZE)}
            title="Size"
          >
            Size
          </CollapsibleSection>
          <CollapsibleSection
            showIf={showIf(PRICE)}
            title="Price"
          >
            Price
          </CollapsibleSection>
          <CollapsibleSection
            showIf={showIf(MORE_FILTERS)}
            title="Care services"
          >
            Care services
          </CollapsibleSection>
          <CollapsibleSection
            showIf={showIf(MORE_FILTERS)}
            title="Non-care services"
          >
            Non-care services
          </CollapsibleSection>
          <CollapsibleSection
            showIf={showIf(MORE_FILTERS)}
            title="Amenities"
          >
            Amenities
          </CollapsibleSection>
          <CollapsibleSection
            showIf={showIf(MORE_FILTERS)}
            title="Community space"
          >
            CommunitySpace
          </CollapsibleSection>
        </Block>
      </Modal>
      <Block
        display="flex"
        flexGap="regular"
        css={buttonsCss}
      >
        <Button
          upTo="tablet"
          onPointerDown={openFilters}
        >
          Filters
        </Button>
        <Button
          startingWith="tablet"
          onPointerDown={() => openFilters(COMMUNITY_TYPE)}
        >
          Community type
        </Button>
        <Button
          startingWith="tablet"
          onPointerDown={() => openFilters(SIZE)}
        >
          Size
        </Button>
        <Button
          startingWith="tablet"
          onPointerDown={() => openFilters(PRICE)}
        >
          Price
        </Button>
        <Button
          startingWith="tablet"
          onPointerDown={() => openFilters(MORE_FILTERS)}
        >
          More filters
        </Button>
      </Block>
    </>
  );
};

Filters.propTypes = {
  isOpen: bool,
};

export default Filters;
