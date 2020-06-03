import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';

import ListItem from 'sly/web/components/molecules/ListItem';
import HubHeader from 'sly/web/components/molecules/HubHeader';
import WhatIsPartnerAgent from 'sly/web/components/molecules/WhatIsPartnerAgent';
import PhoneCTAFooter from 'sly/web/components/molecules/PhoneCTAFooter';
import NextSteps from 'sly/web/components/molecules/NextSteps';
import ADLChart from 'sly/web/components/molecules/ADLChart';
import { faqPage, tocSiteNavigationLD, guideLD } from 'sly/web/services/helpers/html_headers';
import HowSlyWorksVideoContainer from 'sly/web/containers/HowSlyWorksVideoContainer'
import { getStateAbbr } from 'sly/web/services/helpers/url';
import { size } from 'sly/web/components/themes';
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
import { ResponsiveImage, Heading, Paragraph, Link } from 'sly/web/components/atoms';
import Footer from 'sly/web/components/organisms/Footer';
import CommunitySearchList from 'sly/web/components/organisms/CommunitySearchList';


const StyledLink = styled(Link)`
  margin-bottom: ${size('spacing.large')};
  display: block;
`;

const StyledImage = styled(ResponsiveImage)`
  object-fit: cover;
  vertical-align:top;
  width: 100%;
  height: 100%;
`;


const TwoColumn = makeTwoColumn('div');
const Body = makeBody('div');
const Column = makeColumn('aside');
const Wrapper = makeWrapper('div');
const StickToTop = makeStickToTop('div');
const StyledArticle = makeArticle('article');
const StyledTable = makeTable('table');
const ListWrapper = makeOneColumnListWrapper('div');

