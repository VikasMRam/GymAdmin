import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';
import ListItem from 'sly/components/molecules/ListItem';
import HubHeader from 'sly/components/molecules/HubHeader';
import WhatIsPartnerAgent from 'sly/components/molecules/WhatIsPartnerAgent';
import PhoneCTAFooter from 'sly/components/molecules/PhoneCTAFooter';
import NextSteps from 'sly/components/molecules/NextSteps';

import { getStateAbbr } from 'sly/services/helpers/url';
import { size, palette, assetPath } from 'sly/components/themes';
import {
  HubPageTemplate,
  makeBody,
  makeColumn,
  makeFooter,
  makeHeader,
  makeTwoColumn,
  makeWrapper,
} from 'sly/components/templates/HubPageTemplate';
import { TemplateHeader, TemplateContent } from 'sly/components/templates/BasePageTemplate';
import { ResponsiveImage, Label, Heading, Paragraph, Link, Icon, Hr, Image } from 'sly/components/atoms';
import Footer from 'sly/components/organisms/Footer';
import { ALSeoCities, ALSeoStates } from 'sly/services/helpers/homepage';
import { getTocSeoLabel } from 'sly/services/helpers/search';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';


const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const StyledArticle = styled.article`
  margin-bottom: ${size('spacing.xLarge')};
  &:last-of-type {
    margin-bottom: 0;
    p {
      margin-bottom: ${size('spacing.regular')};
    }
  }
`;

const StickToTop = styled.div`
  background-color: ${palette('white', 'base')};
  padding: ${size('spacing.xLarge')} ${size('spacing.large')} ${size('spacing.regular')} ${size('spacing.large')};
  line-height: ${size('lineHeight.body')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
  margin-bottom: ${size('spacing.large')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    position: sticky;
    top: 24px;
    margin-top: calc(2 * -${size('spacing.huge')});
  }
`;

const StyledLink = styled(Link)`
  margin-bottom: ${size('spacing.large')};
  display: block;
`;

