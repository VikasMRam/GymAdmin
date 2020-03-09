import React from 'react';
import styled from 'styled-components';
import { sortableElement, sortableHandle } from 'react-sortable-hoc';

import S3Uploader from './S3Uploader';

import ResponsiveImage from 'sly/components/atoms/ResponsiveImage';
import { imagePropType } from 'sly/propTypes/gallery';
import Icon from 'sly/components/atoms/Icon';
import { size, palette } from 'sly/components/themes';
import Field from 'sly/components/molecules/Field';
import { func } from 'prop-types';
import IconButton from 'sly/components/molecules/IconButton';

const getSignedUrl = (file, callback) => {
  return fetch(`/v0/platform/uploads/s3-signed-url?file=${encodeURIComponent(file.name)}`)
    .then(result => result.json())
    .then(callback);
};

const Wrapper = sortableElement(styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${size('spacing.regular')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('border.xLarge')};
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
  width: 100px;
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
  };

  state = {
    loadFailed: false,
  };

  onLoadFailed = () => {
    this.setState({ loadFailed: true });
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
    });
  };

  render() {
    const { image, deleteImage, saveImage, ...props } = this.props;
    console.log('image', image)
    return (
      <Wrapper {...props}>
        <DragHandle icon="menu" />
        <Info>
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
        <Thumbnail>
          {image.attributes.path &&
            <ResponsiveImage
              onLoadFailed={this.onLoadFailed}
              aspectRatio="16:9"
              path={image.attributes.path}
            />
          }
        </Thumbnail>
        <RemoveButton icon="trash" onClick={() => deleteImage(image)} />
      </Wrapper>
    );
  }
}
