import React, { Component } from 'react';
import styled from 'styled-components';
import { func, string, array } from 'prop-types';
import loadable from '@loadable/component';
import ReactTooltip from 'react-tooltip';

import { size } from 'sly/common/components/themes';
import { Input } from 'sly/web/components/atoms';
import { color, space, Block } from 'sly/common/system';
import { Help } from 'sly/common/icons';
import { isBrowser } from 'sly/web/config';

const DatePicker = loadable(() => import(/* webpackChunkName: "chunkDatePicker" */'sly/web/components/molecules/DatePicker'));

const getDateFromValue = (value, pos) => value && Array.isArray(value)
  ? value[pos]
  : null;

const Wrapper = styled.div`
  display: flex;
  > * {
    width: calc(50% - ${size('spacing.regular')});
    margin-right: ${size('spacing.regular')};
  }

  margin-right: -${size('spacing.regular')};
`;

const StyledHelpIcon = styled(Help)`
  margin-left: ${space('spacing.xxs')};
  color: ${color('slate.lighter-60')};
  vertical-align: text-top;
`;
const TooltipContent = styled(ReactTooltip)`
  padding: ${space('xs')}!important;
  color: ${color('slate')}!important;
  background-color: ${color('white')}!important;
  box-shadow: 0 0 ${space('m')} ${color('slate.lighter-80')}80;
`;

const StyledHelpIconBlock = styled(Block)`
 display:flex;
 flex-direction : column;
 justify-content : center;
  width:fit-content;
  position:relative
`;
const overridePosition = ({ left, top }) => ({
  top,
  left: left < 5 ? 5 : left,
});

export default class DateRange extends Component {
  static propTypes = {
    onChange: func.isRequired,
    size: string,
    value: array,
    startDateInfo: string,
    endDateInfo: string,
  };

  state = {
    startDate: getDateFromValue(this.props.value, 0),
    endDate: getDateFromValue(this.props.value, 1),
  };

  setStartDate = (startDate) => {
    this.setState({ startDate }, this.onChange);
  };

  setEndDate = (endDate) => {
    this.setState({ endDate }, this.onChange);
  };

  onChange = () => {
    const { onChange } = this.props;
    const { startDate, endDate } = this.state;
    if (startDate && endDate) {
      onChange([startDate, endDate]);
    }
  };

  render() {
    const { startDate, endDate } = this.state;
    const { size, startDateInfo, endDateInfo } = this.props;

    const customInput = <Input size={size} />;
    return (
      <Wrapper>
        <DatePicker
          selected={startDate}
          onChange={this.setStartDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          customInput={customInput}
        />
        {
          startDateInfo &&
          <StyledHelpIconBlock width="fit-content !important">
            <StyledHelpIcon  size="s" data-tip data-for="startDateInfoTooltip" />
            {isBrowser &&
            <TooltipContent overridePosition={overridePosition} id="startDateInfoTooltip" type="light" effect="solid" multiline>
              {startDateInfo}
            </TooltipContent>
               }
          </StyledHelpIconBlock>
        }

        <DatePicker
          selected={endDate}
          onChange={this.setEndDate}
          selectsEnd
          endDate={endDate}
          minDate={startDate}
          customInput={customInput}
        />
        {
          endDateInfo &&
          <StyledHelpIconBlock width="fit-content !important">
            <StyledHelpIcon  size="s" data-tip data-for="endDateInfoTooltip" />
            {isBrowser &&
            <TooltipContent  id="endDateInfoTooltip" overridePosition={overridePosition} type="light" effect="solid" multiline>
              {endDateInfo}
            </TooltipContent>
               }
          </StyledHelpIconBlock>
        }

      </Wrapper>
    );
  }
}
