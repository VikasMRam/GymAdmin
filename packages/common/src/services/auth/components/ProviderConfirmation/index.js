import React from 'react';
import { string, func } from 'prop-types';

import { Heading, Button, Paragraph, Block } from 'sly/common/components/atoms';
import { DASHBOARD_COMMUNITIES_PATH } from 'sly/web/constants/dashboardAppPaths';

const ProviderConfirmation = ({ mode, onSubmit }) => (
  <>
    {mode === 'Approved' &&
      <Block align="center">
        <Heading pad="large">Our team will contact you to verify your details to complete the process.</Heading>
        <Paragraph>
          In the meantime you can begin editing this community&apos;s details. Please note: any details will only become public after being approved by Seniorly
        </Paragraph>
        <Button pad="large" width="100%" href={DASHBOARD_COMMUNITIES_PATH}>Finish</Button>
      </Block>
    }
    {mode === 'NotFound' &&
      <Block align="center">
        <Heading pad="large">You can add the community in your dashboard.</Heading>
        <Paragraph>Please note: any details will only become public after being approved by Seniorly</Paragraph>
        <Button pad="large" width="100%" href={DASHBOARD_COMMUNITIES_PATH}>Continue</Button>
      </Block>
    }
    {mode === 'NeedApproval' &&
      <Block align="center">
        <Heading pad="large">Thank you. Our team will contact you to verify your details to complete the process.</Heading>
        <Button pad="large" width="100%" onClick={onSubmit}>Finish</Button>
      </Block>
    }
  </>
);

ProviderConfirmation.propTypes = {
  onSubmit: func,
  mode: string.isRequired,
};

export default ProviderConfirmation;
