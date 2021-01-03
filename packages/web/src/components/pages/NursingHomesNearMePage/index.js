import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';

import { size } from 'sly/common/components/themes';
import ListItem from 'sly/web/components/molecules/ListItem';
import HubHeader from 'sly/web/components/molecules/HubHeader';
import WhatIsPartnerAgent from 'sly/web/components/molecules/WhatIsPartnerAgent';
import PhoneCTAFooter from 'sly/web/components/molecules/PhoneCTAFooter';
import ADLChart from 'sly/web/components/molecules/ADLChart';
import { faqPage, tocSiteNavigationLD, guideLD } from 'sly/web/services/helpers/html_headers';
import { getStateAbbr } from 'sly/web/services/helpers/url';
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
import { Heading, Paragraph, Link } from 'sly/common/components/atoms';
import Footer from 'sly/web/components/organisms/Footer';
import { getTocSeoLabel } from 'sly/web/components/search/helpers';
import CommunitySearchList from 'sly/web/components/organisms/CommunitySearchList';

const StyledLink = styled(Link)`
  margin-bottom: ${size('spacing.large')};
  display: block;
`;

const TwoColumn = makeTwoColumn('div');
const Body = makeBody('div');
const Column = makeColumn('aside');
const Wrapper = makeWrapper('div');
const StickToTop = makeStickToTop('div');
const StyledArticle = makeArticle('article');
const StyledTable = makeTable('table');
const ListWrapper = makeOneColumnListWrapper('div');

