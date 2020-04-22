import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { func } from 'prop-types';

import HubHeader from 'sly/components/molecules/HubHeader';
import PhoneCTAFooter from 'sly/components/molecules/PhoneCTAFooter';
// import NextSteps from 'sly/components/molecules/NextSteps';
// import Tip from 'sly/components/molecules/Tip';
import { size, palette } from 'sly/components/themes';
import {
  HubPageTemplate,
  makeBody,
  makeColumn,
  makeTwoColumn,
  makeWrapper,
  makeStickToTop,
  makeArticle,
  makeOneColumnListWrapper,
} from 'sly/components/templates/HubPageTemplate';
import ListItem from 'sly/components/molecules/ListItem';
import { Heading, Paragraph, Link, ResponsiveImage, Span } from 'sly/components/atoms';
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

const StyledImage = styled(ResponsiveImage)`
  object-fit: cover;
  vertical-align:top;
  width: 100%;
  height: 100%;
`;

const PercentageDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: ${size('element.huge')};
  height: ${size('element.huge')};
  background: ${palette('secondary', 'dark35')};
  color: ${palette('white', 'base')};
  font-size: ${size('text', 'title')};
`;

const VeteramDisablityList = styled.div`
  padding: ${size('spacing', 'xLarge')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('border.xxLarge')};
  display: grid;
  grid-template-columns: minmax(min-content, max-content) minmax(min-content, max-content);
  grid-column-gap: ${size('spacing', 'xLarge')};
  grid-row-gap: ${size('spacing', 'xLarge')};
`;

const StyledTh = styled.th`
  text-align: left;
  font-weight: ${size('weight.medium')};
  color:${palette('slate', 'base')};
  background-color:${palette('grey', 'background')};
  padding: ${size('spacing.regular')} ${size('spacing.xLarge')};
  border-top: ${size('border.regular')} solid ${palette('grey', 'filler')};
  border-bottom: ${size('border.regular')} solid ${palette('grey', 'filler')};
`;

const Tr = styled.tr`
  border-top: ${size('border.regular')} solid ${palette('grey', 'filler')};
  border-bottom: ${size('border.regular')} solid ${palette('grey', 'filler')};
  padding: ${size('spacing.medium')} ${size('spacing.xLarge')};
  background-color: ${p => palette(p.bgcolor, 'base')};
  color: ${p => palette(p.color, 'base')};
`;

const StyledTd = styled.td`
  border: none;
  padding: ${size('spacing.regular')} ${size('spacing.xLarge')};
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  position: relative;
  border-radius: ${size('spacing.small')};
  border: ${size('border.regular')} solid ${palette('grey', 'filler')};
