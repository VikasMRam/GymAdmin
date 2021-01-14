import React from 'react';
import { storiesOf } from '@storybook/react';

import QuotesCarroussel from 'sly/web/components/homepage/QuotesCarroussel';

const quotes = [
  { id: '1', author: 'Delia', text: 'A Lisa called me and was very encouraging. At the end of our conversation I felt more peaceful and less anxious. Thankful for all you folks who care and advise during life\'s inevitable difficult seasons.' },
  { id: '2', author: 'Delia', text: 'B Lisa called me and was very encouraging. At the end of our conversation I felt more peaceful and less anxious. Thankful for all you folks who care and advise during life\'s inevitable difficult seasons.' },
  { id: '3', author: 'Delia', text: 'C Lisa called me and was very encouraging. At the end of our conversation I felt more peaceful and less anxious. Thankful for all you folks who care and advise during life\'s inevitable difficult seasons.' },
  { id: '4', author: 'Delia', text: 'D Lisa called me and was very encouraging. At the end of our conversation I felt more peaceful and less anxious. Thankful for all you folks who care and advise during life\'s inevitable difficult seasons.' },
  { id: '5', author: 'Delia', text: 'E Lisa called me and was very encouraging. At the end of our conversation I felt more peaceful and less anxious. Thankful for all you folks who care and advise during life\'s inevitable difficult seasons.' },
  { id: '6', author: 'Delia', text: 'F Lisa called me and was very encouraging. At the end of our conversation I felt more peaceful and less anxious. Thankful for all you folks who care and advise during life\'s inevitable difficult seasons.' },
];

storiesOf('Homepage|QuotesCarroussel', module)
  .add('default', () => (
    <QuotesCarroussel
      heading="Families love the Seniorly experience."
      quotes={quotes}
    />
  ));
