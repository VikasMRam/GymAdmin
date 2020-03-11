import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';
import ListItem from 'sly/components/molecules/ListItem';
import HubHeader from 'sly/components/molecules/HubHeader';
import WhatIsPartnerAgent from 'sly/components/molecules/WhatIsPartnerAgent';
import PhoneCTAFooter from 'sly/components/molecules/PhoneCTAFooter';
import NextSteps from 'sly/components/molecules/NextSteps';
import ADLChart from 'sly/components/molecules/ADLChart';
import Tip from 'sly/components/molecules/Tip';
import { faqPage, tocSiteNavigationLD, guideLD } from 'sly/services/helpers/html_headers';

import { getStateAbbr } from 'sly/services/helpers/url';
import { size, palette, assetPath } from 'sly/components/themes';
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
} from 'sly/components/templates/HubPageTemplate';
import { ResponsiveImage, Label, Heading, Paragraph, Link, Icon, Hr, Image, Box } from 'sly/components/atoms';
import Footer from 'sly/components/organisms/Footer';
import { getTocSeoLabel } from 'sly/services/helpers/search';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';


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
  const tocLabel = getTocSeoLabel('memory-care');


  const mcRef = React.createRef();
  const careRef = React.createRef();
  const staffRef = React.createRef();
  const costRef = React.createRef();
  const mcvsalRef = React.createRef();
  const chooseRef = React.createRef();
  const nextRef = React.createRef();
  const faqRef = React.createRef();
  const nearRef = React.createRef();

  const tocList = [
    {
      title: "What is Memory Care?",
      id: "what-is-memory-care",
      ref: mcRef
    },
    {
      title: "Memory Care Services",
      id: "memory-care-services",
      ref: careRef
    },
    {
      title: "How To Pay for Memory Care",
      id: "cost",
      ref: costRef
    },
    {
      title: "Medical Care and Staffing",
      id: "medical-care-and-staffing",
      ref: staffRef
    },
    {
      title: "Memory Care vs. Assisted Living",
      id: "mc-vs-al",
      ref: mcvsalRef
    },
    {
      title: "Choosing a Memory Care Facility",
      id: "choosing-memory-care",
      ref: chooseRef
    },
    {
      title: "Memory Care FAQs",
      id: "frequently-asked-question",
      ref: faqRef

    },
    {
      title: "Next Steps",
      id: "next",
      ref: nextRef

    },
    {
      title: "Browse Memory Care Near You",
      id: "near",
      ref: nearRef
    },

  ];

  const nextSteps = [
    {title: "Evaluating Memory Care Communities", to:"https://www.seniorly.com/memory-care/articles/evaluating-memory-care-communities"},
    {title: "Understanding the Cost of Memory Care", to:"https://www.seniorly.com/memory-care/articles/understanding-the-cost-of-memory-care"},
    {title: "Frequently Asked Questions About Memory Care", to:"https://www.seniorly.com/memory-care/articles/seniorly-memory-care-faqs"},
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
      question: "Is memory care considered skilled nursing?",
      answer: "No, memory care is not considered skilled nursing.  Memory care is similar to assisted living, but it provides 24/7 care from staff members specially trained to handle the special needs of those with Alzheimer's disease and dementia. Nursing homes, also known as skilled nursing communities, care for seniors who have significant medical needs and need round-the-clock care. Assisted living communities are an ideal choice for seniors who are still active and fairly self-sufficient, but who need a little help with daily personal tasks, housekeeping, and medication management."
    },
    {
      question: "How much is a memory care facility?",
      answer: "The cost of a memory care facility will usually begin around $5,000/mth. Some memory care communities charge one flat fee that covers all services. Other communities separate the fees for medical care and housing. The differences may matter to your loved one's health insurance or long-term care policy. In addition, there may be tax consequences. Seek professional advice from a health care advocate or your tax accountant if these issues might matter."
    },
    {
      question: "Does Medicare pay for long term memory care?",
      answer: "Many memory care communities accept Medicare, Medicaid, and Veterans Administration benefits to help pay both medical and non-medical costs. Other resources may be available in some states for low-income residents. Long-term care insurance, if your loved one has it, will also cover many costs. Talk to the business manager at the memory care communities to see what other options they have available, including payment plans to spread out the costs."
    },
    {
      question: "How to find a memory care facility?",
      answer: "To find the best memory care facility, begin by using an online search. Then select the communities you want to tour. Next, connect with a Local Senior Living Expert who can arrange tours at all the properties. Prepare all your questions ahead of time so you don't forget to get all the information you need when visiting a memory care community. Take a good look around as you visit to see how much the community matches the impression you've gotten from the website or various brochures. Keep your eyes open for any hygiene or safety issues."
    },
    {
      question: "What is a care plan for memory loss?",
      answer: "Every person with Alzheimer's or dementia follows a unique journey and responds to different types of treatment. Make sure that the memory care communities you're considering take these individual variations into consideration. Rather than following a set routine for every resident, they should be preparing an individualized care plan for your loved one that takes into consideration other medical conditions they have, the stage of their dementia symptoms, and their personal preferences."
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

  const SEOContentMC = () => {
    return (
      <>
        <StyledArticle>
          <Heading level="title" size="title" _ref={mcRef} >
            What is Memory Care?
          </Heading>
          <Paragraph>
            Memory Care is a senior living community built to care for seniors who have{' '}
            <Link href="https://www.alz.org/alzheimer_s_dementia">
              Alzheimer's disease or other forms of dementia.
            </Link>
            {' '}Many{' '}
            <Link href="https://www.seniorly.com/assisted-living">
              assisted living communities
            </Link>
            {' '}have special wings designed to help residents with memory issues.
          </Paragraph>
          <Paragraph>
            Senior residents living in memory care benefit from a structured environment that provides
            plenty of routines to help them feel secure and comfortable. The caregiver-to-resident
            staffing ratio of 1:6 is much higher in memory care than in assisted living.
            Assisted living usually has 1 staff member for every 15 residents.
          </Paragraph>
          <Paragraph>
            If your loved one is having problems with forgetfulness and concentration, you may be
            wondering what to expect next. Seniors who have been diagnosed with Alzheimer's disease
            will experience a decline in their memory and other brain functions. This is true for
            seniors with any dementia related illness. Their decline will be slow, but the stages are
            predictable.
          </Paragraph>
          <Paragraph>
            The Reisberg Scale can help you understand where your loved one may be in this process
            so you can determine{' '}
            <Link href="https://www.seniorly.com/memory-care/articles/when-should-a-person-with-alzheimer-s-stop-living-alone">
              what type of care they may need.
            </Link>
          </Paragraph>

          <Heading level="subtitle" size="subtitle">
            The Reisberg Scale
          </Heading>

          <StyledTable>
            <thead>
            <tr>
              <th>
                Stage
              </th>
              <th>
                Symptoms
              </th>
              <th>
                Duration
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                No Decline
              </td>
              <td>
                No memory loss. No dementia.
              </td>
              <td>
                ---
              </td>
            </tr>
            <tr>
              <td>
                Very Mild
              </td>
              <td>
                Normal forgetfulness linked to aging.
              </td>
              <td>
                ---
              </td>
            </tr>
            <tr>
              <td>
                Mild
              </td>
              <td>
                Increased forgetfulness. Diminished work performance. Difficulty finding words.
              </td>
              <td>
                7 years
              </td>
            </tr>
            <tr>
              <td>
                Moderate
              </td>
              <td>
                Difficulty concentrating. Difficulty managing finances. Difficulty with complex tasks. Denial about symptoms. Difficulty in social situations.
              </td>
              <td>
                2 years
              </td>
            </tr>
            <tr>
              <td>
                Moderately Severe
              </td>
              <td>
                Significant memory deficiencies, including memory loss about current details like address or date.
              </td>
              <td>
                2 years
              </td>
            </tr>
            <tr>
              <td>
                Moderately Severe
              </td>
              <td>
                Significant memory deficiencies, including memory loss about current details like address or date.
              </td>
              <td>
                2 years
              </td>
            </tr>
            <tr>
              <td>
                Severe
              </td>
              <td>
                Assistance needed for daily tasks. Memory loss of recent events. Difficulty counting. Incontinence. Personality changes. Repetition of simple behaviors. Agitation.
              </td>
              <td>
                2.5 years
              </td>
            </tr>
            <tr>
              <td>
                Very Severe
              </td>
              <td>
                Loss of ability to speak. Assistance needed for all daily tasks, including eating.
              </td>
              <td>
                2.5 years
              </td>
            </tr>
            </tbody>
          </StyledTable>

          <Paragraph>
            Seniors who need memory care often require more attention in their care program than is
            typically available in an assisted living facility.  Also, they require extra measures
            to keep them physically safe.
          </Paragraph>
          <Paragraph>
            The well-trained staff in a memory care facility focus on slowing the progression of
            Alzheimer's disease or other dementia related illnesses.  They do this through games and
            exercises designed to stimulate the brain. They're also available around the clock to care
            for the unique needs of Alzheimer's and dementia residents, something that home caregivers
            often can't manage.
          </Paragraph>
          <Paragraph>
            Memory care is often provided in a dedicated wing or section of an assisted living facility.
            This makes it easy for residents to transition if needed. Memory care facilities go out of
            their way to provide additional security.  This is because Alzheimer's residents are prone
            to wandering.
          </Paragraph>
          <Paragraph>
            <StyledImage path="f09c42afc55ba7129b6784185690da30/Courtyard_Terrace_logo-17.jpg" alt="Courtyard Terrace Sacramento, CA" height={640} />
            Photo:{' '}
            <Link href="https://www.seniorly.com/memory-care/california/sacramento/courtyard-terrace">
              Courtyard Terrace Memory Care, Sacramento, CA
            </Link>
          </Paragraph>
          <Paragraph>
            If you are ready to search for Memory Care near you, just enter your city or zip code in the
            search box below:
          </Paragraph>
          <SearchBoxContainer onCurrentLocation={onCurrentLocation} layout="homeHero" onLocationSearch={onLocationSearch} />

          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, mcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" _ref={careRef}>
            Memory Care Services
          </Heading>
          <Paragraph>
            Memory care facilities are often specially designed to help those with Alzheimer's and all
            types of dementia feel comfortable and at home. The level of services provided often
            overlap with what is offered in an assisted living community.
          </Paragraph>
          <Paragraph>
            Senior residents in memory care typically receive the following types of services:
          </Paragraph>
          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              All meals, either in their rooms or in a shared dining hall
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Housekeeping services to keep their living space clean and safe
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Social activities designed to stimulate their minds and keep them connected
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Transportation to doctor's offices and other appointments
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Comfortable rooms, which may be private or shared
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              All laundry services, including fresh linens
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Exercise programs and physical therapy when needed
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Cognitive therapy
            </ListItem>
          </ListWrapper>
          <Paragraph>
            In addition, memory care residents receive whatever help they need with{' '}
            <Link href="https://www.seniorly.com/resources/articles/what-are-the-activities-of-daily-living-adls">activities of daily living (ADL)</Link>
            {' '},including:
          </Paragraph>

          <ADLChart />

          <Paragraph>
            Memory care facilities provide 24/7 supervised care for their senior residents.
            This means they are not the same as an adult day care center, or a memory care cafe.

          </Paragraph>
          <Paragraph>
            To prevent senior residents from wandering away, exits at these facilities are locked and
            alarmed. This provides confidence so that everyone knows if one of the residents wanders and
            tries to leave. In addition, the staff at a memory care facility are specially trained to
            handle the unique needs of Alzheimer's disease and dementia residents.

          </Paragraph>

          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, mcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={costRef} >
            How To Pay for Memory Care
          </Heading>

          <Paragraph>
            Memory Care is typically covered by private pay.
            Long term care insurance will supplement private pay.
            You can learn more about paying for memory care by reading our comprehensive article, “
            <Link href="https://www.seniorly.com/resources/articles/understanding-the-cost-of-memory-care">
              Understanding the Cost of Memory Care.
            </Link>
            ”
          </Paragraph>
          <Paragraph>
            In some cases, you will find qualified memory care in a{' '}
            <Link href="https://www.seniorly.com/skilled-nursing-facility">skilled nursing facility (SNF)
            </Link>
            .  This will afford the senior resident some government assistance, such as Medicare.
            Medicaid can cover SNF if you’re low income.
          </Paragraph>
          <Paragraph>
            Each state has their own licensing regulations.
            Therefore, the cost varies state by state for the memory care services provided
            and the government assistance available.
          </Paragraph>
          <Paragraph>
            It’s important to note that a SNF is not a nursing home, even though they share a
            similar name.  We do not use the word “
            <Link href="https://www.seniorly.com/nursing-homes">
              nursing home
            </Link>
            ” any longer. Senior living is far more advanced than the term nursing home suggests.
          </Paragraph>
          <Tip>
            PRO TIP:{' '}
            <Link href="https://www.seniorly.com/resources/articles/veterans-benefits-for-assisted-living">
              Veteran’s Benefits
            </Link>
            {' '}are often available for assistance with care needs.
          </Tip>
          <Paragraph>
            One great option for affordable memory care is a{' '}
            <Link href="https://www.seniorly.com/board-and-care-home">
              Board and Care Home
            </Link>{' '}(BCH).
            They do not all specialize in memory care. Please do your research.
            Or let one of our {' '}
            <Link href="https://www.seniorly.com/agents">
              Local Senior Living Experts
            </Link>{' '}tell you about all the memory care options
            in your desired location.
          </Paragraph>
          <Tip>
            FREE RESOURCE: “
            <Link href="https://www.seniorly.com/resources/articles/veterans-benefits-for-assisted-living">
              The X Factor of Dementia Care
            </Link>
            ” by{' '}
            <Link href="https://www.seniorly.com/agents/pacific-west/rocklin/senior-care-authority-sacramento-ca-mark-and-karyn-wolff-">
              Mark Wolff
            </Link>.
          </Tip>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, mcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" >
            What Is A Local Senior Living Expert?
          </Heading>
          <WhatIsPartnerAgent toc="memory care" agents={agents}/>
        </StyledArticle>
        <StyledArticle>

          <Heading level="title" size="title" _ref={staffRef}>
            Medical Care and Staffing
          </Heading>
          <Paragraph>
            Most memory care facilities are staffed with registered nurses, licensed vocational nurses, and
            certified nurse assistants. The objective is to have enough qualified staff to care for residents'
            needs and maintain resident safety. It's optimal if staff have been at the facility for a long
            time and work consistent shifts.  Residents with Alzheimer's disease or dementia respond best to
            familiar faces.
          </Paragraph>
          <Paragraph>
            Typically, medical and non-medical staff in a memory care facility receive specialized training.
            Best practices in Alzheimer's and dementia care include training in the progressive symptoms of dementia.
            Also, staff are trained to understand what seniors are trying to communicate through behavior when verbal
            communication abilities start to lag.
          </Paragraph>
          <Heading level="subtitle" size="subtitle" >
            The Memory Care Written Plan
          </Heading>
          <Paragraph>
            Part of the care for your loved one at a memory care community will include a written plan.
            The facility's medical director leads the development of this plan. Also involved is the attending
            physician and other medical staff.  Family members also get to contribute to it.
          </Paragraph>
          <Paragraph>
            The written plan for your loved one should reflect their personal preferences and long-term interest.
            It should provide as much freedom of choice as is possible and safe.
          </Paragraph>
          <Paragraph>
            Among the issues covered in the written plan for any resident's medical care are typically:
          </Paragraph>
          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              A customized approach to expression of unmet needs
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Minimal use of psychotropic medications
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
          Flexible care based on the resident's personal sleeping and waking patterns
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
          Provision of care for optimal physical functioning
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
          Activities that promote quality of life and enjoyment
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
          Meeting of all nutrition and hydration needs
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
          Minimizing of any distress
            </ListItem>
          </ListWrapper>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, mcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>


        <StyledArticle>
          <Heading level="title" size="title" _ref={mcvsalRef} >
            How Does Memory Care Differ From Assisted Living?
          </Heading>

          <Paragraph>
            It’s helpful to understand the difference between memory care and an assisted living community.
            This also applies if you're trying to decide which type of senior care would be most appropriate.
            Many assisted living communities incorporate memory care units into their property.
            However, there are some significant differences between them.
          </Paragraph>
          <Paragraph>
            Both assisted living and memory care offer solutions for seniors who are no longer able to fully care
            for themselves. Both provide meals in a secure setting.  Both offer assistance with the activities of
            daily living (ADL), such as grooming, bathing, and medication management. However, memory care units
            are designed for those with memory problems such as Alzheimer's disease or dementia.
          </Paragraph>
          <Paragraph>
            Take a look at this chart. It outlines some of the basics in the care provided in an assisted living
            community compared to that available in memory care.
          </Paragraph>
          <StyledTable>
            <thead>
            <tr>
              <th>
                Services
              </th>
              <th>
                Assisted Living
              </th>
              <th>
                Memory Care
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                Alzheimer's/Dementia Care
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
                Diabetes Management
              </td>
              <td>
                Sometimes
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
                Yes
              </td>
            </tr>
            <tr>
              <td>
                Incontinence Care
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
                Meals Provided Per Day
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
                Mobility Assistance
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
                Personal Care
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
                Personal Laundry
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
                Transportation
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
                Wheelchairs Accepted
              </td>
              <td>
                Sometimes
              </td>
              <td>
                Yes
              </td>
            </tr>
            </tbody>
          </StyledTable>
          <Paragraph>
            Memory care facilities are often designed to minimize wandering. For example, many memory care
            facilities are centered around a circular hallway that's easy to navigate and that allows residents
            to stroll without ever becoming truly lost.
          </Paragraph>
          <Paragraph>
            Memory care units provide a little extra security because of the tendency of those with Alzheimer's and
            dementia to wander. This often includes a landscaped yet secure outdoor area so residents can enjoy the
            sunshine and spend time outdoors while remaining safe.
          </Paragraph>
          <Paragraph>
            Safety is paramount in other ways in memory care facilities. Toxic items, such as laundry detergent or
            shampoo, are kept locked up to prevent accidents. In some cases, residents wear bracelets keyed to sound
            an alarm if they open a door to leave the facility. As another safety precaution, memory care rooms or
            suites don't include kitchens.
          </Paragraph>
          <Paragraph>
            A memory care facility is built to create a relaxing environment. This is because senior residents with
            dementia are prone to stress and confusion. Facilities often feature lots of natural light and bright colors,
            and there are places for residents to gather among familiar faces. Some facilities feature{' '}
            <Link href="https://www.seniorly.com/memory-care/articles/sensory-care-in-memory-care-communities">
              sensory care
            </Link>{' '}and
            other innovative approaches to help residents stay as communicative as possible.
          </Paragraph>
          <Paragraph>
            To encourage residents with Alzheimer's to eat, dining rooms often feature fish tanks, since studies show
            that watching fish swim stimulates the appetite. In addition, meals are designed to be appetizing to the
            eye as well as to the palate. Extra care is taken to offer dishes that each senior resident will enjoy.
          </Paragraph>


          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, mcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={chooseRef} >
            Choosing a Memory Care Facility
          </Heading>
          <Paragraph>
            When you're looking for a memory care facility for your loved one, you probably have a lot of questions.
            Sure, some of them will be about the costs of memory care — and we deal with that in our next article here.
            But that's not the only consideration as you're looking for just the right place.
          </Paragraph>
          <Paragraph>
            You should feel very free to ask any question that comes to mind as you try to find the best care for your
            loved ones. Top-flight memory care facilities abound all over the country, and they never shy away from
            answering questions. To get you started, here are 10 questions you can ask prospective memory care facilities.
          </Paragraph>

          <ol>
            <li>
              What services and level of care does your memory care community offer? Are all of these services included in the basic monthly rate, or are some of them extra?
            </li>
            <li>
              What personal assistance do residents receive? How often do they receive it?
            </li>
            <li>
              How many meals are provided each day? What do you do if a resident doesn't want to eat? What personalization is available in meal plans? Can you accommodate special diets (gluten-free, kosher, etc.)?
            </li>
            <li>
              What special care do you provide for residents who wander? For residents who become physically aggressive? For residents who have mobility issues?
            </li>
            <li>
              Is it possible to take a resident out of the facility for a day trip or a weekend? What are your visitation rules?
            </li>
            <li>
              What happens if a resident requires a more intensive level of care than you provide?
            </li>
            <li>
              Are rooms private? Shared?
            </li>
            <li>
              What housekeeping, maintenance, and laundry/linen services do you provide? How often do you provide them?
            </li>
            <li>
              Do you offer exercise programs or equipment? What about physical therapy?
            </li>
            <li>
              What is the staff-to-resident ratio during the day? Does that change at night?
            </li>
          </ol>
          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, mcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={faqRef} >
            Memory Care FAQs
          </Heading>
          <Paragraph>
            Below you will find a sampling of the 5 most frequently asked questions we get regarding memory care.  For a comprehensive list of memory care frequently asked questions, click through to our
            <Link href="https://www.seniorly.com/memory-care/articles/seniorly-memory-care-faqs">
              Memory Care FAQ section
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
                     toc="memory care"
                     label="Think Memory Care might be right for your loved one? Explore one of the three topics below to help narrow down your search:"
                     links={nextSteps} />

          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, mcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
      </>
    );
  };

  const title = 'Find the Best Memory Care Near You ';
  const description = 'Find the best memory care near you with local senior living communities & providers. Browse memory care nearby with prices, reviews & photos.';
  const heading = state ? `${listSize} ${tocLabel} near ${city}, ${getStateAbbr(state)}` : `${listSize} ${tocLabel} near ${city}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {faqPage(faqs)}
        {tocSiteNavigationLD("https://www.seniorly.com/memory-care", tocList)}
        {guideLD(title, description, "https://www.seniorly.com/memory-care")}
      </Helmet>
      <HubHeader imagePath="react-assets/hub/memory-care-cover.jpg"
         toc="memory care"
         heading="What is Memory Care Near You?"
         label="Use our free search to find memory care nearby"
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
            {SEOContentMC()}
            <Heading level="title" size="title" _ref={nearRef}>
              {heading}
            </Heading>
            <StyledArticle>
              <Paragraph>
                Seniorly promises to make your search for memory care near you easy and stress-free. Below, compare memory care
                communities near you and then let us connect you to your local senior living advisor.
                They can answer all your questions, share costs, arrange tours, and even negotiate rent. Our services are free.
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