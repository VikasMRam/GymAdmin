import React from 'react';
import { string  } from 'prop-types';

import { Flex, Image,  Block } from 'sly/common/system';
import { Warning } from 'sly/common/icons';
import { Section } from 'sly/web/dashboard/DashboardWithSummaryTemplate';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import { assetPath } from 'sly/web/components/themes';


const DashboardListingIndexPage = ({ token, error }) => {
  if (!token || error) {
    return (
      <DashboardPageTemplate activeMenuItem="Invoices">
        <Section snap="none">

          <Flex
            height="100vh"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            { (!token && !error) &&
            <>
              <Image src={assetPath('images/homebase/loader.svg')} />
              <Block font="title-s-azo" >Loading your invoices</Block>
            </>}
            {error && <> <Warning color="red" size="xxl" /> <Block font="title-s-azo" >{error}</Block></>}
          </Flex>
        </Section>
      </DashboardPageTemplate>
    );
  }

  return (
    <DashboardPageTemplate activeMenuItem="Invoices">
      <iframe style={{ flexGrow: 1, borderWidth: 2, borderColor: '#E9EBED', borderStyle: 'solid'  }} src={`https://invoice.seniorly.com/login/${token}`} />
    </DashboardPageTemplate>
  );
};

DashboardListingIndexPage.propTypes = {
  token: string,
  error: string,
};

export default DashboardListingIndexPage;
