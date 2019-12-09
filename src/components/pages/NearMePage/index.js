import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';

import { size, assetPath, palette } from 'sly/components/themes';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateHeader, TemplateContent } from 'sly/components/templates/BasePageTemplate';
import { Image, Label, Heading, Paragraph } from 'sly/components/atoms';
import Footer from 'sly/components/organisms/Footer';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import SeoLinks from 'sly/components/organisms/SeoLinks';
import { ALSeoCities, ALSeoStates } from 'sly/services/helpers/homepage';
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
            Find The Best Assisted Living Near Me
          </StyledHeading>
          <StyledLabel palette="white">
            Use our free search to find assisted living nearby
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

  const listSize = requestMeta['filtered-count'];
  const { geo } = requestMeta;
  const city = geo && geo.city;
  const tocLabel = getTocSeoLabel('assisted-living');

  const topRef = React.createRef();
  const alRef = React.createRef();
  const staffRef = React.createRef();
  const licenseRef = React.createRef();
  const socialRef = React.createRef();
  const costRef = React.createRef();
  const alvsnhRef = React.createRef();
  const alvsilRef = React.createRef();
  const nextRef = React.createRef();

  const sectionIdMap = {
    top: 'top',
    al: 'what-is-assisted-living',
    staff: 'medical-staff',
    license: 'license',
    social: 'social',
    cost: 'cost',
    alvsnh: 'al-vs-nh',
    alvsil: 'al-vs-il',
    next: 'next',
  };

  const SEOContentAL = () => {
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
                href={`#${sectionIdMap.al}`}
                onClick={e => handleAnchor(e, alRef)}
              >
                What is Assisted Living?
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.staff}`}
                onClick={e => handleAnchor(e, staffRef)}
              >
                What Type of Medical Staff is Present?
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.license}`}
                onClick={e => handleAnchor(e, licenseRef)}
              >
                Licensing and Inspection
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.social}`}
                onClick={e => handleAnchor(e, socialRef)}
              >
                The Social and Community Aspects
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.cost}`}
                onClick={e => handleAnchor(e, costRef)}
              >
                Cost and Payment Options
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.alvsnh}`}
                onClick={e => handleAnchor(e, alvsnhRef)}
              >
                Assisted Living vs. Skilled Nursing
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.alvsil}`}
                onClick={e => handleAnchor(e, alvsilRef)}
              >
                Assisted Living vs. Independent Living
              </Link>
            </li>
            <li>
              <Link
                href={`#${sectionIdMap.next}`}
                onClick={e => handleAnchor(e, nextRef)}
              >
                Next Steps
              </Link>
            </li>
          </ul>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={alRef} />
          <StyledHeading level="title" size="title" >
            What is Assisted Living?
          </StyledHeading>
          <Paragraph>
            Assisted living near you can be defined as 24-hour non-medical care delivered in a residential setting.
            Previously  known as{' '}
            <Link href="https://www.seniorly.com/nursing-homes">
              nursing homes
            </Link>
            , the properties and amenities have improved immensely over the years
            and so they are now called  senior living or assisted living communities.  These properties offer seniors
            room and board, 24-hour non-medical care, housekeeping, laundry services, social engagement,
            wellness programs, and much more. Assisted living communities near you can be large hotel-like properties
            or single family homes (often called{' '}
            <Link href="https://www.seniorly.com/assisted-living/articles/understanding-board-and-care-homes">
              Board and Care
            </Link>
            {' '}or Residential Care Homes). The majority of assisted living communities are private pay and offer month-to-month rental agreements.
          </Paragraph>
          <Paragraph>
            Often, the decision to move into assisted living communities is made by the family or loved ones of
            the seniors that move into the communities. For more independent seniors, or active adults,
            searching for themselves there are{' '}
            <Link href="https://www.seniorly.com/independent-living">
              Independent Living
            </Link>
            {' '}or{' '}
            <Link href="https://www.seniorly.com/continuing-care-retirement-community">
              Continuing Care Retirement Communities (CCRC).
            </Link>
          </Paragraph>
          <Paragraph>
            The aging process is different for everyone. As people experience increased daily care needs, cognitive
            decline, social isolation, and/or the desire for a maintenance free lifestyle, assisted living communities
            can be the most desirable option.
          </Paragraph>
          <Paragraph>
            Assisted Living near you can be the right balance for seniors who want to be independent, but also need
            some day-to-day assistance and care with their{' '}
            <Link href="https://www.seniorly.com/resources/articles/what-are-the-activities-of-daily-living-adls">
              activities of daily living (ADLs).
            </Link>
          </Paragraph>
          <Paragraph>
            Your loved one will still maintain the all-important feelings of freedom, minus the challenges that can
            exist with mobility, transportation, cooking, social activities, cleaning, medical care, and more.
          </Paragraph>
          <Paragraph>
            Activities such as exercise classes, group dinners, day trips, art classes, and more, allow for regular
            socialization and new friendships in any community.
          </Paragraph>

          <Paragraph>Common activities in most communities include:</Paragraph>
          <ul>
            <li>
              Art classes
            </li>
            <li>
              Day trips
            </li>
            <li>
              Shopping excursions
            </li>
            <li>
              Dances
            </li>
            <li>
              Aerobics
            </li>
            <li>
              Religious services
            </li>
            <li>
              Movie nights
            </li>
            <li>
              Bingo
            </li>
            <li>
              Tai Chi
            </li>
            <li>
              Musical performances
            </li>
          </ul>
          <Paragraph>
            There’s no need for extra transportation, class registrations or additional coordination to enjoy
            extracurriculars. Depending on the type of community selected, dozens of daily activities and events
            will be on site, or just a short stroll (or wheelchair ride) away.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={staffRef} />
          <StyledHeading level="title" size="title" >
            What Type Of Medical Staff Is Present?
          </StyledHeading>
          <Paragraph>
            Though every assisted living near you is different, dedicating themselves to different levels of care and services,
            most Assisted Living communities will offer regular activities, on-site non-medical health care,
            comfortable living spaces, and prepared meals. Some communities that focus on higher acuity care may
            have licensed nurses on staff, while others focus on dementia or memory care and may have
            cognitive specialists.
          </Paragraph>
          <Paragraph>
            All communities should provide daily needs such as:
          </Paragraph>
          <ul>
            <li>
              Mobility assistance
            </li>
            <li>
              Medication monitoring
            </li>
            <li>
              Bathing
            </li>
            <li>
              Getting dressed
            </li>
            <li>
              Incontinence care
            </li>
            <li>
              Transportation
            </li>
            <li>
              Housekeeping
            </li>
            <li>
              Laundry
            </li>
            <li>
              Social engagement
            </li>
            <li>
              Wellness/Mental health programs
            </li>
            <li>
              Meals
            </li>
          </ul>
          <Paragraph>
            Seniors should expect their own private residences with most communities offering studios or one-bedroom
            apartments. Couples also can live together, and some communities, especially the smaller ones, do offer
            shared rooms for more economic value. And no need to leave a pet behind as many communities allow dogs,cats
            and fish to come along with their faithful owners.
          </Paragraph>
          <Paragraph>
            Always ensure the senior living community you choose is completely certified with a reliable, upbeat
            staff of managers, nurses, caregivers, and other personnel. When asking questions, there should be no hesitation
            to prove total compliance of regulations.
            <Link href="https://www.seniorly.com/resources/articles/questions-to-ask-on-your-community-tour">
              Click on this link for a list of over 70 questions you might want to ask the community.
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
          <Paragraph innerRef={licenseRef} />
          <StyledHeading level="title" size="title">
            Licensing and Inspection Requirements
          </StyledHeading>
          <Paragraph>
            Each state has its own licensing agency responsible for inspecting and certifying each Assisted Living
            community. Here is a full list of regulating agencies by state, as well as a{' '}
            <Link href="https://www.seniorly.com/resources/articles/assisted-living-regulations">
              full list of certifications
            </Link>
            {' '}you should always ask to see.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={socialRef} />
          <StyledHeading level="title"size="title">
            Exploring The Social and Community Aspects
          </StyledHeading>
          <Paragraph>
            Many assume that making the step away from their “old life” and into Assisted Living means the end of a
            social life and autonomy. This is far from the truth. Any Assisted Living community near you worth considering
            should amplify the amount of activities residents can enjoy, and can deepen peer and familial relationships.
          </Paragraph>
          <Paragraph>
            It’s been proven that{' '}
            <Link href="https://greatergood.berkeley.edu/article/item/how_social_connections_keep_seniors_healthy" target="_blank" rel="noopener">
              maintaining social connections
            </Link>
            {' '}are essential to keeping senior minds sharp and healthy.
            It also helps to stave off depression and other mental problems, which can be a serious issue for older adults.
          </Paragraph>
          <Paragraph>
            Though your loved one may currently seem more than content with the familiarity of their own home,
            <strong>
              the ability to easily enjoy meals with friends, learn new skills, and interact with their peers daily
              often becomes a priceless, life-extending amenity.
            </strong>
          </Paragraph>
          <Paragraph>
            In addition, families can now relax and enjoy each precious minute together. Rather than stressing
            about whether all their needs are being properly met, or trying to care for your loved one on your own,
            spend time together assured of their safety and happiness.
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
          <StyledHeading level="title"size="title">
            What Does Assisted Living Cost Near You?
          </StyledHeading>
          <Paragraph>
            As of 2017, the national median rate of Assisted Living per month for a 1-bedroom apartment is $3750.
            The cost can easily differ depending on where you live, or the level of service your loved one requires.
          </Paragraph>
          <Paragraph>
            That comes to about $43,000 a year. That may sound like a big number, but once you add up all current
            living costs, you may be surprised that there are often notable savings.
          </Paragraph>
          <Paragraph>
            There are also many ways to find that perfect balance of price, services, and comfort.
            With a wide range of community, from the basic to the luxurious, choosing an Assisted Living community near you
            that fits your budget without skimping on care and amenities is possible.
          </Paragraph>
          <Paragraph>
            In general Assisted Living communities fall under 3 pricing levels:
          </Paragraph>
          <ul>
            <li>
              <Paragraph>
                <strong>
                  Basic:
                </strong>
                This is a great option for seniors on a budget desiring a simple, no-frills lifestyle. Activities and
                amenities are often minimal, but still expect complete comfort, professionalism, and cleanliness.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                <strong>
                  Boutique:
                </strong>
                The sweet spot of price and comfort. These communities offer private living,
                expanded medical care, high-quality meals, and a wider variety of amenities and activities.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                <strong>
                  Luxury:
                </strong>
                If money is no object, this level of resort-style living allows seniors to enjoy life like they’re on
                vacation. Expect top-notch 24/7 medical care, fine dining, large apartments, concierge services,
                endless activities, etc.
              </Paragraph>
            </li>
          </ul>
          <Paragraph>
            Do keep in mind that all levels of care should be safe, secure, friendly, and 100% certified.
            No bargain is worth risking the wellbeing of your loved one.
          </Paragraph>
          <Paragraph>
            Financial Assistance
          </Paragraph>
          <Paragraph>
            If you’re still unsure if Assisted Living can realistically fit into your budget,
            look into the many financial aid options available.
          </Paragraph>
          <Paragraph>
            Government services like Medicare, Medicaid, or Veterans Assistance can be valuable tools in making
            Assisted Living affordable. Many communities also offer special payment plans, programs, and other
            strategies to help your loved one live in their ideal community.
          </Paragraph>
          <Paragraph>
            If you are interested in learning more about the different costs that go into assisted living, explore our
            resource on
            <Link href="https://www.seniorly.com/assisted-living/articles/understanding-the-cost-of-assisted-living">
              the costs of assisted living near you.
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
          <StyledHeading level="title"size="title">
            How Assisted Living Varies from Other Care Options
          </StyledHeading>
          <Paragraph innerRef={alvsnhRef} />
          <StyledHeading level="subtitle" size="subtitle" >
            Assisted Living vs Skilled Nursing
          </StyledHeading>
          <Paragraph>
            Also commonly called Skilled Nursing, there is a definable difference between Assisted Living communities
            and Nursing Homes, though many use them interchangeably.  According to the CDC, over{' '}
            <Link href="https://www.cdc.gov/nchs/fastats/alzheimers.htm" target="_blank" rel="noopener">
              50% of Nursing Home residents
            </Link>
            {' '}have either Alzheimer’s disease or other forms of dementia.  Most residents also spend the majority of their time sedentary.
          </Paragraph>
          <Paragraph>
            In contrast, most Assisted Living residents maintain active lifestyles needing only basic daily services
            such as bathing, mobility assistance, on-site medical care, etc. Allowing seniors to lead active,
            independent lives while also aiming to make daily life simpler and safer is the primary goal
            of Assisted Living communities.
          </Paragraph>
          <StyledArticle>
            <table>
              <thead>
                <tr>
                  <th />
                  <th>
                    Nursing Home
                  </th>
                  <th>
                    Assisted Living
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Private Living
                  </td>
                  <td />
                  <td>
                    x
                  </td>
                </tr>
                <tr>
                  <td>
                    24-Hour Medical Assistance
                  </td>
                  <td>
                    x
                  </td>
                  <td />
                </tr>
                <tr>
                  <td>
                    Medication Monitoring
                  </td>
                  <td>
                    x
                  </td>
                  <td>
                    x
                  </td>
                </tr>
                <tr>
                  <td>
                    Regular Activities
                  </td>
                  <td>
                    x
                  </td>
                  <td>
                    x
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledArticle>
          <Paragraph>
            If your loved one needs significant daily care, or suffers from noticeable effects of Alzheimer’s disease or
            dementia, a Skilled Nursing Home may be the better choice. However, if they desire a more independent lifestyle
            and require relatively minimal assistance, Assisted Living may be just the right balance.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Paragraph innerRef={alvsilRef} />
          <StyledHeading level="subtitle" size="subtitle" >
            Assisted Living vs. Independent Living
          </StyledHeading>
          <Paragraph>
            Seniors choosing to live in Independent Living vs. Assisted Living typically require very
            little, if any, daily assistance. Unlike Assisted Living, residents of these communities
            can get around, cook, bathe, clean, and manage the majority of their life without extra care.
            This provides the largest amount of independence. Hence, the name.
          </Paragraph>
          <StyledArticle>
            <table>
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
                    Private Living
                  </td>
                  <td>
                    x
                  </td>
                  <td>
                    x
                  </td>
                </tr>
                <tr>
                  <td>
                    Daily Living Assistance
                  </td>
                  <td />
                  <td>
                    x
                  </td>
                </tr>
                <tr>
                  <td>
                    Medication Monitoring
                  </td>
                  <td />
                  <td>
                    x
                  </td>
                </tr>
                <tr>
                  <td>
                    Regular Activities
                  </td>
                  <td>
                    x
                  </td>
                  <td>
                    x
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledArticle>
          <Paragraph>
            Independent Living also provides the largest amount of day-to-day social activities, offers on-site
            medical services, and provides a safe, secure community. Living spaces are usually larger,
            apartment-style quarters with full kitchens, outdoor areas, private rooms, etc.
          </Paragraph>
          <Paragraph>
            Unlike Assisted Living, services Independent Living often won’t provide include bathing, memory care,
            mobility services, on-going medical treatments, and more. Though Assisted Living communities will
            organize many social and enrichment activities, they are often more structured than activities in
            Independent Living.
          </Paragraph>
          <Paragraph>
            If your loved one currently lives a very self-reliant lifestyle with few medical needs, and is
            simply searching for a safe, active community of senior peers, Independent Living may be the perfect fit.
            For those striving for a large degree of independence, but with some daily assistance, Assisted Living
            might be the ticket.
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
            Next Steps
          </StyledHeading>
          <Paragraph>
            Think Assisted Living might right for your loved one? Explore one of the three topics below to help narrow down your search:
          </Paragraph>
          <ul>
            <li>
              <Link href="https://www.seniorly.com/assisted-living/articles/evaluating-assisted-living-communities">
                Evaluating Assisted Living Communities
              </Link>
            </li>
            <li>
              <Link href="https://www.seniorly.com/assisted-living/articles/understanding-the-cost-of-assisted-living">
                Understanding the Cost of Assisted Living
              </Link>
            </li>
            <li>
              <Link href="https://www.seniorly.com/assisted-living/articles/seniorly-assisted-living-faqs">
                Frequently Asked Questions About Assisted Living
              </Link>
            </li>
          </ul>
          <Paragraph>
            Seniorly is here to help you at no cost to find the perfect community. Our powerful website will search
            through thousands of communities across the country that you can connect to directly. Email{' '}
            <Link href="mailto:ask@seniorly.com">
              ask@seniorly.com
            </Link>
            {' '}or call us at (855) 866-4515 for further assistance. We are compensated by the community you eventually select.
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

  const title = 'Find the Best Assisted Living Near You ';
  const description = 'Find the best assisted living near you with local senior living communities & providers. Browse assisted living nearby with prices, reviews & photos.';

  return (
    <>
      <TemplateHeader>{HeaderContent}</TemplateHeader>
      <TemplateContent>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
        <StyledHeading level="title" size="title">
          {listSize} {tocLabel} near {city}
        </StyledHeading>
        <StyledArticle>
          <Paragraph>
            Seniorly promises to make your search for assisted living near you easy and stress-free. In 2019, the
            national average monthly cost has been $4,051 for an assisted living facility. Below, compare assisted
            living communities near you and then let us connect you to your local senior living expert.
            They can answer all your questions, share costs, arrange tours, and even negotiate rent. Our services are free.
          </Paragraph>
        {isFetchingResults && <StyledHeading level="hero" size="title">loading...</StyledHeading>}
        {!isFetchingResults && (
          <CommunitySearchList
            communityList={communityList}
            searchParams={searchParams}
            requestMeta={requestMeta}
            location={location}
          />
        )}
        {SEOContentAL()}

        <StyledArticle><SeoLinks title="Find Assisted Living Near You by Cities" links={ALSeoCities} /></StyledArticle>
        <StyledArticle><SeoLinks title="Find Assisted Living Near You by State" links={ALSeoStates} /></StyledArticle>
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
