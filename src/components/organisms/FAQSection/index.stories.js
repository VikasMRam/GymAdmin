import React from 'react';
import { storiesOf } from '@storybook/react';

import FAQSection from 'sly/components/organisms/FAQSection';

const faqs = [
  {
    title: 'Do I have to leave my current senior living referral agency business to join the Seniorly Agent Program?',
    description: 'No, you do not need to leave your current agency. As a Seniorly Partner Agent you will still operate under your business name and simply receive extra family referrals in addition to your current business.',
  },
  {
    title: 'Can I work on a team with other agents?',
    description: 'Yes. To do so you will need to set up points of contact and your team members’ coverage areas. To apply as a team, please be sure to add each member’s information on the Seniorly Partner Agent application.',
  },
  {
    title: 'Will I receive Assisted Living, Memory Care, Independent Living and Home Care Referrals?',
    description: 'Seniorly will send referrals based on your area of expertise. You will be asked to set up care types your service in the sign up process.',
  },
  {
    title: 'What are my financial obligations to the program?',
    description: 'This is a success based program, which means there is no obligation or up-front cost. Once a family moves in or selects an in-home option partner agents receive a commission which is a split with Seniorly.',
  },
  {
    title: 'How many referrals can I expect?',
    description: 'Demand from families varies by market and time of year, but our partner agents receive an average of 1-5 referrals each week.',
  },
];

storiesOf('Organisms|FAQSection', module)
  .add('default', () => (
    <FAQSection
      faqs={faqs}
    />
  ))
  .add('with one faq', () => (
    <FAQSection
      faqs={[faqs[0]]}
    />
  ));
