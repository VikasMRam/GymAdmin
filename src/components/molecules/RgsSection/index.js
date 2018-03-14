import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import { connect } from 'react-redux';
import { Thumbnail, Paragraph, Heading, Icon } from 'sly/components';

const Wrapper = styled.div`
  position: relative;
  display: initial;
  padding: 1rem;
  box-sizing: border-box;
  opacity: ${ifProp('soon', 0.4, 1)};
  @media screen and (max-width: 640px) {
    padding: 0.5rem;
  }
`;

const StyledThumb = styled(Thumbnail)`
  flex: auto;
  @media screen and (max-width: 640px) {
    width: 32px;
  }
`;

const Text = styled.div`
  margin-left: 1rem;
  overflow: auto;
  > :first-child {
    margin: 0;
  }
`;

//
// class RgsSection extends Component  {
//
//   render()
//   {
//      return (
//       <Wrapper onClick={this.props.toggleOpen}>
//         <Heading level={3}>
//           {this.props.getHeading()}
//         </Heading>
//         <Icon icon={"down"} orientation={this.props.isOpen() ? "down" : "up"}/>
//         <br/>
//         <Paragraph shown={this.props.isOpen()} {...this.props}>{this.props.getHeading()}</Paragraph>
//
//       </Wrapper>
//     );
//   }
// };

const RgsSection = ({ ...props }) => {
  const isToggled = props.isOpen;
  return (
    <Wrapper onClick={props.toggleOpen}>
      <Heading level={3}>
        {props.getHeading()}
        {props.state &&
          props.state.isSectionOpen && <Icon icon="down" orientation="down" />}
        {props.state &&
          !props.state.isSectionOpen && <Icon icon="down" orientation="up" />}
      </Heading>

      {props.state &&
        props.state.isSectionOpen && (
          <Paragraph shown>{props.detail && props.detail.name}</Paragraph>
        )}
      {props.state &&
        !props.state.isSectionOpen && (
          <Paragraph shown={false}>
            {props.detail && props.detail.name}
          </Paragraph>
        )}
    </Wrapper>
  );
};

RgsSection.propTypes = {
  attributes: PropTypes.any,
};
// const localState = {isOpen:true};

const mapStateToProps = (state, props) => ({
  isOpen: () => {
    console.log('********Is open being called*******');
    return state.isSectionOpen;
  },
  getHeading: () => {
    return props.heading;
  },
  toggleOpen: (evt) => {
    // console.log("*** TOGGLE SECTION*****",evt,"**",localState);
    state.isSectionOpen = !state.isSectionOpen;
    console.log('*****TOGGLE Seeing state', state, '***TOGGLE PROPS', props);
  },
});

export default connect(mapStateToProps)(RgsSection);
