import React, { Component } from 'react';
import styled from 'styled-components';
import { arrayOf, string } from 'prop-types';

import { size, palette } from 'sly/components/themes';

const StyledP = styled.p`
  margin: 0;
`;

const StyledTh = styled.th`
  text-align: left;
  vertical-align: top;
  font-weight: ${size('weight.medium')};
  color:${palette('slate', 'base')};
  width: 30%;
  border: none;
  padding: ${size('spacing.medium')} 0;
`;

const StyledTr = styled.tr`
  border: none;
  padding: ${size('spacing.medium')} 0;
`;

const StyledTd = styled.td`
  border: none;
  width:70%;
  padding: ${size('spacing.medium')} 0;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  position: relative;
  border: none;
`;


export default class SampleMenu extends Component {
  static propTypes = {
    sampleAppetizers: arrayOf(string),
    sampleMain: arrayOf(string),
    sampleSide: arrayOf(string),
    sampleDessert: arrayOf(string),
  };


  render() {
    const { sampleAppetizers, sampleMain, sampleSide, sampleDessert } = this.props;
    return (
      <>
        <StyledTable>
          {sampleAppetizers &&
            <StyledTr>
              <StyledTh>
                Starters
              </StyledTh>
              <StyledTd>
                {sampleAppetizers.map(item => (<StyledP>{item}</StyledP>))}
              </StyledTd>
            </StyledTr>
          }
          {sampleMain &&
            <StyledTr>
              <StyledTh>
                Featured Entrees
              </StyledTh>
              <StyledTd>
                {sampleMain.map(item => (<StyledP>{item}</StyledP>))}
              </StyledTd>
            </StyledTr>
          }
          {sampleSide &&
            <StyledTr>
              <StyledTh>
                Side Dishes
              </StyledTh>
              <StyledTd>
                {sampleSide.map(item => (<StyledP>{item}</StyledP>))}
              </StyledTd>
            </StyledTr>
          }
          {sampleDessert &&
            <StyledTr>
              <StyledTh>
                Dessert
              </StyledTh>
              <StyledTd>
                {sampleDessert.map(item => (<StyledP>{item}</StyledP>))}
              </StyledTd>
            </StyledTr>
          }
        </StyledTable>
      </>
    );
  }
}
