import React from "react";
import { oneOf, string, func, bool, arrayOf, object } from "prop-types";
import styled from "styled-components";

import { palette, key } from "sly/common/components/themes";
import { Icon, Block } from "sly/common/components/atoms";
import { Input } from "sly/web/components/atoms";
import IconButton from "sly/common/components/molecules/IconButton";
import IconItem from "sly/web/components/molecules/IconItem";

const SuggestionsWrapper = styled(Block)`
  z-index: ${key("zIndexes.searchSuggestions")};
  left: 0;
  right: 0;
`;
SuggestionsWrapper.displayName = "SuggestionsWrapper";

const Suggestion = styled(Block)`
  :hover {
    background-color: ${palette("primary", "stroke")};
  }
`;
Suggestion.displayName = "Suggestion";

const Suggestions = styled(Block)`
  :last-child {
    border: 0;
  }
`;

const groupSuggestions = suggestions =>
  suggestions.reduce((acc, curr) => {
    if (!acc[curr.resourceType]) acc[curr.resourceType] = [];
    acc[curr.resourceType].push(curr);
    return acc;
  }, {});

const GROUP_LABELS = {
  City: "Locations",
  Zipcode: "Locations",
  GoogleCity: "Locations",
  Community: "Communities",
  PartnerAgent: "Agents"
};

const GROUP_ICONS = {
  City: "location",
  Zipcode: "location",
  GoogleCity: "location",
  Community: "community-size-large",
  PartnerAgent: "user"
};

const GROUP_LIMITS = {
  City: 5,
  Zipcode: 5,
  GoogleCity: 5,
  Community: 3,
  PartnerAgent: 3
};

const GROUPS_DISPLAY_TEXT = ["City", "Zipcode"];

const SearchBox = ({
  layout,
  value,
  defaultValue,
  onChange,
  onSelect,
  onFocus,
  isTextboxInFocus,
  onSearchButtonClick,
  onLocationSearch,
  onCurrentLocationClick,
  onBlur,
  onKeyDown,
  placeholder,
  readOnly,
  suggestions,
  dataTestId,
  dataTestIdButton,
  ...props
}) => {
  const gps = groupSuggestions(suggestions);
  const inputProps = {};

  if (value) {
    inputProps.value = value;
  }

  return (
    <Block position="relative" {...props}>
      <Block display="flex">
        <Input
          disabled={false}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={readOnly}
          onKeyDown={onKeyDown}
          onChange={onChange}
          size={layout === "homeHero" ? "large" : undefined}
          snap="right"
          data-testid={dataTestId}
          {...inputProps}
        />
        <IconButton
          icon="search"
          snap="left"
          border="0"
          data-testid = {dataTestIdButton}
          onClick={onSearchButtonClick}
        />
      </Block>
      {isTextboxInFocus && (onCurrentLocationClick || suggestions.length > 0) && (
        <SuggestionsWrapper
          background="white"
          position="absolute"
          border="regular"
          borderPalette="slate"
          borderVariation="stroke"
          shadowBlur="regular"
        >
          {/*
            use mouseDown instead of onClick as the onClick which is triggered after mouse button is release will trigger blur of textbox
            that will by the time hide the suggestions dropdown
          */}
          {onCurrentLocationClick && !suggestions.length && (
            <Suggestion
              onMouseDown={onCurrentLocationClick}
              cursor="pointer"
              width="100%"
              padding={["medium", "xLarge"]}
              size="caption"
              iconSize="caption"
              palette="primary"
            >
              <Icon icon="navigation" marginRight="regular" palette="primary" />{" "}
              Current location
            </Suggestion>
          )}
          {Object.keys(gps).map(k => (
            <Suggestions key={k} borderBottom="regular" paddingTop="medium">
              <IconItem
                icon={GROUP_ICONS[k]}
                iconPalette="grey"
                textPalette="grey"
                paddingLeft="xLarge"
                paddingRight="xLarge"
                size="caption"
                iconSize="caption"
              >
                {GROUP_LABELS[k]}
              </IconItem>
              {gps[k].slice(0, GROUP_LIMITS[k]).map(suggestion => (
                <Suggestion
                  onMouseDown={() => onSelect(suggestion)}
                  cursor="pointer"
                  key={suggestion.id}
                  background={suggestion.active ? "grey.stroke" : "white"}
                  palette="primary"
                  width="100%"
                  padding={["medium", "xLarge"]}
                  size="caption"
                  clamped
                >
                  <Block display="inline" marginLeft="xxLarge">
                    {GROUPS_DISPLAY_TEXT.includes(suggestion.resourceType)
                      ? suggestion.displayText
                      : suggestion.name}
                  </Block>
                </Suggestion>
              ))}
            </Suggestions>
          ))}
        </SuggestionsWrapper>
      )}
    </Block>
  );
};

SearchBox.propTypes = {
  layout: oneOf(["header", "homeHero"]),
  value: string.isRequired,
  defaultValue: string.isRequired,
  onChange: func.isRequired,
  onSelect: func.isRequired,
  onLocationSearch: func,
  onSearchButtonClick: func,
  onFocus: func,
  isTextboxInFocus: bool,
  onCurrentLocationClick: func,
  onBlur: func,
  onKeyDown: func,
  placeholder: string,
  readOnly: bool,
  suggestions: arrayOf(object).isRequired
};

SearchBox.defaultProps = {
  layout: "header",
  placeholder: "Search by city, state, zip",
  value: "",
  defaultValue: "",
  suggestions: []
};

export default SearchBox;
