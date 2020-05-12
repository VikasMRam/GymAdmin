import React from 'react';
import { string } from 'prop-types';

import HeaderContainer from 'sly/web/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/web/components/templates/BasePageTemplate';
import Footer from 'sly/web/components/organisms/Footer';
import { Heading, Block } from 'sly/web/components/atoms';

const EntityApprovalPage = ({ heading, message }) => (
  <>
    <TemplateHeader><HeaderContainer /></TemplateHeader>
    <TemplateContent>
      <Heading>{heading}</Heading>
      <Block>{message}</Block>
    </TemplateContent>
    <Footer />
  </>
);

EntityApprovalPage.propTypes = {
  heading: string.isRequired,
  message: string.isRequired,
};

export default EntityApprovalPage;
