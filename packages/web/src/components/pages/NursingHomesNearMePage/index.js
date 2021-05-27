import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';

import { size } from 'sly/common/components/themes';
import HubHeader from 'sly/web/components/molecules/HubHeader';
import WhatIsPartnerAgent from 'sly/web/components/molecules/WhatIsPartnerAgent';
import PhoneCTAFooter from 'sly/web/components/molecules/PhoneCTAFooter';
import ADLChart from 'sly/web/components/molecules/ADLChart';
import { faqPage, tocSiteNavigationLD, guideLD } from 'sly/web/services/helpers/html_headers';
import {
  HubPageTemplate,
  makeBody,
  makeColumn,
  makeTwoColumn,
  makeWrapper,
  makeStickToTop,
  makeArticle,
  makeTable,
  makeOneColumnListWrapper,
} from 'sly/web/components/templates/HubPageTemplate';
import { Heading, Paragraph, Link, Box } from 'sly/common/components/atoms';
import Footer from 'sly/web/components/organisms/Footer';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';

const StyledLink = styled(Link)`
  margin-bottom: ${size('spacing.large')};
  display: block;
`;
const StyledBox = styled(Box)`
  text-align: center;
`;

const TwoColumn = makeTwoColumn('div');
const Body = makeBody('div');
const Column = makeColumn('aside');
const Wrapper = makeWrapper('div');
const StickToTop = makeStickToTop('div');
const StyledArticle = makeArticle('article');
const StyledTable = makeTable('table');

