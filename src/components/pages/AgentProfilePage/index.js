import React, { Fragment } from 'react';
import { shape, object } from 'prop-types';

import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import Footer from 'sly/components/organisms/Footer';
import AgentSummary from 'sly/components/molecules/AgentSummary/index';

const PasswordResetPage = ({ agent }) => {
  const { info } = agent;
  return (
    <Fragment>
      <TemplateHeader><HeaderContainer /></TemplateHeader>
      <TemplateContent>
        <AgentSummary {...info} />
      </TemplateContent>
      <Footer />
    </Fragment>
  );
};

PasswordResetPage.propTypes = {
  agent: shape({
    info: object.isRequired,
  }).isRequired,
};

export default PasswordResetPage;
