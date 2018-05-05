import React from 'react';
import { bool, string, arrayOf, shape, object } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { ifProp } from 'styled-tools';
import { key } from 'styled-theme';
import Sticky from 'react-stickynode';

import { size } from 'sly/components/themes';
import { Link } from 'sly/components/atoms';

const StyledNav = styled.nav`
  width: 100%;
  background: ${palette('white', 0)};
  border-bottom: ${size('border.regular')} solid ${palette('grayscale', 2)};
  padding: ${size('spacing.large')};
  transform-origin: center -100%;
  transform: ${ifProp('visible', 'scaleY(1)', 'scaleY(0)')};
  transition: transform ${key('transitions.stickyHeaderEntrance')};
  position: fixed;
  top: 0;

  ol {
    width: 100%;
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      width: ${size('layout.mainColumn')};
    }
    @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
      width: ${size('layout.laptopLarge')};
    }
    list-style-type: none;
    margin: 0 auto;
    padding: 0;

    li {
      display: inline-block;
      white-space: nowrap;
      margin-right: ${size('spacing.large')};
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        margin-right: ${size('spacing.xxLarge')};
      }
    }
  }
`;

export default class CommunityStickyHeader extends React.Component {
  static propTypes = {
    items: arrayOf(shape({
      ref: object.isRequired,
      label: string.isRequired,
    })).isRequired,
    visible: bool,
  };

  static defaultProps = {
    visible: true,
  };

  handleClick(e, key) {
    // Link triggers router navigation so need to preventDefault.
    // TODO: find better way to do it with any other component without much styling code
    e.preventDefault();
    const item = this.props.items[key];
    if (item.ref.current) {
      item.ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    const { items, visible } = this.props;

    return (
      <React.Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <Sticky innerZ={200}>
          <StyledNav visible={visible}>
            <ol>
              {
                items.map((item, key) => {
                  const { label } = item;

                  return (
                    <li key={key}>
                      <Link onClick={e => this.handleClick(e, key)}>{label}</Link>
                    </li>
                  );
                })
              }
            </ol>
          </StyledNav>
        </Sticky>
      </React.Fragment>
    );
  }
}
