import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';
import IconItem from 'sly/components/molecules/IconItem';
import ListItem from 'sly/components/molecules/ListItem';
import IconButton from 'sly/components/molecules/IconButton';

import { getStateAbbr } from 'sly/services/helpers/url';
import { size, palette } from 'sly/components/themes';
import HeaderContainer from 'sly/containers/HeaderContainer';
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
import { ResponsiveImage, Label, Heading, Paragraph, Link, Icon } from 'sly/components/atoms';
import Footer from 'sly/components/organisms/Footer';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import SeoLinks from 'sly/components/organisms/SeoLinks';
import { ALSeoCities, ALSeoStates } from 'sly/services/helpers/homepage';
import { getTocSeoLabel } from 'sly/services/helpers/search';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';

const HeroWrapper = styled.div`
  position: relative;
  height: ${size('header.hub.heroImage.mobileHeight')};
  background-color: ${palette('secondary', 'dark35')};
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: ${size('header.hub.heroImage.height')};
    flex-direction: row-reverse;
  }
`;

const ImageWrapper = styled.div`
  flex: 1 0 0%;
  text-align:right;
  &:after {
    content: '';
    position: absolute;
    left:0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #387F7Eff 50%, #387F7E00);
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    &:after {
      content: '';
      position: absolute;
      left:0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, #49A7A5ff 50%, #49A7A500);
    }
  }
`;

const StyledImage = styled(ResponsiveImage)`
  object-fit: cover;
  vertical-align:top;
  width: 100%;
  height: 100%;
`;

const CTAWrapper = styled.div`
  flex: 1 0 0%;
  margin: auto 0;
`;
const SearchBoxWrapper = styled.div`
  max-width: ${size('header.hub.heroSearchBox.width')};
  margin: 0 auto;
  transform: rotate(0);
  text-align: left;
  align-items: left;
  justify-content: left;
`;
const AuditWrapper = styled.div`
   background-color: ${palette('grey', 'stroke')};
   padding: ${size('spacing.large')};
   margin-bottom: ${size('spacing.large')};
`;
const AuditTextWrapper = styled.div`
  margin: auto;
  width: 100%;
  padding: 0 ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0;
    width: ${size('layout.col9')};

    > section {
      width: ${size('tabletLayout.col8')};
      margin: auto;
    }
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};

    > section {
      width: auto;
      margin: auto;
    }
  }
`;
const StyledIconItem = styled(IconItem)`
  width: 100%;
  line-height: ${size('lineHeight.body')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
      width: ${size('layout.col8')};
  }
`;
const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;
const StyledLabel = styled(Label)`
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

const NextStepsWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
  border: ${size('border.regular')} solid ${palette('primary', 'base')};
  border-radius: ${size('spacing.small')};
`;

const NextHeader = styled.div`
  background-color: ${palette('primary', 'base')};
  color: ${palette('white', 'base')};
  padding: ${size('spacing.large')};
`;

const NextParagraph = styled(Paragraph)`
    color: ${palette('white', 'base')};
`;

const NextHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
  color: ${palette('white', 'base')};
`;

const StyledIconButton = styled(IconButton)`
  font-weight: bold;
  color: ${palette('primary', 'base')};
  border-radius: 0;
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

const PhoneCTAWrapper = styled.div`
  background-color: ${palette('primary', 'base')};
  color: ${palette('white', 'base')};
  padding: ${size('spacing.massive')} ${size('spacing.large')};
  margin: ${size('spacing.xLarge')} auto;
  width: 100%;
  text-align: center;
`;