const SeniorLivingNearMePage = ({
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
  const tocLabel = 'Senior Living Communities';


  const slRef = React.createRef();
  const costRef = React.createRef();
  const chooseRef = React.createRef();
  const typesRef = React.createRef();
  const faqRef = React.createRef();
  const nextRef = React.createRef();
  const nearRef = React.createRef();

  const sectionIdMap = {
    sl: 'what-is-senior-living',
    cost: 'cost',
    choose: 'choosing-senior-living',
    typesil: 'types-of-senior-living',
    faqs: 'frequently-asked-question',
    next: 'next-steps',
    near: 'senior-living-near-you',
  };

  const tocList = [
    {
      title: "What is Senior Living?",
      id: "what-is-senior-living",
      ref: slRef
    },
    {
      title: "How Much Does Senior Living Cost?",
      id: "cost",
      ref: costRef
    },
    {
      title: "The Benefits of Choosing a Senior Living Community",
      id: "choosing-senior-living",
      ref: chooseRef
    },
    {
      title: "Different Types of Senior Living",
      id: "types-of-senior-living",
      ref: typesRef
    },
    {
      title: "Senior Living FAQs",
      id: "frequently-asked-question",
      ref: faqRef

    },
    {
      title: "Next Steps",
      id: "next-steps",
      ref: nextRef

    },
    {
      title: "How to Find the Best Senior Living Near Me",
      id: "senior-living-near-you",
      ref: nearRef

    },
  ];

  const nextSteps = [
    {title: "Independent Living", to:"https://www.seniorly.com/independent-living"},
    {title: "Assisted Living", to:"https://www.seniorly.com/assisted-living"},
    {title: "Board and Care Home", to:"https://www.seniorly.com/board-and-care-home"},
    {title: "Memory Care", to:"https://www.seniorly.com/memory-care"},
    {title: "In Home Care", to:"https://www.seniorly.com/in-home-care"},
    {title: "Respite Care", to:"https://www.seniorly.com/respite-care"},
    {title: "CCRC", to:"https://www.seniorly.com/continuing-care-retirement-community"},
    {title: "Nursing Home", to:"https://www.seniorly.com/nursing-homes"},
    {title: "Skilled Nursing Facility", to:"https://www.seniorly.com/skilled-nursing-facility"},
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
      question: "How much does senior living cost?",
      answer: "In 2019, the cost of senior living ranged from $4,051 for assisted living to $7,513 for a semi-private room at a skilled nursing facility. Other kinds of senior living options include independent living, memory care and even short-term respite care stays. Prices vary from based on care needs, room type, and geographic location."
    },
    {
      question: "What is independent senior living?",
      answer: "Independent senior living is for adults aged 55 and older who want to downsize, remove the burden of home maintenance, and instead live a leisurely life with like minded peers. Usually, there is no medical care available unless the property includes skilled nursing."},
    {
      question: "Does Medicare cover senior living?",
      answer: "Medicare and Medicaid can be options for a stay in a skilled nursing facility.  That is the only senior living option that you can be assured will work those government programs. Once you start exploring independent living or assisted living, private pay becomes the way to pay.  If you’re a Veteran or the spouse of a Veteran, don’t forget to explore all of the Veteran’s Benefits available for senior living."
    },
    {
      question: "How to pay for senior assisted living?",
      answer: "Paying for senior assisted living is usually handled through private pay.  There are circumstances when a community might have a Medicare or Medicaid option, but this is few and far between. Long-term care insurance is a great investment early in life to help cover assisted living costs later in life. Finally, Veteran’s can often get assistance from the government if they are qualified."
    },
    {
      question: "What is a senior living advisor?",
      answer: "Senior living referral agents, sometimes also called elder care referral agents or senior placement agents (we call them Seniorly Partner Agents), can be a company with several employees or just one senior living expert. In either case, they have a wealth of valuable information about all the various senior housing options, care services, and types of senior living available to you and your loved ones in the local area you are searching."
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

  const SEOContent = () => {
    return (
      <>
        <StyledArticle>
          <Heading level="title" size="title" _ref={slRef} >
            What is Senior Living?
          </Heading>
          <Paragraph>
            Senior living is an umbrella term for communities designed to meet the care and lifestyle needs of older
            adults who cannot or choose not to live independently. Senior living properties are usually age-restricted,
            and they provide a safe environment where senior residents can enjoy life surrounded by their peers.
          </Paragraph>
          <Paragraph>
            Senior living communities are classified by the type and level of care they provide and include
            independent living, assisted living, memory care, respite care and many other types that will be
            covered below. In many cases, a single parent company may run several types of senior living communities
            near you — for example,{' '}
            <Link href="https://www.seniorly.com/resources/articles/what-are-the-brookdale-options-in-los-angeles-ca">
              Brookdale Senior Living.
            </Link>
          </Paragraph>

          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={costRef}>
            How Much Does Senior Living Cost?
          </Heading>
          <Paragraph>
            Senior living costs range based on a variety of factors, including location, care type, length of stay,
            property amenities, community type, etc. Some senior living facilities focus on offering a resort-like
            experience with luxurious services while others focus on providing a more home-like experience.
          </Paragraph>
          <Paragraph>
            What is the price of senior living? Payment options can also vary dramatically depending on the type of
            facility, the care needed, and which state you want to live in. For example, Medicare doesn’t cover
            independent living communities but will help pay for skilled nursing facilities. Meanwhile, some states
            provide income-based financial aid to cover the cost of assisted living facilities, while other states do not.
          </Paragraph>
          <Paragraph>
            For an idea of the range of cost for different types of senior living, here are some monthly averages from
            the{' '}
            <Link href="https://www.genworth.com/aging-and-you/finances/cost-of-care.html">
              Genworth Financial 2019 Cost of Care Survey:
            </Link>
          </Paragraph>
          <Paragraph>
            <strong>
            Average Monthly Cost Based on Senior Living Community Type
            </strong>
          </Paragraph>
          <StyledTable>
            <thead>
              <tr>
                <th>
                  Senior Living Type
                </th>
                <th>
                  Monthly Median Costs: National (US, 2019)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Homemaker Services
                </td>
                <td>
                  $4,290
                </td>
              </tr>
              <tr>
                <td>
                  Home Health Aide
                </td>
                <td>
                  $4,385
                </td>
              </tr>
              <tr>
                <td>
                  Adult Day Health Care
                </td>
                <td>
                  $1,625
                </td>
              </tr>
              <tr>
                <td>
                  Assisted Living
                </td>
                <td>
                  $4,051
                </td>
              </tr>
              <tr>
                <td>
                  Skilled Nursing Facility
                </td>
                <td>
                  <ul>
                    <li>
                      Semi-Private Room: $7,513
                    </li>
                    <li>
                      Private Room: $8,517
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </StyledTable>
          <Paragraph>
            When assessing the cost of a senior living community, remember that the price can include room and
            board (meals), maintenance and landscaping, personal care services (if applicable), and life
            enrichment programs. Often, seniors find that the cost of senior living is lower than trying
            to pay for each of these elements, plus transportation, property taxes, etc when maintaining a private home.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={chooseRef} >
            The Benefits of Choosing a Senior Living Community
          </Heading>

          <Paragraph>
            Research shows that{' '}
            <Link href="https://www.who.int/dietphysicalactivity/factsheet_olderadults/en/">
              staying active
            </Link>
            {' '}and socially connected becomes more important as we age.{' '}
            <Link href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2756979/">
              Isolation is a serious health risk for older adults
            </Link>
            {' '}, physically, mentally and emotionally. Senior living communities create opportunities for
            older adults to engage in life through:
          </Paragraph>
          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="darker-30">
              Life Enrichment Programs
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="darker-30">
              Volunteering Opportunities
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="darker-30">
              Peer-to-Peer Support
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="darker-30">
              Well-balanced Meals
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="darker-30">
              Planned Fitness Programs
            </ListItem>
          </ListWrapper>
          <Paragraph>
            For many older Americans, the move to a{' '}
            <Link href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2588026">
              senior living community has become a lifestyle choice
            </Link>
            {' '}rather than something based on medical need.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>

          <Heading level="title" size="title" _ref={typesRef}>
            Senior Living: Independent Living
          </Heading>
          <Paragraph>
            <Link href="https://www.seniorly.com/independent-living">
              Independent living communities
            </Link>
            {' '}offer a maintenance-free lifestyle for senior adults who don't require assistance with their activities of daily living (ADLs)
            or medical care, but who want to streamline their lives and live in a community of peers. Senior adults
            who choose independent living are typically active and healthy, often over age 55.
            They want to avoid the hassle of home upkeep. Depending on the independent living property,
            senior residents either purchase or rent a private apartment that can range from a studio apartment to a
            two-bedroom cottage.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Paragraph>
            <StyledImage path="f7a8de31f6f1609ce51448bf89f99d27/SunriseLaJolla_photos_03_Seniorly.jpg" alt="Sunrise of La Jolla, CA" height={640} />
            Photo:{' '}
            <Link href="https://www.seniorly.com/assisted-living/california/san-diego/sunrise-of-la-jolla">
              Sunrise of La Jolla, CA
            </Link>
          </Paragraph>
        </StyledArticle>


        <StyledArticle>
          <Heading level="title" size="title">
            Senior Living: Assisted Living
          </Heading>

          <Paragraph>
            <Link href="https://www.seniorly.com/assisted-living">
              Assisted living facilities
            </Link>
            {' '}
            provide 24-hour non-medical care delivered in a residential setting. They are designed for older adults
            who are still largely independent but need assistance with{' '}
            <Link href="https://www.seniorly.com/resources/articles/what-are-the-activities-of-daily-living-adls">
              activities of daily living (ADLs)
            </Link>
            {' '}, including:
          </Paragraph>
          <ADLChart />
          <Paragraph>
            In assisted living communities, residents maintain a sense of freedom with the assurance that staff is
            always on-hand to help when needed. They enjoy daily opportunities to socialize with unique services
            and amenities. Also, they form new friendships within the community.
          </Paragraph>
          <Paragraph>
            In general, lifestyle amenities include:
          </Paragraph>
          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="darker-30">
              Room and board
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="darker-30">
              24-hour assistance with activities of daily living (ADLs)
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="darker-30">
              Home maintenance, housekeeping & laundry services
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="darker-30">
              Social engagement
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="darker-30">
              Wellness programs
            </ListItem>
          </ListWrapper>
          <Paragraph>
            Assisted living communities near you can range from large resort-like properties to intimate boutique
            communities. The majority of assisted living facilities are private pay and offer month-to-month rental agreements.
          </Paragraph>
          <Paragraph>
            To learn about all the assisted living communities in a specific city, let us connect you to a{' '}
            <Link href="https://www.seniorly.com/agents">
              Local Senior Living Expert in that city.
            </Link>
            {' '}These senior living advisors know all the communities and
            can share costs, availability, features and so much more at no cost to you. To connect to one of our
            approved senior living advisors, email us now at ask@seniorly.com or call (855) 866-4515.
          </Paragraph>
          <Heading level="subtitle" size="subtitle" >
            What Is A Local Senior Living Expert?
          </Heading>
          <WhatIsPartnerAgent toc="senior living" agents={agents}/>
          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title">
            Senior Living: Memory Care
          </Heading>
          <Paragraph>
            <Link href="https://www.seniorly.com/memory-care">
              Memory care
            </Link>
            {' '}is a purpose-built type of senior living for older adults with{' '}
            <Link href="https://www.alz.org/alzheimer_s_dementia">
              dementia or other cognitive impairments.
            </Link>
            {' '}Memory care residents benefit from a structured environment that provides
            specially designed routines to help them feel secure and comfortable. The caregiver-to-resident
            staffing ratio is also much higher in memory care than in other types of senior living, ensuring that
            residents enjoy plenty of personal contact.
          </Paragraph>
          <Paragraph>
            A Local Senior Living Expert in the city of your choice can share the details about all the
            memory care communities. They can set up tours and often help negotiate fees on your behalf.
            To connect to one of our approved senior living advisors, email us now at ask@seniorly.com or call (855) 866-4515.
          </Paragraph>

          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title">
            Senior Living: Board and Care Home
          </Heading>
          <Paragraph>
            A{' '}
            <Link href="https://www.seniorly.com/memory-care">
              board and care home
            </Link>
            , also known as a residential care home, is a community for senior adults located within a residential
            neighborhood. These intimate properties are similar to assisted living communities, but on a much smaller scale.
          </Paragraph>
          <Paragraph>
            Seniors typically choose a board and care home when they want to live somewhere that has a more close-knit,
            home-like feeling, rather than a large community. Staff can help with a wide variety of personal
            services and the owner or manager often lives there with the residents. Note, there is no requirement for
            staff to be available to residents 24/7.
          </Paragraph>
          <Paragraph>
            Many board and care homes do not have websites, so it’s very useful to connect to a local senior living
            expert who knows all of the residential care homes available within the city you are searching.
            To connect to one of our approved senior living advisors, email us now at ask@seniorly.com or call (855) 866-4515.
          </Paragraph>

          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title">
            Senior Living: In-Home Care
          </Heading>
          <Paragraph>
            With{' '}
            <Link href="https://www.seniorly.com/in-home-care">
              in-home care
            </Link>
            , professionally trained caregivers work to keep seniors as independent as possible while providing the
            personal, non-medical care they need to stay in their homes. Caregivers typically help aging citizens
            with ADLs such as bathing and dressing, meal preparation, and medication management. Depending on the
            senior’s needs, the caregiver may visit daily, once a week or live in-home to provide full-time
            assistance and companionship.

          </Paragraph>

          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title">
            Senior Living: Respite Care
          </Heading>
          <Paragraph>
            <Link href="https://www.seniorly.com/respite-care">
              Respite care
            </Link>
            {' '}is a type of short-term senior living situation where older adults temporarily stay
            in assisted living communities, receive short-term home care, or spend time in an adult daycare program.
            Respite care is an important option for seniors who need additional care as they recover from an illness or
            surgery or for family caregivers who need a short break.
          </Paragraph>
          <Paragraph>
            Respite stays are also a great way for older adults to see what it’s like to reside in an assisted living
            community before they make a permanent move.
          </Paragraph>

          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title">
            Senior Living: CCRC
          </Heading>
          <Paragraph>
            A{' '}
            <Link href="https://www.seniorly.com/respite-care">
              CCRC
            </Link>
            {' '}(continuing care retirement community)  provides seniors with the ability to age in place by combining
            independent living, assisted living and 24/7 nursing home care into one property. You can easily transition
            to the appropriate level care facility as your needs change. However, you remain a part of the same overall
            community, allowing you to maintain social ties and enjoy your social activities and hobbies uninterrupted.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title">
            Senior Living: Nursing Home
          </Heading>
          <Paragraph>
            The term “
            <Link href="https://www.seniorly.com/nursing-homes">
              nursing home
            </Link>
            ” is a catch-all phrase for senior living facilities that most typically means an assisted living community.
            Don’t be misled by the word “nursing,” since most people who live in a nursing home don’t need skilled
            nursing. Rather, they require non-medical assistance with their activities of daily living (ADLs).
            However, other types of senior living might use the title “nursing home” so always confirm beforehand
            what types of care and services they offer.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title">
            Senior Living: Skilled Nursing Facility
          </Heading>
          <Paragraph>
            The term “
            <Link href="https://www.seniorly.com/skilled-nursing-facility">
              Skilled nursing facilities
            </Link>
            (SNF) is different from other types of senior living communities. These properties provide 24/7 healthcare
            services that can only be safely and effectively performed by professionals or technical personnel.
            They are intended for short-term stays while the senior resident recovers from a medical procedure.
            Unlike other forms of senior housing, which are often private pay, skilled nursing facilities
            are generally covered by{' '}
            <Link href="https://www.medicaid.gov/medicaid/ltss/institutional/nursing/index.html">
              Medicaid
            </Link>
            {' '}and{' '}
            <Link href="https://www.medicare.gov/coverage/skilled-nursing-facility-snf-care">
              Medicare
            </Link>
            {' '}— though some restrictions may apply.
          </Paragraph>
          <Paragraph>
            <strong>
              Compare Services Between Senior Living Facility Types
            </strong>
          </Paragraph>
          <StyledTable>
            <thead>
              <tr>
                <th>
                  Service Type
                </th>
                <th>
                  Independent Living
                </th>
                <th>
                  Assisted Living
                </th>
                <th>
                  Memory Care
                </th>
                <th>
                  Skilled Nursing Facility (SNF)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Room & Board
                </td>
                <td>
                  Yes
                </td>
                <td>
                  Yes
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
                  Non-medical Care (ADLs)
                </td>
                <td>
                  No
                </td>
                <td>
                  Yes
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
                  Medical Care
                </td>
                <td>
                  No
                </td>
                <td>
                  No
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
                  Long-term living
                </td>
                <td>
                  Yes
                </td>
                <td>
                  Yes
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
                  Covered by Medicaid / Medicare
                </td>
                <td>
                  No
                </td>
                <td>
                  Conditional
                </td>
                <td>
                  Conditional
                </td>
                <td>
                  Yes
                </td>
              </tr>
            </tbody>
          </StyledTable>
          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={faqRef} >
            Senior Living FAQs
          </Heading>
          <Paragraph>
            Below you will find a sampling of the 5 most frequently asked questions we get regarding senior living.
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
                     toc="senior living"
                     label="Think a senior living community might be right for you or your loved one? Learn more about each type below to help narrow down your search:"
                     links={nextSteps} />
          <Heading level="subtitle" size="subtitle" >
            How Seniorly Works
          </Heading>
          <Paragraph>
            <HowSlyWorksVideoContainer eventLabel='senior-living' />
          </Paragraph>
          <Heading level="subtitle" size="subtitle" >
            How to Pay for Senior Living
          </Heading>
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/lW0zg6rZKdc" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
          <Paragraph>
            Paying for senior care may seem stressful, but Lars Larson of Heritage Financial North shares advice on how to pay for assisted living.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
      </>
    );
  };

  const title = 'Find Senior Living Near Me';
  const description = 'Senior living options nearby include assisted living facilities, memory care communities, independent living, ccrc’s, respite care, nursing homes and in-home care.';
  const heading = state ? `${listSize} ${tocLabel} near ${city}, ${getStateAbbr(state)}` : `${listSize} ${tocLabel} near ${city}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {faqPage(faqs)}
        {tocSiteNavigationLD("https://www.seniorly.com/senior-living", tocList)}
        {guideLD(title, description, "https://www.seniorly.com/senior-living")}
      </Helmet>
      <HubHeader imagePath="react-assets/hub/memory-care-cover.jpg"
         toc="senior living"
         heading="Find the Best Senior Living Near You"
         label="Use our free search to find senior living options nearby"
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
            <Heading level="title" size="title" _ref={nearRef}>
              {heading}
            </Heading>
            <StyledArticle>
              <Paragraph>
                There are a lot of different factors that go into finding the right senior living community for you or
                your loved one. Take time to meet with everyone who is involved in the decision and list the desired
                lifestyle amenities and location. Figure out your price range and investigate potential ways of
                financing senior living. It’s also important to talk with your doctor to determine the level of care needed.

              </Paragraph>
            </StyledArticle>
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

SeniorLivingNearMePage.propTypes = {
  onLocationSearch: func,
  communityList: array.isRequired,
  requestMeta: object.isRequired,
  searchParams: object,
  isFetchingResults: bool,
  handleAnchor: func,
  location: object.isRequired,
  onCurrentLocation: func,
};

export default SeniorLivingNearMePage;