const NearMePage = ({
  onLocationSearch,
  handleAnchor,
  onCurrentLocation,
}) => {
  const nhRef = React.createRef();
  const defineRef = React.createRef();
  const snfRef = React.createRef();
  const ilRef = React.createRef();
  const alRef = React.createRef();
  const mcRef = React.createRef();
  const alvssnfRef = React.createRef();
  const faqRef = React.createRef();


  const tocList = [
    {
      title: 'What is a Nursing Home?',
      id: 'what-is-nursing-home',
      ref: nhRef,
    },
    {
      title: 'Nursing Home Definition',
      id: 'define',
      ref: defineRef,
    },
    {
      title: 'Skilled Nursing Facility',
      id: 'skilled-nursing-facility',
      ref: snfRef,
    },
    {
      title: 'Independent Living',
      id: 'independent-living',
      ref: ilRef,
    },
    {
      title: 'Assisted Living',
      id: 'assisted-living',
      ref: alRef,
    },
    {
      title: 'Memory Care',
      id: 'memory-care',
      ref: mcRef,
    },
    {
      title: 'Assisted Living vs. Skilled Nursing Facility Services',
      id: 'al-vs-snf',
      ref: alvssnfRef,
    },
    {
      title: 'Nursing Home FAQs',
      id: 'frequently-asked-question',
      ref: faqRef,
    },
  ];

  const agents = [
    {
      title: 'Sarah Odover - Los Angeles, CA',
      to: 'https://www.seniorly.com/agents/pacific-west/beverley-hills/assisted-living-locators-los-angeles-ca-sarah-ordover-',
      asset: 'images/hub/agents/Sarah.png',
      caption: 'Sarah Ordover has over 4 years of experience helping families find independent living, \n' +
      'assisted living, and memory care options. She has helped over 100 families so far in the Los Angeles area.',
      first: 'Sarah',
    },
    {
      title: 'Heather Cartright - Sarasota, FL',
      to: 'https://www.seniorly.com/agents/south/ellenton-fl/my-care-finders-fl-heather-cartright-',
      asset: 'images/hub/agents/Heather.png',
      caption: 'Heather Cartright has over a year of experience helping families find independent living, \n' +
      'assisted living, and memory care options. As a former assisted living facility administrator, \n' +
      'she brings a unique skillset for senior living placement.',
      first: 'Heather',
    },
    {
      title: 'Carol Katz - New Jersey',
      to: 'https://www.seniorly.com/agents/northeast/manalapan/adult-care-advisors-carol-katz-',
      asset: 'images/hub/agents/Carol-Katz.png',
      caption: 'Carol Katz has over 10 years of experience helping families find independent living, \n' +
      'assisted living, and memory care options. With her unique volunteer experience, she brings \n' +
      'a special skillset for senior living placement.',
      first: 'Carol',
    },
  ];
  const faqs = [
    {
      question: 'Does Medicare pay for a nursing home?',
      answer: 'Yes, Medicare can be used to pay for a stay at a nursing home. However, seniors must qualify and this is where it can get complicated.  Medicare will only pay if a senior resident requires skilled nursing care and has been referred by a physician after discharge from a hospital, and only 100 days of skilled nursing care are offered per year.  For more on how to pay for a nursing home, scroll back up on this page to the payment section.',
    },
    {
      question: 'How much does a nursing home cost?',
      answer: 'The monthly average cost in 2019 for a nursing home was $7,513 for a semi-private room and $8,517 for a private room.  This is according to the Genworth Cost of Care Survey.  Remember, this is a monthly average calculated from across the entire U.S.  Therefore, you can expect the cost to fluctuate depending on where you live and the exact care needs being managed.',
    },
    {
      question: 'What is the difference between assisted living and nursing home?',
      answer: 'Often, families search for “nursing home.” This term doesn’t really exist, but it is commonly defined as a Skilled Nursing Facility. There is a significant difference between Assisted Living communities and Skilled Nursing Facilities.\n' +
      'According to the CDC, over 50% of Skilled Nursing Facility residents have either Alzheimer’s disease or other forms of dementia. Most residents also spend the majority of their time sedentary.\n' +
      'In contrast, most Assisted Living residents maintain active lifestyles needing only basic daily services such as bathing, mobility assistance, on-site medical care, etc. Allowing seniors to lead active, independent lives while also aiming to make daily life simpler and safer is the primary goal of Assisted Living communities.',
    },
    {
      question: 'Does the VA pay for nursing home care?',
      answer: 'Yes, the VA will pay for nursing home care for qualified Veterans.' },
    {
      question: 'What qualifies a person for a nursing home?',
      answer: 'To qualify for a nursing home, first you have to identify what your care needs are. Since “nursing home” can be defined as many different types of senior care, you need to understand which care offers what kind of care.  For example, a skilled nursing facility offers the most comprehensive round the clock medical care. In contrast, an assisted living facility does not provide medical care, but instead offers professional assistance with the activities of daily living (ADLs).',
    },
  ];

  const TableOfContents = () => {
    return (
      <>
        <Heading level="subtitle" size="subtitle">
          Table of Contents
        </Heading>
        <Paragraph>
          {tocList.map(p => (
            <StyledLink
              href={`#${p.id}`}
              onClick={e => handleAnchor(e, p.ref)}
            >
              {p.title}
            </StyledLink>
        ))}

        </Paragraph>
      </>
    );
  };

  const SEOContentNH = () => {
    return (
      <>
        <StyledArticle>
          <Heading level="title" size="title" ref={nhRef}>
          </Heading>
          <Paragraph>
            Simply put, a nursing home is a place for people who don’t need to be in a hospital, but cannot be taken
            care of at home. Although we often hear the term “nursing home” and think of group homes for
            the elderly, this is not an accurate definition of nursing homes. A nursing home provides
            nursing care for people who need substantial medical care on top of help with daily tasks:
            sometimes facilities that provide this level of medical care are called convalescent homes or S
            killed Nursing Facilities (or SNFs). Most senior communities today, however, offer lighter levels of care,
            since this is all that most seniors need. Often, this lighter level of care is called “assisted living.”
          </Paragraph>
          <Paragraph>
            So although the phrase “nursing home” has become synonymous with senior living in general, when you start
            your search for a home it will be a big help if you understand the most accurate terms for the
            level of care you or your loved one may need. We’ll explain the differences between nursing homes and
            other types of{' '}
            <Link href="https://www.nia.nih.gov/health/residential-facilities-assisted-living-and-nursing-homes" target="_blank" rel="noopener">
              senior living options
            </Link>
            {' '}so that you can get off to a strong start.
          </Paragraph>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" ref={defineRef} >
            Nursing Home Definition
          </Heading>
          <Paragraph>
            If you’ve been searching for the best nursing home near you, there’s a good chance you’ve been mistakenly
            searching for the wrong type of care. The term “nursing home” entered our vocabulary sometime after World War II,
            when physicians realized that patients who needed long-term medical care were better off receiving it
            outside of hospitals. As time went on, we started to associate this phrase with group homes for seniors,
            but we also developed different types of senior communities that addressed a variety of needs,
            not just medical care. Although the public will use “nursing home” when they mean senior living in general,
            few senior communities use the term “nursing home” to describe themselves or the care they provide.
            Before you continue your search for nursing homes, take a look at this guide to learn about types of
            senior care, what they’re called, the services they each offer, and the other care options available
            to seniors that may better meet your needs.

          </Paragraph>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, nhRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title">
            Common Terms for Senior Living Options
          </Heading>
          <Heading level="subtitle" size="subtitle" ref={snfRef} >
            Skilled Nursing Facility (SNF)
          </Heading>
          <Paragraph>
            A{' '}
            <Link href="https://www.seniorly.com/skilled-nursing-faility">skilled nursing facility (SNF)
            </Link>
            {' '} is the only type of care one could technically call a “nursing home,” but few if any SNFs would use
            this term for themselves. An SNF delivers the most extensive care available outside of a hospital. Not
            only can skilled nursing facilities provide help with activities of daily living (ADLs) — such as getting
            dressed, eating, and bathing — unlike assisted living, they also offer skilled nursing care. This care is
            provided by registered nurses and includes medical treatments and monitoring. Skilled care may also include
            services provided by other medical professionals, such as respiratory, occupational, speech, and physical
            therapists. A skilled nursing home is far more comprehensive than what you might have been thinking of when
            you searched for “nursing home near me.”sing home is far more
            than what you might be thinking of when you searched for “nursing home near me.”
          </Paragraph>

        </StyledArticle>
        <StyledArticle>
          <Heading level="subtitle" size="subtitle" ref={ilRef}>
            Independent Living
          </Heading>
          <Paragraph>
            An{' '}
            <Link href="https://www.seniorly.com/independent-living">
              independent living community
            </Link>
            {' '}is a senior living option for active adults that want to live in a community of other seniors while
            still enjoying their independence and privacy. Usually this is a gated community of homes and/or
            apartments available only to those 55 and up. Typically, there is no care offered here, unless it is an
            independent living neighborhood within a{' '}
            <Link href="https://www.seniorly.com/continuing-care-retirement-community">
              Continuing Care Retirement Community (CCRC).
            </Link>
            {' '}If it is a CCRC or Life Plan Community, there will often be care available at the assisted living level
            and even the skilled nursing facility level, so that seniors can age in place there.
          </Paragraph>

        </StyledArticle>
        <StyledArticle>
          <Heading level="subtitle" size="subtitle" ref={alRef}>
            Assisted Living
          </Heading>
          <Paragraph>
            Assisted living is designed for seniors who are still fairly independent, but may require some general assistance with{' '}
            <Link href="https://www.seniorly.com/resources/articles/what-are-the-activities-of-daily-living-adls">
              activities of daily living (ADLs)
            </Link>
            {' '}like preparing food, dressing, and bathing. Often, when someone searches for a “nursing home,”
            they’re thinking of the type of care found in an
            <Link href="https://www.seniorly.com/assisted-living">
              assisted living community.
            </Link>
            {' '}Assisted living is what most seniors require for the longest period as they age.
            In contrast, a skilled nursing facility is designed for individuals who need 24-hour medical care.
          </Paragraph>
          <ADLChart />
        </StyledArticle>

        <StyledArticle>
          <Heading level="subtitle" size="subtitle" ref={mcRef} >
            Memory Care
          </Heading>
          <Paragraph>
            Memory care communities are senior living communities designed and staffed specifically for senior
            residents with Alzheimer’s disease and other dementia-related illnesses. Some{' '}
            <Link href="https://www.seniorly.com/memory-care">
              memory care communities
            </Link>
            {' '}are part of an assisted living facility, or they are stand alone properties. Memory care communities
            will provide all of the ADLs and services provided at the assisted living level as well as a more
            structured environment, established routines, and a higher caregiver-to-resident ratio. These are
            all to help residents with memory and concentration issues be safe and, as importantly, to feel safe.
          </Paragraph>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, nhRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" >
            What Is A Seniorly Local Advisor?
          </Heading>
          <WhatIsPartnerAgent toc="assisted living" agents={agents} />
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" ref={alvssnfRef} >
            Assisted Living vs. Skilled Nursing Facility Services
          </Heading>
          <Paragraph>
            Again, when you think of a “nursing home,” you’re most likely thinking of an assisted living community.
            Skilled nursing facilities, however, are for those who need round-the-clock care, perhaps while recovering
            from illness/injury or surgery, or because they have debilitating physical or mental conditions.
            Here are some features SNFs offer compared to assisted living:
          </Paragraph>


          <StyledTable>
            <thead>
            <tr>
              <th>
                Senior Living Feature
              </th>
              <th>
                Assisted Living
              </th>
              <th>
                Skilled Nursing
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                Assistance with Activities of Daily Living (ADLs)
              </td>
              <td>
                Yes
              </td>
              <td>
                Yes
              </td>
            </tr>
            <tr>
              <td>
                Medication Managements
              </td>
              <td>
                Yes
              </td>
              <td>
                Yes
              </td>
            </tr>
            <tr>
              <td>
                Meals
              </td>
              <td>
                Yes
              </td>
              <td>
                Yes
              </td>
            </tr>
            <tr>
              <td>
                Housekeeping
              </td>
              <td>
                Yes
              </td>
              <td>
                Yes
              </td>
            </tr>
            <tr>
              <td>
                Ongoing palliative and preventative long-term care
              </td>
              <td>
                No
              </td>
              <td>
                Yes
              </td>
            </tr>
            <tr>
              <td>
                Post-hospitalization rehabilitation services
              </td>
              <td>
                No
              </td>
              <td>
                Yes
              </td>
            </tr>
            <tr>
              <td>
                Physical, speech, and occupational therapy services
              </td>
              <td>
                No
              </td>
              <td>
                Yes
              </td>
            </tr>
            </tbody>
          </StyledTable>
          <Paragraph>
            Senior housing has evolved dramatically over the last few decades, and the meaning of “nursing home” has
            changed within the industry, even if the public’s vocabulary hasn’t quite caught up yet. Today, seniors
            have many different options to consider based on their unique wants and needs. Hopefully, this
            article will have opened up the possibilities of other senior living types available to you or your loved one.
            Explore our guides below to dive deeper into senior housing options:

          </Paragraph>
          <ul>
            <li>
              <Link href="https://www.seniorly.com/assisted-living">
                What is Assisted Living
              </Link>
            </li>
            <li>
              <Link href="https://www.seniorly.com/independent-living">
                What is Independent Living
              </Link>
            </li>
            <li>
              <Link href="https://www.seniorly.com/memory-care">
                What is Memory Care
              </Link>
            </li>
            <li>
              <Link href="https://www.seniorly.com/continuing-care-retirement-community">
                What is CCR
              </Link>
            </li>
            <li>
              <Link href="https://www.seniorly.com/in-home-care">
                What is In-Home Care
              </Link>
            </li>
            <li>
              <Link href="https://www.seniorly.com/skilled-nursing-facility">
                What is Skilled Nursing Facility
              </Link>
            </li>
          </ul>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, nhRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledBox background="primary.lighter-90">
          <Heading level="subtitle" size="subtitle">
            Find Assisted Living Near You
          </Heading>
          <Paragraph>
            If you’ve realized you are looking for an assisted living community, type your city or zip code into the box below to see and compare locations:
          </Paragraph>
          <SearchBoxContainer layout="homeHero" onLocationSearch={onLocationSearch} />
        </StyledBox>
        <StyledArticle>
          <Heading level="title" size="title" ref={faqRef} >
            Nursing Home FAQs
          </Heading>
          <Paragraph>
            Below you will find a sampling of the 5 most frequently asked questions we get regarding nursing homes.
          </Paragraph>
          {faqs.map(p => (
            <>
              <Heading level="subtitle" size="subtitle">
                {p.question}
              </Heading>
              <Paragraph>
                {p.answer}
              </Paragraph>
            </>

          ))}
        </StyledArticle>
      </>
    );
  };

  const title = 'What is a Nursing Home?';
  const description = 'Find out how the term “nursing home” has changed over time. Seniorly explains that although many use this phrase, it might not be the type of care you’re looking for.';


  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {faqPage(faqs)}
        {tocSiteNavigationLD('https://www.seniorly.com/nursing-home', tocList)}
        {guideLD(title, description, 'https://www.seniorly.com/nursing-home')}
      </Helmet>
      <HubHeader
        imagePath="react-assets/hub/assisted-living-cover.jpg"
        toc="nursing homes"
        heading="What is a Nursing Home?"
        label="Use our free search to find nursing homes nearby"
        onCurrentLocation={onCurrentLocation}
        onLocationSearch={onLocationSearch}
      />
      <HubPageTemplate>
        <Wrapper>
          <TwoColumn>
            <Column>
              <StickToTop>
                {TableOfContents()}
              </StickToTop>
            </Column>
            <Body>
              {SEOContentNH()}
            </Body>
          </TwoColumn>
        </Wrapper>
      </HubPageTemplate>
      <PhoneCTAFooter />
      <Footer />
    </>
  );
};

NearMePage.propTypes = {
  onLocationSearch: func,
  handleAnchor: func,
};

export default NearMePage;
