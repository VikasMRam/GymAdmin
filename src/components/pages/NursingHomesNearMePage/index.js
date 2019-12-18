import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';

import { getStateAbbr } from 'sly/services/helpers/url';
import { size, assetPath, palette } from 'sly/components/themes';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateHeader, TemplateContent } from 'sly/components/templates/BasePageTemplate';
import { Image, Label, Heading, Paragraph } from 'sly/components/atoms';
import Footer from 'sly/components/organisms/Footer';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import { getTocSeoLabel } from 'sly/services/helpers/search';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import Link from 'sly/components/atoms/Link';

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${palette('slate', 'stroke')};
  height: ${size('header.home.heroImage.mobileHeight')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: calc(0.5 * ${size('header.home.heroImage.height')});
  }
`;
const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  z-index: 0;
  display: block;
`;
const SearchBoxWrapper = styled.div`
  margin: auto;
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('header.home.heroSearchBox.width')};
  }
`;
const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;
const StyledLabel = styled(Label)`
  text-align: center;
  font-size: ${size('text.subtitle')};
  margin-bottom: ${size('spacing.large')};
`;
const ImageCreditDiv = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: ${size('spacing.large')};
  margin-right: ${size('spacing.large')};
`;

const ImageCreditLabel = styled.label`
  font-size: ${size('text', 'tiny')};
  color: ${palette('white', 'base')};
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

const StyledTable = styled.table`
  border-collapse: collapse;
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  td, th {
    padding: ${size('spacing.regular')};
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  };
`;

