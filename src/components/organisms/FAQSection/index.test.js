import React from 'react';
import { shallow } from 'enzyme';

import FAQSection from 'sly/components/organisms/FAQSection';
import { partnerFAQs } from 'sly/constants/agents';

const wrap = (props = {}) => shallow(<FAQSection {...props} />);

describe('FAQSection', () => {
  it('renders', () => {
    const wrapper = wrap({ faqs: partnerFAQs });
    const [firstFaq, ...restFaqs] = partnerFAQs;

    const cs = wrapper.find('StyledBox').find('StyledCollapsibleSection').at(0);
    expect(cs.prop('title')).toBe(firstFaq.title);
    expect(cs.dive().find('Block').dive().text()).toBe(firstFaq.description);
    restFaqs.forEach((faq, i) => {
      const cs = wrapper.find('StyledCollapsibleSection').at(i + 1);
      expect(cs.prop('title')).toBe(faq.title);
      expect(cs.dive().find('Block').dive().text()).toBe(faq.description);
    });
  });

  it('renders with one faq', () => {
    const wrapper = wrap({ faqs: [partnerFAQs[0]] });

    const cs = wrapper.find('StyledBox').find('StyledCollapsibleSection');
    expect(cs.prop('title')).toBe(partnerFAQs[0].title);
    expect(cs.dive().find('Block').dive().text()).toBe(partnerFAQs[0].description);
  });
});
