import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { func } from 'prop-types';
import HubHeader from 'sly/components/molecules/HubHeader';
import PhoneCTAFooter from 'sly/components/molecules/PhoneCTAFooter';
import NextSteps from 'sly/components/molecules/NextSteps';
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
} from 'sly/components/templates/HubPageTemplate';
import { ResponsiveImage, Label, Heading, Paragraph, Link, Icon, Hr, Image, Box } from 'sly/components/atoms';
import Footer from 'sly/components/organisms/Footer';

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

const HomeCareNearMePage = ({
  handleAnchor,
}) => {


  const hcRef = React.createRef();
  const whyRef = React.createRef();
  const servicesRef = React.createRef();
  const costRef = React.createRef();
  const chooseRef = React.createRef();
  const hcvsalRef = React.createRef();
  const specializedRef = React.createRef();
  const companyRef = React.createRef();
  const faqRef = React.createRef();
  const nextRef = React.createRef();

  const nextSteps = [
    {title: "Evaluating Home Care Companies", to:"https://www.seniorly.com/in-home-care/articles/evaluating-home-care-companies"},
    {title: "Understanding the Cost of Home Care", to:"Understanding the Cost of Home Care"},
    {title: "Frequently Asked Questions About Home Care", to:"Frequently Asked Questions About Home Care"},
  ];

  const faqs = [
    {
      question: "Does Medicare cover home health care?",
      answer: "Seniors who need medical care may find that Medicare, Medicaid or private health insurance will cover some of the expenses of home care. Make sure to discuss all financial arrangements, including insurance coverage, with the home care agencies you're considering before you make your final choice."
    },
    {
      question: "What is hospice care at home?",
      answer: "Hospice care at home is about maintaining comfort during the end of life process.  Often, morphine is administered on request to help with pain management.  You need a doctor’s prescription to get hospice care at home covered by Medicare or other private health insurance.  Always check with your insurance to know what is allowed."
    },
    {
      question: "How much does home health care cost?",
      answer: "Expect to pay $20 to $40 an hour for home health care.  However, several variables go into the answer to this question. Much depends on what services your loved one needs and on how many hours per day an in-home caregiver is present. If your loved one just needs help with the activities of daily living (ADLs), such as dressing and bathing, you can expect costs at the lower end of that scale. If they require round-the-clock assistance due to memory care needs or recovery from surgery, costs will be higher. Finally, if your loved one lives in a city, the costs are likely to be higher than if they're located in a rural area."
    },
    {
      question: "Does the VA pay for nursing home care?",
      answer: "Yes, the VA will pay for nursing home care as part of the Veteran’s Benefits available to qualifying Veterans. To find out about qualifications, review the Veteran’s Benefits for Senior Living."
    },
    {
      question: "What does home health care do?",
      answer: "All in-home caregivers help with the activities of daily living (ADLs), such as bathing, dressing, and grooming. In most cases, they also handle meal preparation. Sometimes caregivers also provide transportation, driving the seniors under their care to medical appointments, errands, and entertainment as needed. Another key area in which caregivers help is medication management. Many seniors need reminders to take their medications on schedule. In-home caregivers can help with this, pre-measuring medications and preparing them for those times when they're not on duty."
    },
  ];

  const tocList = [
    {
      title:"What is Home Care?",
      id:"what-is-home-care",
      ref: hcRef
    },
    {
      title:"Why Choose Home Care?",
      id:"why-choose-home-care",
      ref: whyRef
    },
    {
      title:"What Services Are Provided by Home Care?",
      id:"what-services",
      ref: servicesRef
    },
    {
      title:"How Much Does Home Care Cost?",
      id:"cost",
      ref: costRef
    },
    {
      title:"How to Decide If Home Care Is the Right Choice",
      id:"choosing-home-care",
      ref: chooseRef
    },
    {
      title:"Home Care vs. Assisted Living",
      id:"hc-vs-al",
      ref: hcvsalRef
    },
    {
      title:"Specialized Home Care Options",
      id:"specialized-home-care",
      ref: specializedRef
    },
    {
      title:"Choosing the Right Home Care Company",
      id:"choosing-home-care-company",
      ref: companyRef
    },
    {
      title:"Home Care FAQs",
      id:"frequently-asked-question",
      ref: faqRef
    },
    {
      title:"Next Steps",
      id:"next",
      ref: nextRef
    }

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
          <Heading level="title" size="title" _ref={hcRef} >
            What is Home Care Near You?
          </Heading>
          <Paragraph>
            Home Care (sometimes also known as in-home care or private duty care) is personal, non-medical senior
            care provided right in a senior's own home. Home Care was once provided only on a short-term basis to those
            recovering from surgery or other hospitalizations. Now, it's available to let seniors age in place at home while
            remaining safe and comfortable.
          </Paragraph>
          <Paragraph>
            Professionally trained caregivers work to keep seniors as independent as possible while providing the
            assistance they need to be able to stay in their homes.
          </Paragraph>
          <Paragraph>
            In-home caregivers typically help aging citizens with daily tasks such as bathing and dressing,
            preparing meals, and managing medication.{' '}
            <Link href="https://www.seniorly.com/resources/articles/care-video-in-home-care-5-elderly-decline-signs">
              Depending on their needs
            </Link>
            , Home Care may consist of a caregiver who comes in one day a week or someone who
            lives in the home to provide 24/7 assistance.
          </Paragraph>
          <Paragraph>
            Many seniors would rather stay in their own homes than move into a retirement community, an{' '}
            <Link href="https://www.seniorly.com/assisted-living">
              assisted living community
            </Link>
            , or even a{' '}
            <Link href="https://www.seniorly.com/skilled-nursing-facility">
              skilled nursing facility
            </Link>
            . Home Care is a viable alternative that makes that possible.
          </Paragraph>
          <Paragraph>
            Also, it helps families experience peace of mind. They know their loved one is safe and cared for on
            a daily basis, and it provides extra companionship for lonely seniors.
          </Paragraph>

          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, hcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" _ref={whyRef}>
            Why Choose Home Care?
          </Heading>
          <Paragraph>
            Home Care is the optimal choice for many seniors because it allows them to stay in their own home.
            This can provide a sense of comfort that few other environments can match. Home Care can also make it
            possible for younger generations to bring their parents into their homes in a multi-generational setting
            without the children being overwhelmed by the physical demands of caring for an aging senior.
          </Paragraph>
          <Paragraph>
            Home Care helps seniors stay independent as long as possible. On the financial side, in-home care can{' '}
            <Link href="https://www.seniorly.com/resources/articles/understanding-the-cost-of-assisted-living">
              cost more than moving into assisted living
            </Link>
            . This is because at home you are paying for 1:1 care. In an assisted living community, the caregivers are usually 14:1.
          </Paragraph>
          <Paragraph>
            Home Care enhances{' '}
            <Link href="https://www.seniorly.com/resources/articles/socialization-and-its-importance-to-seniors">
              socialization
            </Link>
            , removing the isolation that too many seniors living on their own experience.
            Health limitations often restrict seniors' ability to participate in social involvement the way they used to.
            Seniors who become isolated can feel intensely lonely and unhappy, and they even run a greater risk of
            developing dementia. Having an in-home caregiver provides instant companionship while also opening the doors to
            facilitate other{' '}
            <Link href="https://www.seniorly.com/blog/articles/the-importance-of-social-connections-in-later-life-and-ways-to-foster-them">
              social interaction.
            </Link>
          </Paragraph>
          <Paragraph>
            To learn more about signs your loved one is ready for home care, watch this short video featuring Meghan Heinan from Home Care Assistance.
          </Paragraph>
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/T83pBbpr9J4" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />


          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, hcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" _ref={servicesRef} >
            What Services Are Provided by Home Care?
          </Heading>

          <Paragraph>
            Most Home Care focuses on non-medical services. Caregivers help seniors with the{' '}
            <Link href="https://www.seniorly.com/resources/articles/what-are-the-activities-of-daily-living-adls">
              activities of daily living (ADLs)
            </Link>
            .  This includes assistance with bathing, dressing, and grooming. They also handle meal preparation with a
            personal touch that takes into consideration each senior's food preferences and dietary restrictions.
          </Paragraph>
          <Paragraph>
            Since many seniors are no longer able to drive, in-home caregivers provide transportation,
            either by driving their clients to appointments and errands or by accompanying them on public transportation.
            When seniors have limited mobility, caregivers help them with moving and transferring to beds, chairs, or showers.
          </Paragraph>
          <Paragraph>
            Caregivers often perform light housekeeping duties, such as making beds, laundry, and washing dishes.
            In addition, they make sure their clients receive all their medications in a timely fashion.
          </Paragraph>
          <Paragraph>
            Seniors with significant medical needs are often able to augment their basic non-medical home care with
            services provided by licensed medical professionals. Nurses, nurse practitioners, and other medical
            professionals can come to the home to handle injections, wound care, therapy, and testing.
          </Paragraph>
          <Paragraph>
            In some cases, seniors require care around the clock. This may occur during recovery from surgery.
            Or it may be necessary if your loved one experiences the frequent waking and nighttime wandering that
            sometimes accompany dementia. If your loved one requires 24/7 care, you have a couple of options.
          </Paragraph>
          <Paragraph>
            You can seek out live-in care, or you can bring in multiple caregivers who work opposite shifts.
          </Paragraph>
          <Paragraph>
            If you hire a live-in caregiver, you need to provide them with a place to sleep and allow them
            eight hours a day to do just that. You should also arrange for other downtime, including substitute
            caregivers on the weekends. If you don't want to go this route, check out the possibility of hiring two
            caregivers, each working a 12-hour shift. While this choice is typically more costly, it can be a good
            choice if your loved one requires significant medical care around the clock.
          </Paragraph>

          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, hcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>

          <Heading level="title" size="title" _ref={costRef}>
            How Much Does Home Care Cost?
          </Heading>
          <Paragraph>
            If you're bringing in home health aide for a few hours a week, you should expect the cost to be anywhere
            from $14 per hour to an hourly rate as high as $40. The average cost for a full-time in-home caregiver is
            about $46,000 per year. This varies by location.
          </Paragraph>
          <Paragraph>
            Costs associated with Home Care can vary widely depending on the type of care your loved one needs.
            For example, if dementia care is involved you will want a private duty home care aide who specializes in
            this kind of help. Also, the going rate for in-home care in your region will impact cost. Home Care is
            often more expensive in cities than in rural areas.
          </Paragraph>
          <Paragraph>
            Medicare doesn't cover the costs of non-medical home care. Nor is social security an option.
            While Medicare does cover medical home health care, usually coverage is limited to a few hours per
            week for the duration of a specific, demonstrable medical need.
          </Paragraph>
          <Paragraph>
            To receive this coverage from Medicare, a senior usually has to be homebound. Private health insurance
            usually follows the same rules as Medicare and doesn't cover Home Care.
          </Paragraph>
          <Paragraph>
            If you are in California, be sure to look into{' '}
            <Link href="https://www.seniorly.com/resources/articles/low-income-assisted-living">
              Medical
            </Link>
            . This won’t cover in-home care, but if a move into assisted living could happen it’s better to plan ahead.
          </Paragraph>
          <Paragraph>
            Long-term care policies are available to cover home health care. These policies vary widely in terms of
            what they cover and for how long, and many of them have financial caps.
          </Paragraph>
          <Paragraph>
            <Link href="https://www.seniorly.com/resources/articles/veterans-benefits-for-assisted-living">
              Military veterans
            </Link>
            {' '}and their spouses may be eligible for pension benefits that include non-medical home care services.
          </Paragraph>
          <Paragraph>
            One way to mitigate the costs of Home Care is to take advantage of the adult day care programs offered
            in your neighborhood. Adult day care is typically set up to provide both social interaction and some basic
            medical care within a safe, controlled environment. This makes it an ideal choice for seniors who are
            experiencing early levels of dementia.
          </Paragraph>
          <Paragraph>
            Costs are low — generally about $60 per day. Use adult day care as a chance to give caregivers a break,
            or schedule it into your loved one's routine as a regular occurrence.
            Seniorly CEO Arthur Bretschneider wrote about this "hack" in his article, "
            <Link href="https://www.seniorly.com/assisted-living/articles/a-secret-solution-to-paying-for-assisted-living">
              A Secret Solution to Paying for Assisted Living
            </Link>."
          </Paragraph>

          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, hcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" _ref={chooseRef} >
            How to Decide If Home Care Is the Right Choice
          </Heading>

          <Paragraph>
            Two factors are involved in the decision to bring in Home Care to help your loved one.
            One, is the issue of whether your{' '}
            <Link href="https://www.seniorly.com/resources/articles/seniorly-conversations-in-home-care">
              loved one needs some assistance around the house
            </Link>
            . The other is whether your loved one needs more assistance than Home Care can provide.
          </Paragraph>
          <Paragraph>
            Take a look at your senior loved one's home to see if a little help is needed.
          </Paragraph>
          <ul>
            <li>
              Has your loved one started being lax about cleaning up?
            </li>
            <li>
              Are dishes left in the sink?
            </li>
            <li>
              Is their laundry undone?
            </li>
            <li>
              Do they need grooming?
            </li>
            <li>
              Do they need bathing?
            </li>

          </ul>
          <Paragraph>
            If your loved one is no longer able to drive, care at home can provide the bridge that's needed to keep
            them connected to the outside world. Most seniors are extremely reluctant to abandon the freedom that
            driving brings, so keep an eye open for traffic tickets or scratches on the car that indicate it's time to
            take away the car keys.
          </Paragraph>
          <Paragraph>
            Older people who lose interest in meal preparation or who become unable to care for themselves often lose
            weight dramatically. While they try to live independently, they may gain weight because they start making
            poor nutrition choices and just eat the easiest thing available.

          </Paragraph>
          <Paragraph>
            In both cases, it's a sign that Home Care may be needed. Seniors who are becoming isolated and withdrawing from others may also need the companionship that home care provides.
          </Paragraph>
          <Paragraph>
            Take a look at this chart to understand some of the options available to you if you choose Home Care.
          </Paragraph>
          <StyledTable>
            <thead>
              <tr>
                <th>
                  Type of Home Care
                </th>
                <th>
                  Pros
                </th>
                <th>
                  Cons
                </th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                Care Provided by Family Member
              </td>
              <td>
                <ul>
                  <li>
                    Senior loved one feels more comfortable because of familiarity
                  </li>
                  <li>
                    No additional costs
                  </li>
                </ul>
              </td>
              <td>
                <ul>
                  <li>
                    Added pressure on family members
                  </li>
                  <li>
                    High burnout rates and increased stress for entire family
                  </li>
                  <li>
                    Lack of formal training means seniors may not receive expert care
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                Personal Hire (referred by friends, etc.)
              </td>
              <td>
                <ul>
                  <li>
                    Costs are often lower
                  </li>
                </ul>
              </td>
              <td>
                <ul>
                  <li>
                    Family must handle taxes, unemployment insurance, etc.
                  </li>
                  <li>
                    Privately hired caregivers often lack training, licensing and insurance
                  </li>
                  <li>
                    No backup plan if caregiver cannot come in or quits suddenly
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                Hired Through Home Care Agency
              </td>
              <td>
                <ul>
                  <li>
                    Agency usually handles taxes and insurance
                  </li>
                  <li>
                    Caregivers are trained and licensed
                  </li>
                  <li>
                    Agencies handle scheduling in the event of emergencies or days off
                  </li>
                </ul>
              </td>
              <td>
                <ul>
                  <li>
                    More costly than other options
                  </li>
                </ul>
              </td>
            </tr>
            </tbody>
          </StyledTable>


          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, hcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={hcvsalRef} >
            Home Care vs. Assisted Living
          </Heading>
          <Paragraph>
            Many people consider assisted living communities to be the primary choice for aging adults who need some
            assistance. Home Care is a viable alternative. Assisted living communities provide meals,
            personal care, and housekeeping services to seniors within a residential setting. However,
            each senior resident in assisted living shares their caregivers with many other residents.
          </Paragraph>
          <Paragraph>
            With Home Care, seniors gain the emotional comfort of remaining in familiar surroundings. Even when
            dealing with chronic medical problems or memory loss, they can still enjoy a sense of independence.
            In addition, because they have the undivided attention of their caregivers, seniors in Home Care enjoy
            personalized care plans that take into consideration their own preferences, physical status and
            lifestyle choices.
          </Paragraph>

          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, hcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={specializedRef} >
            Specialized Home Care Options
          </Heading>
          <Paragraph>
            The percentage is high of seniors wanting to age in their own homes. Some seniors, however,
            require a little more than personal care and meal preparation. Fortunately, options for levels of
            care are available to help in these circumstances.
          </Paragraph>
          <Heading level="subtitle" size="subtitle" >
            In-Home Care for Chronic and Acute Medical Conditions
          </Heading>
          <Paragraph>
            Health care aides, physical therapists, registered nurses, physicians' assistants, and other medical care
            professionals can be part of your loved one's Home Care team when needed.
          </Paragraph>
          <Paragraph>
            For example, what if your loved one requires a hip or knee replacement? In many circumstances, they would be
            sent to a skilled nursing facility for recovery. It's possible, however, to bring physical therapists and
            other aides to the home to assist in recovery.
          </Paragraph>
          <Paragraph>
            If your loved one requires diabetes care or other regular health care for a chronic condition, you can typically
            make arrangements for healthcare professionals to come to your home to provide treatment or therapy. Combining
            these periodic visits with an in-home caregiver can make the difference that lets your senior loved one age
            in place at home.
          </Paragraph>
          <Heading level="subtitle" size="subtitle" >
            In-Home Care for Seniors With Alzheimer's Disease or Dementia
          </Heading>
          <Paragraph>
            In the early stages of Alzheimer's disease or dementia, Home Care can be an excellent option to provide the
            safety that seniors need while keeping them connected to others socially.
          </Paragraph>
          <Paragraph>
            Memory loss is the most well-known symptom of Alzheimer's and dementia, but it is far from the
            only one that requires round-the-clock monitoring. Seniors with dementia may have difficulty with
            their sense of balance or visual perception. They may experience problems trying to focus or to communicate
            clearly. In later stages of Alzheimer's disease, seniors may become aggressive or agitated easily.
          </Paragraph>
          <Paragraph>
            Because of the complex symptoms involved with Alzheimer's disease and dementia, in-home caregivers should be
            specially trained and licensed. That gives you the peace of mind that your loved one's caregiver is able to
            provide the calming environment needed, to adjust daily routines based on the ebb and flow of symptoms, and
            to minimize any outbursts.
          </Paragraph>
          <Paragraph>
            A trained caregiver can maximize the social interactions and stimulation that helps delay the onset of
            further symptoms while keeping you notified about the progression of your loved one's condition.
          </Paragraph>


          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, hcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" _ref={companyRef} >
            Choosing the Right Home Care Company
          </Heading>
          <Paragraph>
            Finding the right Home Care company is key to finding a caregiver whom you can trust to provide your loved
            one with the care they need. Because you're making a big decision, prepare all the necessary questions.
            Here are a few key questions to help you get started.
          </Paragraph>
          <ol>
            <li>
              How does this Home Care agency differentiate itself from similar agencies? What does it offer that its competitors may not?
            </li>
            <li>
              Does the agency require a minimum number of years of experience from the caregivers it places?
            </li>
            <li>
              Are caregivers encouraged or required to take continuing education classes?
            </li>
            <li>
              How long do this agency's caregivers tend to stay with a client? What arrangements are made for replacements if a caregiver should leave?
            </li>
            <li>
              How does the agency choose its caregivers? Does it perform background checks?
            </li>
            <li>
              How selective is the agency in choosing caregivers? How many applicants does it interview compared to the number it ends up hiring?
            </li>
            <li>
              How are new caregivers trained or vetted?
            </li>
            <li>
              How do the agency's scheduling and payment procedures work? Does the agency handle taxes, workman's compensation, and disability payments for the caregivers?
            </li>
            <li>
              What happens if your regular caregiver is sick or unavailable for some other reason?
            </li>
            <li>
              Are the caregivers licensed and insured?
            </li>
          </ol>
          <Paragraph>
            It's important to make sure that your loved one's caregiver is a good match in personality.
            Also, make sure you feel comfortable with them. Make sure to interview the finalists suggested by the
            Home Care agency before you make your final choice.
          </Paragraph>
        </StyledArticle>


      <StyledArticle>
        <Heading level="title" size="title" _ref={faqRef} >
          Home Care FAQs
        </Heading>
        <Paragraph>
          Below you will find a sampling of the 5 most frequently asked questions we get regarding home care.  For a comprehensive list of home care frequently asked questions, click through to our{' '}
          <Link href="https://www.seniorly.com/in-home-care/articles/seniorly-home-care-faqs">
            Home Care FAQ section
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
                     toc="home care"
                     label="Think Home Care might be right for your loved one? Explore these other three topics below to help you make your decision:"
                     links={nextSteps} />

          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, hcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
      </>
    );
  };

  const title = 'What is Home Care | Guide to In Home Care for Seniors ';
  const description = 'What is home care and when do you need it? Learn about home care for seniors, cost for in home care and how to find the right caregiver for your loved one.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {faqPage(faqs)}
        {tocSiteNavigationLD("https://www.seniorly.com/in-home-care", tocList)}
        {guideLD(title, description, "https://www.seniorly.com/in-home-care")}
      </Helmet>
      <HubHeader imagePath="react-assets/hub/home-care-cover.jpg"
         toc="home care"
         heading="What is Home Care Near You?"
         showSearch={false}/>
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
            </Body>
          </TwoColumn>
        </Wrapper>
      </HubPageTemplate>
      <PhoneCTAFooter/>
      <Footer />
    </>

  );
};

HomeCareNearMePage.propTypes = {
  handleAnchor: func,
};

export default HomeCareNearMePage;
