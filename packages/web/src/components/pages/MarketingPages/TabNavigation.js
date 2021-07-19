import React from 'react';
import styled, { css } from 'styled-components';
import { components } from 'react-select';
import { array, bool, object, string } from 'prop-types';

import Block from 'sly/common/system/Block';
import Link from 'sly/common/system/Link';
import Select from 'sly/web/components/atoms/Select';
import ArrowDrop from 'sly/common/icons/ArrowDrop';
import { sx, space, border, color } from 'sly/common/system/sx';

const capitalize = str => str[0].toUpperCase() + str.slice(1).toLowerCase();

const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <ArrowDrop rotation={props.isFocused ? '0' : '180'} color="slate.base" />
  </components.DropdownIndicator>
);

DropdownIndicator.propTypes = {
  isFocused: bool,
};

const Option = props => <components.Option {...props} />;

const TabsItem = styled(Link)`
  cursor: pointer;
  text-transform: uppercase;
  &:hover {
    text-decoration: none;
  }
`;

// @ts-ignore
const wrapperCustomStyles = css`
  .react-select__control {
    border-bottom-left-radius: ${border('l')};
    border-bottom-right-radius: ${border('l')};
  }
  .react-select__menu {
    border-radius: ${border('l')};
    overflow: hidden;
    margin-top: ${space('xs')};

    &-list {
      max-height: max-content;
    }
  }
  .react-select__option {
    padding: ${space('m')} 0 ${space('m')} ${space('l')};

    &:hover {
      background: ${color('viridian.lighter-90')};
    }

    &:active {
      background: ${color('viridian.base')};
    }
  }
  .react-select__value-container > .react-select__single-value {
    color: ${color('slate.base')};
  }
  .react-select__option, .react-select__placeholder, .react-select__single-value {
    ${sx({ font: 'body-m' })}
  }
  .react-select__option--is-selected {
    font-weight: 400;
    background: ${color('viridian.base')};
    color: ${color('white.base')};

    &:hover, &:active {
      background: ${color('viridian.base')};
    }
  }
`;

const TabNavigation = ({
  linksList,
  currentLink,
  history,
}) => {
  const mobileLinksList = linksList?.map(({title, to}) => {
    return {label: capitalize(title), value: to}});

return (
  <>
    <Block
      margin="l m"
      sx={{ marginX: 'auto', width: 'col3' }}
      sx$laptop={{ display: 'none' }}
      sx$tablet={{ display: 'none' }}
    >
      <Select
        size="large"
        wrapperCustomStyles={wrapperCustomStyles}
        components={{DropdownIndicator, Option}}
        options={mobileLinksList}
        defaultValue={mobileLinksList?.find(({ value, label }) => value === currentLink && label)}
        onChange={e => history.push(e.value)}
        />
    </Block>
    <Block
      height="3rem"
      marginX="auto"
      width="col12"
      display="none"
      sx$laptop={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      sx$tablet={{
        width: 'col6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
      {linksList?.map(({ title, to }, index) => {
        const isActiveLink = to === currentLink;
        return (
          <TabsItem
            key={title}
            marginRight={linksList.length - 1 !== index && 'l'}
            font="label"
            isActiveTab={isActiveLink}
            color={isActiveLink ? 'viridian.base' : 'slate.lighter-40'}
            borderBottom={isActiveLink && 'l'}
            borderColor={isActiveLink && 'viridian.base'}
            paddingTop="m"
            paddingBottom={isActiveLink ? 's' : 'm'}
            to={to}
          >
            {title.toUpperCase()}
          </TabsItem>
        )})}
        </Block>
      </>
    )
  };

TabNavigation.propTypes = {
  linksList: array,
  currentLink: string,
  history: object,
}

export default TabNavigation;
