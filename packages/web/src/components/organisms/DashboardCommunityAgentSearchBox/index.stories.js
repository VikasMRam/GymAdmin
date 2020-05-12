import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import DashboardCommunityAgentSearchBox from 'sly/web/components/organisms/DashboardCommunityAgentSearchBox';


const Wrapper = styled.div`
  width: 800px;
  padding: 24px;
`;

const onNameZipChange = action('onNameZipChange');

const DashboardCommunitySearchBoxContainer = reduxForm({
  form: 'DashboardCommunitySearchBox',
})(DashboardCommunityAgentSearchBox);

const wrap = (props = {}) => (
  <Wrapper>
    <DashboardCommunitySearchBoxContainer
      {...props}
    />
  </Wrapper>
);

storiesOf('Organisms|DashboardCommunitySearchBox', module)
  .add('default', () => {
    return wrap({ handleSubmit: (e) => { e.preventDefault(); onNameZipChange(); } });
  });