const ListWrapper = styled.div`
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
  line-height: ${size('lineHeight.body')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
  margin-bottom: ${size('spacing.large')};
  display: grid;
  grid-template-columns: 100%;
  grid-row-gap: ${size('spacing.large')};
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: ${size('border.regular')} solid ${palette('grey', 'stroke')};
  margin-bottom: ${size('spacing.large')};
  thead {
    background-color: ${palette('slate', 'stroke')};
    padding: ${size('spacing.regular')} ${size('spacing.large')};
    color: ${palette('grey', 'base')};
  };
  tr {
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  };
  td, th {
    padding: ${size('spacing.regular')} ${size('spacing.large')};
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
    font-weight: normal;

  };
  
  table-layout: fixed;
  font-size: ${size('text.tiny')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    font-size: ${size('text.body')};
  }
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

const MemoryCareNearMePage = ({
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
  const tocLabel = getTocSeoLabel('board-and-care-homes');


  const bncRef = React.createRef();
  const servicesRef = React.createRef();
  const otherRef = React.createRef();
  const costRef = React.createRef();
  const touringRef = React.createRef();
  const nextRef = React.createRef();
  const nearRef = React.createRef();

  const sectionIdMap = {
    bnc: 'what-is-board-and-care',
    service: 'services',
    other: 'bnc-vs-other',
    cost: 'cost',
    touring: 'touring-questions',
    next: 'next-steps',
    near: 'memory-care-near-you',
  };

  const nextSteps = [
    {title: "Evaluating a Board and Care Home", to:"https://www.seniorly.com/resources/articles/evaluating-a-board-and-care-home"},
    {title: "Understanding the Cost of a Board and Care Home", to:"https://www.seniorly.com/resources/articles/understanding-the-cost-of-a-board-and-care-home"},
    {title: "Frequently Asked Questions About Board and Care Home", to:"https://www.seniorly.com/resources/articles/seniorly-board-and-care-faqs"},
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

  const TableOfContents = () => {
    return (
      <>
        <StyledHeading level="subtitle" size="subtitle">
          Table of Contents
        </StyledHeading>
        <Paragraph>
          <StyledLink
            href={`#${sectionIdMap.bnc}`}
            onClick={e => handleAnchor(e, bncRef)}
          >
            What is a Board and Care Home Near You?
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.services}`}
            onClick={e => handleAnchor(e, servicesRef)}
          >
            What Services are Provided at a Board and Care Home?
          </StyledLink>
          <StyledLink
          href={`#${sectionIdMap.cost}`}
          onClick={e => handleAnchor(e, costRef)}
        >
          How Much Does a Board and Care Home Cost?
        </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.other}`}
            onClick={e => handleAnchor(e, otherRef)}
          >
            Board and Care Homes vs. Other Types of Senior Living
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.touring}`}
            onClick={e => handleAnchor(e, touringRef)}
          >
            What Questions to Ask When Touring
          </StyledLink>

          <StyledLink
            href={`#${sectionIdMap.next}`}
            onClick={e => handleAnchor(e, nextRef)}
          >
            Next Steps
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.near}`}
            onClick={e => handleAnchor(e, nearRef)}
          >
            Browse Board and Care Homes Near You
          </StyledLink>
        </Paragraph>
      </>
    )
  };

  const SEOContent = () => {
    return (
      <>
        <StyledArticle>
          <StyledHeading level="title" size="title" _ref={bncRef} >
            What is a Board and Care Home Near You?
          </StyledHeading>
          <Paragraph>
            A board and care home is a residential care community for senior adults located within a residential
            neighborhood. These assisted living properties typically are small and intimate, caring for about
            six senior residents at a time.
          </Paragraph>
          <Paragraph>
            <Link href="https://www.seniorly.com/assisted-living/articles/understanding-board-and-care-homes">
              Board and care homes
            </Link>
            {' '}also go by the names "residential care home," "residential personal care home," and "residential care
            facilities for the elderly" in various states. Board and care homes near you are similar to assisted living
            communities, though on a much smaller scale.
          </Paragraph>
          <Paragraph>
            Because of their small size, these residential care communities typically enjoy a better staff-to-resident
            ratio, so residents get more personalized care. Senior residents choose board and care homes when they
            want to live in a place that feels like a home rather than a medical facility. They often find the personal
            freedom and lack of structure appealing.  They may be attracted by the personal nature of living in an
            actual home with people they can get to know well.
          </Paragraph>
          <Paragraph>
            In addition, people with dementia, Alzheimer's disease, and depression often choose residential care homes
            because of the personalized attention and support received.  Some have called this “
            <Link href="https://www.seniorly.com/resources/articles/board-and-care-homes-the-x-factor-for-dementia-care">
              The X Factor for Dementia Care.
            </Link>”
          </Paragraph>


          <Link
            href={`#${sectionIdMap.bnc}`}
            onClick={e => handleAnchor(e, bncRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <StyledHeading level="title" size="title" _ref={servicesRef}>
            What Services are Provided at a Board and Care Home?
          </StyledHeading>
          <Paragraph>
            The services provided at a board and care home near you are similar to those provided at an assisted
            living community, but in a home setting. Staff in a residential care home help with a wide variety of
            personal services. The owner or manager of the home often lives there with the residents,
            though there's no requirement for staff to be available to residents 24/7.

          </Paragraph>
          <Paragraph>
            <strong>Among the care services provided are:</strong>
          </Paragraph>
          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Assistance with the Activities of Daily Living (ADLs). These activities may include bathing, dressing,
              grooming, eating, and transferring, depending on the needs of the resident.
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Medication Management. Many senior residents have complex medication regimens. Typically, the staff helps
              with the storage and dispensing of medication, though in some states, non-certified staff are only allowed
              to give residents reminders to take their medications.
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Meals. Senior residents don't have to prepare their own meals. Most residential care homes are willing
              and able to accommodate any special dietary needs you or your loved one might have.
              They often plan menus based on the preferences of the residents.
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Activities. Board and care homes are far less likely to offer a wide menu of activities than other types
              of senior living options. They may encourage residents to enjoy movies or games together, or they may
              take residents to nearby senior centers for activities.
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Transportation. Board and care homes typically provide transportation to medical appointments.
              They may also provide transportation for errands and group outings
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Housekeeping. Included in the monthly cost for room and board is also housekeeping services.
              These include cleaning of both the common areas and residents' private rooms and bathrooms.
            </ListItem>
          </ListWrapper>
          <Paragraph>
            In addition, often the staff handle all laundry, including linens. Basic supplies, such as toilet paper,
            are also included, although incontinence supplies may not be.
          </Paragraph>
          <Paragraph>
            <StyledImage path="0e0e2b4a4d447123c44d88bea236cab9/Ayres_Westwood_logo-5.jpg" alt="Ayres Residential Care Homes, Westwood, CA" height={640} />
            Photo:{' '}
            <Link href="https://www.seniorly.com/assisted-living/california/los-angeles/ayres-residential-care-homes-westwood">
              Ayres Residential Care Homes, Westwood, CA
            </Link>
          </Paragraph>
          <Paragraph>
            If you are ready to search for a Board and Care Home near you, just enter your city or zip code in the search box below:
          </Paragraph>
          <SearchBoxContainer onCurrentLocation={onCurrentLocation} layout="homeHero" onLocationSearch={onLocationSearch} />

          <Link
            href={`#${sectionIdMap.bnc}`}
            onClick={e => handleAnchor(e, bncRef)}
          >
            Back to top
          </Link>
        </StyledArticle>


        <StyledArticle>
          <StyledHeading level="title" size="title" _ref={costRef}>
            How Much Does a Board and Care Home Cost?
          </StyledHeading>
          <Paragraph>
            The monthly fees for a board and care home can run anywhere from $1,500 to $6,000. This depends largely on
            where you live. While areas with a higher cost of living are likely to see higher fees, in general,
            most costs run between $3,500 and $4,500 per month.
          </Paragraph>
          <Paragraph>
            You can reduce those costs a bit by sharing a bedroom with a roommate. As you explore what is the price of
            a board and care home note that additional senior care services, such as dementia care or incontinence
            supplies, can raise the rates.
          </Paragraph>

          <Link
            href={`#${sectionIdMap.bnc}`}
            onClick={e => handleAnchor(e, bncRef)}
          >
            Back to top
          </Link>
        </StyledArticle>


      <StyledArticle>
          <StyledHeading level="title" size="title">
            Is There Medical Care at a Board and Care Home?
          </StyledHeading>

          <Paragraph>
            <Link href="https://www.seniorly.com/assisted-living/articles/understanding-board-and-care-homes">
              Board and care homes
            </Link>
            {' '}don't provide nursing or medical care. Seniors who need daily medical care beyond
            medication management may not be good candidates for these residential care homes. However, in most cases,
            the staff at a board and care home will be happy to drive residents to doctors' or therapy appointments.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.bnc}`}
            onClick={e => handleAnchor(e, bncRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <StyledHeading level="title" size="title" >
            What Is A Local Senior Living Expert?
          </StyledHeading>
          <WhatIsPartnerAgent toc="board and care homes" agents={agents}/>
        </StyledArticle>

        <StyledArticle>

          <StyledHeading level="title" size="title" _ref={otherRef}>
            Board and Care Homes vs. Other Types of Senior Housing
          </StyledHeading>
          <Paragraph>
            Seniors have many choices when looking at senior living options.
          </Paragraph>
          <ul>
            <li>What's the most appropriate living arrangement for you or your loved one?</li>
            <li>Should you opt for assisted living or an independent living community rather than a board and care home?</li>
            <li>When is it time to consider a skilled nursing facility or nursing home?</li>
          </ul>
          <Paragraph>
            Take a look at some of the differences to understand which option is right for you.
          </Paragraph>

          <Link
            href={`#${sectionIdMap.bnc}`}
            onClick={e => handleAnchor(e, bncRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <StyledHeading level="title" size="title" _ref={otherRef} >
            Board and Care Homes vs. Assisted Living
          </StyledHeading>
          <StyledTable>
            <thead>
              <tr>
                <th>
                </th>
                <th>
                  Board and Care Home
                </th>
                <th>
                  Assisted Living
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Private Apartments
                </td>
                <td>
                  No
                </td>
                <td>
                  Sometimes
                </td>
              </tr>
              <tr>
                <td>
                  Shared Rooms
                </td>
                <td>
                  Usually
                </td>
                <td>
                  Usually
                </td>
              </tr>
              <tr>
                <td>
                  Help with Activities of Daily Living
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
                  Medication Management
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
                  Yes
                </td>
                <td>
                  Yes
                </td>
              </tr>
              <tr>
                <td>
                  Three Meals a Day
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
                  Transportation Provided
                </td>
                <td>
                  Usually
                </td>
                <td>
                  Usually
                </td>
              </tr>
              <tr>
                <td>
                  Social Activities
                </td>
                <td>
                  Sometimes
                </td>
                <td>
                  Yes
                </td>
              </tr>
              <tr>
                <td>
                  Exercise Facilities
                </td>
                <td>
                  No
                </td>
                <td>
                  Usually
                </td>
              </tr>
              <tr>
                <td>
                  Covered by Health Insurance
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
          <Paragraph>
            The services and levels of care provided to residents at board and care homes are very similar to
            those provided at{' '}
            <Link href="https://www.seniorly.com/assisted-living">
              assisted living communities
            </Link>
            . The most significant difference between these senior living options is the size of the community.
            Board and care homes are much smaller than most assisted living facilities, so they appeal to seniors who
            prefer a cozier, more homelike environment that's more relaxed and less structured.
          </Paragraph>
          <Paragraph>
            In addition, monthly rent including care costs are usually more affordable here than at an assisted living
            facility.  This makes finding long term care within reach for many seniors.  Because of this, board
            and care homes care for a larger number of Medicaid recipients than do assisted living communities.
          </Paragraph>
          <Paragraph>
            Seniors looking for more in the way of amenities and recreational activities are likely to prefer an
            assisted living community to a board and care home. And seniors who are outgoing and socially inclined may
            feel constricted in the small, intimate community of a board and care home.
          </Paragraph>

          <Link
            href={`#${sectionIdMap.bnc}`}
            onClick={e => handleAnchor(e, bncRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <StyledHeading level="title" size="title">
            Board and Care Homes vs. Independent Living Communities
          </StyledHeading>

          <StyledTable>
            <thead>
              <tr>
                <th>
                </th>
                <th>
                  Board and Care Home
                </th>
                <th>
                  Independent Living
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Private Apartments
                </td>
                <td>
                  No
                </td>
                <td>
                  Usually
                </td>
              </tr>
              <tr>
                <td>
                  Shared Rooms
                </td>
                <td>
                  Usually
                </td>
                <td>
                  No
                </td>
              </tr>
              <tr>
                <td>
                  Help with Activities of Daily Living
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
                  Medication Management
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
                  Medical Care
                </td>
                <td>
                  No
                </td>
                <td>
                  No
                </td>
              </tr>
              <tr>
                <td>
                  Three Meals a Day
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
                  Housekeeping
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
                  Transportation Provided
                </td>
                <td>
                  Usually
                </td>
                <td>
                  Sometimes
                </td>
              </tr>
              <tr>
                <td>
                  Social Activities
                </td>
                <td>
                  Sometimes
                </td>
                <td>
                  Yes
                </td>
              </tr>
              <tr>
                <td>
                  Exercise Facilities
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
                  Covered by Health Insurance
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


          <Paragraph>
            While both board and care homes and{' '}
            <Link href="https://www.seniorly.com/independent-living">
              independent living communities
            </Link>
            {' '}foster a sense of independence in their senior residents, most seniors in independent living don't
            require any help with the{' '}
            <Link href="https://www.seniorly.com/resources/articles/what-are-the-activities-of-daily-living-adls">
              activities of daily living (ADLs)
            </Link>. Seniors often live in their own apartments in
            independent living communities, while in board and care homes, they have a private or shared bedroom within
            a traditional single-family home. Many independent living communities also offer a wide range of activities,
            unlike board and care homes.  One example is a{' '}
            <Link href="https://www.seniorly.com/continuing-care-retirement-community">
              CCRC (continuing care retirement community).
            </Link>
          </Paragraph>

          <Link
            href={`#${sectionIdMap.bnc}`}
            onClick={e => handleAnchor(e, bncRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <StyledHeading level="title" size="title">
            Board and Care Homes vs. Skilled Nursing Facility
          </StyledHeading>

          <StyledTable>
            <thead>
              <tr>
                <th>
                </th>
                <th>
                  Board and Care Home
                </th>
                <th>
                  Skilled Nursing Facility
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Private Apartments
                </td>
                <td>
                  No
                </td>
                <td>
                  No
                </td>
              </tr>
              <tr>
                <td>
                  Shared Rooms
                </td>
                <td>
                  Usually
                </td>
                <td>
                  Usually
                </td>
              </tr>
              <tr>
                <td>
                  Help with Activities of Daily Living
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
                  Medication Management
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
                  Yes
                </td>
              </tr>
              <tr>
                <td>
                  Three Meals a Day
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
                  Transportation Provided
                </td>
                <td>
                  Usually
                </td>
                <td>
                  Sometimes
                </td>
              </tr>
              <tr>
                <td>
                  Social Activities
                </td>
                <td>
                  Sometimes
                </td>
                <td>
                  No
                </td>
              </tr>
              <tr>
                <td>
                  Exercise Facilities
                </td>
                <td>
                  No
                </td>
                <td>
                  No
                </td>
              </tr>
              <tr>
                <td>
                  Covered by Health Insurance
                </td>
                <td>
                  No
                </td>
                <td>
                  Sometimes
                </td>
              </tr>
            </tbody>
          </StyledTable>


          <Paragraph>
            In{' '}
            <Link href="https://www.seniorly.com/skilled-nursing-facility">
              skilled nursing facilities
            </Link>{' '}(SNF) senior residents have access to 24/7 medical care, with medical
            professionals on duty around the clock. These facilities are intended for seniors who need nursing care
            on a daily basis.
          </Paragraph>
          <Paragraph>
            In contrast, board and care homes don't provide nursing or medical care, though they do provide
            personal care and assistance with the activities of daily living (ADLs).
          </Paragraph>
          <Paragraph>
            If a resident of a board and care home begins to require a higher level of skilled nursing care,
            usually they transfer to a skilled nursing facility. In some states, arrangements can be made to provide
            nursing care to residents of board and care homes, sometimes through assisted living programs funded by
            Medicaid or the{' '}
            <Link href="https://www.seniorly.com/resources/articles/veterans-benefits-for-assisted-living">
              Veterans Administration.
            </Link>
          </Paragraph>

          <Link
            href={`#${sectionIdMap.bnc}`}
            onClick={e => handleAnchor(e, bncRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <StyledHeading level="title" size="title" _ref={touringRef}>
            What Questions to Ask When Touring a Board and Care Home
          </StyledHeading>
          <Paragraph>
            If you're looking for the right board and care home near you, or even if you're just considering it as
            a possible senior living option, you probably have a lot of questions. We want to help you answer them.
            As you research and visit board and care homes in your area, it can be helpful to take along a set of
            questions so you get all the information you need.
          </Paragraph>
          <Paragraph>
            Here's a starter list of questions to ask at board and care homes to help you make a wise decision for yourself or your loved one:
          </Paragraph>
          <ul>
            <li>
              How do you handle billing and payment? What happens if my loved one is unable to pay the fees any given month?
            </li>
            <li>
              Are your staff permitted to administer medications? Or can they only store them?
            </li>
            <li>
              How do you handle medical emergencies?
            </li>
            <li>
              What happens if the care needs of a resident should change? Are additional services available, or does the resident need to look for a new place to live?
            </li>
            <li>
              What happens if a resident is unhappy in the board and care home? Are any upfront fees refunded?
            </li>
            <li>
              How are residents' care needs assessed? Who participates in that assessment? Can family be part of any care plan decisions?
            </li>
            <li>
              What happens if a resident is temporarily hospitalized?
            </li>
            <li>
              How long have your staff members worked at the board and care home? What does the home's owner do to retain them?
            </li>
            <li>
              What training do the staff have? Is ongoing training required?
            </li>
            <li>
              Are there visiting hours for family and friends? Can family or friends spend the night?
            </li>
            <li>
              What security measures are in place? How does the home handle residents with a tendency to wander?
            </li>
            <li>
              May residents bring their own furniture to the board and care home?
            </li>
            <li>
              Can the kitchen accommodate special dietary needs?
            </li>
            <li>
              What would cause you to discharge a resident?
            </li>
          </ul>
          <Paragraph>
            In some states, board and care homes are licensed by the state. Take a few minutes to check with the
            licensing authority to see if there are any complaints or citations involving the home you're
            interested in. You can also check social media review sites such as Yelp or your local Better
            Business Bureau to ascertain how other residents and their families have responded to the board
            and care home in question.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.bnc}`}
            onClick={e => handleAnchor(e, bncRef)}
          >
            Back to top
          </Link>
        </StyledArticle>


        <StyledArticle>
          <NextSteps nextRef={nextRef}
                     toc="board and care homes"
                     label="By asking these questions, and others like them, you can determine whether this senior living option is the right choice for you or your loved one. We are providing additional resources below to help you through the decision-making process. Explore one of the three topics below to help narrow down your search:"
                     links={nextSteps} />

          <Link
            href={`#${sectionIdMap.mc}`}
            onClick={e => handleAnchor(e, mcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
      </>
    );
  };

  const title = 'What is a Board and Care Home Near You';
  const description = 'Learn all about board and care homes, including medical services provided, costs and more. Board and care homes are a great alternative for senior living.';
  const heading = state ? `${listSize} ${tocLabel} near ${city}, ${getStateAbbr(state)}` : `${listSize} ${tocLabel} near ${city}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <HubHeader imagePath="react-assets/hub/board-and-care-home-cover.jpg"
         toc="board and care home"
         heading="What is Board and Care Homes Near You?"
         label="Use our free search to find board and care homes nearby"
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
            <StyledHeading level="title" size="title" _ref={nearRef}>
              {heading}
            </StyledHeading>
            {isFetchingResults && <StyledHeading level="hero" size="title">loading...</StyledHeading>}
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

MemoryCareNearMePage.propTypes = {
  onLocationSearch: func,
  communityList: array.isRequired,
  requestMeta: object.isRequired,
  searchParams: object,
  isFetchingResults: bool,
  handleAnchor: func,
  location: object.isRequired,
  onCurrentLocation: func,
};

export default MemoryCareNearMePage;
