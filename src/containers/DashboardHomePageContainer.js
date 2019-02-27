import React, { Component } from 'react';
import styled from 'styled-components';
import { query } from 'sly/services/newApi';

const StyledTextarea = styled.textarea`
  font-family: mono;
  display: block;
  width: 100%;
  height: 600px;
`;

@query('user', 'getUser', getUser => getUser({ userId: 'me' }))

@query('communities', 'getSearchResources', search => search({
  city: 'san-francisco',
  state: 'california',
  toc: 'assisted-living',
}))

export default class DashboardHomePageContainer extends Component {
  render() {
    const { user, communities } = this.props;
    return (
      <div>
        <h2>Example of post data</h2>
        <StyledTextarea>
          {JSON.stringify(user, null, 2)}
        </StyledTextarea>
        <button>send</button>
        <h2>Example of ssr data</h2>
        <pre>
          {JSON.stringify(communities, null, 2)}
        </pre>
      </div>
    );
  }
}
