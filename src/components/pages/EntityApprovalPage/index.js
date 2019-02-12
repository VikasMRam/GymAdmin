import React, { Fragment } from 'react';
import { string } from 'prop-types';

import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import Footer from 'sly/components/organisms/Footer';
import { Heading, Block } from 'sly/components/atoms';

const EntityApprovalPage = ({ heading, message }) => (
  <Fragment>
    <TemplateHeader><HeaderContainer /></TemplateHeader>
    <TemplateContent>
      <Heading>{heading}</Heading>
      <Block>{message}</Block>
    </TemplateContent>
    <Footer />
  </Fragment>
);

EntityApprovalPage.propTypes = {
  heading: string.isRequired,
  message: string.isRequired,
};

export default EntityApprovalPage;