const NearMePage = ({
  onLocationSearch,
  searchParams,
  requestMeta,
  communityList,
  isFetchingResults,
  handleAnchor,
  location,
}) => {
  const HeaderContent = (
    <>
      <HeaderContainer />
      <HeroWrapper>
        <StyledImage src={assetPath('images/home/cover4.jpg')} alt="A Home To Love" />
        <SearchBoxWrapper>
          <StyledHeading level="hero" size="hero" palette="white">
            Find The Best Nursing Homes Near You
          </StyledHeading>
          <StyledLabel palette="white">
            Use our free search to find nursing homes nearby
          </StyledLabel>
          <SearchBoxContainer layout="homeHero" onLocationSearch={onLocationSearch} />
        </SearchBoxWrapper>
        <ImageCreditDiv>
          <ImageCreditLabel palette="white">
            Sagebrook Senior Living San Francisco
          </ImageCreditLabel>
        </ImageCreditDiv>
      </HeroWrapper>
    </>
  );

  const { geo } = requestMeta;
  const city = geo && geo.city;
  const state = geo && geo.state;
  const tocLabel = getTocSeoLabel('nursing-homes');

  const topRef = React.createRef();
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

  const sectionIdMap = {
    top: 'top',
    nh: 'what-is-nursing-home',
    services: 'services',
    paying: 'paying',
    how: 'how',
    snf: 'skilled-nursing-facility',
    il: 'independent-living',
    al: 'assisted-living',
    mc: 'memory-care',
    bnc: 'board-and-care-home',
    hospice: 'hospice',
  };

  const SEOContentNH = () => {
    return (
      <>
        <Paragraph innerRef={topRef} />
        <StyledHeading level="title" size="title">
          Table of Contents
        </StyledHeading>
        <StyledArticle>
          <ul>
            <li>
              <Link
                href={`#${sectionIdMap.nh}`}
                onClick={e => handleAnchor(e, nhRef)}
              >
                How to Find the Best Nursing Home Near Me
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.services}`}
                onClick={e => handleAnchor(e, servicesRef)}
              >
                What Services are Offered by Nursing Homes Near Me?
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.paying}`}
                onClick={e => handleAnchor(e, payingRef)}
              >
                Paying for a Nursing Home
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.how}`}
                onClick={e => handleAnchor(e, howRef)}
              >
                Choosing a Nursing Home
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.snf}`}
                onClick={e => handleAnchor(e, snfRef)}
              >
                What Type of Care is Offered at a Skilled Nursing Facility?
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.il}`}
                onClick={e => handleAnchor(e, ilRef)}
              >
                Independent Living
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.al}`}
                onClick={e => handleAnchor(e, alRef)}
              >
                Assisted Living
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.mc}`}
                onClick={e => handleAnchor(e, mcRef)}
              >
                Memory Care
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.bnc}`}
                onClick={e => handleAnchor(e, bncRef)}
              >
                Board and Care Home
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.hospice}`}
                onClick={e => handleAnchor(e, hospiceRef)}
              >
                Hospice
              </Link>
            </li>
          </ul>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={nhRef} />
          <StyledHeading level="title" size="title" >
            How to Find the Best Nursing Home Near Me
          </StyledHeading>
          <Paragraph>
            If you’ve been searching for the best{' '}
            <Link href="https://medlineplus.gov/nursinghomes.html" target="_blank" rel="noopener">
              nursing home
            </Link>
            {' '}near you, there’s a good chance you’ve been mistakenly
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
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={servicesRef} />
          <StyledHeading level="title" size="title" >
            What Services are Offered by Nursing Homes Near Me?
          </StyledHeading>
          <Paragraph>
            Some of the services generally available at any care type that falls under ‘nursing home’ include:
          </Paragraph>
          <ul>
            <li>
              <Paragraph>
                Medication monitoring and administration
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                24-hour emergency care
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Room
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Recreational and social activities
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Assistance with ADLs such as toilet assistance, bathing, and dressing
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Three meals a day
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Rehabilitation services
              </Paragraph>
            </li>
          </ul>
          <Paragraph>
            Do your own nursing home comparison, and you’ll quickly find that you might have really meant something else,
            like the care type called{' '}
            <Link href="https://www.seniorly.com/assisted-living">‘assisted living,’</Link>
            {' '}and the services provided across a single care type can vary
            from place to place. Before we get into a comparison, let’s explore how to pay for a nursing home.

          </Paragraph>
          <Link
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={payingRef} />
          <StyledHeading level="title" size="title">
            Paying for a Nursing Home
          </StyledHeading>
          <Paragraph>
            So, you’ve found a senior living property that you believe is a great nursing home near you.
            How much does it cost?  What are the payment options?  It’s possible to pay for so-called nursing homes in
            several different ways depending on which senior living option you are considering.  As you  evaluate your
            options, it’s essential to ask a senior living expert or the property management what payment options are
            accepted. Some of the most common financing options include:
          </Paragraph>
          <ul>
            <li>
              <Paragraph>
                Private Pay - this is going to be the most common form of payment accepted for assisted living facilities,
                memory care communities, respite care and independent living options. According to{' '}
                <Link href="https://www.genworth.com/aging-and-you/finances/cost-of-care.html" target="_blank" rel="noopener">
                  Genworth
                </Link>
                , in 2019 the average cost for assisted living in the United States was $4,051 per month.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                <Link href="https://www.medicaid.gov/" target="_blank" rel="noopener">
                  Medicaid
                </Link>
                {' '}– This is only available at skilled nursing facilities near you. However, if you’ve been
                looking for nursing homes near you that take Medicaid, you’ll find that while this type of care can
                be covered through Medicaid, requirements and covered services can vary significantly between states.
                Most people have to spend all assets first before Medicaid pays.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                <Link href="https://www.medicare.gov/index" target="_blank" rel="noopener">
                  Medicare
                </Link>
                {' '}- Medicare provides health care benefits for Americans over the age of 65, and it does pay for
                some skilled nursing facility care. Medicare will only pay if a senior resident requires skilled nursing
                care and has been referred by a physician after discharge from a hospital, and only 100 days of
                skilled nursing care are offered per year.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Private Long-Term Care Insurance – This option can supplement Medicare coverage, although the amount
                they’ll pay for senior living of any kind varies from policy to policy.
              </Paragraph>
            </li>
          </ul>
          <Link
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={howRef} />
          <StyledHeading level="title" size="title">
            Choosing a Nursing Home: Your Nursing Home Comparison Checklist
          </StyledHeading>
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
            <Link href="https://www.seniorly.com/agents">local senior living expert</Link>
            {' '}in almost any city
            in the United States.  These are senior housing experts who can assist you through every step of the process,
            from touring to negotiating rent to moving.  Their services are 100% free.  If you would like their assistance,
            call us at (855) 866-4515 or email us at {' '}
            <Link href="mailto:ask@seniorly.com">
              ask@seniorly.com.
            </Link>
          </Paragraph>
          <Link
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={snfRef} />
          <StyledHeading level="title" size="title">
            What Type of Care is Offered at a Skilled Nursing Facility?
          </StyledHeading>
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
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <StyledHeading level="title" size="title">
            Features of Other Senior Living Options
          </StyledHeading>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={ilRef} />
          <StyledHeading level="subtitle" size="subtitle" >
            Independent Living
          </StyledHeading>
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
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={alRef} />
          <StyledHeading level="subtitle" size="subtitle" >
            Assisted Living
          </StyledHeading>
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
          <Link
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Paragraph innerRef={mcRef} />
          <StyledHeading level="subtitle" size="subtitle" >
            Memory Care
          </StyledHeading>
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
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Paragraph innerRef={bncRef} />
          <StyledHeading level="subtitle" size="subtitle" >
            Board and Care Home
          </StyledHeading>
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
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Paragraph innerRef={hospiceRef} />
          <StyledHeading level="subtitle" size="subtitle" >
            Hospice
          </StyledHeading>
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
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
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
      </>
    );
  };

  const title = 'Find the Best Nursing Home Near You ';
  const description = 'Search nursing homes near you that range from assisted living facilities, memory care communities and other senior living options. Compare cost, property highlights and more.';
  const heading = state ? `${tocLabel} near ${city}, ${getStateAbbr(state)}` : `${tocLabel} near ${city}`;

  return (
    <>
      <TemplateHeader>{HeaderContent}</TemplateHeader>
      <TemplateContent>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
        {SEOContentNH()}
        <StyledArticle>
          <StyledHeading level="title" size="title">
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
        </StyledArticle>
      </TemplateContent>
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
