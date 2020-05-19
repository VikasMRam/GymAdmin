import React from 'react';
import styled from 'styled-components';
import { sortableElement, sortableHandle } from 'react-sortable-hoc';

import S3Uploader from './S3Uploader';

import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import { imagePropType } from 'sly/web/propTypes/gallery';
import Icon from 'sly/web/components/atoms/Icon';
import { size, palette } from 'sly/web/components/themes';
import { bool, func } from 'prop-types';
import IconButton from 'sly/web/components/molecules/IconButton';
import HelpBubble from 'sly/web/components/form/HelpBubble';

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

const Info = styled.div`
  flex-grow: 1;
`;

const Thumbnail = styled.div`
  flex-grow: 0;
  width: 96px;
`;

const RemoveButton = styled(IconButton)`
  width: ${size('element.regular')};
  height: ${size('element.regular')};
  margin: 0 ${size('spacing.large')};
`;

export default class MediaItem extends React.Component {
  static propTypes = {
    image: imagePropType,
    deleteImage: func,
    saveImage: func,
    isNew: bool,
    disabled: bool,
  };

  onFinish = (result, file) => {
    const { image, saveImage } = this.props;
    saveImage({
      ...image,
      attributes: {
        ...image.attributes,
        name: file.name,
        path: result.path,
      },
      // original image
    }, image);
  };

  render() {
    const { image, isNew, deleteImage, saveImage, disabled, ...props } = this.props;
    const imgPath = image.attributes.path || 'react-assets/img-placeholder.png';
    return (
      <Wrapper {...props}>
        <DragHandle
          palette="grey"
          icon="drag"
        />
        <Thumbnail>
          <ResponsiveImage
            onLoadFailed={this.onLoadFailed}
            aspectRatio="3:2"
            path={imgPath}
          />
        </Thumbnail>
        <Info>
          {isNew && <HelpBubble>This image is new</HelpBubble>}
          {image.attributes.path &&
            image.attributes.name
          }
          {!image.attributes.path &&
            <S3Uploader
              uploadRequestHeaders={{}}
              getSignedUrl={getSignedUrl}
              onError={this.onError}
              onFinish={this.onFinish}
            />
          }
        </Info>
        <RemoveButton icon="trash" palette="grey" transparent onClick={() => deleteImage(image)} disabled={disabled} />
      </Wrapper>
    );
  }
}
