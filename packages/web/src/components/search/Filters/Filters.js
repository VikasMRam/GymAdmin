import React, { useCallback, useState } from 'react';
import { bool, func, string } from 'prop-types';
import styled, { css } from 'styled-components';

import Button from './FilterButton';

import { palette, size } from 'sly/common/components/themes';
import Block from 'sly/common/components/atoms/Block';
import Modal, { HeaderWithClose } from 'sly/web/components/atoms/NewModal';
import CollapsibleSection
  from 'sly/web/components/molecules/CollapsibleSection';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';
import Icon from 'sly/common/components/atoms/Icon';
import { COMMUNITY_TYPE, MORE_FILTERS, PRICE, SIZE, LIST, MAP } from 'sly/web/components/search/constants';

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

const Filters = ({
  isOpen: defaultIsOpen,
  show,
  toggleShow,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
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
      <Buttons
        display="flex"
        flexGap="regular"
        {...props}
      >
        <Button
          upTo="tablet"
          onClick={openFilters}
        >
          Filters
        </Button>
        <Button
          startingWith="tablet"
          onClick={() => openFilters(COMMUNITY_TYPE)}
        >
          Community type
        </Button>
        <Button
          startingWith="tablet"
          onClick={() => openFilters(SIZE)}
        >
          Size
        </Button>
        <Button
          startingWith="tablet"
          onClick={() => openFilters(PRICE)}
        >
          Price
        </Button>
        <Button
          startingWith="tablet"
          onClick={() => openFilters(MORE_FILTERS)}
        >
          More filters
        </Button>
        <Button
          upTo="laptop"
          marginLeft="auto"
          onClick={toggleShow}
        >
          <Icon icon="map" />&nbsp;Map
        </Button>
      </Buttons>
    </>
  );
};

Filters.propTypes = {
  isOpen: bool,
  show: string,
  toggleShow: func,
};

export default Filters;
