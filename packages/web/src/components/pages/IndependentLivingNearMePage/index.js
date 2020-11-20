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
import Tip from 'sly/web/components/molecules/Tip';
import { faqPage, tocSiteNavigationLD, guideLD } from 'sly/web/services/helpers/html_headers';
import HowSlyWorksVideoContainer from 'sly/web/containers/HowSlyWorksVideoContainer';
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
import { ResponsiveImage } from 'sly/web/components/atoms';
import Footer from 'sly/web/components/organisms/Footer';
import { getTocSeoLabel } from 'sly/web/components/search/helpers';
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

const IndependentLivingNearMePage = ({
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
  const tocLabel = getTocSeoLabel('independent-living');


  const ilRef = React.createRef();
  const costRef = React.createRef();
  const typesRef = React.createRef();
  const alternativeRef = React.createRef();
  const servicesRef = React.createRef();
  const ilvsalRef = React.createRef();
  const chooseRef = React.createRef();
  const faqRef = React.createRef();
  const nextRef = React.createRef();
  const nearRef = React.createRef();

  const tocList = [
    {
      title: "What Is Independent Living?",
      id: "what-is-independent-livingwhat-is-assisted-living",
      ref: ilRef
    },
    {
      title: "The Cost of Independent Living",
      id: "cost",
      ref: costRef
    },
    {
      title: "Types of Independent Living",
      id: "types",
      ref: typesRef
    },
    {
      title: "Independent Living Alternatives",
      id: "alternative",
      ref: alternativeRef
    },
    {
      title: "Services Provided in Independent Living",
      id: "services",
      ref: servicesRef
    },
    {
      title: "Independent Living vs. Assisted Living",
      id: "il-vs-al",
      ref: ilvsalRef
    },
    {
      title: "How to Choose the Right Independent Living Community",
      id: "choosing-memory-care",
      ref: chooseRef
    },
    {
      title: "Independent Living FAQs",
      id: "frequently-asked-question",
      ref: faqRef

    },
    {
      title: "Next Steps",
      id: "next",
      ref: nextRef

    },
    {
      title: "Browse Independent Living Near You",
      id: "near",
      ref: nearRef

    },

  ];

  const nextSteps = [
    {title: "Evaluating Independent Living Communities", to:"https://www.seniorly.com/independent-living/articles/evaluating-independent-living-communities"},
    {title: "Understanding the Cost of Independent Living", to:"https://www.seniorly.com/independent-living/articles/understanding-the-cost-of-independent-living"},
    {title: "Frequently Asked Questions About Independent Living", to:"https://www.seniorly.com/independent-living/articles/seniorly-independent-living-faqs"},
  ];

  const agents = [
    {
      title: "Sarah Odover - Los Angeles, CA",
      to: "https://www.seniorly.com/agents/pacific-west/beverley-hills/assisted-living-locators-los-angeles-ca-sarah-ordover-",
      asset: "images/hub/agents/Sarah.png",
      caption: "Sarah Ordover has over 4 years of experience helping families find independent living, \n" +
      "assisted living, and memory care options. She has helped over 100 families so far in the Los Angeles area.",
      first: "Sarah"
    },
    {
      title: "Heather Cartright - Sarasota, FL",
      to: "https://www.seniorly.com/agents/south/ellenton-fl/my-care-finders-fl-heather-cartright-",
      asset: "images/hub/agents/Heather.png",
      caption: "Heather Cartright has over a year of experience helping families find independent living, \n" +
      "assisted living, and memory care options. As a former assisted living facility administrator, \n" +
      "she brings a unique skillset for senior living placement.",
      first: "Heather"
    },
    {
      title: "Carol Katz - New Jersey",
      to: "https://www.seniorly.com/agents/northeast/manalapan/adult-care-advisors-carol-katz-",
      asset: "images/hub/agents/Carol-Katz.png",
      caption: "Carol Katz has over 10 years of experience helping families find independent living, \n" +
      "assisted living, and memory care options. With her unique volunteer experience, she brings \n" +
      "a special skillset for senior living placement.",
      first: "Carol"
    },
  ];

  const faqs = [
    {
      question: "How much is independent living?",
      answer: "The cost of independent living is as varied as the types of communities available.  To begin, most independent living communities do require some kind of upfront fee to become a resident. If you're joining a CCRC, the fee can be sizable ($500,000 and up), because you're joining a system that involves medical services. In other types of independent living communities, the fee may be the equivalent of a security deposit on a new apartment. The fee is often larger or smaller depending on the types of amenities and services the independent living community offers and on the type of residential unit you're choosing. If you're buying a condo or other home within an independent living community, of course you'll be subject to the down payment and other closing fees involved with any real estate transaction, and a membership fee may also be required."
    },
    {
      question: "What’s the difference between independent living and assisted living?",
      answer: "Residents in an independent living community do receive some help that makes life a little easier, but these are generally confined to areas like maintenance, yard care and maybe housekeeping. Residents in assisted living facilities typically receive some assistance with the activities of daily living (ADLs), including medication management and often including meal preparation. Assisted living residents, however, usually don't need significant skilled medical care on a daily basis."
    },
    {
      question: "How many independent living facilities are there in the U.S.?",
      answer: "There are thousands of independent living facilities in the U.S. They range from large campuses to smaller, home-like settings. You can search Seniorly.com for the independent living communities near you."
    },
    {
      question: "How old do you have to be for independent living?",
      answer: "Most independent living communities have a minimum age requirement of 55.  These are known as age-restricted communities. As detailed above, there are many other types of independent living and their age requirements vary, but never go below 55."},
    {
      question: "Are pets allowed in an independent living community?",
      answer: "Most independent living communities welcome pets, understanding how therapeutic they can be for older adults. Because some communities have restrictions on the type, breed, or size of pets allowed, make sure you ask about the policy if you want to bring a pet with you. Also ask about any deposits or fees required."},
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
          <Heading level="title" size="title" ref={ilRef} >
            What Is Independent Living?
          </Heading>
          <Paragraph>
            <Link href="http://blog.aarp.org/2012/01/30/taking-a-closer-look-at-independent-living/">
            Independent Living communities
            </Link>
            {' '}are designed for seniors who don't require personal care assistance. Senior residents at this kind
            of senior living community want to streamline their lives and live with people of their own generation.
          </Paragraph>
          <Paragraph>
            Baby boomers in Independent Living typically are active and healthy. They have no need for assistance with their{' '}
            <Link href="https://www.seniorly.com/resources/articles/what-are-the-activities-of-daily-living-adls">
              activities of daily living (ADLs).
            </Link>
            {' '}Also, they select this type of community because they want to avoid the hassle of maintenance and
            upkeep of their current home.
          </Paragraph>
          <Paragraph>
            To make life easy and enjoyable for residents, Independent Living communities provide plenty of amenities.
            These may include dining facilities, landscaping and maintenance, housekeeping services, social activities
            and clubs, and exercise facilities.
          </Paragraph>
          <Paragraph>
            On-site amenities and delivery services via the mobile economy make this an ideal choice for active adults.
            They can enjoy having services such as pet care, auto repair, or meal delivery available on demand.
          </Paragraph>
          <Paragraph>
            When you choose an Independent Living community you will have a few housing options.
            There can be a private studio or a spacious two-bedroom apartment. Residences may be available for either
            purchase or rent, depending on the community.
          </Paragraph>


          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, ilRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" ref={costRef}>
            The Cost of Independent Living
          </Heading>
          <Paragraph>
            The cost of an Independent Living community near you varies greatly.
            This depends on the type of community, the location, and the amenities offered.
          </Paragraph>
          <Paragraph>
            In some Independent Living communities, residents may have the option to buy their homes rather than
            renting. This is most common in active adult communities or age-restricted communities.
            In some rental communities, a buy-in fee is required to join the community.
          </Paragraph>
          <Paragraph>
            Costs can range as low as $1,000 in Independent Living communities designated for low-income
            residents. On the other end of the spectrum, there are high-end Independent Living communities packed with luxurious amenities.
            They can feature condos running as high as $1 million or apartments with
            $100,000 buy-ins.
          </Paragraph>
          <Paragraph>
            On average, you can expect to spend somewhere between $1,500 and $6,000. This is for the combination of
            rent/mortgage plus amenities or association fees. Some services, such as housekeeping,
            transportation or dining, may incur extra fees.
          </Paragraph>
          <Paragraph>
            Independent Living fees are typically not covered by any type of insurance, including Medicare or
            long-term care insurance. However, if Independent Living residents require{' '}
            <Link href="https://www.seniorly.com/in-home-care">
              Home Care
            </Link>
            {' '}for medical reasons,
            some of those costs may be covered by insurance.
          </Paragraph>

          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, ilRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Paragraph>
            <StyledImage path="fa209740c6c30907d669ff08a8e4876b/Madison_Meadow_06_photo_Seniorly.jpg" alt="Madison Meadows, Phoenix, AZ" height={640} />
            Photo:{' '}
            <Link href="https://www.seniorly.com/independent-living/arizona/phoenix/phoenix-senior-living-at-madison-meadows">
              Madison Meadows, Phoenix, AZ
            </Link>
          </Paragraph>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" ref={typesRef} >
            Types of Independent Living
          </Heading>

          <Paragraph>
            All Independent Living communities offer a variety of services and amenities.
            There are some differences between the types of communities available for you to choose between.
          </Paragraph>
          <Heading level="subtitle" size="subtitle">
            Active Adult Communities
          </Heading>
          <Paragraph>
            Active adult communities are aimed at people who are aged 55 and older.
            They're targeted to appeal to baby boomers. This senior living option may consist of single-family homes,
            multi-family homes, townhomes, condos, or a mixture of different housing types.
          </Paragraph>
          <Paragraph>
            Active adult communities can be quite large. Many have golf courses, clubhouses and common areas,
            pools, and other recreational amenities to appeal to the active adult lifestyle.
          </Paragraph>
          <Paragraph>
            Active adult communities aren't set up to provide health care services.
            If you need medical care, you might want to explore a{' '}
            <Link href="https://www.seniorly.com/skilled-nursing-facility">
              skilled nursing facility
            </Link>. If you only need personal care, then an{' '}
            If you need medical care,
            you might want to explore{' '}
            <Link href="https://www.seniorly.com/assisted-living">
              assisted living facility
            </Link>
            {' '}is the better choice.
          </Paragraph>
          <Paragraph>
            Some independent living communities offer transportation options, such as shuttles to nearby shopping and
            entertainment. Residents typically pay a monthly fee that covers the amenities and all outdoor maintenance.
          </Paragraph>
          <Heading level="subtitle" size="subtitle">
            CCRC (Continuing Care Retirement Communities)
          </Heading>
          <Paragraph>
            <Link href="https://www.seniorly.com/continuing-care-retirement-community">
              CCRC (Continuing Care Retirement Communities)
            </Link>
            {' '}makes it easy for seniors to age in place. This senior living community provides a continuum of care as
            the needs change. There are high entrance fees, but they are providing a guarantee all your care needs will be met.
          </Paragraph>
          <Paragraph>
            Often, today's baby boomers start in Independent Living. Then they move to{' '}
            <Link href="https://www.seniorly.com/assisted-living">
              assisted living
            </Link>
            {' '}or{' '}<Link href="https://www.seniorly.com/memory-care">
            memory care
          </Link>
            {' '}if needed. Finally, they move to a{' '}
            <Link href="https://www.seniorly.com/skilled-nursing-facility">
              skilled nursing facility
            </Link>{' '}or hospice, if required.
          </Paragraph>
          <Paragraph>
            This happens within the same community.  The change from one level of care to the next is far
            less jarring to the seniors in a CCRC.
          </Paragraph>
          <Heading level="subtitle" size="subtitle">
          Senior Apartments
        </Heading>
          <Paragraph>
            Senior apartments are designed to cater to the physical and emotional needs of seniors.
            They generally have minimal stairs and feature safety equipment such as handrails in bathrooms.
          </Paragraph>
          <Paragraph>
            Because senior apartments are located in age-restricted buildings, they often foster a real sense of community.
            They can take the form of standard single-family apartments or condos.  Individual apartments can be arranged in suites.
            Senior residents get private bedrooms and bathrooms, but they share a common living space and kitchen.
          </Paragraph>
          <Heading level="subtitle" size="subtitle">
            Age-Restricted Communities
          </Heading>
          <Paragraph>
            Age-restricted communities, which are restricted to those aged 55 and over, are governed under the{' '}
            <Link href="https://www.justice.gov/crt/fair-housing-act-1">
              Fair Housing Act.
            </Link>
            {' '}According to the rules under this act, 80 percent of age-restricted units must house someone over 55.
            No minors are allowed to live in the community.

          </Paragraph>
          <Paragraph>
            Age-restricted communities often feature a country club-style setting. You might find a golf course,
            tennis courts, clubhouse, and swimming pools, as well as other high-end amenities.

          </Paragraph>

          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, ilRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" >
            What Is A Local Senior Living Expert?
          </Heading>
          <WhatIsPartnerAgent toc="independent living" agents={agents}/>
        </StyledArticle>

        <StyledArticle>

          <Heading level="title" size="title" ref={alternativeRef}>
            Independent Living Alternatives
          </Heading>
          <Paragraph>
            The most common types of Independent Living that baby boomers move into are active adult communities,
            CCRCs, and age-restricted communities. There are a few more innovative options also available.
          </Paragraph>
          <Heading level="subtitle" size="subtitle">
            Senior Co-Housing
          </Heading>
          <Paragraph>
            In{' '}
            <Link href="https://www.seniorly.com/resources/articles/what-is-cohousing">
              senior co-housing
            </Link>, residents enjoy both private and common living space. Generally, a senior cohousing
            community features 20 to 40 homes centered around a central lawn or outdoor area. While everyone has
            personal living space, the entire community enjoys living space, dining space, a large kitchen,
            and shared laundry facilities.  Sometimes, co-housing senior communities cater to residents who
            share the same hobbies or interests.
          </Paragraph>
          <Tip>
            PRO TIP: Learn more about this age targeted option further here:{' '}
            <Link href="https://www.cohousing.org/directory/wpbdp_category/seek/">
              Cohousing Associate of the United States.
            </Link>
            {' '}are often available for assistance with care needs.
          </Tip>

          <Heading level="subtitle" size="subtitle">
            Cruise Ship Life
          </Heading>
          <Paragraph>
            There aren't any dedicated retirement cruises available.  Increasing numbers of baby boomers have
            crunched the numbers and realized that they can enjoy life on a cruise ship.
            Their costs are about the same as they would spend on a retirement community on land.

          </Paragraph>
          <Paragraph>
            This alternative lifestyle is ideal for couples (who can avoid the higher charges that singles pay on cruises).
            The numbers work best if you stick with the same cruise line to build up loyalty points. However, cruising
            retirees can't count on regular health care if they need it. Also, spending a life at sea can eat
            into time spent with grandchildren and friends.
          </Paragraph>

          <Heading level="subtitle" size="subtitle">
            The Village Movement
          </Heading>
          <Paragraph>
            The Village Movement is a rapidly growing alternative to retirement communities.
            They are designed to let older adults stay in their own homes as they age. The "village" in question isn't
            an actual village, but a membership organization located within a given neighborhood.

          </Paragraph>
          <Paragraph>
            The members pay annual dues to gain access to a network of discounted services.
            These include home health care, grocery delivery, and home maintenance services.
            In addition, the village often sponsors local social activities that draw the small
            communities together. Several hundred villages exist in various towns across the United States.
          </Paragraph>


          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, ilRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" ref={servicesRef} >
            Services Provided in Independent Living
          </Heading>

          <Paragraph>
            The services and amenities available vary from one Independent Living community to another.
            Still, many communities offer some combination of these amenities:
          </Paragraph>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Gyms and exercise facilities
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Swimming pools and hot tubs
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Beauty salons and barber shops
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Dining facilities with chef-prepared meals
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              A full social activity schedule
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Transportation near the community
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Housekeeping, linen and/or laundry services
            </ListItem>
            <ListItem icon="checkmark-circle" iiconPalette="primary" iconVariation="base">
              24/7 security
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Religious services
            </ListItem>
          </ListWrapper>


          <Heading level="subtitle" size="subtitle">
            Medical Care in Independent Living Communities
          </Heading>
          <Paragraph>
            You probably noticed that the above list of independent living amenities and services doesn't
            include medical care. Most active adults who choose an Independent Living community don't
            have significant medical needs when they move into the community.
          </Paragraph>
          <Paragraph>
            Sometimes,{' '}
            <Link href="https://www.sfchronicle.com/senior-living/article/Meet-Generation-B-Entrepreneurial-educated-and-13942528.php">
              baby boomers
            </Link>
            {' '}in an Independent Living community don't want to leave their homes to enter
            assisted living or a skilled nursing facility. Even when their need for care becomes more urgent, they
            don’t want to move.
          </Paragraph>
          <Paragraph>
            One solution for aging citizens who do need some regular medical or personal care is Home Care services.
            With Home Care, trained caregivers provide the services needed right in the senior's own home.
          </Paragraph>
          <Paragraph>
            At Seniorly, we have access to top{' '}
            <Link href="https://www.seniorly.com/in-home-care">
              Home Care
            </Link>
            {' '}services and are happy to connect you, if needed.
            For more information on Home Care,{' '}
            <Link href="https://www.seniorly.com/in-home-care">
              click here.
            </Link>
          </Paragraph>
          <Paragraph>
            It’s important to remember many people mistakenly use the term “
            <Link href="https://www.seniorly.com/nursing-homes">
              nursing home
            </Link>” when searching for any
            kind of senior living.  That is a catch-all phrase for all senior living housing options.
            However, independent living is the farthest removed from what a searcher might be thinking of when looking for a nursing home.
          </Paragraph>

          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, ilRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
            <Heading level="title" size="title" ref={ilvsalRef} >
              Independent Living vs. Assisted Living
            </Heading>
            <Paragraph>
              An independent living community is not the right choice for older adults who need help with the
              Activities of Daily Living (ADLs). This includes assistance with dressing, bathing and meal preparation.
              The right senior living community option is called{' '}
              <Link href="https://www.seniorly.com/assisted-living">
                Assisted Living.
              </Link>{' '}Take a look at the basic differences between these two types of senior living.
            </Paragraph>
            <StyledArticle>
              <StyledTable>
                <thead>
                <tr>
                  <th />
                  <th>
                    Independent Living
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
                    Yes
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
                    No
                  </td>
                  <td>
                    Usually
                  </td>
                </tr>
                <tr>
                  <td>
                    Transportation Provided
                  </td>
                  <td>
                    Sometimes
                  </td>
                  <td>
                    Usually
                  </td>
                </tr>
                <tr>
                  <td>
                    Medication Management Services
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
                    3 Meals a Day Provided
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
                    Housekeeping Services Provided
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
                    Assistance With Activities of Daily Living
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
                    Social Activities
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
                    Exercise Facilities and Programs
                  </td>
                  <td>
                    Yes
                  </td>
                  <td>
                    Usually
                  </td>
                </tr>
                </tbody>
              </StyledTable>
            </StyledArticle>

            <Link
              href={`#${tocList[0].id}`}
              onClick={e => handleAnchor(e, ilRef)}
            >
              Back to top
            </Link>
          </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" ref={chooseRef} >
            How to Choose the Right Independent Living Community
          </Heading>

          <Paragraph>
            If you're considering an Independent Living community near you start by determining which type of community
            is the best choice.  Options include an active adult community, co-housing, a CCRC, or other choices.
            Research the communities available in your chosen location, comparing their costs and amenities.
            Paying a visit is also highly recommended.
          </Paragraph>
          <Paragraph>
            When you visit an Independent Living community, you'll be able to see which housing units are available.
            You can also check to see if the amenities and services are as advertised. Get a sense of whether the
            community is a good fit for you or your loved one.
          </Paragraph>
          <Paragraph>
            While visiting, you should feel free to ask any questions that occur to you. Remember, you're making a
            big decision with this move. You have the right to know all the information about the community you might
            choose as your own.
          </Paragraph>
          <Paragraph>
            Here are some suggestions of questions you might want to ask during your visit, just to get you started.
          </Paragraph>
          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              What social and recreational activities are offered? How many residents actually participate in the activities you're interested in?
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              What options are available if you need regular medical or personal care in your home? Are you allowed to bring in an in-home caregiver? Under what circumstances would you be asked to move to an Assisted Living community?
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              What's included in the monthly fee? Is the monthly fee increased every year? If not, when is it increased? What happens if a resident has difficulty paying the monthly fee?
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              What assistance will the Independent Living community provide to help you move and get settled there?
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              What's the security like at the community? What emergency services are available?
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Are any meals provided? If the answer is yes, how many meals are provided, and which ones? Are they included in the monthly fee? Are any accommodations available if you need to follow a restricted diet (gluten-free, vegetarian, kosher, etc.)?
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Are visitors allowed? What about overnight visitors? Are children allowed to visit? Is there a curfew for visitors (or for any other activities)?
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Does the community allow residents to have pets? Are there restrictions on the size or type of pets? Is it possible to make arrangements for pet care if you need to travel away from the community for any reason?
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              What transportation is available at the community? Does the community provide any kind of shuttles or private transportation for medical appointments, errands, or entertainment?
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Do residents of the Independent Living community get involved with the surrounding community? What's the relationship between the Independent Living community and the surrounding neighborhood like?
            </ListItem>
          </ListWrapper>

          <Paragraph>
            <strong> FREE TOOL: </strong>{' '}
            <Link href="https://www.seniorly.com/resources/articles/questions-to-ask-on-your-community-tour">
              74 Questions to Ask When Touring
            </Link>
          </Paragraph>


          <Link
            href={`#${tocList[0].id}`}
            onClick={e => handleAnchor(e, ilRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" ref={faqRef} >
            Independent Living FAQs
          </Heading>
          <Paragraph>
            Below you will find a sampling of the 5 most frequently asked questions we get regarding independent living.  For a comprehensive list of independent living frequently asked questions, click through to our{' '}
            <Link href="https://www.seniorly.com/independent-living/articles/seniorly-independent-living-faqs">
              Independent Living FAQ section
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
                     toc="independent living"
                     label="By asking these questions, you can determine whether an Independent Living community is the right choice. We are providing additional Independent Living resources below to help you through the decision making process. Explore one of the three topics below to help narrow down your search:"
                     links={nextSteps} />
          <Heading level="subtitle" size="subtitle" >
            How Seniorly Works
          </Heading>
          <Paragraph>
            <HowSlyWorksVideoContainer eventLabel='independent-living' />
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
            onClick={e => handleAnchor(e, ilRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
      </>
    );
  };

  const title = 'Find the Best Independent Living Near You ';
  const description = 'What is independent living? Learn about the types of independent living communities for seniors, costs of independent living and how to choose the right place.';
  const heading = state ? `${listSize} ${tocLabel} near ${city}, ${getStateAbbr(state)}` : `${listSize} ${tocLabel} near ${city}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {faqPage(faqs)}
        {tocSiteNavigationLD("https://www.seniorly.com/independent-living", tocList)}
        {guideLD(title, description, "https://www.seniorly.com/independent-living")}
      </Helmet>
      <HubHeader imagePath="react-assets/hub/independent-living-cover.jpg"
         toc="independent living"
         heading="What is Independent Living Near You?"
         label="Use our free search to find independent living nearby"
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

IndependentLivingNearMePage.propTypes = {
  onLocationSearch: func,
  communityList: array.isRequired,
  requestMeta: object.isRequired,
  searchParams: object,
  isFetchingResults: bool,
  handleAnchor: func,
  location: object.isRequired,
  onCurrentLocation: func,
};

export default IndependentLivingNearMePage;
