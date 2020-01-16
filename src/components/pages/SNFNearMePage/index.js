import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';

import { size, assetPath, palette } from 'sly/components/themes';

import { getStateAbbr } from 'sly/services/helpers/url';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateHeader, TemplateContent } from 'sly/components/templates/BasePageTemplate';
import { Label, Heading, Paragraph } from 'sly/components/atoms';
import Footer from 'sly/components/organisms/Footer';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import { getTocSeoLabel } from 'sly/services/helpers/search';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import Link from 'sly/components/atoms/Link';
import ResponsiveImage from 'sly/components/atoms/ResponsiveImage';

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${palette('slate', 'stroke')};
  height: ${size('header.home.heroImage.mobileHeight')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: calc(0.5 * ${size('header.home.heroImage.height')});
  }
`;
const StyledImage = styled(ResponsiveImage)`
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
        <StyledImage path="react-assets/home/cover4.jpg" alt="A Home To Love" height={320} />
        <SearchBoxWrapper>
          <StyledHeading level="hero" size="hero" palette="white">
            Find The Best Skilled Nursing Facility Near Me
          </StyledHeading>
          <StyledLabel palette="white">
            Use our free search to find skilled nursing facilities nearby
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
  const tocLabel = getTocSeoLabel('skilled-nursing-facility');

  const topRef = React.createRef();
  const snfRef = React.createRef();
  const costRef = React.createRef();
  const servicesRef = React.createRef();
  const otherRef = React.createRef();
  const nextRef = React.createRef();
  const medicareRef = React.createRef();
  const paymentRef = React.createRef();
  const moreRef = React.createRef();

  const sectionIdMap = {
    top: 'top',
    snf: 'what-is-skilled-nursing-facility',
    cost: 'cost',
    services: 'services',
    other: 'other',
    next: 'next',
    medicare: 'medicare',
    payment: 'payment',
    more: 'more',
  };

  const SEOContentSNF = () => {
    return (
      <>
        <Paragraph innerRef={topRef} />
        <StyledHeading level="title"size="title">
          Table of Contents
        </StyledHeading>
        <StyledArticle>
          <ul>
            <li>
              <Link
                href={`#${sectionIdMap.snf}`}
                onClick={e => handleAnchor(e, snfRef)}
              >
                What is a Skilled Nursing Facility?
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.cost}`}
                onClick={e => handleAnchor(e, costRef)}
              >
                What is The Cost of a Skilled Nursing Facility?
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.services}`}
                onClick={e => handleAnchor(e, servicesRef)}
              >
                What Services are Provided in a Skilled Nursing Facility?
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.other}`}
                onClick={e => handleAnchor(e, otherRef)}
              >
                Skilled Nursing Facility vs Other Care Types
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.next}`}
                onClick={e => handleAnchor(e, nextRef)}
              >
                How to Choose a Skilled Nursing Facility Near Me
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.medicare}`}
                onClick={e => handleAnchor(e, medicareRef)}
              >
                Does Medicare Pay for Hospice in a Skilled Nursing Facility?
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.payment}`}
                onClick={e => handleAnchor(e, paymentRef)}
              >
                Other Payment Options
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.more}`}
                onClick={e => handleAnchor(e, moreRef)}
              >
                More Information
              </Link>
            </li>
          </ul>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={snfRef} />
          <StyledHeading level="title" size="title" >
            What is a Skilled Nursing Facility?
          </StyledHeading>
          <Paragraph>
            A skilled nursing facility is a type of long-term or convalescent community that provides 24/7,
            nursing and therapy care. What differentiates a skilled nursing facility (SNF) from other types of
            senior living options is that they provide healthcare services that can only be safely and effectively
            performed by professionals or technical personnel.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={costRef} />
          <StyledHeading level="title" size="title" >
            What is The Cost of a Skilled Nursing Facility?
          </StyledHeading>
          <Paragraph>
            The average cost for a private room at a skilled nursing facility (SNF) in the US is $8,517 per month,
            according to the{' '}
            <Link href="https://www.genworth.com/aging-and-you/finances/cost-of-care.html" target="_black" rel="noopener">
              Genworth 2019 Survey.
            </Link>
            {' '}The cost of a semi-private room at a skilled nursing facility can average $7,513 per month.
            Note that this will change city by city and state by state.
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
          <StyledHeading level="title" size="title">
            What Services are Provided in a Skilled Nursing Facility?
          </StyledHeading>
          <Paragraph>
            Skilled nursing facilities (SNF) can be a great option if you or your loved one need daily skilled
            assistance to treat, manage, or observe a condition, and evaluate medical care. Skilled nursing
            facilities typically offer:
          </Paragraph>
          <ul>
            <li>
              <Paragraph>
                Physical, speech and occupational therapy services
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Mobility assistance
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Post-hospitalization rehabilitation services
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Custodial care to assist residents with{' '}
                <Link href="https://www.seniorly.com/resources/articles/what-are-the-activities-of-daily-living-adls">
                  activities of daily living (ADLs)
                </Link>
                {' '}such as bathing and dressing.
              </Paragraph>
            </li>
          </ul>
          <Paragraph>
            A SNF helps senior residents recover after a significant health event while also offering a community where they can be with others who share similar experiences.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={otherRef} />
          <StyledHeading level="title" size="title">
            Skilled Nursing Facility vs Other Care Types
          </StyledHeading>
          <StyledHeading level="subtitle" size="subtitle">
            Nursing Home
          </StyledHeading>
          <Paragraph>
            The term “nursing home” does NOT automatically equal a skilled nursing facility (SNF).
            It’s a catch-all phrase used for many types of senior living. “Nursing home” most typically means an{' '}
            <Link href="https://www.seniorly.com/assisted-living">
              assisted living community near you,
            </Link>
            {' '}but can also refer to{' '}
            <Link href="https://www.seniorly.com/memory-care">
              memory care facilities
            </Link>
            {' '}and other types of senior living communities. Always confirm beforehand what types of services a
            nursing home offers and whether they meet your medical and non-medical needs. What follows is a more detailed
            look at the difference between a skilled nursing facility and all of the other retirement living community types.
          </Paragraph>

          <StyledHeading level="subtitle" size="subtitle">
            Independent Living
          </StyledHeading>
          <Paragraph>
            <Link href="https://www.seniorly.com/independent-living">
              Independent living communities
            </Link>
            {' '}don’t offer nursing or therapeutic services or assistance with ADLs.
            Independent living communities are designed for senior residents who don’t require regular care but
            who want to have a maintenance-free lifestyle surrounded by their peers.
          </Paragraph>
          <Paragraph>
            Independent Living communities remove the need for home upkeep and provide plenty of amenities,
            such as on-site dining and exercise facilities, housekeeping services, and planned social activities.
          </Paragraph>

          <StyledHeading level="subtitle" size="subtitle">
            Assisted Living
          </StyledHeading>
          <Paragraph>
            Rather than focusing on nursing and therapeutic services, assisted living focuses on lifestyle services.{' '}
            <Link href="https://www.seniorly.com/assisted-living">
              Assisted living facilities near you
            </Link>
            {' '}are designed for senior residents who are largely independent, don’t need full-time medical care, but
            regularly need assistance with{' '}
            <Link href="https://www.seniorly.com/resources/articles/what-are-the-activities-of-daily-living-adls">
              activities of daily living (ADLs)
            </Link>
            {' '}such as bathing, dressing and housekeeping.

          </Paragraph>
          <Paragraph>
            If you would like to find the best assisted living communities near you, we are here to help.
            Email us at{' '}
            <Link href="mailto:ask@seniorly.com">ask@seniorly.com</Link>
            {' '}or call us at (855) 866-4515 to connect to a{' '}
            <Link href="https://www.seniorly.com/agents">local senior living expert</Link>
            {' '}who specializes within the city you’re searching.

          </Paragraph>

          <StyledHeading level="subtitle" size="subtitle">
            Memory Care
          </StyledHeading>
          <Paragraph>
            <Link href="https://www.seniorly.com/https://www.seniorly.com/memory-care">
              Memory care facilities
            </Link>
            {' '}are designed to help seniors with Alzheimer’s, dementia and other cognitive conditions.
            The level of senior living is similar to the types of services provided in assisted living,
            but are designed around the needs of senior residents with dementia.
          </Paragraph>
          <Paragraph>
            For example, exits at these facilities are typically secured and alarmed to prevent residents from
            wandering away by accident. Memory care residents receive assistance with ADLs, as well as supervised,
            24/7 care for progressive cognitive disorders.
          </Paragraph>
          <Paragraph>
            We can help you find the best memory care communities near you. Email us at{' '}
            <Link href="mailto:ask@seniorly.com">ask@seniorly.com</Link>
            {' '}or call us at (855) 866-4515 to connect to a{' '}
            <Link href="https://www.seniorly.com/agents">local senior living expert</Link>
            {' '}who specializes within the city you’re searching.
          </Paragraph>

          <StyledHeading level="subtitle" size="subtitle">
            Rehab
          </StyledHeading>
          <Paragraph>
            Inpatient rehab facilities (IRF) are intended for those who need a higher level of rehabilitation
            following traumatic injuries and surgeries. While they offer a similar set of services as skilled nursing,
            they differ in the intensity of their therapeutic services and care program.
          </Paragraph>
          <Paragraph>
            More simply, <strong>rehab is intended for acute care,</strong> while <strong>skilled nursing is intended for subacute care.</strong>
            {' '}It’s common for people who have been in an IRF to transfer to a skilled nursing facility if they no
            longer require acute care, but are not yet ready to return home.
          </Paragraph>

          <StyledHeading level="subtitle" size="subtitle">
            Hospice
          </StyledHeading>
          <Paragraph>
            Skilled nursing facilities are generally intended for senior residents who need subacute medical care
            for non-terminal conditions.{' '}
            <Link href="https://www.seniorly.com/resources/articles/what-is-hospice-care">
              Hospice care
            </Link>
            {' '}is designed around providing end-of-life care and support for the patient and their loved ones.
            While skilled nursing care is focused on treatment and rehabilitation, hospice focuses on pain relief and comfort,
            it is not trying to cure the illness.
          </Paragraph>

          <Link
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>


        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={nextRef} />
          <StyledHeading level="title"size="title">
            How to Choose a Skilled Nursing Facility Near Me
          </StyledHeading>
          <Paragraph>
            You may be wondering “is skilled nursing near me?” or “how do I find the best skilled nursing facilities near me”?
            Fortunately, high-quality skilled nursing communities can be found all over the country, and they
            never shy away from answering questions. To get you started, here are some basic questions
            you can ask prospective skilled nursing providers.
          </Paragraph>
          <ul>
            <li>
              <Paragraph>
                What services and level of care does your skilled nursing facility offer?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Are all services included in the basic monthly rate, or do some of them cost extra?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                What personal assistance do senior residents receive? How often do they receive it?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                How many meals are provided each day? Can you accommodate special diets (gluten-free, kosher, etc.)?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                What happens if a senior resident requires a more intensive level of care than you typically provide?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Do senior residents have private for semi-private rooms?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                What housekeeping, maintenance, and laundry services do you provide? How often do you provide them?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                What are the skilled nursing facility requirements for admission?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                How do I pay for skilled nursing?
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Can I use Medicaid and/or Medicare?
              </Paragraph>
            </li>
          </ul>

          <Paragraph>
            Make sure you know the care and service requirements for you or your loved one to help determine the best skilled nursing facility fit.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={medicareRef} />
          <StyledHeading level="title" size="title">
            Does Medicare Pay for Hospice in a Skilled Nursing Facility?
          </StyledHeading>
          <Paragraph>
            Medicare Part A will cover short-term skilled nursing care provided in an approved SNF{' '}
            <Link href="https://www.medicare.gov/coverage/skilled-nursing-facility-snf-care" target="_blank" rel="noopener">
              under certain conditions:
            </Link>
          </Paragraph>
          <ul>
            <li>
              <Paragraph>
                You have Part A coverage and have days left in your benefit period to use.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                You have a qualifying 3-day hospital stay before entering the SNF.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Your doctor has decided that you need daily skilled care that must be provided by, or under the supervision of, skilled nursing or therapy staff.
              </Paragraph>
            </li>
          </ul>

          <Paragraph>
            Medicare coverage for skilled nursing facilities can extend up to 100 days. To be covered by Medicare,
            care must be treating a hospital-related medical condition, or a condition that started while
            you were in a SNF for a hospital-related condition.

          </Paragraph>
          <Link
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={paymentRef} />
          <StyledHeading level="title" size="title" >
            Other Payment Options
          </StyledHeading>
          <Paragraph>
            While skilled nursing often comes after you or your loved one has experienced some sort of unexpected
            medical event, if you realize that a SNF is in the near future, you should start discussing
            financing options to cover costs. In addition to Medicare, here are some ways that you or your
            loved one can pay for skilled nursing:
          </Paragraph>
          <ul>
            <li>
              <Paragraph>
                <Link href="https://www.medicaid.gov/medicaid/ltss/institutional/nursing/index.html" target="_black" rel="noopener"> Medicaid:</Link>
                {' '}The Medicaid program will cover skilled nursing care for income-eligible seniors at state-certified and Medicaid approved skilled nursing facilities.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                <Link href="https://www.seniorly.com/resources/articles/long-term-care-insurance-for-respite-care" target="_black" rel="noopener">Long-Term Care Insurance:</Link>
                {' '}Long-term care insurance (LTC) is insurance for seniors that will cover a variety of expenses associated with long-term stays, such as a hospital visit or at a skilled nursing facility.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                <Link href="https://www.seniorly.com/resources/articles/veterans-benefits-for-assisted-living" target="_black" rel="noopener">Veteran Benefits:</Link>
                {' '}The VA provides long-term care services that senior veterans can use to cover skilled nursing care. To be eligible for coverage, you must be signed up for VA healthcare, the VA must agree that you need skilled nursing services to help with your ongoing treatment and personal care, and the service is provided in an approved facility near you.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Pay out-of-pocket: Often families will pull from their savings or contribute a portion of their income to cover the cost of skilled nursing. If you or your parent have a house that will no longer be lived in (for example, you plan to move into an assisted living community once you no longer need skilled nursing), you might consider selling it, taking out a reverse mortgage, or using the home as a rental property.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                <Link href="https://www.medicare.gov/your-medicare-costs/get-help-paying-costs/pace" target="_black" rel="noopener">Program of All-Inclusive Care for the Elderly:</Link>
                {' '}PACE is a federal program that helps people meet their health care needs within their community instead of going to a care facility. To be eligible, you must be 55 or older, live in a PACE organization service area and need “a nursing home-level of care”.
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
          <Paragraph innerRef={moreRef} />
          <StyledHeading level="title" size="title">
            More Information
          </StyledHeading>
          <Paragraph>
            If you have more questions about a skilled nursing facility or how to find a skilled nursing facility, Seniorly is here to help.
            Our powerful website will search through thousands of facilities across the country that you can connect with directly.
          </Paragraph>
          <Paragraph>
            If you are considering any other types of senior living community, like an assisted living facility, email us at{' '}
            <Link href="mailto:ask@seniorly.com">
              ask@seniorly.com
            </Link>
            {' '}or call us at (855) 866-4515 to speak with a{' '}
            <Link href="https://www.seniorly.com/agents">local senior living expert</Link>
            , and we’ll connect you with the type of retirement living that’s right for you or your family.

          </Paragraph>
          <Link
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
      </>
    );
  };

  const title = 'Find the Best Skilled Nursing Facility Near You';
  const description = 'Search skilled nursing facilities near you. Compare cost, medicare and medicaid options, property highlights and more.';
  const heading = state ? `${tocLabel} near ${city}, ${getStateAbbr(state)}` : `${tocLabel} near ${city}`;

  return (
    <>
      <TemplateHeader>{HeaderContent}</TemplateHeader>
      <TemplateContent>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
        {SEOContentSNF()}
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
