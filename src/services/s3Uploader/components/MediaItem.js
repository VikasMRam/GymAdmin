import React from 'react';
import styled from 'styled-components';

import S3Uploader from './S3Uploader';

import ResponsiveImage from 'sly/components/atoms/ResponsiveImage';
import { imagePropType } from 'sly/propTypes/gallery';
import { bool } from 'prop-types';
import { sortableElement, sortableHandle } from 'react-sortable-hoc';

// eslint-disable-next-line no-bitwise
const genKey = () => (Math.random() * 0xFFFFFF << 0).toString(16);

const BaseWrapper = styled.div`
  display: flex;

  > * {
    flex-grow: 1;
  }
`;

const SortableWrapper = sortableElement(BaseWrapper);

const DragHandle = sortableHandle(() => <span>::</span>);

const Info = styled.div``;

const Thumbnail = styled.div`
  flex-grow: 0;
  flex-basis: 100px;
`;

export default class MediaItem extends React.Component {
  static propTypes = {
    image: imagePropType,
    sortable: bool,
  };

  state = {
    loadFailed: false,
  };

  onLoadFailed = () => {
    this.setState({ loadFailed: true });
  };

  render() {
    const { image, sortable, ...props } = this.props;
    const { loadFailed } = this.state;
    const Wrapper = sortable ? SortableWrapper : BaseWrapper;
    return (
      <Wrapper {...props}>
        {sortable && <DragHandle />}
        <Info>
          {(loadFailed || !image.attributes.path) &&
            <S3Uploader />
          }
        </Info>
        <Thumbnail>
          <ResponsiveImage
            onLoadFailed={this.onLoadFailed}
            aspectRatio="16:9"
            path={image.attributes.path}
          />
        </Thumbnail>
      </Wrapper>
    );
  }
}