const TwoColumn = makeTwoColumn('div');
const Body = makeBody('div');
const Column = makeColumn('aside');
const Wrapper = makeWrapper('div');

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
  const HeaderContent = (
    <>
      <HeaderContainer />
      <HeroWrapper>
        <ImageWrapper>
          <StyledImage path="react-assets/hub/assisted-living-cover.jpg" alt="Assisted Living Near You" height={320} />
        </ImageWrapper>
        <CTAWrapper>
          <SearchBoxWrapper>
            <StyledHeading level="hero" size="hero" palette="white">
              What is Assisted Living Near You?
            </StyledHeading>
            <StyledLabel palette="white">
              Use our free search to find assisted living nearby
            </StyledLabel>
            <SearchBoxContainer onCurrentLocation={onCurrentLocation} layout="homeHero" onLocationSearch={onLocationSearch} />
          </SearchBoxWrapper>
        </CTAWrapper>
      </HeroWrapper>
      <AuditWrapper>
        <AuditTextWrapper>
          <StyledIconItem
            icon="verified"
            iconPalette="secondary"
            iconVariation="dark35"
            borderless={true}
          >
            This assisted living article has been reviewed and approved by{' '}
            <Link to="https://www.seniorly.com/resources/author/jim+mc+cabe" >Jim McCabe, PhD, MSW, MPH, President - Eldercare Resources</Link>
          </StyledIconItem>
        </AuditTextWrapper>
      </AuditWrapper>
    </>
  );

  const listSize = requestMeta['filtered-count'];
  const { geo } = requestMeta;
  const city = geo && geo.city;
  const state = geo && geo.state;
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

  const TableOfContents = () => {
    return (
      <>
        <StyledHeading level="subtitle" size="subtitle">
          Table of Contents
        </StyledHeading>
        <Paragraph>
          <StyledLink
            href={`#${sectionIdMap.al}`}
            onClick={e => handleAnchor(e, alRef)}
          >
            What is Assisted Living?
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.cost}`}
            onClick={e => handleAnchor(e, costRef)}
          >
            What Does Assisted Living Cost Near You?
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.staff}`}
            onClick={e => handleAnchor(e, staffRef)}
          >
            What Type of Medical Staff is Present?
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.license}`}
            onClick={e => handleAnchor(e, licenseRef)}
          >
            Licensing and Inspection
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.social}`}
            onClick={e => handleAnchor(e, socialRef)}
          >
            The Social and Community Aspects
          </StyledLink>

          <StyledLink
            href={`#${sectionIdMap.alvsnh}`}
            onClick={e => handleAnchor(e, alvsnhRef)}
          >
            Assisted Living vs. Skilled Nursing
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.alvsil}`}
            onClick={e => handleAnchor(e, alvsilRef)}
          >
            Assisted Living vs. Independent Living
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

  const SEOContentAL = () => {
    return (
      <>
        <Paragraph ref={topRef} />
        <StyledArticle>
          <Paragraph ref={alRef} />
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
            and so they are now called  senior living or assisted living communities.
          </Paragraph>
          <Paragraph>
            Assisted living facilities offer seniors
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
            INSERT ADL CHART
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
          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">Art classes</ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">Day trips</ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">Shopping excursions</ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">Dances</ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">Aerobics</ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">Religious services</ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">Movie nights</ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">Bingo</ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">Tai Chi</ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">Musical performances</ListItem>
          </ListWrapper>

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
          <StyledHeading level="title" size="title" >
            What is Assisted Living Near You Called?
          </StyledHeading>
          <Paragraph>
            Assisted living communities are not regulated at the federal level. Therefore, each state has their own
            licensing requirements.  Below, Seniorly has compiled the names each state gives to the term “assisted living.”
            Remember, these might be what you are thinking of when you search for “nursing home.”  Again, states licensing
            no longer uses “nursing home” to describe this kind of senior living community.
          </Paragraph>
          INSERT CHART HERE
          <Link
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Paragraph ref={costRef} />
          <StyledHeading level="title" size="title">
            What Does Assisted Living Cost Near You?
          </StyledHeading>
          <Paragraph>
            As of 2019, the national median rate of Assisted Living per month for a 1-bedroom apartment is $4051.
            However, there are a few factors that go into this cost.  For example, your location, as well as the personal care services needed.
          </Paragraph>
          <Paragraph>
            That comes to about $48,612 a year. That may sound like a big number, but once you add up all current
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
          <ListWrapper>
            <ListItem icon="favourite-dark" iconPalette="secondary" iconVariation="dark35">
              <Paragraph>
                <strong>
                  Basic:{' '}
                </strong>
                This is a great option for seniors on a budget desiring a simple, no-frills lifestyle. Activities and
                amenities are often minimal, but still expect complete comfort, professionalism, and cleanliness.
              </Paragraph>
            </ListItem>
            <ListItem icon="house" iconPalette="secondary" iconVariation="dark35">
              <Paragraph>
                <strong>
                  Boutique:{' '}
                </strong>
                The sweet spot of price and comfort. These communities offer private living,
                expanded medical care, high-quality meals, and a wider variety of amenities and activities.
              </Paragraph>
            </ListItem>
            <ListItem icon="loyalty" iconPalette="secondary" iconVariation="dark35">
              <Paragraph>
                <strong>
                  Luxury:{' '}
                </strong>
                If money is no object, this level of resort-style living allows seniors to enjoy life like they’re on
                vacation. Expect top-notch 24/7 medical care, fine dining, large apartments, concierge services,
                endless activities, etc.
              </Paragraph>
            </ListItem>
          </ListWrapper>
          <Paragraph>
            <StyledImage path="react-assets/hub/belmont-village.jpg" alt="Assisted Living Belmont Village" height={320} />
          </Paragraph>
          <Paragraph>
            Do keep in mind that all levels of care should be safe, secure, friendly, and 100% certified.
            No bargain is worth risking the wellbeing of your loved one.
          </Paragraph>
          <StyledHeading level="subtitle" size="subtitle">
            Financial Assistance for Assisted Living
          </StyledHeading>
          <Paragraph>
            If you’re still unsure if Assisted Living can realistically fit into your budget,
            look into the many financial aid options available.
          </Paragraph>
          <Paragraph>
            <Link href="hhttps://www.seniorly.com/resources/articles/long-term-care-insurance-for-respite-care">
              Long Term Care Insurance
            </Link>
            {' '}- is an insurance product that helps pay for the costs associated with long-term care. Long-term care
            insurance covers care generally not covered by health insurance, Medicare, or Medicaid.
          </Paragraph>
          <Paragraph>
            Government services like Medicare, Medicaid, or{' '}
            <Link href="https://www.seniorly.com/resources/articles/veterans-benefits-for-assisted-living">
              Veterans Assistance
            </Link>
            {' '}can be valuable tools in making
            Assisted Living affordable. Many communities also offer special payment plans, programs, and other
            strategies to help your loved one live in their ideal community.
          </Paragraph>
          <Paragraph>
            You can learn more about the different costs that go into assisted living. Read our resource on{' '}
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
          <Paragraph ref={staffRef} />
          <StyledHeading level="title" size="title" >
            What Type Of Medical Staff Is Present?
          </StyledHeading>
          <Paragraph>
            Every assisted living near you is different. They are each dedicated to different levels of care and
            services. Assisted Living communities will offer regular activities, on-site non-medical health care,
            comfortable living spaces, and prepared meals. Some communities that focus on higher acuity care may have
            licensed nurses on staff.  Others focus on dementia or{' '}
            <Link href="https://www.seniorly.com/memory-care">
              memory care
            </Link>
            {' '}and may have cognitive specialists.

          </Paragraph>
          <Paragraph>
            Seniors should expect their own private residences with most communities offering studios or one-bedroom
            apartments. Couples also can live together, and some communities, especially the smaller ones, do offer
            shared rooms for more economic value. And no need to leave a pet behind as many communities allow dogs,cats
            and fish to come along with their faithful owners.
          </Paragraph>
          <Link
            href={`#${sectionIdMap.top}`}
            onClick={e => handleAnchor(e, topRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Paragraph ref={licenseRef} />
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
          <Paragraph ref={socialRef} />
          <StyledHeading level="title" size="title">
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
              {' '}the ability to easily enjoy meals with friends, learn new skills, and interact with their peers daily
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
          <StyledHeading level="title" size="title">
            How Assisted Living Varies from Other Care Options
          </StyledHeading>
          <Paragraph ref={alvsnhRef} />
          <StyledHeading level="subtitle" size="subtitle" >
            Assisted Living vs Skilled Nursing Facility (SNF)
          </StyledHeading>
          <Paragraph>
            Often, families search for “nursing home.” This term doesn’t really exist, but it is commonly defined as
            a Skilled Nursing Facility. There is a significant difference between Assisted Living communities and
            Skilled Nursing Facilities.
          </Paragraph>
          <Paragraph>
            According to the CDC, over{' '}
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
            <StyledTable>
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
                    <Icon icon="checkmark-circle" palette="secondary" variation="dark35" />
                  </td>
                </tr>
                <tr>
                  <td>
                    24-Hour Medical Assistance
                  </td>
                  <td>
                    <Icon icon="checkmark-circle" palette="secondary" variation="dark35" />
                  </td>
                  <td />
                </tr>
                <tr>
                  <td>
                    Medication Monitoring
                  </td>
                  <td>
                    <Icon icon="checkmark-circle" palette="secondary" variation="dark35" />
                  </td>
                  <td>
                    <Icon icon="checkmark-circle" palette="secondary" variation="dark35" />
                  </td>
                </tr>
                <tr>
                  <td>
                    Regular Activities
                  </td>
                  <td>
                    <Icon icon="checkmark-circle" palette="secondary" variation="dark35" />
                  </td>
                  <td>
                    <Icon icon="checkmark-circle" palette="secondary" variation="dark35" />
                  </td>
                </tr>
              </tbody>
            </StyledTable>
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
          <Paragraph ref={alvsilRef} />
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
                    Private Living
                  </td>
                  <td>
                    <Icon icon="checkmark-circle" palette="secondary" variation="dark35" />
                  </td>
                  <td>
                    <Icon icon="checkmark-circle" palette="secondary" variation="dark35" />
                  </td>
                </tr>
                <tr>
                  <td>
                    Daily Living Assistance
                  </td>
                  <td />
                  <td>
                    <Icon icon="checkmark-circle" palette="secondary" variation="dark35" />
                  </td>
                </tr>
                <tr>
                  <td>
                    Medication Monitoring
                  </td>
                  <td />
                  <td>
                    <Icon icon="checkmark-circle" palette="secondary" variation="dark35" />
                  </td>
                </tr>
                <tr>
                  <td>
                    Regular Activities
                  </td>
                  <td>
                    <Icon icon="checkmark-circle" palette="secondary" variation="dark35" />
                  </td>
                  <td>
                    <Icon icon="checkmark-circle" palette="secondary" variation="dark35" />
                  </td>
                </tr>
              </tbody>
            </StyledTable>
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

        <Paragraph ref={nextRef} />
        <StyledArticle>
          <NextStepsWrapper>
            <NextHeader>
              <NextHeading level="title" size="title">
                Next Steps
              </NextHeading>
              <NextParagraph>
                Think Assisted Living might right for your loved one? Explore one of the three topics below to help narrow down your search:
              </NextParagraph>
            </NextHeader>
            <StyledIconButton  href="https://www.seniorly.com/assisted-living/articles/evaluating-assisted-living-communities"
                              icon="chevron"
                              right
                              fullWidth
                              ghost
                              transparent
                              borderPalette="slate"
                              rotate={-1}
            >Evaluating Assisted Living Communities
            </StyledIconButton>
            <StyledIconButton  href="https://www.seniorly.com/assisted-living/articles/understanding-the-cost-of-assisted-living"
                               icon="chevron"
                               right
                               fullWidth
                               ghost
                               transparent
                               borderPalette="slate"
                               rotate={-1}
            >Understanding the Cost of Assisted Living
            </StyledIconButton>
            <StyledIconButton  href="https://www.seniorly.com/assisted-living/articles/seniorly-assisted-living-faqs"
                               icon="chevron"
                               right
                               fullWidth
                               ghost
                               transparent
                               borderPalette="slate"
                               rotate={-1}
            >Frequently Asked Questions About Assisted Living
            </StyledIconButton>

          </NextStepsWrapper>
          <Paragraph>
            Seniorly is here to help you at no cost to find the perfect community. Our powerful website will search
            through thousands of communities across the country that you can connect to directly. Email{' '}
            <Link href="mailto:ask@seniorly.com">
              ask@seniorly.com
            </Link>
            {' '}or call us at{' '}
            <Link href="tel:+18558664515">(855) 866-4515</Link>
            {' '}for further assistance. We are compensated by the community you eventually select.
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
  const heading = state ? `${listSize} ${tocLabel} near ${city}, ${getStateAbbr(state)}` : `${listSize} ${tocLabel} near ${city}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {HeaderContent}
      <HubPageTemplate>
        <Wrapper>
          <TwoColumn>
            <Column>
              <StickToTop>
                {TableOfContents()}
              </StickToTop>
            </Column>
            <Body>
            {SEOContentAL()}
            <StyledHeading level="title" size="title">
              {heading}
            </StyledHeading>
            <StyledArticle>
              <Paragraph>
                Seniorly promises to make your search for assisted living near you easy and stress-free. In 2019, the
                national average monthly cost has been $4,051 for an assisted living facility. Below, compare assisted
                living communities near you and then let us connect you to your local senior living advisor.
                They can answer all your questions, share costs, arrange tours, and even negotiate rent. Our services are free.
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
      <PhoneCTAWrapper>
        <StyledHeading level="subtitle" size="title" palette="white">
          Seniorly is here to help you at no cost
        </StyledHeading>
        <StyledHeading level="subtitle" size="title" palette="white">
          Call us at{' '}
          <Link href="tel:+18558664515" palette="white">(855) 866-4515</Link>
        </StyledHeading>
        <StyledLabel palette="white">
          Our Local Senior Living Experts are standing by ...
        </StyledLabel>
      </PhoneCTAWrapper>
      <TemplateContent>
        <StyledArticle><SeoLinks title="Find Assisted Living Near You by City" links={ALSeoCities} /></StyledArticle>
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
  onCurrentLocation: func,
};

export default NearMePage;
