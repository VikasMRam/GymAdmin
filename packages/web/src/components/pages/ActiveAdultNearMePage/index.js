import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';

import { size } from 'sly/common/components/themes';
import HubHeader from 'sly/web/components/molecules/HubHeader';
import PhoneCTAFooter from 'sly/web/components/molecules/PhoneCTAFooter';
import NextSteps from 'sly/web/components/molecules/NextSteps';
import { tocSiteNavigationLD, guideLD } from 'sly/web/services/helpers/html_headers';
import HowSlyWorksVideoContainer from 'sly/web/containers/HowSlyWorksVideoContainer'
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
} from 'sly/web/components/templates/HubPageTemplate';
import { Heading, Paragraph, Link } from 'sly/common/components/atoms';
import Footer from 'sly/web/components/organisms/Footer';

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

const ActiveAdultNearMePage = ({
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


  const aaRef = React.createRef();
  const costRef = React.createRef();
  const rulesRef = React.createRef();
  const prosConsRef = React.createRef();
  const aavsilRef = React.createRef();
  const aavsalRef = React.createRef();
  const nextRef = React.createRef();
  const nearRef = React.createRef();

  const sectionIdMap = {
    aa: 'what-is-active-adult',
    cost: 'cost',
    rules: '55-rules',
    proscons: 'pros-and-cons',
    aavsil: 'aa-vs-il',
    aavsql: 'aa-vs-al',
    near: 'active-adult-near-you',
    next: 'next-steps',
  };

  const tocList = [
    {
      title: "What is an Active Adult (55+) Community?",
      id: "what-is-active-adult",
      ref: aaRef
    },
    {
      title: "What Is The Cost of an Active Adult Community Near Me?",
      id: "cost",
      ref: costRef
    },
    {
      title: "What Are the Rules of a 55+ Community?",
      id: "55-rules",
      ref: rulesRef
    },
    {
      title: "The Pros and Cons of a 55+ Active Adult Community",
      id: "pros-and-cons",
      ref: prosConsRef
    },
    {
      title: "Active Adult Communities vs. Independent Living Communities",
      id: "aa-vs-il",
      ref: aavsilRef

    },
    {
      title: "Active Adult Communities vs. Assisted Living Communities",
      id: "aa-vs-al",
      ref: aavsalRef

    },
    {
      title: "How to Choose a 55+ Active Adult Community Near Me",
      id: "active-adult-near-you",
      ref: nearRef

    },
    {
      title: "Next Steps",
      id: "next-steps",
      ref: nextRef

    },
  ];

  const AANextSteps = [
    {title: "The Importance of an Active Retirement", to:"https://www.seniorly.com/resources/articles/the-importance-of-an-active-retirement"},
    {title: "Creative Ways to Stay Active as You Age", to:"https://www.seniorly.com/resources/articles/creative-ways-to-stay-active-as-you-age"},
    {title: "Making the Move to a Senior Living Community", to:"https://www.seniorly.com/resources/articles/making-the-move-to-a-community"},
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
          <Heading level="title" size="title" _ref={aaRef} >
            What Is an Active Adult Community?
          </Heading>
          <Paragraph>
            Active Adult Communities are master-planned retirement communities that offer residences and amenities to
            people who are 55 and up. In some cases, the communities are age-restricted, with the{' '}
            <Link href="http://www.fhcsp.com/Providers/hop.html">
              Fair Housing Act requiring that 80%
            </Link>
            {' '}of the residences have someone at least 55 years old living there.
          </Paragraph>
          <Paragraph>
            People living in{' '}
            <Link href="https://www.whereyoulivematters.org/what-is-an-active-adult-community/">
              Active Adult Communities
            </Link>
            {' '}may rent their homes, or they may own the condos, single-family homes, apartments, or townhomes
            making up the community. Typically, all outside maintenance is provided to homes in the community,
            with homeowners or renters handling the inside maintenance.
          </Paragraph>
          <Paragraph>
            Active Adult Communities appeal to those who want to enjoy retirement living and stay active.
            They're often located near shopping, recreation, restaurants, and entertainment, providing
            residents with plenty to do.
          </Paragraph>
          <Paragraph>
            The amenities in Active Adult Communities can range from modest to lavish, with some
            retirement communities boasting swimming pools, tennis courts, and even golf courses.
            Unlike other types of senior living communities, Active Adult Communities don't offer on-site
            dining facilities or medical care. All amenities are typically paid for through the homeowner's
            association (HOA) dues.
          </Paragraph>


          <Link
            href={`#${sectionIdMap.aa}`}
            onClick={e => handleAnchor(e, aaRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={costRef}>
            What Is The Cost of an Active Adult Community Near Me?
          </Heading>
          <Paragraph>
            The monthly costs of an Active Adult Community vary drastically depending largely on where you live.
            In addition, the level of amenities provided can affect the overall cost. If you live in a major city with
            high housing costs, such as Boston, San Francisco, or New York, you can expect higher costs. Of course,
            the size of your living space also affects the price you pay, with a two-bedroom home costing more than a studio.
          </Paragraph>
          <Paragraph>
            Even in a state with a high cost of living, though, it's{' '}
            <Link href="https://smartasset.com/mortgage/the-best-55-active-retirement-communities">
              possible to find affordable Active Adult Communities.
            </Link>
            {' '}For example, adults who prize the great weather
            in Southern California or who want to be near family there can head to towns like Hemet or Apple Valley to
            buy homes starting in the mid $200,000s located in 55+ resort-style communities with golf courses and
            low HOA fees of around $150 per month.
          </Paragraph>
          <Paragraph>
            Along the Gulf Coast of Florida, active adults can find homes set in retirement communities filled with
            lakes and the recreational amenities that go along with them, again beginning in the $200,000s.
          </Paragraph>
          <Paragraph>
            Looking for a more posh community on the higher end?{' '}
            <Link href="https://www.cnbc.com/2018/02/14/6-top-luxury-retirement-communities.html">
              High-end Active Adult Communities
            </Link>
            {' '}featuring homes with prices approaching $2 million are available for those seeking expansive ocean
            views, marinas, polo grounds, or high-rise views over exciting cities such as Chicago.
          </Paragraph>
          <Paragraph>
            Expect to pay monthly fees that average around $5,000 for the luxurious lifestyles provided at these high-end communities.
          </Paragraph>
          <Paragraph>
            It's often possible to find{' '}
            <Link href="https://money.usnews.com/money/retirement/articles/2016-02-12/can-you-afford-these-luxuries-of-senior-living">
              more affordable options
            </Link>
            {' '}in the same retirement communities, with smaller homes beginning in the high $300,000s and monthly
            fees in the $3,000s in these same communities.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.aa}`}
            onClick={e => handleAnchor(e, aaRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={rulesRef} >
            What Are the Rules of a 55+ Community?
          </Heading>

          <Paragraph>
            Each 55+ community has its own rules about various lifestyle choices — noise or parking regulations, for instance.
            But all 55+ retirement communities share restrictions regarding the age of their residents.
            While the younger spouse of a 55+ adult may live in the senior living community (and stay
            there if the older spouse passes away), one person who is at least 55 must live in every home. In addition,
            no children may live in the community.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.aa}`}
            onClick={e => handleAnchor(e, aaRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>

          <Heading level="title" size="title" _ref={prosConsRef}>
            The Pros and Cons of a 55+ Active Adult Community
          </Heading>
          <Paragraph>
            Residents in 55+ communities can enjoy amenities that encourage them to stay active and enjoy their retirement.
            In addition, life in an Active Adult Community surrounds you with a community of people of a similar age,
            who grew up the way you grew up and provide a true sense of community.
          </Paragraph>
          <Paragraph>
            Today, active adults want to live in a neighborhood where they know their neighbors and{' '}
            <Link href="https://www.nytimes.com/interactive/2018/11/14/magazine/tech-design-longevity-margaritaville.html">
              everyone feels safe and welcomed
            </Link>
            . Take a look at some of the benefits of living in a 55+ community.
          </Paragraph>
          <Heading level="subtitle" size="subtitle">
            The Pros and Cons of a 55+ Active Adult Community
          </Heading>
          <ul>
            <li>
              <strong>A community of your peers.</strong> It's relaxing to spend time with people in the same life stage. Many 55+ communities offer classes and activities to help people with similar interests get together.
            </li>
            <li>
              <strong>Plenty of amenities to enhance retirement.</strong> Retirement is the time to do all the things you couldn't do when working a 40-hour week, and Active Adult Communities open the doors to that with events, clubs, and recreational opportunities and facilities.
            </li>
            <li>
              <strong>Less time spent on maintenance.</strong> People who are tired of pushing a lawnmower or dealing with exterior upkeep enjoy the low-maintenance style of Active Adult Communities.
            </li>
            <li>
              <strong>The opportunity to downsize.</strong> As children grow up and have families of their own, many adults find themselves maintaining and paying for a home that's larger than they need. The chance to downsize can be a huge relief.
            </li>
          </ul>
          <Heading level="subtitle" size="subtitle">
            The Cons of Living in a 55+ Active Adult Community
          </Heading>
          <Paragraph>
            While 55+ communities are very appealing to many, they do have a few drawbacks:
          </Paragraph>
          <ul>
            <li>
              <strong>Everyone's in the same age range.</strong> While this factor is a plus for many seniors, some people prefer to live in neighborhoods that feature a greater diversity of age.
            </li>
            <li>
              <strong>Lack of health and personal care.</strong> As seniors age, they often require a greater level of personal and health care. While it's possible to arrange for in-home care in an Active Adult Community, some residents may come to need a higher level of care.
            </li>
          </ul>

          <Link
            href={`#${sectionIdMap.aa}`}
            onClick={e => handleAnchor(e, aaRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={aavsilRef} >
            Active Adult Communities vs. Independent Living Communities
          </Heading>
          <Paragraph>
            Active Adult and Independent Living Communities share a lot in common. Both consist of homes that
            residents own or rent, and both provide exterior maintenance services and recreational options.
            Independent Living Communities, though, have many services that aren't available in Active Adult Communities.
          </Paragraph>
          <Paragraph>
            <Link href="https://www.seniorly.com/independent-living">
              Independent Living Communities
            </Link>
            {' '}offer housekeeping services, as well as on-site meal plans of various sorts. In addition,
            residents of Independent Living Communities can take advantage of personal care services and some health
            care services on-site. Staff members are typically available to help residents as needed.
          </Paragraph>
          <StyledTable>
            <thead>
            <tr>
              <th />
              <th>
                Active Adult/55+ Communities
              </th>
              <th>
                Independent Living Communities
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                Age Restrictions
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
                Single-family homes?
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
                Condos/Apartments?
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
                Individual or shared rooms?
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
                Personal Care
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
                Housekeeping/Laundry
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
                Memory Care
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
                Meals
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
                Educational, recreational, and social activities available
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
                No
              </td>
              <td>
                Yes
              </td>
            </tr>
            </tbody>
          </StyledTable>
          <Link
            href={`#${sectionIdMap.aa}`}
            onClick={e => handleAnchor(e, aaRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={aavsalRef} >
            Active Adult Communities vs. Assisted Living Communities
          </Heading>
          <Paragraph>
            While Active Adult Communities are designed for those who are able to live independently,{' '}
            <Link>
              Assisted Living Communities
            </Link>
            {' '}cater to those who need a little help with the{' '}
            <Link href="https://www.seniorly.com/resources/articles/what-are-the-activities-of-daily-living-adls">
              Activities of Daily Living
            </Link>
            , such as bathing, grooming, and managing medication. Assisted Living Communities also provide all meals
            for their residents, something you won't find in an Active Adult Community.
          </Paragraph>
          <StyledTable>
            <thead>
            <tr>
              <th />
              <th>
                Active Adult/55+ Communities
              </th>
              <th>
                Assisted Living Communities
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                Age Restrictions
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
                Single-family homes?
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
                Condos/Apartments?
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
                Individual or shared rooms?
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
                Personal Care
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
                Housekeeping/Laundry
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
                Memory Care
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
                Meals
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
                Educational, recreational, and social activities available
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
                No
              </td>
              <td>
                Yes
              </td>
            </tr>
            </tbody>
          </StyledTable>
          <Link
            href={`#${sectionIdMap.aa}`}
            onClick={e => handleAnchor(e, aaRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={nearRef} >
            How to Choose a 55+ Active Adult Community Near Me
          </Heading>
          <Paragraph>
            When you wonder, "How can I choose the right Active Adult Community near me?" you should think
            about the kind of lifestyle you're looking for as well as what you can afford.{' '}
            <Link href="https://www.forbes.com/sites/nextavenue/2019/06/12/how-to-choose-a-55-active-adult-community/#756f50062e95">
              Some considerations as you look for a 55+ community
            </Link>
            {' '}include:
          </Paragraph>
          <ul>
            <li>
              <strong>Cost.</strong> Your costs include rent or mortgage plus your HOA dues — and you still have to pay
              for your own meals, health care, and other personal expenses. Add up the numbers to see what you can afford.
            </li>
            <li>
              <strong>Location.</strong> If you don't like the greater area you're living in, it may not matter
              how much you like the 55+ retirement community you're considering. Make sure you choose an area you
              love, with the weather and activities you prefer.
            </li>
            <li>
              <strong>Amenities.</strong> Golf-lovers won't be happy if they end up in a 55+ community with no golf
              course, while others might not want to pay for a golf course they don't use. Check out the amenities
              at the retirement community to see if they match your personality
            </li>
          </ul>
          <Link
            href={`#${sectionIdMap.aa}`}
            onClick={e => handleAnchor(e, aaRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <NextSteps nextRef={nextRef}
                     toc="Active Adult"
                     label="Think a active community might be right for you or your loved one? Learn more about each type below to help narrow down your search:"
                     links={AANextSteps} />
          <Heading level="subtitle" size="subtitle" >
            How Seniorly Works
          </Heading>
          <Paragraph>
            <HowSlyWorksVideoContainer eventLabel='active-adult' />
          </Paragraph>
        </StyledArticle>
      </>
    );
  };

  const title = 'What is an Active Adult Community?';
  const description = 'Learn about how Active Adult Communities, also known as 55+ Retirement Communities, differ from other types of senior living, and see whether a 55+ community is right for you.';
  const heading = state ? `${listSize} ${tocLabel} near ${city}, ${getStateAbbr(state)}` : `${listSize} ${tocLabel} near ${city}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {tocSiteNavigationLD("https://www.seniorly.com/active-adult", tocList)}
        {guideLD(title, description, "https://www.seniorly.com/active-adult")}
      </Helmet>
      <HubHeader imagePath="react-assets/hub/memory-care-cover.jpg"
         toc="active adult"
         heading="Find the Best Active Adult Communities Near You"
         label="Use our free search to find active adult options nearby"
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
            {/*<Heading level="title" size="title">*/}
              {/*{heading}*/}
            {/*</Heading>*/}
            {/*{isFetchingResults && <Heading level="hero" size="title">loading...</Heading>}*/}
            {/*{!isFetchingResults && (*/}
              {/*<CommunitySearchList*/}
                {/*communityList={communityList}*/}
                {/*searchParams={searchParams}*/}
                {/*requestMeta={requestMeta}*/}
                {/*location={location}*/}
              {/*/>*/}
            {/*)}*/}
            </Body>
          </TwoColumn>
        </Wrapper>
      </HubPageTemplate>
      <PhoneCTAFooter/>
      <Footer />
    </>

  );
};

ActiveAdultNearMePage.propTypes = {
  onLocationSearch: func,
  communityList: array.isRequired,
  requestMeta: object.isRequired,
  searchParams: object,
  isFetchingResults: bool,
  handleAnchor: func,
  location: object.isRequired,
  onCurrentLocation: func,
};

export default ActiveAdultNearMePage;
