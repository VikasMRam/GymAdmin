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
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
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
`;

const ADLWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
  margin-bottom: ${size('spacing.large')};
`;

const ADLIconItem = styled.div`
  width: 100%;
  flex: 0 100%;
  display: flex;
  padding: ${size('spacing.large')};
  justify-content: space-between;
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: 50%;
    flex: 0 50%;
  }
`;


const TwoColumn = makeTwoColumn('div');
const Body = makeBody('div');
const Column = makeColumn('aside');
const Wrapper = makeWrapper('div');

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
  const slilRef = React.createRef();
  const slalRef = React.createRef();
  const slmcRef = React.createRef();
  const slrcRef = React.createRef();
  const slnhRef = React.createRef();
  const slsnfRef = React.createRef();
  const slccrcRef = React.createRef();
  const slbncRef = React.createRef();
  const slhcRef = React.createRef();
  const nextRef = React.createRef();
  const nearRef = React.createRef();

  const sectionIdMap = {
    sl: 'what-is-senior-living',
    cost: 'cost',
    choose: 'choosing-senior-living',
    slil: 'independent-living',
    slal: 'assisted-living',
    slmc: 'memory-care',
    slbnc: 'board-and-care-home',
    slhc: 'in-home-care',
    slccrc: 'ccrc',
    slnh: 'nursing-home',
    slrc: 'respite-care',
    slsnf: 'skilled-nursing-facility',
    next: 'next-steps',
    near: 'senior-living-near-you',
  };

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
      caption: "HMark Wolff has over 3 years of experience helping families finding independent living, assisted living, and memory care options. He is dedicated to guiding families throughout the senior living process.",
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
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            What is Senior Living?
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.cost}`}
            onClick={e => handleAnchor(e, costRef)}
          >
            How Much Does Senior Living Cost?
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.choose}`}
            onClick={e => handleAnchor(e, chooseRef)}
          >
            The Benefits in Choosing a Senior Living Community
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.slil}`}
            onClick={e => handleAnchor(e, slilRef)}
          >
            Senior Living: Independent Living
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.slal}`}
            onClick={e => handleAnchor(e, slalRef)}
          >
            Senior Living: Assisted Living
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.slmc}`}
            onClick={e => handleAnchor(e, slmcRef)}
          >
            Senior Living: Memory Care
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.slbnc}`}
            onClick={e => handleAnchor(e, slbncRef)}
          >
            Senior Living: Board and Care Home
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.slhc}`}
            onClick={e => handleAnchor(e, slhcRef)}
          >
            Senior Living: In-Home Care
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.slrc}`}
            onClick={e => handleAnchor(e, slrcRef)}
          >
            Senior Living: Respite Care
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.slccrc}`}
            onClick={e => handleAnchor(e, slccrcRef)}
          >
            Senior Living: CCRC
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.slnh}`}
            onClick={e => handleAnchor(e, slnhRef)}
          >
            Senior Living: Nursing Home
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.slsnf}`}
            onClick={e => handleAnchor(e, slsnfRef)}
          >
            Senior Living: Skilled Nursing Facility
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
            How to Find the Best Senior Living Near Me
          </StyledLink>
        </Paragraph>
      </>
    )
  };

  const SEOContent = () => {
    return (
      <>
        <StyledArticle>
          <StyledHeading level="title" size="title" _ref={slRef} >
            What is Senior Living?
          </StyledHeading>
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
          <StyledHeading level="title" size="title" _ref={costRef}>
            How Much Does Senior Living Cost?
          </StyledHeading>
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
            When assessing the cost of a senior living community, remember that the price can include room and board,
            maintenance and landscaping, meals, personal care services (if applicable), and life enrichment programs.
            Often, seniors find that the cost of senior living is lower than trying to pay for each of these elements,
            plus transportation, property taxes, etc when maintaining a separate home.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <StyledHeading level="title" size="title" _ref={chooseRef} >
            The Benefits in Choosing a Senior Living Community
          </StyledHeading>

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
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Life Enrichment Programs
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Volunteering Opportunities
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Peer-to-Peer Support
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Well-balanced Meals
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
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

          <StyledHeading level="title" size="title" _ref={slilRef}>
            Senior Living: Independent Living
          </StyledHeading>
          <Paragraph>
            <Link href="https://www.seniorly.com/independent-living">
              Independent living communities
            </Link>
            {' '}offer a maintenance-free lifestyle for senior adults who don't require assistance with ADLs
            or medical care, but who want to streamline their lives and live in a community of peers. Senior adults
            who choose independent living are typically active and healthy, often over age 55.
            They want to avoid the hassle of home upkeep. Depending on the independent living property,
            residents either purchase or rent a private apartment that can range from a studio apartment to a
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
          <StyledHeading level="title" size="title" _ref={slalRef} >
            Senior Living: Assisted Living
          </StyledHeading>

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
          <ADLWrapper>
            <ADLIconItem>
              Personal Hygiene
              <Icon icon="bath" palette="secondary" variation="dark35" />
            </ADLIconItem>
            <ADLIconItem>
              Feeding
              <Icon icon="food" palette="secondary" variation="dark35" />
            </ADLIconItem>
            <ADLIconItem>
              Continence Management
              <Icon icon="washroom" palette="secondary" variation="dark35" />
            </ADLIconItem>
            <ADLIconItem>
              Ambulating
              <Icon icon="accessibility" palette="secondary" variation="dark35" />
            </ADLIconItem>
            <ADLIconItem>
              Dressing
              <Icon icon="shirt" palette="secondary" variation="dark35" />
            </ADLIconItem>
            <ADLIconItem>
              Toileting
              <Icon icon="toilet" palette="secondary" variation="dark35" />
            </ADLIconItem>
          </ADLWrapper>
          <Paragraph>
            In assisted living communities, residents maintain a sense of freedom with the assurance that staff is
            always on-hand to help when needed. They also enjoy daily opportunities to socialize with unique
            services and amenities.  They also form new friendships within the community.
          </Paragraph>
          <Paragraph>
            In general, lifestyle amenities include:
          </Paragraph>
          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Room and board
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              24-hour assistance with activities of daily living (ADLs)
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Home maintenance, housekeeping & laundry services
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Social engagement
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
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
              local senior living expert in that city.
            </Link>
            {' '}These senior living advisors know all the communities and
            can share costs, availability, features and so much more at no cost to you. To connect to one of our
            approved senior living advisors, email us now at ask@seniorly.com or call (855) 866-4515.
          </Paragraph>
          <StyledHeading level="subtitle" size="subtitle" >
            What Is A Local Senior Living Expert?
          </StyledHeading>
          <WhatIsPartnerAgent toc="memory care" agents={agents}/>
          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <StyledHeading level="title" size="title" _ref={slmcRef} >
            Senior Living: Memory Care
          </StyledHeading>
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
            A local senior living expert in the city of your choice can share the details about all the memory care
            communities. They can set up tours and often help negotiate fees on your behalf.
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
          <StyledHeading level="title" size="title" _ref={slbncRef} >
            Senior Living: Board and Care Home
          </StyledHeading>
          <Paragraph>
            A{' '}
            <Link href="https://www.seniorly.com/memory-care">
              board and care home
            </Link>
            {' '}, also known as a residential care home, is a community for senior adults located within a residential
            neighborhood. These intimate homes are similar to assisted living communities but on a much smaller scale.
          </Paragraph>
          <Paragraph>
            Seniors typically choose board and care homes when they want to live somewhere that has a more close-knit,
            home-like feeling, rather than a large community. Staff can help with a wide variety of personal services and
            the owner or manager often lives there with the residents, (though there's no requirement for staff to be
            available to residents 24/7).
          </Paragraph>
          <Paragraph>
            Many board and care homes do not have websites, so it’s very useful to connect to a local senior living expert
            who knows all of the residential care homes available within the city you are searching. To connect to one of
            our approved senior living advisors, email us now at ask@seniorly.com or call (855) 866-4515.
          </Paragraph>

          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <StyledHeading level="title" size="title" _ref={slhcRef} >
            Senior Living: In-Home Care
          </StyledHeading>
          <Paragraph>
            With{' '}
            <Link href="https://www.seniorly.com/in-home-care">
              in-home care
            </Link>
            {' '} , professionally trained caregivers work to keep seniors as independent as possible while
            providing the personal, non-medical care they need to stay in their homes. Caregivers typically help
            aging citizens with ADLs such as bathing and dressing, meal preparation, and medication management.
            Depending on the senior’s needs, the caregiver may visit daily, once a week or live in-home to provide
            full-time assistance and companionship.
          </Paragraph>

          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <StyledHeading level="title" size="title" _ref={slrcRef} >
            Senior Living: Respite Care
          </StyledHeading>
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
          <StyledHeading level="title" size="title" _ref={slccrcRef} >
            Senior Living: CCRC
          </StyledHeading>
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
          <StyledHeading level="title" size="title" _ref={slnhRef} >
            Senior Living: Nursing Home
          </StyledHeading>
          <Paragraph>
            The term “
            <Link href="https://www.seniorly.com/nursing-homes">
              nursing home
            </Link>
            ” is a catch-all phrase for senior living facilities that most typically means an assisted living community.
            Don’t be misled by the word “nursing”, since most people who live in a nursing home don’t need skilled nursing.
            Rather, they require non-medical assistance with activities of daily living (ADLs). However, other types of
            senior living might use the title “nursing home” so always confirm beforehand what types of care and services
            they offer.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.sl}`}
            onClick={e => handleAnchor(e, slRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <StyledHeading level="title" size="title" _ref={slsnfRef} >
            Senior Living: Skilled Nursing Facility
          </StyledHeading>
          <Paragraph>
            The term “
            <Link href="https://www.seniorly.com/skilled-nursing-facility">
              Skilled nursing facilities
            </Link>
            (SNF) are different from other types of senior living communities since they provide 24/7 healthcare
            services that can only be safely and effectively performed by professionals or technical personnel.
            They are intended for more short-term stays while the resident recovers from a medical procedure.
            Unlike other forms of senior housing, which are often private pay, skilled nursing facilities are
            generally covered by{' '}
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
                  No
                </td>
              </tr>
              <tr>
                <td>
                  Covered by Medicaid/Medicare
                </td>
                <td>
                  No
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
          <NextSteps nextRef={nextRef}
                     label="Think a senior living community might be right for you or your loved one? Learn more about each type below to help narrow down your search:"
                     links={nextSteps} />

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
            <StyledHeading level="title" size="title" _ref={nearRef}>
              {heading}
            </StyledHeading>
            <StyledArticle>
              <Paragraph>
                There are a lot of different factors that go into finding the right senior living community for you or your loved one. Take time to meet with everyone who is involved in the decision and list the desired lifestyle amenities and location. Figure out your price range and investigate potential ways of financing senior living. It’s also important to talk with your doctor to determine the level of care needed.

              </Paragraph>
            </StyledArticle>
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
      {/*<TemplateContent>*/}
        {/*<StyledArticle><SeoLinks title="Find Assisted Living Near You by City" links={ALSeoCities} /></StyledArticle>*/}
        {/*<StyledArticle><SeoLinks title="Find Assisted Living Near You by State" links={ALSeoStates} /></StyledArticle>*/}
      {/*</TemplateContent>*/}
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