`;

const VeteransBenefitAssistedLivingPage = ({
  handleAnchor,
}) => {
  const rcRef = React.createRef();
  const whyRef = React.createRef();
  const costRef = React.createRef();
  const typesRef = React.createRef();
  const articlesRef = React.createRef();
  const seniorLivingRef = React.createRef();
  const nextRef = React.createRef();
  const ListWrapper = makeOneColumnListWrapper('div');

  const sectionIdMap = {
    rc: 'what-is-respite-care',
    why: 'reasons-for-respite-care',
    cost: 'cost',
    types: 'types-of-respite-care',
    articles: 'resources-on-respite-care',
    seniorLiving: 'other-types-senior-living',
    next: 'next-steps',
  };

  // const nextSteps = [
  //   { title: 'How can I pay the costs of Respite Care?', to: 'https://www.seniorly.com/resources/articles/caregiver-respite-grants-for-elderly-loved-ones' },
  //   { title: 'What is Respite Care for family caregivers?', to: 'https://www.seniorly.com/respite-care/articles/respite-for-caregivers' },
  //   { title: 'Why use Respite Care after cardiac surgery?', to: 'https://www.seniorly.com/respite-care/articles/respite-care-following-cardiac-surgery' },
  //   { title: 'Can I try an assisted living community for a short time before moving in?', to: 'https://www.seniorly.com/short-term-stays/articles/try-it-before-you-buy-it-senior-living' },
  // ];

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
    );
  };

  const SEOContent = () => {
    return (
      <>
        <StyledArticle>
          <Heading level="title" size="title" _ref={rcRef} >What is Assisted Living?</Heading>
          <Paragraph>Long-term care costs quickly add up, but for veterans and their surviving spouses,
            assistance may be available to help with these costs. Unfortunately, it’s hard to know what help is available,
            if you qualify, and how to apply. In fact, many veterans and their families struggle through the application
            process only to be denied. The information we’ve compiled in this document is based on the new law effective
            October 2018, so you have the most current data at your disposal. Two main benefits are available under Title 38.
            You cannot get both at the same time. The best option is to file for the benefit that will bring you the
            highest amount. Many families need some help choosing their best option. The choices are:
          </Paragraph>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Service-connected disability benefits
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Veteran Pension/Survivor Pension
            </ListItem>
          </ListWrapper>

          <Paragraph>
            If you qualify, you can add special monthly benefits to these benefits stated above. The two most common include:
          </Paragraph>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Housebound
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Aid and Attendance
            </ListItem>
          </ListWrapper>

          <Paragraph>
            We’re going to take a closer look at each option so you can easily determine which one, if any,
            applies to your specific situation. We’ll highlight and address the most frequently asked questions.
            Our goal is to give you enough information to decide whether you want to pursue a veterans benefit claim.
          </Paragraph>

          <StyledArticle>
            <Paragraph>
              <StyledImage path="veterans-salute.png" alt="Veterans Salute Assisted Living" height={640} />
            </Paragraph>
          </StyledArticle>

          <Link
            href={`#${sectionIdMap.rc}`}
            onClick={e => handleAnchor(e, rcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" _ref={whyRef}>Service-Connected Compensation</Heading>
          <Paragraph>
            This is a monthly payment made to a veteran who suffered an injury while on active duty or had a pre-existing
            condition aggravated by his/her service. The severity of the disability is given a specific percentage rating.
            For example, you may have a single rating of 10% or multiple individual ratings adding up to 70% or more.
            Some individuals carry 120%+ ratings when totaled but will only be paid the 100% rate. Each percentage rating
            carries a designated dollar value set by law. The ability to obtain this rating must come from a VA Medical
            Center (VAMC) exam and is called a C & P exam. You must be enrolled in the VA Medical System to request this exam.
            The VAMC will contact you for the exam, and it’s critical to make sure you attend this appointment! If you have
            been seeing a PCP, take your medical history with you to support your claim for disability.
          </Paragraph>
          <Paragraph>To enroll: www.va.gov/healthbenefits/apply/</Paragraph>
          <Paragraph>You can enroll online, via phone or in person.</Paragraph>
          <Paragraph>Married veterans with a dependent can have aid and attendance added for their spouse to their monthly
            payment if the spouse can demonstrate the need for aid and attendance. The veteran must be at least 30% rated
            for a spouse to claim aid and attendance benefits under the veteran’s service-connected disability. Unfortunately,
            this is a small sum, and not enough to cover all care needs, but every dollar counts when it comes to care.
            Examples for 2018
          </Paragraph>

          <VeteramDisablityList>
            <PercentageDiv>30%</PercentageDiv>
            <Span>
              Veteran rated at 30% service-connected disabled. The spouse needs a third party aiding and attending
              her/his care needs. This is an additional $46/mth.
            </Span>
            <PercentageDiv>80%</PercentageDiv>
            <Span>
              Veteran rated at 80% service-connected disabled. The spouse needs a third party aiding and attending
              her/his care needs. This is an additional $122/mth.
            </Span>
            <PercentageDiv>100%</PercentageDiv>
            <Span>A 100% rated veteran can also have the housebound benefit or aid and attendance added to their income if
              they demonstrate the need for housebound or aid and attendance. This can add an additional $500-$700 or so to
              the household income. You can also receive 100% rated pay if you are granted IU — individual unemployable.
              This means your disability is so severe that y ou are unable to sustain gainful employment. For IU to come into
              play, the following must apply:
            </Span>
            <PercentageDiv>60%</PercentageDiv>
            <Span>
              <Paragraph>
                One disability rating of 60% or more OR multiple disabilities with one disability rated at 40% or higher and
                a total rating of 70% percent or more.
              </Paragraph>
              <Paragraph>
                A compensation rating table can be found at: www.benefits.va.gov/COMPENSATION/resources_comp01.asp
              </Paragraph>
            </Span>
          </VeteramDisablityList>

          <Link
            href={`#${sectionIdMap.rc}`}
            onClick={e => handleAnchor(e, rcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" _ref={costRef} >
            Dependency and Indemnity Compensation (DIC)/Surviving Spouses
          </Heading>

          <Paragraph>
            This payment should be made automatically to a surviving spouse whose veteran spouse carried a 100% serviceconnected
            rating at the time of death and cause of death can be linked to why they were granted the 100% rating.
          </Paragraph>
          <Paragraph>
            In 2018, this monthly payment was $1238.11/mth*
          </Paragraph>
          <Paragraph>
            If the veteran carried the 100% rating for the last 8 years of his/her life and was married to the same spouse those
            last 8 years, the spouse is entitled to an additional marriage stipend of $272.46/mth*
          </Paragraph>
          <Paragraph>
            If the surviving spouse needs a third party to attend to their personal care needs, an additional $317.87* can also
            be added.
          </Paragraph>
          <Paragraph>
            In total this can equate to $1873.44/mth* if all conditions are met.
          </Paragraph>
          <Paragraph>
            *Rate is subject to change
          </Paragraph>

          <StyledArticle>
            <Paragraph>
              <StyledImage path="veterans-kiss.png" alt="Veterans Salute Assisted Living" height={640} />
            </Paragraph>
          </StyledArticle>

          <Link
            href={`#${sectionIdMap.rc}`}
            onClick={e => handleAnchor(e, rcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>

          <Heading level="title" size="title" _ref={typesRef}>
            Who is a Surviving Spouse?
          </Heading>
          <Paragraph>
            Long-term care costs quickly add up, but for veterans and their surviving spouses, assistance may be available to
            help with these costs. Unfortunately, it’s hard to know what help is available, if you qualify, and how to apply.
            In fact, many veterans and their families struggle through the application process only to be denied. The information
            we’ve compiled in this document is based on the new law effective October 2018, so you have the most current data
            at your disposal. Two main benefits are available under Title 38. You cannot get both at the same time. The best
            option is to file for the benefit that will bring you the highest amount. Many families need some help choosing
            their best option. The choices are:
          </Paragraph>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Married to the veteran at the time the veteran passed away
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Can produce a marriage certificate evidencing the marriage
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Claiming spouse is named on the deceased veteran’s death certificate
            </ListItem>
          </ListWrapper>

          <Paragraph>If you divorced the veteran, you are NOT the surviving spouse even if neither party remarried. No VA
            disability benefits are available to surviving ex-spouses. This can be confusing as the SSA allows ex-spouses
            to claim on deceased spouses under certain circumstances. VA law and SSA law are not the same.
          </Paragraph>

          <Link
            href={`#${sectionIdMap.rc}`}
            onClick={e => handleAnchor(e, rcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" _ref={articlesRef} >
            Veteran Pension/Survivor Pension — Used to be called Non-Service-Connected Basic Pension
          </Heading>

          <Paragraph>
            The Language the Government proposed to help aged and disabled veterans. However, some qualifications must be met.
          </Paragraph>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Must be age 65; or
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              If you are under age 65 you must be receiving SSD and/or SSI; or
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Be a long-term resident in skilled nursing
            </ListItem>
          </ListWrapper>


          <StyledTable>
            <thead>
              <tr>
                <StyledTh color="slate" bgcolor="grey">
                  2019 Pension Rates
                </StyledTh>
                <StyledTh color="slate" bgcolor="grey">
                  *Rates are tied to COLA and are subject to change
                </StyledTh>
              </tr>
            </thead>
            <tbody>
              <Tr color="grey" bgcolor="white"><StyledTd>Surviving Spouse</StyledTd><StyledTd>$756</StyledTd> </Tr>
              <Tr color="grey" bgcolor="white"><StyledTd>Single Veteran</StyledTd><StyledTd>$1,128</StyledTd> </Tr>
              <Tr color="grey" bgcolor="white"><StyledTd>Married Veteran</StyledTd><StyledTd>$1,477</StyledTd> </Tr>
            </tbody>
          </StyledTable>

          <Paragraph>
            Examples:
          </Paragraph>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Veteran is aged 72 and has an income of $800/mth. The VA promised a minimum income of $1128/mth. The VA will
              currently pay $328/mth to bring the veteran’s income up to basic pension of 1128/mth.
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Surviving spouse is 62 but is on SSI and has an income of $550/mth. The VA will pay $206/mth to bring the
              surviving spouse’s income up to basic pension rate of $756/mth.
            </ListItem>
          </ListWrapper>


          <StyledArticle>
            <Paragraph>
              <StyledImage path="smiling-veterans.png" alt="Veterans Salute Assisted Living" height={640} />
            </Paragraph>
          </StyledArticle>

          <Link
            href={`#${sectionIdMap.rc}`}
            onClick={e => handleAnchor(e, rcRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={seniorLivingRef} >
            Aid and Attendance Rates 2019
          </Heading>

          <StyledTable>
            <tbody>
              <Tr color="grey" bgcolor="white"><StyledTd>Surviving Spouse</StyledTd><StyledTd>$453/month</StyledTd> </Tr>
              <Tr color="grey" bgcolor="white"><StyledTd>Single Veteran</StyledTd><StyledTd>$753/month</StyledTd> </Tr>
              <Tr color="grey" bgcolor="white"><StyledTd>Married Veteran</StyledTd><StyledTd>$753/month</StyledTd> </Tr>
            </tbody>
          </StyledTable>

          <Paragraph>
            Add the basic pension rate above with the aid and attendance rate and you get the maximum potential payout per month as follows:
          </Paragraph>

          <StyledTable>
            <tbody>
              <Tr color="grey" bgcolor="white"><StyledTd>Surviving Spouse</StyledTd><StyledTd>$1,209/month</StyledTd> </Tr>
              <Tr color="grey" bgcolor="white"><StyledTd>Single Veteran</StyledTd><StyledTd>$1,881/month</StyledTd> </Tr>
              <Tr color="grey" bgcolor="white"><StyledTd>Married Veteran</StyledTd><StyledTd>$2,230/month</StyledTd> </Tr>
            </tbody>
          </StyledTable>

          <Paragraph>
            There are three criteria which must be met to qualify for pension plus aid and attendance
          </Paragraph>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Military service time
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Medical need — assistance with personal care needs
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Monetary need — demonstrate a limited net worth
            </ListItem>
          </ListWrapper>

          <StyledArticle>
            <Paragraph>
              <StyledImage path="saluting-veterans.png" alt="Veterans Salute Assisted Living" height={640} />
            </Paragraph>
          </StyledArticle>

        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={seniorLivingRef} >
            Military Time:
          </Heading>

          <Paragraph>
            Veteran needs to have 90 consecutive days of active duty service with 1 day falling in a time of declared
            conflict and honorably discharged.
          </Paragraph>

          <StyledTable>
            <tbody>
              <Tr color="grey" bgcolor="white"><StyledTd>WWII</StyledTd><StyledTd>12/7/41 – 12/31/46</StyledTd> </Tr>
              <Tr color="grey" bgcolor="white"><StyledTd>Korea</StyledTd><StyledTd>6/27/50 – 1/31/55</StyledTd> </Tr>
              <Tr color="grey" bgcolor="white"><StyledTd>Vietnam I</StyledTd><StyledTd>2/28/61 – 8/4/64 (Must have been boots on the ground in Vietnam or brown water Navy)</StyledTd> </Tr>
              <Tr color="grey" bgcolor="white"><StyledTd>Vietnam II</StyledTd><StyledTd>8/5/64 - 5/7/75</StyledTd> </Tr>
              <Tr color="grey" bgcolor="white"><StyledTd>Mideast</StyledTd><StyledTd>8/02/90 – present (Two years active duty with 1 day falling during declared time of conflict and honorably discharged)</StyledTd> </Tr>
            </tbody>
          </StyledTable>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={seniorLivingRef} >
            Medical Need:
          </Heading>

          <Paragraph>
            Veteran needs to have 90 consecutive days of active duty service with 1 day falling in a time of declared
            conflict and honorably discharged.
          </Paragraph>

          <Heading level="subtitle" size="subtitle" >
            ADLs are as follows and are delivered on a regular basis:
          </Heading>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Assistance bathing/showering
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Assistance dressing
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Assistance with incontinence concerns
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Assistance transferring (getting up or down, or in and out of bed, for example)
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Assistance with ambulation
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Assistance with eating
            </ListItem>
          </ListWrapper>

          <Paragraph>
            Assistance with medications if claimant is in a custodial care setting (not at home): Medication administration,
            if performed by a health care provider, would be a health care expense under § 3.278(c)(1). A medication reminder
            from a provider who is not a health care provider would not be a medical expense unless the individual requires
            custodial care and the provisions of final § 3.278(d) apply. A claimant can be paid as little as a $1 up to the
            full amount based on deductible medical expenses or, in VA vernacular unreimbursed Medical Expenses (UME).
          </Paragraph>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={seniorLivingRef} >
            Monetary Need:
          </Heading>

          <Paragraph>
            Annual income + countable assets – unreimbursed medical expenses =&lt; $123,600
          </Paragraph>

          <StyledArticle>
            <Paragraph>
              <StyledImage path="veteran-holding-hand.png" alt="Veterans Salute Assisted Living" height={640} />
            </Paragraph>
          </StyledArticle>

        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" _ref={seniorLivingRef} >
            How do you receive the full award/amount to help with long-term care costs?
          </Heading>
          <Paragraph>
            Primarily if the monthly cost of your care exceeds your income by 5%, then the full award is made. One may
            deduct dollar for dollar of unreimbursed, recurring, predictable care costs from one’s income. VA does deduct
            unreimbursed medical expenses that exceed 5% of the maximum annual pension rate (MAPR) allowed by Congress,
            to reduce income for VA purposes.
          </Paragraph>

          <Heading level="subtitle" size="subtitle" >
            Examples:
          </Heading>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Surviving spouse income is $1,600/month, and her cost of care in assisted living is $1,800/month. She effectively
              has a negative monthly income. ($1,600 – $1,800 = negative $200.) The VA said if her income fell beneath $756
              they would pay the difference. In this case, since she has a negative income and she would receive the full
              $757, and since her income was driven down by her need for care (aid and attendance) they will add $453 to the
              payment for a total monthly payment of $1209.
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              <div>
                <Paragraph>
                  Veteran has an income of $2,600/month. His cost of care is $2,400/month. Since the veteran is not spending
                  all of his income on deductible medical expenses, the award would be approximately $1,587/month. The more
                  unreimbursed, predictable, recurring medical expenses the claimant has each month, the closer they are to
                  being awarded the maximum amount.
                </Paragraph>
                <Paragraph>
                  In order to receive an award of pension plus aid and attendance, you must be able to show evidence that you
                  are incurring unreimbursed medical expenses as defined by the VA.
                </Paragraph>
                <Paragraph>
                  The claimant can’t share with the VA what the care plan would be if they had the benefit. One must evidence
                  that the claimant is actively engaged in a care plan and incurring unreimbursed care costs that are being
                  financed out of the claimant’s personal income.
                </Paragraph>
              </div>
            </ListItem>
          </ListWrapper>

          <Heading level="subtitle" size="subtitle" >
            Some examples of unreimbursed medical expenses:
          </Heading>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="secondary" iconVariation="dark35">
              Monthly fees from an assisted living community, supplemental medical insurance premiums, monthly fees from home
              care agencies, unreimbursed diabetic supplies, incontinence supplies, custodial care in a retirement community, etc.
            </ListItem>
          </ListWrapper>

          <Paragraph>
            To be clear, the VA does not count your mortgage, lawn service, pet grooming, credit card debt, or groceries as
            unreimbursed medical expenses.
          </Paragraph>

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
      <HubHeader
        imagePath="react-assets/hub/veteran-benefit.png"
        heading="Veteran’s Benefits for Assisted Living"
        showSearch={false}
      />
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
      <PhoneCTAFooter />
      <Footer />
    </>

  );
};

VeteransBenefitAssistedLivingPage.propTypes = {
  handleAnchor: func,
};

export default VeteransBenefitAssistedLivingPage;