const NearMePage = ({
  onLocationSearch,
  searchParams,
  requestMeta,
  communityList,
  isFetchingResults,
  handleAnchor,
  location,
  onCurrentLocation,
}) => {
  const { geo } = requestMeta;
  const city = geo && geo.city;
  const state = geo && geo.state;
  const tocLabel = getTocSeoLabel('nursing-homes');

  const nhRef = React.createRef();
  const servicesRef = React.createRef();
  const payingRef = React.createRef();
  const howRef = React.createRef();
  const snfRef = React.createRef();
  const ilRef = React.createRef();
  const alRef = React.createRef();
  const mcRef = React.createRef();
  const bncRef = React.createRef();
  const hospiceRef = React.createRef();
  const faqRef = React.createRef();


  const tocList = [
    {
      title: 'How to Find the Best Nursing Home Near Me',
      id: 'what-is-nursing-home',
      ref: nhRef,
    },
    {
      title: 'What Services are Offered by Nursing Homes Near Me?',
      id: 'services',
      ref: servicesRef,
    },
    {
      title: 'Paying for a Nursing Home',
      id: 'paying',
      ref: payingRef,
    },
    {
      title: 'Choosing a Nursing Home',
      id: 'how',
      ref: howRef,
    },
    {
      title: 'What Type of Care is Offered at a Skilled Nursing Facility?',
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
      title: 'Board and Care Home',
      id: 'board-and-care-home',
      ref: bncRef,
    },
    {
      title: 'Hospice',
      id: 'hospice',
      ref: hospiceRef,
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
            How to Find the Best Nursing Home Near Me
          </Heading>
          <Paragraph>
            If you’ve been searching for the best nursing home near you, there’s a good chance you’ve been mistakenly
            searching for the wrong type of care. Most people simply type in the phrase “nursing home”
            when they’re looking for any kind of{' '}
            <Link href="https://www.nia.nih.gov/health/residential-facilities-assisted-living-and-nursing-homes" target="_blank" rel="noopener">
              senior living options
            </Link>
            {' '}for a loved one.
          </Paragraph>
          <Paragraph>
            Today, senior housing has evolved dramatically, and it’s possible to find many different levels of
            care for an aging parent or loved one, from{' '}
            <Link href="https://www.seniorly.com/assisted-living">
              assisted living facilities
            </Link>
            {' '}to skilled nursing facilities
            (which are not the same as what people used to call a ‘nursing home’) to hospice. It can be confusing.
            Not sure what type of care you’re really looking for? Read on.
          </Paragraph>
          <Paragraph>
            Before you continue your search for nursing homes near you, we’ve put together this guide that will
            help you learn more about the various kinds of senior living options, the services they each offer,
            and the other care options available for senior residents that may better meet your needs.
          </Paragraph>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, nhRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" ref={servicesRef} >
            What Services are Offered by Nursing Homes Near Me?
          </Heading>
          <Paragraph>
            Some of the services generally available at any care type that falls under ‘nursing home’ include:
          </Paragraph>
          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Medication monitoring and administration
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              24-hour emergency care
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Room
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Recreational and social activities
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Assistance with ADLs such as toilet assistance, bathing, and dressing
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Three meals a day
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Rehabilitation services
            </ListItem>
          </ListWrapper>

          <Paragraph>
            Do your own nursing home comparison, and you’ll quickly find that you might have really meant something else,
            like the care type called{' '}
            <Link href="https://www.seniorly.com/assisted-living">‘assisted living,’</Link>
            {' '}and the services provided across a single care type can vary
            from place to place. Before we get into a comparison, let’s explore how to pay for a nursing home.

          </Paragraph>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, nhRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" ref={payingRef}>
            Paying for a Nursing Home
          </Heading>
          <Paragraph>
            So, you’ve found a senior living property that you believe is a great nursing home near you.
            How much does it cost?  What are the payment options?  It’s possible to pay for so-called nursing homes in
            several different ways depending on which senior living option you are considering.  As you  evaluate your
            options, it’s essential to ask a senior living expert or the property management what payment options are
            accepted. Some of the most common financing options include:
          </Paragraph>
          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              <Paragraph>
                <strong>
                  Private Pay
                </strong>
                {' '}- this is going to be the most common form of payment accepted for assisted living facilities,
                memory care communities, respite care and independent living options. According to{' '}
                <Link href="https://www.genworth.com/aging-and-you/finances/cost-of-care.html" target="_blank" rel="noopener">
                  Genworth
                </Link>
                , in 2019 the average cost for assisted living in the United States was $4,051 per month.
              </Paragraph>
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              <Paragraph>
                <strong>
                  <Link href="https://www.medicaid.gov/" target="_blank" rel="noopener">
                    Medicaid
                  </Link>
                </strong>
                {' '}– This is only available at skilled nursing facilities near you. However, if you’ve been
                looking for nursing homes near you that take Medicaid, you’ll find that while this type of care can
                be covered through Medicaid, requirements and covered services can vary significantly between states.
                Most people have to spend all assets first before Medicaid pays.
              </Paragraph>
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              <Paragraph>
                <strong>
                  <Link href="https://www.medicare.gov/index" target="_blank" rel="noopener">
                    Medicare
                  </Link>
                </strong>
                {' '}- Medicare provides health care benefits for Americans over the age of 65, and it does pay for
                some skilled nursing facility care. Medicare will only pay if a senior resident requires skilled nursing
                care and has been referred by a physician after discharge from a hospital, and only 100 days of
                skilled nursing care are offered per year.
              </Paragraph>
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              <Paragraph>
                <strong>
                  Private Long-Term Care Insurance
                </strong>
                {' '}– This option can supplement Medicare coverage, although the amount
                they’ll pay for senior living of any kind varies from policy to policy.
              </Paragraph>
            </ListItem>
          </ListWrapper>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, nhRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" ref={howRef}>
            Choosing a Nursing Home: Your Nursing Home Comparison Checklist
          </Heading>
          <Paragraph>
            As you’re looking for nursing homes near you, and you determine the actual care type you really need (ie.{' '}
            <Link href="https://www.seniorly.com/assisted-living">
              assisted living
            </Link>
            {' '}or skilled nursing facility) the following checklist can help you compare local options so you can{' '}
            <Link href="https://www.nia.nih.gov/health/choosing-nursing-home" target="_blank" rel="noopener">
              determine the right fit
            </Link>
            {' '}for you or your loved one.
          </Paragraph>
          <ul>
            <li>
              <Paragraph>
                Does the facility meet state and/or local licensing requirements?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Does it provide the correct level of care?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                What is the community’s procedure for dealing with a medical emergency
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Does the administrator have a current license?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Are there specific visiting hours?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                What are the requirements for admissions?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Does the senior living facility have a waiting period prior to admittance?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                What financing options are accepted by the facility?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Are the fees charged reasonable and competitive?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Are different costs assessed for various categories or levels of services?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Does the senior living facility reveal which services will cost extra?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Do administrators, social workers, and nurses have geriatric education and experience?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                How do staff members treat senior residents?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Do current senior residents appear comfortable and happy?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Are you satisfied with the appearance of the building inside and out?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Are single occupancy rooms available?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                What can senior residents bring?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Are recreational and social activities available?
              </Paragraph>
            </li>
          </ul>
          <Paragraph>
            In addition to this list, we can connect you to a{' '}
            <Link href="https://www.seniorly.com/agents">Seniorly Local Advisor</Link>
            {' '}in almost any city
            in the United States.  These are senior housing experts who can assist you through every step of the process,
            from touring to negotiating rent to moving.  Their services are 100% free.  If you would like their assistance,
            call us at (855) 866-4515 or email us at {' '}
            <Link href="mailto:ask@seniorly.com">
              ask@seniorly.com.
            </Link>
          </Paragraph>
          <WhatIsPartnerAgent toc="nursing homes" agents={agents} />
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, nhRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" ref={snfRef} >
            What Type of Care is Offered at a Skilled Nursing Facility?
          </Heading>
          <Paragraph>
            A{' '}
            <Link href="https://www.seniorly.com/skilled-nursing-faility">skilled nursing facility (SNF)
            </Link>
            {' '}is a type of nursing home that delivers the most extensive care available outside of a hospital.
            Not only can skilled nursing facilities provide help with{' '}
            <Link href="https://www.seniorly.com/resources/articles/what-are-the-activities-of-daily-living-adls">
              activities of daily living (ADLs)
            </Link>
            {' '}– such as getting dressed, eating, and bathing – unlike{' '}
            <Link href="https://www.seniorly.com/assisted-living">
              assisted living
            </Link>
            , they also offer skilled nursing care. This care is provided by registered nurses and includes medical
            treatments and monitoring. Skilled care may also include services provided by other medical professionals,
            such as respiratory, occupational, speech and physical therapists. A skilled nursing home is far more
            than what you might be thinking of when you searched for “nursing home near me.”

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
            Features of Other Senior Living Options
          </Heading>
        </StyledArticle>
        <StyledArticle>
          <Heading level="subtitle" size="subtitle" ref={ilRef}>
            Independent Living
          </Heading>
          <Paragraph>
            While a nursing home offers residential care for seniors requiring full-time medical care and monitoring,
            an{' '}
            <Link href="https://www.seniorly.com/independent-living">
              independent living community
            </Link>
            {' '}is a senior living option for active adults that want to live in a community
            while still enjoying their independence and privacy. Typically, there is no care offered here, unless it is a{' '}
            <Link href="https://www.seniorly.com/continuing-care-retirement-community">
              Continuing Care Retirement Community (CCRC).
            </Link>
            {' '}If it is a CCRC or Life Plan Community, there will often be care
            available at the assisted living level and even the skilled nursing facility level.
          </Paragraph>

          <StyledArticle>
            <StyledTable>
              <thead>
                <tr>
                  <th>
                    Senior Living Feature
                  </th>
                  <th>
                    Availability
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Assistance with Activities of Daily Living (ADLs)
                  </td>
                  <td>
                    No
                  </td>
                </tr>
                <tr>
                  <td>
                    Medication Management
                  </td>
                  <td>
                    No
                  </td>
                </tr>
                <tr>
                  <td>
                    Skilled nursing
                  </td>
                  <td>
                    No
                  </td>
                </tr>
                <tr>
                  <td>
                    Recreational activities
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
                </tr>
                <tr>
                  <td>
                    Housekeeping
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Non-medical Transportation
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Common social areas
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Covered by Medicare
                  </td>
                  <td>
                    No
                  </td>
                </tr>
                <tr>
                  <td>
                    Private Living Available
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
              </tbody>
            </StyledTable>
          </StyledArticle>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, nhRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="subtitle" size="subtitle" ref={alRef}>
            Assisted Living
          </Heading>
          <Paragraph>
            Many individuals search for a ‘nursing home near me’ when they’re really searching for an{' '}
            <Link href="https://www.seniorly.com/assisted-living">
              assisted living community.
            </Link>
            {' '}Assisted living facilities can be thought of as a combination of independent living and nursing combined,
            but without medical care.  They were created for seniors who are still fairly independent, although they
            may require some general assistance with activities of daily living (ADLs) like preparing food, dressing,
            and bathing. On the other hand, a nursing home like a skilled nursing facility is designed for individuals
            who need 24-hour medical care.
          </Paragraph>
          <StyledArticle>
            <StyledTable>
              <thead>
                <tr>
                  <th>
                    Senior Living Feature
                  </th>
                  <th>
                    Availability
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
                </tr>
                <tr>
                  <td>
                    Medication Management
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Skilled nursing
                  </td>
                  <td>
                    Not usually
                  </td>
                </tr>
                <tr>
                  <td>
                    Recreational activities
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
                </tr>
                <tr>
                  <td>
                    Housekeeping
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Non-medical Transportation
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Common social areas
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Covered by Medicare
                  </td>
                  <td>
                    No
                  </td>
                </tr>
                <tr>
                  <td>
                    Private Living Available
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
              </tbody>
            </StyledTable>
          </StyledArticle>
          <ADLChart />
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, nhRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="subtitle" size="subtitle" ref={mcRef} >
            Memory Care
          </Heading>
          <Paragraph>
            Memory Care is a senior living community that is purpose built and staff trained for senior
            residents with Alzheimer’s disease and many other dementia related illnesses.Some{' '}
            <Link href="https://www.seniorly.com/memory-care">
              memory care communities
            </Link>
            {' '}are part of an assisted living facility, or they are stand alone properties.
          </Paragraph>
          <StyledArticle>
            <StyledTable>
              <thead>
                <tr>
                  <th>
                    Senior Living Feature
                  </th>
                  <th>
                    Availability
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
                </tr>
                <tr>
                  <td>
                    Medication Management
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Skilled nursing
                  </td>
                  <td>
                    No, but staff specializes in dementia related illnesses
                  </td>
                </tr>
                <tr>
                  <td>
                    Recreational activities
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
                </tr>
                <tr>
                  <td>
                    Housekeeping
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Non-medical Transportation
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Common social areas
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Covered by Medicare
                  </td>
                  <td>
                    No
                  </td>
                </tr>
                <tr>
                  <td>
                    Private Living Available
                  </td>
                  <td>
                    Not Usually
                  </td>
                </tr>
              </tbody>
            </StyledTable>
          </StyledArticle>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, nhRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="subtitle" size="subtitle" ref={bncRef} >
            Board and Care Home
          </Heading>
          <Paragraph>
            <Link href="https://www.seniorly.com/board-and-care-home">
              A board and care home,
            </Link>
            {' '}also known as a residential care home, is a unique kind of senior living
            community because it’s main feature is how intimate the living experience is. These are often single family
            homes in a residential neighborhood that have been specially fitted and licensed to provide the necessary care
            for the senior residents.  The resident to caregiver ratio is usually 4:1, which can be much more appealing.
            Also, the cost of a board and care home is usually less than the larger nursing home type of communities.
            Care can be non-medical, like assistance with the activities of daily living (ADLs), but it can also
            include options for memory care.
          </Paragraph>
          <StyledArticle>
            <StyledTable>
              <thead>
                <tr>
                  <th>
                    Senior Living Feature
                  </th>
                  <th>
                    Availability
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
                </tr>
                <tr>
                  <td>
                    Medication Management
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Skilled nursing
                  </td>
                  <td>
                    No
                  </td>
                </tr>
                <tr>
                  <td>
                    Recreational activities
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
                </tr>
                <tr>
                  <td>
                    Housekeeping
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Non-medical Transportation
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Common social areas
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Covered by Medicare
                  </td>
                  <td>
                    No
                  </td>
                </tr>
                <tr>
                  <td>
                    Private Living Available
                  </td>
                  <td>
                    Depends on the layout of the property
                  </td>
                </tr>
              </tbody>
            </StyledTable>
          </StyledArticle>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, nhRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="subtitle" size="subtitle" ref={hospiceRef}>
            Hospice
          </Heading>
          <Paragraph>
            Although some nursing homes will offer hospice care, most seniors arrive after a hospital stay or when they
            require more care than is available in an assisted living community. While individuals may have some limiting
            health conditions, residents generally are not “terminal.”{' '}
            <Link href="https://hospicefoundation.org/End-of-Life-Support-and-Resources/Coping-with-Terminal-Illness/Hospice-Services" target="_blank" rel="noopener">
              Hospice care
            </Link>
            {' '}is usually for individuals who have a
            disease or illness that will prove fatal within the next six months. The main objective at
            hospice is to maintain comfort during this phase.

          </Paragraph>
          <StyledArticle>
            <StyledTable>
              <thead>
                <tr>
                  <th>
                    Senior Living Feature
                  </th>
                  <th>
                    Availability
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
                </tr>
                <tr>
                  <td>
                    Medication Management
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Skilled nursing
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Recreational activities
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
                </tr>
                <tr>
                  <td>
                    Housekeeping
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Non-medical Transportation
                  </td>
                  <td>
                    No
                  </td>
                </tr>
                <tr>
                  <td>
                    Common social areas
                  </td>
                  <td>
                    Yes
                  </td>
                </tr>
                <tr>
                  <td>
                    Covered by Medicare
                  </td>
                  <td>
                    No
                  </td>
                </tr>
                <tr>
                  <td>
                    Private Living Available
                  </td>
                  <td>
                    Depends on hospice layout
                  </td>
                </tr>
              </tbody>
            </StyledTable>
          </StyledArticle>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, nhRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Paragraph>
            Senior housing has evolved dramatically, and today senior residents have many different options to consider
            based on their unique wants and needs. Hopefully, this article will have opened up the possibilities of other
            senior living types available to you or your loved one.  Click on any of these links below to dive deeper into
            senior housing:
          </Paragraph>
          <ul>
            <li>
              <Link href="https://www.seniorly.com/assisted-living">
                Assisted Living Near Me
              </Link>
            </li>
            <li>
              <Link href="https://www.seniorly.com/independent-living">
                Independent Living Near Me
              </Link>
            </li>
            <li>
              <Link href="https://www.seniorly.com/memory-care">
                Memory Care Near Me
              </Link>
            </li>
            <li>
              <Link href="https://www.seniorly.com/continuing-care-retirement-community">
                CCRC Near Me
              </Link>
            </li>
            <li>
              <Link href="https://www.seniorly.com/in-home-care">
                Home Care Near Me
              </Link>
            </li>
            <li>
              <Link href="https://www.seniorly.com/skilled-nursing-facility">
                Skilled Nursing Facility Near Me
              </Link>
            </li>
          </ul>
        </StyledArticle>
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

  const title = 'Find the Best Nursing Home Near You ';
  const description = 'Search nursing homes near you that range from assisted living facilities, memory care communities and other senior living options. Compare cost, property highlights and more.';
  const heading = state ? `${tocLabel} near ${city}, ${getStateAbbr(state)}` : `${tocLabel} near ${city}`;


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
        heading="What is Nursing Home Near You?"
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
              <Heading level="title" size="title">
                {heading}
              </Heading>
              {isFetchingResults && <Heading level="hero" size="title">loading...</Heading>}
              {!isFetchingResults && (
              <CommunitySearchList
                communityList={communityList}
                searchParams={searchParams}
                requestMeta={requestMeta}
                location={location}
              />
            )}
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
  communityList: array.isRequired,
  requestMeta: object.isRequired,
  searchParams: object,
  isFetchingResults: bool,
  handleAnchor: func,
  location: object.isRequired,
};

export default NearMePage;
