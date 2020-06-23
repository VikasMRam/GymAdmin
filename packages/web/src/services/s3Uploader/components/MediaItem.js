import React from 'react';
import styled from 'styled-components';
import { sortableElement, sortableHandle } from 'react-sortable-hoc';
import { bool, func } from 'prop-types';

import S3Uploader from './S3Uploader';

import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import { imagePropType } from 'sly/web/propTypes/gallery';
import Icon from 'sly/web/components/atoms/Icon';
import { size, palette } from 'sly/web/components/themes';
import IconButton from 'sly/web/components/molecules/IconButton';
import HelpBubble from 'sly/web/components/form/HelpBubble';
import Link from 'sly/web/components/atoms/Link';
import Block from 'sly/web/components/atoms/Block';

const getSignedUrl = (file, callback) => {
  return fetch(`/v0/platform/uploads/s3-signed-url?file=${encodeURIComponent(file.name)}`)
    .then(result => result.json())
    .then(callback);
};

const Wrapper = sortableElement(styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  margin-bottom: ${size('spacing.regular')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('border.xxLarge')};
`);

const DragHandle = sortableHandle(styled(Icon)`
  flex-grow: 0;
  margin: 0 ${size('spacing.large')};
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

const ActionButton = styled(IconButton)`
  margin-right: ${size('spacing.large')};
`;

ActionButton.defaultProps = {
  iconSize: 'body',
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
