import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { func } from 'prop-types';
import HubHeader from 'sly/components/molecules/HubHeader';
import PhoneCTAFooter from 'sly/components/molecules/PhoneCTAFooter';
import NextSteps from 'sly/components/molecules/NextSteps';
import Tip from 'sly/components/molecules/Tip';


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

const RespiteCareNearMePage = ({
                              handleAnchor,
                            }) => {


  const rcRef = React.createRef();
  const whyRef = React.createRef();
  const costRef = React.createRef();
  const typesRef = React.createRef();
  const articlesRef = React.createRef();
  const seniorLivingRef = React.createRef();
  const nextRef = React.createRef();

  const sectionIdMap = {
    rc: 'what-is-respite-care',
    why: 'reasons-for-respite-care',
    cost: 'cost',
    types: 'types-of-respite-care',
    articles: 'resources-on-respite-care',
    seniorLiving: 'other-types-senior-living',
    next: 'next-steps',
  };

  const nextSteps = [
    {title: "How can I pay the costs of Respite Care?", to:"https://www.seniorly.com/resources/articles/caregiver-respite-grants-for-elderly-loved-ones"},
    {title: "What is Respite Care for family caregivers?", to:"https://www.seniorly.com/respite-care/articles/respite-for-caregivers"},
    {title: "Why use Respite Care after cardiac surgery?", to:"https://www.seniorly.com/respite-care/articles/respite-care-following-cardiac-surgery"},
    {title: "Can I try an assisted living community for a short time before moving in?", to:"https://www.seniorly.com/short-term-stays/articles/try-it-before-you-buy-it-senior-living"},
  ];

  const TableOfContents = () => {
    return (
      <>
      <Heading level="subtitle" size="subtitle">
        Table of Contents
      </Heading>
      <Paragraph>
        <StyledLink
          href={`#${sectionIdMap.rc}`}
          onClick={e => handleAnchor(e, rcRef)}
        >
           What is Respite Care Near You?
        </StyledLink>
        <StyledLink
          href={`#${sectionIdMap.why}`}
          onClick={e => handleAnchor(e, whyRef)}
        >
          5 Common Reasons for Respite Care
        </StyledLink>
        <StyledLink
          href={`#${sectionIdMap.cost}`}
          onClick={e => handleAnchor(e, costRef)}
        >
          How Much Does Respite Care Cost?
        </StyledLink>
        <StyledLink
          href={`#${sectionIdMap.types}`}
          onClick={e => handleAnchor(e, typesRef)}
        >
          Types of Respite Care for Elderly
        </StyledLink>
        <StyledLink
          href={`#${sectionIdMap.articles}`}
          onClick={e => handleAnchor(e, articlesRef)}
        >
          Featured Articles on Respite Care
        </StyledLink>
        <StyledLink
          href={`#${sectionIdMap.seniorLiving}`}
          onClick={e => handleAnchor(e, seniorLivingRef)}
        >
          Other Types of Senior Living
        </StyledLink>

        <StyledLink
          href={`#${sectionIdMap.next}`}
          onClick={e => handleAnchor(e, nextRef)}
        >
          Next Steps
        </StyledLink>

      </Paragraph>
      </>
    )
  };

  const SEOContent = () => {
    return (
      <>
      <StyledArticle>
        <Heading level="title" size="title" _ref={rcRef} >
          What is Respite Care Near You?

        </Heading>
        <Paragraph>
          Respite care often refers to short-term stays in{' '}
          <Link href="https://www.seniorly.com/assisted-living">
            assisted living communities
          </Link>
          . Respite care is a helpful option for family caregivers who need a short break from their caregiver duties.
          It’s also ideal for seniors who need a higher level of care as they recover from an illness or surgery.
          Short-term stays are also used by many seniors to try an assisted living community before moving in long-term.
        </Paragraph>

        <Link
          href={`#${sectionIdMap.rc}`}
          onClick={e => handleAnchor(e, rcRef)}
        >
          Back to top
        </Link>
      </StyledArticle>
      <StyledArticle>
        <Heading level="title" size="title" _ref={whyRef}>
          5 Common Reasons for Respite Care
        </Heading>
        <ol>
          <li>
            Mom takes care of Dad, who has some memory issues. Mom wants to visit her sister in another city. Mom needs respite care for dad in assisted living for 2 weeks.
          </li>
          <li>
            Mom takes care of Dad, who needs help with activities of daily living. Mom needs to have surgery. Mom needs respite care for dad in assisted living for 2 weeks.
          </li>
          <li>
            Mom thinks that it is time to consider moving into an assisted living community. Mom wants to try a short-term respite stay for a month before moving in long term.
          </li>
          <li>
            Mom recently had cardiac surgery. The doctor said it is not yet safe for her to be home alone. Mom needs 30 days of respite care in assisted living.
          </li>
          <li>
            Mom recently had knee and hip replacement. The doctor prefers Mom to have 24-hour supervision, but she doesn't need to be at a Skilled Nursing Facility for rehab. Mom needs 30 days of respite care in assisted living.
          </li>
        </ol>
        <Link
          href={`#${sectionIdMap.rc}`}
          onClick={e => handleAnchor(e, rcRef)}
        >
          Back to top
        </Link>
      </StyledArticle>
      <StyledArticle>
        <Heading level="title" size="title" _ref={costRef} >
          How Much Does Respite Care Costs
        </Heading>

        <Paragraph>
          Respite care, or short-term stays in assisted living facilities, typically costs between $150 and $300 per day.
          Exact pricing depends on the location and level of care needed. Most assisted living communities require a minimum
          stay of 14 days, however some will consider shorter time periods as well.
        </Paragraph>
        <Paragraph>
          How do you pay for respite care? Most respite care is private pay. Seniors with{' '}
          <Link href="https://www.seniorly.com/resources/retirement-planning/long-term-care-insurance-for-respite-care">
            long term care insurance
          </Link>
          {' '}may have a respite care benefit.
        </Paragraph>
        <Paragraph>
          Also, many local nonprofits have{' '}
          <Link href="https://www.seniorly.com/resources/respite-care/caregiver-respite-grants-for-elderly-loved-ones">
            respite care grants
          </Link>
          {' '}offered to family caregivers. These grants are usually around $1000.
        </Paragraph>

        <Link
          href={`#${sectionIdMap.rc}`}
          onClick={e => handleAnchor(e, rcRef)}
        >
          Back to top
        </Link>
      </StyledArticle>
      <StyledArticle>

        <Heading level="title" size="title" _ref={typesRef}>
          Types of Respite Care for Elderly
        </Heading>
        <Paragraph>
          There are many types of respite care services for elderly people. They are meant to be a short-term solution for both the caregiver and senior.
        </Paragraph>
        <Heading level="subtitle" size="subtitle">
          Short-Term Stays in Assisted Living
        </Heading>
        <Paragraph>
          Approximately 60% of assisted living communities offer short-term stays. Many times, you can find communities
          willing to take your elder loved one for a weekend or even a week. This comes without further obligation to
          sign on for other services. You would pay for only the day, week or weekend of care needed in a fully
          furnished room.
        </Paragraph>
        <Paragraph>
          In addition, your elderly loved one would be able to participate in social gatherings, meals and special events
          that may be going on during their stay. That may be a great emotional boost and provide new social connections for them, as well.
        </Paragraph>
        <Heading level="subtitle" size="subtitle">
          Short-Term Home Care
        </Heading>
        <Paragraph>
          Hiring a{' '}
          <Link href="https://www.seniorly.com/in-home-care">
            home care agency
          </Link>
          {' '}is another way to get respite care. Some agencies have 4-hour a day minimums.
          However, it is becoming more common for agencies to offer services with no hourly minimum.
        </Paragraph>
        <Paragraph>
          In-home respite caregivers provide a great solution for regularly scheduled breaks for primary caregivers.
        </Paragraph>
        <Paragraph>
          If your loved-one requires medical attention and medical monitoring, skilled nursing care is also available in home respite care on a short-term basis.
        </Paragraph>
        <Heading level="subtitle" size="subtitle">
          Adult Day Programs
        </Heading>
        <Paragraph>
          Hiring a{' '}
          <Link href="https://www.seniorly.com/resources/caregiver-support/adult-day-programs-for-caregiver-respite">
            Adult day care programs
          </Link>
          {' '}provide the care recipient with social time and activities as well as a break for the caregiver.
          Research on adult day care programs for older adults with dementia have found improvements in the health and
          well-being of both the caregiver and care recipient. Most participants attend programs for full days and about
          half attend five days a week.
        </Paragraph>
        <Tip>
          FREE RESOURCE{' '}
          <Link href="https://www.seniorly.com/resources/articles/a-secret-solution-to-paying-for-assisted-living">
            A Secret Solution to Paying for Senior Living by Arthur Bretschneider.
          </Link>
        </Tip>

        <Link
          href={`#${sectionIdMap.rc}`}
          onClick={e => handleAnchor(e, rcRef)}
        >
          Back to top
        </Link>
      </StyledArticle>
      <StyledArticle>
        <Heading level="title" size="title" _ref={articlesRef} >
          Featured Articles on Respite Care
        </Heading>

        <Paragraph>
          <Link href="https://www.seniorly.com/resources/respite-care/the-caregiver-vacation-respite-stays">
            The Caregiver Vacation
          </Link>
          {' '}- 29% of the US population is a caregiver for an elderly family member, and they need respite care
        </Paragraph>
        <Paragraph>
          <Link href="https://www.seniorly.com/resources/short-term-stays/when-short-term-care-is-needed">
            When Short-Term Stays Are Needed
          </Link>
          {' '}- Respite care can provide an ideal solution for giving loved ones the right level of care they need for a limited period of time.
        </Paragraph>
        <Paragraph>
          <Link href="https://www.seniorly.com/resources/care/respite-care-post-hip-or-knee-replacement">
            Respite Care Post Hip or Knee Replacement
          </Link>
          {' '}- Recovery from a joint replacement involves the right combination of rest, wound care, pain management, and physical therapy.
        </Paragraph>
        <Paragraph>
          <Link href="https://www.seniorly.com/resources/respite-care/respite">
            Respite Care and Health Benefits
          </Link>
          {' '}- Respite care is integral to supporting elders who wish to age at home.  It often helps these individuals recover after surgery or other medical complications.
        </Paragraph>
        <Paragraph>
          <Link href="https://www.seniorly.com/resources/respite-care/elder-care-following-a-heart-attack">
            Elder Care Following A Heart Attack
          </Link>
          {' '}- Community staff can help with care needs and medication management. They can encourage your loved one to get involved in community activities and events. This keeps them active and engaged as they recover.

        </Paragraph>



        <Link
          href={`#${sectionIdMap.rc}`}
          onClick={e => handleAnchor(e, rcRef)}
        >
          Back to top
        </Link>
      </StyledArticle>

      <StyledArticle>
        <Heading level="title" size="title" _ref={seniorLivingRef} >
          Other Types of Senior Living
        </Heading>
        <Paragraph>
          <Link href="https://www.seniorly.com/board-and-care-home">
            Board and Care Homes
          </Link>
          {' '}(also known as a residential care home or personal care home) are single family homes spread throughout your suburban neighborhood.
          <ul>
            <li>Pros: They are usually more budget friendly and have an intimate setting. They have higher staff to resident ratios (industry average 1:6).
            </li>
            <li>
              Cons: They lack many amenities, few socialization opportunities, or fine dining services.
            </li>
          </ul>
        </Paragraph>
        <Paragraph>
          <Link href="https://www.seniorly.com/assisted-living">
            Assisted Living Communities
          </Link>
          {' '}are purpose built properties often appearing to be a large apartment complex from the outside
          <ul>
            <li>
              Pros: They have many amenities, robust social programing and therapies, and typically offer better dining experiences.
            </li>
            <li>
              Cons: They often have lower staff to resident ratios (industry average 1:16).
            </li>
          </ul>
        </Paragraph>
        <Paragraph>
          <Link href="https://www.seniorly.com/memory-care">
            Memory Care Communities
          </Link>
          {' '}are either purpose built properties or wings within Assisted Living communities. Most large Assisted Living communities have Memory Care wings which offer 20-30 private and shared rooms to seniors.
          <ul>
            <li>
              Pros: They typically have staff training in Alzheimer’s and dementia senior care, and have higher staff to resident ratios (sometimes as low as 1:5).
            </li>
            <li>
              Cons: They are expensive and not all “training” is equal.
            </li>
          </ul>
        </Paragraph>
        <Paragraph>
          <Link href="https://www.seniorly.com/memory-care">
            CCRC (Continuing Care Retirement Communities or LifeCare)
          </Link>
          {' '}communities are purpose built properties meant to care for seniors when they are more independent. The concept was created to enable a new way to “age in place”.
          These properties have different living options that support seniors at a healthier stage all the way through very high levels of care (including medical needs).
          <ul>
            <li>
              Pros: They offer a new “age in place” solution.
            </li>
            <li>
              Cons: They are very expensive with initial buy-in fees in the hundreds of thousands to millions of dollars.
            </li>
          </ul>

        </Paragraph>
        <Link
          href={`#${sectionIdMap.rc}`}
          onClick={e => handleAnchor(e, rcRef)}
        >
          Back to top
        </Link>
      </StyledArticle>


      <StyledArticle>
        <NextSteps nextRef={nextRef}
                   toc="respite care"
                   label="Recommended reading:"
                   links={nextSteps} />

        <Link
          href={`#${sectionIdMap.rc}`}
          onClick={e => handleAnchor(e, rcRef)}
        >
          Back to top
        </Link>
      </StyledArticle>
      </>
    );
  };

  const title = 'What is Respite Care | Guide to Respite Care for Seniors ';
  const description = 'What is respite care? Respite care is a short-term stay in assisted living facility. Learn about respite care and why it may be a good option for some seniors..';

  return (
    <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    <HubHeader imagePath="react-assets/hub/home-care-cover.jpg"
               toc="respite care"
               heading="What is Respite Care Near You?"
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

RespiteCareNearMePage.propTypes = {
  handleAnchor: func,
};

export default RespiteCareNearMePage;
