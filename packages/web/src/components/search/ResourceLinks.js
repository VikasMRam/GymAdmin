
import React from 'react';
import { string } from 'prop-types';

import { Heading, Link, Block, Hr } from 'sly/common/components/atoms';

const careTypeLink = {

  'assisted-living' : [
    { title: 'Evaluating Assisted Living Communities', to: '/assisted-living/articles/evaluating-assisted-living-communities' },
    { title: "Independent vs. Assisted Living - What's the Difference?", to:"/independent-living/articles/seniorly-conversations-independent-vs-assisted-living"},
    { title: 'Understanding the Cost of Assisted Living', to: '/assisted-living/articles/understanding-the-cost-of-assisted-living' },
    { title: "6 Tips for Touring Assisted Living Facilities", to:"/resources/articles/6-tips-for-touring-assisted-living-facilities"},
    { title: 'Frequently Asked Questions About Assisted Living', to: '/assisted-living/articles/seniorly-assisted-living-faqs' },
  ],
  'memory-care' : [
    { title: 'Evaluating Memory Care Communities', to: '/memory-care/articles/evaluating-memory-care-communities' },
    { title: 'Understanding the Cost of Memory Care', to: '/memory-care/articles/understanding-the-cost-of-memory-care' },
    { title: 'Understanding the Cost of Assisted Living', to: '/assisted-living/articles/understanding-the-cost-of-assisted-living' },
    { title: "6 Tips for Touring Assisted Living Facilities", to:"/resources/articles/6-tips-for-touring-assisted-living-facilities"},
    { title: 'Frequently Asked Questions About Memory Care', to: '/memory-care/articles/seniorly-memory-care-faqs' },
  ],
  'independent-living' : [
    { title: "Independent vs. Assisted Living - What's the Difference?", to:"/independent-living/articles/seniorly-conversations-independent-vs-assisted-living"},
    { title: "Evaluating Independent Living Communities", to:"/independent-living/articles/evaluating-independent-living-communities"},
    { title: "Understanding the Cost of Independent Living", to:"/independent-living/articles/understanding-the-cost-of-independent-living"},
    { title: "Frequently Asked Questions About Independent Living", to:"/independent-living/articles/seniorly-independent-living-faqs"},
  ],
  'continuing-care-retirement-community': [
    { title: "Evaluating a Continuing Care Retirement Community", to:"/continuing-care-retirement-community/articles/evaluating-a-continuing-care-retirement-community-ccrc"},
    { title: "Understanding the Cost of a Continuing Care Retirement Community", to:"/continuing-care-retirement-community/articles/understanding-the-costs-of-a-continuing-care-retirement-communities-ccrc"},
    { title: "Frequently Asked Questions About a Continuing Care Retirement Community", to:"/continuing-care-retirement-community/articles/seniorly-continuing-care-retirement-community-ccrc-faqs"},

  ],
  'board-and-care-home' : [
    { title: 'Evaluating a Board and Care Home', to: '/resources/articles/evaluating-a-board-and-care-home' },
    { title: 'Understanding the Cost of a Board and Care Home', to: '/resources/articles/understanding-the-cost-of-a-board-and-care-home' },
    { title: "6 Tips for Touring Assisted Living Facilities", to:"/resources/articles/6-tips-for-touring-assisted-living-facilities"},
    { title: 'Frequently Asked Questions About Board and Care Home', to: '/resources/articles/seniorly-board-and-care-faqs' },
  ]
};

const defaultLinks = [
  { title: "Independent vs. Assisted Living - What's the Difference?", to:"/independent-living/articles/seniorly-conversations-independent-vs-assisted-living"},
  { title: 'Understanding the Cost of Assisted Living', to: '/assisted-living/articles/understanding-the-cost-of-assisted-living' },
  { title: "6 Tips for Touring Assisted Living Facilities", to:"/resources/articles/6-tips-for-touring-assisted-living-facilities"},
  { title: 'Frequently Asked Questions About Assisted Living', to: '/assisted-living/articles/seniorly-assisted-living-faqs' },
];

function ResourceLinks({ toc }) {

  const links = careTypeLink[toc] || defaultLinks;

  return (
    <Block as="section">

      <Heading level="subtitle" size="subtitle" pad="xLarge">
        Helpful Resources
      </Heading>
      {links.map((item, i) => (
        <>
        <Link
          href={item.to}
          palette="primary"
          event={{
            category: `${toc}-resource-link`,
            action: 'link-click',
            label: item.to,
          }}
        >
          {item.title}
        </Link>
        {i !== links.length - 1 && <Hr />}
        </>
      ))}
    </Block>
  );
}

ResourceLinks.propTypes = {
  toc: string,
};

export default ResourceLinks;
