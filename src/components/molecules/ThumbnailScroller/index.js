import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { size } from 'sly/components/themes';
import { Thumbnail } from 'sly/components/atoms';

const Wrapper = styled.ul`
  overflow: scroll;
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
    thumbnails: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })),
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
    this.scrollToSelected();
  }

  scrollToSelected() {
    if (this.thumbnailRefs[this.props.selected]) {
      this.thumbnailRefs[this.props.selected].scrollIntoView({ behavior: 'smooth' });
    }
  }

  thumbnailRefs = [];

  render() {
    return (
      <Wrapper>
        {this.props.thumbnails.map((thumbnail, i) => (
          <li key={i} ref={this.thumbnailRefs[i]}>
            <Thumbnail
              palette={this.props.palette}
              selected={i === this.props.selected}
              src={thumbnail.src}
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
