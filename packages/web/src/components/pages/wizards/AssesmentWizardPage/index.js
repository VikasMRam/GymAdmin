import React from 'react';

import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/web/containers/HeaderContainer';

const AssesmentWizardPage = () => (
  <>
    <TemplateHeader><HeaderContainer layout="wizards" /></TemplateHeader>
    <TemplateContent />
  </>
);

export default AssesmentWizardPage;
