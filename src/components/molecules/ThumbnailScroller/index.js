import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getKey, size } from 'sly/components/themes';
import { Thumbnail } from 'sly/components/atoms';

const Wrapper = styled.ul`
  overflow-x: scroll;
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin-right: ${size('spacing.regular')};
  }
  li:hover {
    cursor: pointer;
  }
`;

class ThumbnailScroller extends React.Component {
  static propTypes = {
    palette: PropTypes.string,
    selected: PropTypes.number,
    thumbnails: PropTypes.array,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    palette: 'slate',
    selected: 0,
    thumbnails: [],
  };

  componentDidMount() {
    this.scrollToSelected();
  }

  componentDidUpdate() {
    this.scrollToSelected(true);
  }

  scrollToSelected(isUpdate) {
    if (this.thumbnailRefs[this.props.selected] && this.wrapperRef) {
      const leftPosition = this.thumbnailRefs[this.props.selected].offsetWidth * this.props.selected;
      // smooth scroll effect is not required when intially setting scroll position
      this.wrapperRef.scroll({ left: leftPosition, behavior: isUpdate ? 'smooth' : 'auto' });
    }
  }

  thumbnailRefs = [];
  wrapperRef = null;

  render() {
    return (
      <Wrapper innerRef={(r) => { this.wrapperRef = r; }}>
        {this.props.thumbnails.map((thumbnail, i) => (
          <li key={thumbnail.path} ref={(r) => { this.thumbnailRefs[i] = r; }}>
            <Thumbnail
              palette={this.props.palette}
              selected={i === this.props.selected}
              path={thumbnail.path}
              alt={thumbnail.alt}
              onClick={() => { if (this.props.onClick) this.props.onClick(i); }}
            />
          </li>
        ))}
      </Wrapper>
    );
  }
}

export default ThumbnailScroller;
