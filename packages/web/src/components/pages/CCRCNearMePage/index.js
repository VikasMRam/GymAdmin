import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';

import { size } from 'sly/common/components/themes';
import ListItem from 'sly/web/components/molecules/ListItem';
import HubHeader from 'sly/web/components/molecules/HubHeader';
import WhatIsPartnerAgent from 'sly/web/components/molecules/WhatIsPartnerAgent';
import PhoneCTAFooter from 'sly/web/components/molecules/PhoneCTAFooter';
import NextSteps from 'sly/web/components/molecules/NextSteps';
import ADLChart from 'sly/web/components/molecules/ADLChart';
import { faqPage, tocSiteNavigationLD, guideLD } from 'sly/web/services/helpers/html_headers';
import HowSlyWorksVideoContainer from 'sly/web/containers/HowSlyWorksVideoContainer'
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

const CCRCNearMePage = ({
  onLocationSearch,
  searchParams,
  requestMeta,
  communityList,
  isFetchingResults,
  handleAnchor,
  location,
  onCurrentLocation,
}) => {
  const listSize = requestMeta['filtered-count'];
  const { geo } = requestMeta;
  const city = geo && geo.city;
  const state = geo && geo.state;
  const tocLabel = getTocSeoLabel('continuing-care-retirement-community');


  const ccrcRef = React.createRef();
  const proconRef = React.createRef();
  const careRef = React.createRef();
  const costRef = React.createRef();
  const ccrcvsalRef = React.createRef();
  const ccrcvshcRef = React.createRef();
  const chooseRef = React.createRef();
  const faqRef = React.createRef();
  const nextRef = React.createRef();
  const nearRef = React.createRef();

  const tocList = [
    {
      title: "What is a Continuing Care Retirement Community (CCRC)?",
      id: "what-is-ccrc",
      ref: ccrcRef
    },
    {
      title: "The Pros and Cons of Senior Living in a CCRC",
      id: "pro-vs-con",
      ref: proconRef
    },
    {
      title: "Common Levels of Care in a CCRC",
      id: "level-of-care",
      ref: careRef
    },
    {
      title: "What is the Cost of a CCRC?",
      id: "cost",
      ref: costRef
    },
    {
      title: "CCRC vs. Assisted Living",
      id: "ccrc-vs-al",
      ref: ccrcvsalRef
    },
    {
      title: "CCRC vs. Home Care",
      id: "ccrc-vs-hc",
      ref: ccrcvshcRef
    },
    {
      title: "Is a CCRC Right for Me or My Loved One?",
      id: "choosing-ccrc",
      ref: chooseRef
    },
    {
      title: "CCRC FAQs",
      id: "frequently-asked-question",
      ref: faqRef

    },
    {
      title: "Next Steps",
      id: "next",
      ref: nextRef
    },
    {
      title: "Browse CCRC Near You",
      id: "near",
      ref: nearRef
    },

  ];

  const nextSteps = [
    {title: "Evaluating a Continuing Care Retirement Community", to:"https://www.seniorly.com/continuing-care-retirement-community/articles/evaluating-a-continuing-care-retirement-community-ccrc"},
    {title: "Understanding the Cost of a Continuing Care Retirement Community", to:"https://www.seniorly.com/continuing-care-retirement-community/articles/understanding-the-costs-of-a-continuing-care-retirement-communities-ccrc"},
    {title: "Frequently Asked Questions About a Continuing Care Retirement Community", to:"https://www.seniorly.com/continuing-care-retirement-community/articles/seniorly-continuing-care-retirement-community-ccrc-faqs"},
  ];

  const agents = [
    {
      title: "Heather Williams-Shelly - Orange County, CA",
      to: "https://www.seniorly.com/agents/pacific-west/santa-ana-ca/about-senior-living-ca-heather-williams-shelly-",
      asset: "images/hub/agents/HeatherOC.png",
      caption: "Heather Williams-Shelly has over 11 years of experience helping families find independent living, assisted living, and memory care options. She understands the challenges families face when making the decision to transition a loved one to a new home, and is dedicated to provide a compassionate service.",
      first: "Heather"
    },
    {
      title: "Mark & Karen Wolff - Sacramento, CA",
      to: "https://www.seniorly.com/agents/pacific-west/rocklin-ca/senior-care-authority-sacramento-ca-mark-and-karyn-wolff-",
      asset: "images/hub/agents/Mark-Karen.png",
      caption: "Mark Wolff has over 3 years of experience helping families finding senior living options from independent living, assisted living, board and care homes and memory care. He is dedicated to guiding families throughout the senior living process.",
      first: "Mark and Karen"
    },
    {
      title: "Kim Bertolino - Long Island, NY",
      to: "https://www.seniorly.com/agents/northeast/mastic-beach-ny/oasis-senior-advisors-long-island-ny-kim-bertolino-",
      asset: "images/hub/agents/Kim.png",
      caption: "Kim Bertolino has over a year of experience helping families find independent living, assisted living, and memory care options. She is a certified senior advisor, and is dedicated to guiding families throughout the senior living process.",
      first: "Kim"
    },
  ];

  const faqs = [
    {
      question: "What is a continuing care retirement community?",
      answer: "Many people mistakenly believe that a continuing care retirement community (CCRC) is interchangeable with an assisted living community or a nursing home. However, CCRCs actually get their name from the concept that they offer residents a continuum of care over time. These communities provide a full range of health care, housing, and residential services to meet the needs of residents as they change over time. CCRCs usually include three main stages of care, including independent living, assisted living, and skilled nursing care. While residents may only need limited services when they enter the community, they have the option of receiving a higher level of care if needed."
    },
    {
      question: "How do you choose a continuing care retirement community?",
      answer: "The earlier you begin considering a CCRC the better. These communities are designed for seniors who are healthy and active enough to live independent, full lives. Most CCRCs offer premium recreational activities and amenities tailored to the desires of active seniors. Since these communities make it possible to move seamlessly from one kind of care to the next, it’s a flexible, comprehensive type of senior care that is a perfect option for seniors who want to enjoy their golden years without worrying about big moves or home and grounds maintenance in the future."
    },
    {
      question: "What is included in continuing care retirement communities?",
      answer: "A continuing care retirement community is designed to offer multiple levels of senior care as its needed, so CCRCs offer a wide range of services. Services range from assisted living and independent living to memory care and skilled nursing. Services and amenities vary from community to community, and certain services may require you to pay additional fees. Some of the services and amenities often included at CCRCs include dining services, housekeeping, utilities, local transportation, a fitness center, laundry services, educational opportunities, and so much more."
    },
    {
      question: "What is the cost of living at a CCRC?",
      answer: "According to the AARP, CCRCs are the most expensive long-term-care options available and they require both significant entrance fees and monthly charges. Entrance fees may range between $100,000 and $1 million, and this upfront sum prepays for your care and also gives the community the money it needs to operate.\n"+
        "Monthly charges for living in a CCRC range between $3,000 and $5,000, although these fees vary based upon the services and amenities you have, your health when entering the community, and the type of housing you choose.\n"+
        "Before choosing a CCRC, it’s always important to learn about the community’s entrance fees, monthly charges, and what’s covered in the fees you pay, since it’s possible for fees to increase as needs change. Learn more about the cost of living in a CCRC and the types of contracts you have to choose from before making your decision."
    },
    {
      question: "Are Pets Allowed in a CCRC?",
      answer: "Pets can be very therapeutic for seniors, and many CCRCs are happy to welcome them into the community. However, some communities may have restrictions on pet size, breed, and type, so ask about their policy if you want to bring your pet along with you. You may be required to pay additional deposits or fees, as well."
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
    )
  };

  const SEOContent = () => (
    <>
      <StyledArticle>
        <Heading level="title" size="title" ref={ccrcRef} >
          What is a Continuing Care Retirement Community (CCRC)?
        </Heading>
        <Paragraph>
          A CCRC (continuing care retirement community), also known as a Life Plan Community,
          combines accommodations for{' '}
          <Link href="https://www.seniorly.com/independent-living">
            independent living
          </Link>
          ,{' '}
          <Link href="https://www.seniorly.com/assisted-living">
            assisted living
          </Link>
          , and 24/7{' '}
          <Link href="https://www.seniorly.com/skilled-nursing-facility">
            skilled nursing facility
          </Link>
          {' '}care into one property, providing seniors with the ability to age in place.
        </Paragraph>
        <Paragraph>
          According to{' '}
          <Link href="https://longtermcare.acl.gov/where-you-live-matters/living-in-a-facility/continuing-care-retirement-communities.html">
            LongTermCare.gov
          </Link>
          , joining a CCRC as an active adult makes it easier for aging adults to obtain long-term care
          services. It’s possible to become a resident of a CCRC as an independent, active adult
          when you can enjoy being a part of the independent living community.
        </Paragraph>
        <Paragraph>
          As your needs change, you have the option to move on to assisted living or to an on-site
          skilled nursing facility if you require the next level of care. However, you still remain a
          part of the same community, something that many seniors find very important.
        </Paragraph>

        <Link
          href={`#${tocList[0].id}`}
          onClick={e => handleAnchor(e, ccrcRef)}
        >
          Back to top
        </Link>
      </StyledArticle>
      <StyledArticle>
        <Heading level="title" size="title" ref={proconRef}>
          The Pros and Cons of Senior Living in a CCRC
        </Heading>
        <Paragraph>
          Although this style of senior housing comes with many benefits, there are some potential
          challenges that may mean it’s not an option for everyone. Before deciding a CCRC is right for
          your needs, it’s a good idea to look more closely at the{' '}
          <Link href="https://www.usatoday.com/story/money/columnist/powell/2014/10/18/continuing-care-independent-living-assisted-living-powell/17447609/">
            pros and cons
          </Link>
          {' '}of living in a continuing care retirement community.

        </Paragraph>

        <Heading level="subtitle" size="subtitle">
          The Pros
        </Heading>
        <ListWrapper>
          <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
            Social network and support from people with shared interests
          </ListItem>
          <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
            All-inclusive maintenance-free living. Amenities vary, but often include:
          </ListItem>
          <ul>
            <li>
              Transportation
            </li>
            <li>
              Social activities
            </li>
            <li>
              Gardening
            </li>
            <li>
              Meals
            </li>
            <li>
              Health monitoring services and health care centers
            </li>
            <li>
              Housekeeping
            </li>
            <li>
              Snow removal
            </li>
            <li>
              Garbage removal
            </li>
            <li>
              Lawn care
            </li>
            <li>
              Security
            </li>
            <li>
              Emergency call monitoring
            </li>
            <li>
              Utilities
            </li>
            <li>
              Fitness centers
            </li>
            <li>
              Lifelong learning programs
            </li>
          </ul>
          <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
            Independent living
          </ListItem>
          <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
            Easy access to medical services
          </ListItem>
          <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
            Flexibility for spouses or partners who have differing care and medical needs
          </ListItem>
          <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
            Peace of mind for families that family members are living a healthy, active life while being well cared for
          </ListItem>
        </ListWrapper>

        <Heading level="subtitle" size="subtitle">
          The Cons
        </Heading>
        <ListWrapper>
          <ListItem icon="close" iconPalette="danger" iconVariation="dark">
            Many seniors don’t like showing the signs of aging and find it difficult to move on to other levels of care when needed
          </ListItem>
          <ListItem icon="close" iconPalette="danger" iconVariation="dark">
            Getting adjusted to a new lifestyle in a new place
          </ListItem>
          <ListItem icon="close" iconPalette="danger" iconVariation="dark">
            Stress that comes with making the big decision of going with a CCRC
          </ListItem>
          <ListItem icon="close" iconPalette="danger" iconVariation="dark">
            The potential for financial risk and burden
          </ListItem>
          <ListItem icon="close" iconPalette="danger" iconVariation="dark">
            High cost, entry fee, which can be problematic for older adults on a fixed income
          </ListItem>
          <ListItem icon="close" iconPalette="danger" iconVariation="dark">
            The potential for dissatisfaction with amenities and services in the future
          </ListItem>
        </ListWrapper>


        <Link
          href={`#${tocList[0].id}`}
          onClick={e => handleAnchor(e, ccrcRef)}
        >
          Back to top
        </Link>
      </StyledArticle>
      <StyledArticle>
        <Heading level="title" size="title" ref={careRef} >
          Common Levels of Care in a CCRC
        </Heading>
        <Paragraph>
          Because CCRCs offer various levels of care in a single community, it’s possible for these
          communities to meet your needs over time, even as they change. Three of the{' '}
          <Link href="https://aspe.hhs.gov/basic-report/continuing-care-retirement-communities-background-and-summary-current-issues#ccrchttps://aspe.hhs.gov/basic-report/continuing-care-retirement-communities-background-and-summary-current-issues#ccrc">
            common levels of care offered
          </Link>
          {' '}in a CCRC include:
        </Paragraph>
        <ul>
          <li>
            <Link href="https://www.seniorly.com/independent-living">
              Independent Living
            </Link>
            {' '}– Most residents begin their stay at a CCRC when they are still independent,
            active adults. Residents have freedom and apartment-style accommodations with a
            variety of residential services available to make life easier.
          </li>
          <li>
            <Link href="https://www.seniorly.com/assisted-living">
              Assisted Living
            </Link>
            {' '}– Many CCRCs offer assisted living services, which may include{' '}
            <Link href="https://www.seniorly.com/memory-care">
              memory care
            </Link>
            {' '}if needed, as a step between independent living and skilled nursing care.
            Residents enjoy having the assistance they need with daily living activities
            without 24/7 nursing.
          </li>
          <li>
            <Link href="https://www.seniorly.com/skilled-nursing-facility">
              Skilled Nursing Facility
            </Link>
            {' '}– Both short-term and long-term skilled nursing care may be offered at a CCRC,
            including round-the-clock nursing services or rehabilitative care. In some cases, a
            move to this type of care may only be temporary.
          </li>
        </ul>
        <Paragraph>
          Many residents find that they don’t want to leave their established home within a CCRC when
          their care needs change. Instead of residents moving to a different area of campus for
          memory care or for assisted living, many senior residents choose to go with private in-home care.
        </Paragraph>
        <Paragraph>
          As many CCRCs begin to recognize this trend among aging adults, they are offering residents to
          enter at different levels of care instead of only allowing residents to enter first as part of
          the independent living community. For this reason, it’s essential to find out what every CCRC
          requires for entry.

        </Paragraph>
        <Link
          href={`#${tocList[0].id}`}
          onClick={e => handleAnchor(e, ccrcRef)}
        >
          Back to top
        </Link>
      </StyledArticle>
      <StyledArticle>
        <Heading level="title" size="title" >
          What Is A Local Senior Living Expert?
        </Heading>
        <WhatIsPartnerAgent toc="CCRC" agents={agents}/>
      </StyledArticle>
      <StyledArticle>
        <Heading level="title" size="title" ref={costRef}>
          What Is The Cost of a CCRC?
        </Heading>
        <Paragraph>
          A continuing care retirement community is{' '}
          <Link href="http://time.com/money/4579934/continuing-care-retirement-communities-cost/">
            the most expensive long-term-care option
          </Link>
          {' '}available. Living in a CCRC requires an entrance fee and monthly charges for residents.{' '}
          <Link href="https://www.aarp.org/caregiving/basics/info-2017/continuing-care-retirement-communities.html">
            Entrance fees
          </Link>
          {' '}range between $100,000 and $1 million, while monthly charges generally range
          between $3,000 and $5,000.
        </Paragraph>
        <Paragraph>
          Entrance fees prepay for care and offer facilities the money they need to operate.
          Monthly fees vary based upon different factors, including the type of housing chosen,
          renting vs buying, the type of service contract, and your health.
        </Paragraph>
        <Paragraph>
          Additional fees may be charged for additional services, such as meal services,
          transportation, housekeeping, and social activities. Several different types of
          contracts are used for CCRC residents. It’s always important to review the CCRC contract
          carefully and get legal advice before signing.
        </Paragraph>
        <Link
          href={`#${tocList[0].id}`}
          onClick={e => handleAnchor(e, ccrcRef)}
        >
          Back to top
        </Link>
      </StyledArticle>
      <StyledArticle>
        <Heading level="title" size="title" ref={ccrcvsalRef} >
          CCRC vs. Assisted Living
        </Heading>

        <Paragraph>
          While CCRCs typically offer independent living, assisted living, skilled nursing, and
          memory care on one campus with a variety of other amenities, assisted living communities only
          offer assisted living services. Specifically, the quality of care is focused on providing
          assistance for the{' '}
          <Link href="https://www.seniorly.com/resources/articles/what-are-the-activities-of-daily-living-adls">
            Activities of Daily Living (ADLs).
          </Link>
          ADLs include eating, personal care, incontinence care, mobility assistance, medication monitoring.
          Other services provided in assisted living include laundry, housekeeping, and minor health care
          services.
          <ADLChart/>
          CCRCs require an entrance fee (ranging between $100,000-$1 million) and monthly
          charges (range between $3,000-$5,000).  Stand alone assisted living communities are often
          less expensive.  However, costs vary based on the type of accommodations and level of service.

        </Paragraph>

        <StyledTable>
          <thead>
          <tr>
            <th>
            </th>
            <th>
              CCRC
            </th>
            <th>
              Assisted Living
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              All inclusive
            </td>
            <td>
              Yes
            </td>
            <td>
              Sometimes
            </td>
          </tr>
          <tr>
            <td>
              Social activities
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
              Assistance with daily living
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
              Live at home with loved ones
            </td>
            <td>
              Yes
            </td>
            <td>
              No
            </td>
          </tr>
          <tr>
            <td>
              Transportation assistance
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
              24-hr supervision available
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
              On-site healthcare
            </td>
            <td>
              Yes
            </td>
            <td>
              Limited
            </td>
          </tr>
          <tr>
            <td>
              Multiple levels of care
            </td>
            <td>
              Yes
            </td>
            <td>
              No
            </td>
          </tr>
          <tr>
            <td>
              Paid for by Medicare
            </td>
            <td>
              No
            </td>
            <td>
              No
            </td>
          </tr>
          </tbody>
        </StyledTable>
        <Link
          href={`#${tocList[0].id}`}
          onClick={e => handleAnchor(e, ccrcRef)}
        >
          Back to top
        </Link>
      </StyledArticle>
      <StyledArticle>
        <Heading level="title" size="title" ref={ccrcvshcRef} >
          CCRC vs. Home Care
        </Heading>
        <Paragraph>
          With{' '}
          <Link href="https://www.seniorly.com/in-home-care">
            home care
          </Link>
          , services can vary based on unique needs. These may include medication monitoring, help
          with self-care, meal delivery, housekeeping, transportation, companionship, and minor
          health care services. However, once more advanced medical care is needed, other options
          may need to be considered.
        </Paragraph>
        <Paragraph>
          Both CCRCs and home care make it possible for seniors to enjoy aging in place.
          The cost per hour for home care can range between $14 - $40 per hour.
        </Paragraph>
        <StyledTable>
          <thead>
          <tr>
            <th>
            </th>
            <th>
              CCRC
            </th>
            <th>
              Home Care
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              Assistance with daily living
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
              Medical services
            </td>
            <td>
              Yes
            </td>
            <td>
              No
            </td>
          </tr>
          <tr>
            <td>
              Social activities
            </td>
            <td>
              Yes
            </td>
            <td>
              No
            </td>
          </tr>
          <tr>
            <td>
              Live at home with loved ones
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
              Therapy towards rehabilitation
            </td>
            <td>
              Yes
            </td>
            <td>
              No
            </td>
          </tr>
          <tr>
            <td>
              Pain management
            </td>
            <td>
              Yes
            </td>
            <td>
              No
            </td>
          </tr>
          <tr>
            <td>
              Meal plan or delivery
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
              Companionship
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
              Independence
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
              Memory care
            </td>
            <td>
              Yes
            </td>
            <td>
              No
            </td>
          </tr>
          <tr>
            <td>
              Paid for by Medicare
            </td>
            <td>
              No
            </td>
            <td>
              No
            </td>
          </tr>
          </tbody>
        </StyledTable>
        <Link
          href={`#${tocList[0].id}`}
          onClick={e => handleAnchor(e, ccrcRef)}
        >
          Back to top
        </Link>
      </StyledArticle>
      <StyledArticle>
        <Heading level="title" size="title" ref={chooseRef} >
          Is a CCRC Right for Me or My Loved One?
        </Heading>
        <Paragraph>
          If you value security and you want to have peace of mind knowing that your changing
          medical needs will be met now and in the future, then a CCRC may be the right move for you.
          This option is a great choice for active adults that want to enjoy having a sense of
          community, nearby friends, and plenty of activities to enjoy.
        </Paragraph>
        <Paragraph>
          If you think a continuing care retirement community is a good option for you or your loved one,
          compile the names of the CCRCs you’re interested in, and then set up tours yourself or with a{' '}
          <Link href="https://www.seniorly.com/agents">
            Local senior living expert
          </Link>
          .  Begin comparing communities against each other to find the one
          that best fits your needs.

        </Paragraph>
        <Link
          href={`#${tocList[0].id}`}
          onClick={e => handleAnchor(e, ccrcRef)}
        >
          Back to top
        </Link>
      </StyledArticle>
      <StyledArticle>
        <Heading level="title" size="title" ref={faqRef} >
          CCRC FAQs
        </Heading>
        <Paragraph>
          Below you will find a sampling of the 5 most frequently asked questions we get regarding CCRC’s.  For a comprehensive list of CCRC frequently asked questions, click through to our{' '}
          <Link href="https://www.seniorly.com/continuing-care-retirement-community/articles/seniorly-continuing-care-retirement-community-ccrc-faqs">
            CCRC FAQ section
          </Link>.
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
      <StyledArticle>
        <NextSteps nextRef={nextRef}
                   toc="CCRC"
                   label="Think a Continuing Care Retirement Community might be right for you or your loved one? Explore these additional topics below to delve deeper into this type of senior housing:"
                   links={nextSteps} />
        <Heading level="subtitle" size="subtitle" >
          How Seniorly Works
        </Heading>
        <Paragraph>
          <HowSlyWorksVideoContainer eventLabel='ccrc' />
        </Paragraph>
        <Heading level="subtitle" size="subtitle" >
          Independent Living vs Assisted Living: Understand the Difference
        </Heading>
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/L3OJqWZcXFU" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
        <Paragraph>
          Seniorly Co-founder and CEO, Arthur Bretschneider explains the differences of independent living vs assisted living.
        </Paragraph>
        <Link
          href={`#${tocList[0].id}`}
          onClick={e => handleAnchor(e, ccrcRef)}
        >
          Back to top
        </Link>
      </StyledArticle>
  </>
);

  const title = 'Find the Best CCRC Near You ';
  const description = 'Find the best continuing care retirement community(CCRC) near you with local senior living communities & providers. Browse CCRC nearby with prices, reviews & photos.';
  const heading = state ? `${listSize} ${tocLabel} near ${city}, ${getStateAbbr(state)}` : `${listSize} ${tocLabel} near ${city}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {faqPage(faqs)}
        {tocSiteNavigationLD("https://www.seniorly.com/continuing-care-retirement-community", tocList)}
        {guideLD(title, description, "https://www.seniorly.com/continuing-care-retirement-community")}
      </Helmet>
      <HubHeader imagePath="react-assets/hub/independent-living-cover.jpg"
         toc="CCRC"
         heading="What is Continuing Care Retirement Community (CCRC) Near You?"
         label="Use our free search to find CCRC nearby"
         onCurrentLocation={onCurrentLocation}
         onLocationSearch={onLocationSearch} />
      <HubPageTemplate>
        <Wrapper>
          <TwoColumn>
            <Column>
              <StickToTop>
                {TableOfContents()}
              </StickToTop>
            </Column>
            <Body>
            {SEOContent()}
            <Heading level="title" size="title" ref={nearRef}>
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
      <PhoneCTAFooter/>
      <Footer />
    </>

  );
};

CCRCNearMePage.propTypes = {
  onLocationSearch: func,
  communityList: array.isRequired,
  requestMeta: object.isRequired,
  searchParams: object,
  isFetchingResults: bool,
  handleAnchor: func,
  location: object.isRequired,
  onCurrentLocation: func,
};

export default CCRCNearMePage;
