import React, { useEffect, useState } from 'react';

import { useAuth } from 'sly/web/services/api/withAuth';
import DashboardInvoicePage from 'sly/web/dashboard/invoices/DashboardInvoicesPage';

function DashboardInvoicePageContainer() {
  const { invoicedMagicLink } = useAuth();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    invoicedMagicLink().then(({ body }) => {
      setToken(body.token);
    }).catch((err) => {
      console.log(error);
      setError('There was an issue fetching your invoices. Invoices might not be enabled on your account yet');
    });
  }, []);


  return (
    <DashboardInvoicePage token={token} error={error} />
  );
}

export default DashboardInvoicePageContainer;
