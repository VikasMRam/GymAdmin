import React from 'react';
import styled from 'styled-components';
import { sortableElement, sortableHandle } from 'react-sortable-hoc';
import { bool, func } from 'prop-types';

import { size, palette } from 'sly/common/components/themes';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import { imagePropType } from 'sly/common/propTypes/gallery';
import { Icon, Block, Link } from 'sly/common/components/atoms';
import IconButton from 'sly/common/components/molecules/IconButton';
import HelpBubble from 'sly/web/components/form/HelpBubble';

const DragHandle = sortableHandle(styled(Icon)`
  flex-grow: 0;
  margin: 0 ${size('spacing.large')};
`);

const Wrapper = sortableElement(styled.div`
  pointer-events: auto !important;

  & > .drag-handle:hover {
    cursor: grab;
  }

  body > & > .drag-handle:hover {
    cursor: grabbing;
  }

  display: flex;
  align-items: center;
  height: 4rem;
  margin-bottom: ${size('spacing.regular')};
  border: ${size('border.regular')} solid ${palette('slate.lighter-90')};
  border-radius: ${size('spacing.small')};
`);

const Info = styled(Block)`
  flex-grow: 1;
`;

Info.defaultProps = {
  paddingLeft: 'large',
};

const Thumbnail = styled.div`
  flex-grow: 0;
  width: 96px;
`;

const ActionButton = styled(IconButton)``;

ActionButton.defaultProps = {
  iconSize: 'body',
  noPadding: true,
  marginRight: 'large',
  padding: 0,
};

export default class MediaItem extends React.Component {
  static propTypes = {
    image: imagePropType,
    deleteImage: func,
    editImage: func,
    isNew: bool,
    disabled: bool,
  };

  render() {
    const { image, isNew, deleteImage, editImage, disabled, ...props } = this.props;
    const imgPath = image.attributes.path || 'react-assets/img-placeholder.png';

    const descriptionText = image.attributes.description || 'Add a caption';

    return (
      <Wrapper {...props}>
        <DragHandle
          palette="grey"
          icon="drag"
          className="drag-handle"
        />
        <Thumbnail>
          <ResponsiveImage
            aspectRatio="3:2"
            path={imgPath}
          />
        </Thumbnail>
        <Info>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            onClick={() => editImage(image)}
            palette="slate.lighter-30"
            clamped
          >
            {descriptionText}
          </Link>
          {isNew && <HelpBubble>Pending approval</HelpBubble>}
        </Info>
        <ActionButton icon="edit" palette="slate.lighter-30" transparent onClick={() => editImage(image)} disabled={disabled} />
        <ActionButton icon="trash" palette="slate.lighter-30" transparent onClick={() => deleteImage(image)} disabled={disabled} />
      </Wrapper>
    );
  }
}
