import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';

import { size } from 'sly/common/components/themes';
import { faqPage, tocSiteNavigationLD, guideLD } from 'sly/web/services/helpers/html_headers';
import { getStateAbbr } from 'sly/web/services/helpers/url';
import HubHeader from 'sly/web/components/molecules/HubHeader';
import PhoneCTAFooter from 'sly/web/components/molecules/PhoneCTAFooter';
import {
  HubPageTemplate,
  makeBody,
  makeColumn,
  makeTwoColumn,
  makeWrapper,
  makeStickToTop,
  makeArticle,
  makeOneColumnListWrapper,
} from 'sly/web/components/templates/HubPageTemplate';
import { Heading, Paragraph } from 'sly/web/components/atoms';
import Footer from 'sly/web/components/organisms/Footer';
import { getTocSeoLabel } from 'sly/web/services/helpers/search';
import CommunitySearchList from 'sly/web/components/organisms/CommunitySearchList';
import { Link } from 'sly/common/components/atoms';
import ListItem from 'sly/web/components/molecules/ListItem';

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
  const tocLabel = getTocSeoLabel('skilled-nursing-facility');

  const snfRef = React.createRef();
  const costRef = React.createRef();
  const servicesRef = React.createRef();
  const otherRef = React.createRef();
  const nextRef = React.createRef();
  const medicareRef = React.createRef();
  const paymentRef = React.createRef();
  const faqRef = React.createRef();
  const moreRef = React.createRef();

  const tocList = [
    {
      title: "What is a Skilled Nursing Facility?",
      id: "what-is-skilled-nursing-facility",
      ref: snfRef
    },
    {
      title: "What is The Cost of a Skilled Nursing Facility?",
      id: "cost",
      ref: costRef
    },
    {
      title: "What Services are Provided in a Skilled Nursing Facility?",
      id: "services",
      ref: servicesRef
    },
    {
      title: "Skilled Nursing Facility vs Other Care Types",
      id: "other",
      ref: otherRef
    },
    {
      title: "How to Choose a Skilled Nursing Facility Near Me",
      id: "next",
      ref: nextRef
    },
    {
      title: "Does Medicare Pay for Hospice in a Skilled Nursing Facility?",
      id: "medicare",
      ref: medicareRef
    },
    {
      title: "Other Payment Options",
      id: "payment",
      ref: paymentRef
    },
    {
      title: "Skilled Nursing Facility FAQs",
      id: "frequently-asked-question",
      ref: faqRef

    },
    {
      title: "More Information",
      id: "more",
      ref: moreRef

    },

  ];

  const faqs = [
    {
      question: "Does Medicare pay for hospice in a skilled nursing facility?",
      answer: "Yes, Medicare can be used to pay up to 100% of hospice care in a skilled nursing facility (SNF). However, seniors must qualify and this is where it can get complicated. Medicare will only pay if a senior resident requires hospice care prescribed by a physician. Generally, Medicare will only cover up to 100 days when a senior is in a skilled nursing facility, regardless of why.  Be sure to consult with a hospice provider to learn more about payment options."
    },
    {
      question: "Is a skilled nursing facility a hospital?",
      answer: "No, a skilled nursing facility is not a hospital. It might look like one, though, since senior residents are provided 24/7 medical care. In fact, many residents are discharged from a hospital and sent to a SNF for either rehabilitative care or even end of life hospice care."
    },
    {
      question: "What is skilled nursing facility vs nursing home?",
      answer: "The term “nursing home does NOT automatically equal a skilled nursing facility (SNF). It’s a catch-all phrase used for many types of senior living. “Nursing home” most typically means an assisted living community near you, but can also refer to memory care facilities and other types of senior living communities. Always confirm beforehand what types of services a nursing home offers and whether they meet your medical and non-medical needs."
    },
    {
      question: "What do skilled nursing facilities provide?",
      answer: "A skilled nursing facility (SNF) is a type of “nursing home.” A skilled nursing facility is a type of long-term or convalescent community that provides 24/7, nursing and therapy care. What differentiates a skilled nursing facility (SNF) from other types of senior living options is that they provide healthcare services that can only be safely and effectively performed by professionals or technical personnel."
    },
    {
      question: "Does the VA pay for skilled nursing facility?",
      answer: "Yes, the VA will pay for a stay in a skilled nursing facility for qualified Veterans."},
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

  const SEOContentSNF = () => {
    return (
      <>
        <StyledArticle>
          <Heading level="title" size="title" ref={snfRef} >
            What is a Skilled Nursing Facility?
          </Heading>
          <Paragraph>
            A skilled nursing facility (SNF) is type of “
            <Link href="https://www.seniorly.com/nursing-homes">
              nursing home
            </Link>
            .” A skilled nursing facility is a type of long-term or convalescent community that provides 24/7,
            nursing and therapy care. What differentiates a skilled nursing facility (SNF) from other types of
            senior living options is that they provide healthcare services that can only be safely and effectively
            performed by professionals or technical personnel.
          </Paragraph>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, snfRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" ref={costRef} >
            What is The Cost of a Skilled Nursing Facility?
          </Heading>
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
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, snfRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" ref={servicesRef}>
            What Services are Provided in a Skilled Nursing Facility?
          </Heading>
          <Paragraph>
            Skilled nursing facilities (SNF) can be a great option if you or your loved one need daily skilled
            assistance to treat, manage, or observe a condition, and evaluate medical care. Skilled nursing
            facilities typically offer:
          </Paragraph>
          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Physical, speech and occupational therapy services
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Mobility assistance
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Post-hospitalization rehabilitation services
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              <div>
                Custodial care to assist residents with{' '}
                <Link href="https://www.seniorly.com/resources/articles/what-are-the-activities-of-daily-living-adls">
                  activities of daily living (ADLs)
                </Link>
                {' '}such as bathing and dressing.
              </div>
            </ListItem>
          </ListWrapper>
          <Paragraph>
            A SNF helps senior residents recover after a significant health event while also offering a community where they can be with others who share similar experiences.
          </Paragraph>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, snfRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" ref={otherRef}>
            Skilled Nursing Facility vs Other Care Types
          </Heading>
          <Heading level="subtitle" size="subtitle">
            Nursing Home
          </Heading>
          <Paragraph>
            The term “
            <Link href="https://www.seniorly.com/nursing-homes">
              nursing home
            </Link>
            {' '}does NOT automatically equal a skilled nursing facility (SNF).
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

          <Heading level="subtitle" size="subtitle">
            Independent Living
          </Heading>
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

          <Heading level="subtitle" size="subtitle">
            Assisted Living
          </Heading>
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
            <Link href="https://www.seniorly.com/agents">Local Senior Living Expert</Link>
            {' '}who specializes within the city you’re searching.

          </Paragraph>

          <Heading level="subtitle" size="subtitle">
            Memory Care
          </Heading>
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
            <Link href="https://www.seniorly.com/agents">Local Senior Living Expert</Link>
            {' '}who specializes within the city you’re searching.
          </Paragraph>

          <Heading level="subtitle" size="subtitle">
            Rehab
          </Heading>
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

          <Heading level="subtitle" size="subtitle">
            Hospice
          </Heading>
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
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, snfRef)}
          >
            Back to top
          </Link>


        </StyledArticle>
        <StyledArticle>
          <Paragraph innerR/>
          <Heading level="title" size="title" ref={nextRef}>
            How to Choose a Skilled Nursing Facility Near Me
          </Heading>
          <Paragraph>
            You may be wondering “is skilled nursing near me?” or “how do I find the best skilled nursing facilities near me?”
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
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, snfRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" ref={medicareRef}>
            Does Medicare Pay for Hospice in a Skilled Nursing Facility?
          </Heading>
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
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, snfRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" ref={paymentRef}>
            Other Payment Options
          </Heading>
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
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, snfRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
      <StyledArticle>
        <Heading level="title" size="title" ref={faqRef} >
          Skilled Nursing Facility FAQs
        </Heading>
        <Paragraph>
          Below you will find a sampling of the 5 most frequently asked questions we get regarding skilled nursing facilities (SNF).
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
          <Heading level="title" size="title" ref={moreRef}>
            More Information
          </Heading>
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
            <Link href="https://www.seniorly.com/agents">Local Senior Living Expert</Link>
            , and we’ll connect you with the type of retirement living that’s right for you or your family.

          </Paragraph>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, snfRef)}
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
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {faqPage(faqs)}
        {tocSiteNavigationLD("https://www.seniorly.com/skilled-nursing-facility", tocList)}
        {guideLD(title, description, "https://www.seniorly.com/skilled-nursing-facility")}
      </Helmet>

      <HubHeader imagePath="react-assets/hub/memory-care-cover.jpg"
                 toc="skilled nursing facility"
                 heading="What is Skilled Nursing Facility Near You?"
                 label="Use our free search to find skilled nursing facilities nearby"
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
            {SEOContentSNF()}
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
      <PhoneCTAFooter/>
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
