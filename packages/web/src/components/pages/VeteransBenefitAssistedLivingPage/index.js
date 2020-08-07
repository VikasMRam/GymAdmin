import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { func } from 'prop-types';

import { size, palette } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import HubHeader from 'sly/web/components/molecules/HubHeader';
import PhoneCTAFooter from 'sly/web/components/molecules/PhoneCTAFooter';
import NextSteps from 'sly/web/components/molecules/NextSteps';
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
import ListItem from 'sly/web/components/molecules/ListItem';
import { Heading, Paragraph, Link, ResponsiveImage, Span, Image, Block } from 'sly/web/components/atoms';
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
  background: ${palette('primary', 'base')};
  color: ${palette('white', 'base')};
  font-size: ${size('text', 'title')};
`;

const TwoColumnGrid = styled.div`
  padding: ${size('spacing', 'xLarge')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
  display: grid;
  grid-template-columns: minmax(min-content, max-content) minmax(min-content, max-content);
  grid-column-gap: ${size('spacing', 'xLarge')};
  grid-row-gap: ${size('spacing', 'xLarge')};
  margin-bottom: ${size('spacing.xLarge')};
`;

const TwoColumnGridTable = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  border: ${size('border.regular')} solid ${palette('grey', 'stroke')};
`;

const TwoColumnGridTableItem = styled.div`
 padding: ${size('spacing.regular')} ${size('spacing.xLarge')};
  border-bottom: ${size('border.regular')} solid ${palette('grey', 'stroke')};
`;

const VeteransBenefitAssistedLivingPage = ({
  handleAnchor,
}) => {
  const alRef = React.createRef();
  const sccRef = React.createRef();
  const dicssRef = React.createRef();
  const whossRef = React.createRef();
  const vetpnRef = React.createRef();
  const aarRef = React.createRef();
  const mlRef = React.createRef();
  const nextRef = React.createRef();
  const ListWrapper = makeOneColumnListWrapper('div');

  const sectionIdMap = {
    scc: 'service-connected-compensation',
    dicss: 'dic-or-surviving-spouses',
    whoss: 'who-is-surviving-spouse',
    vetpn: 'veteran-pension',
    aar: 'aid-attendance-rates',
    ml: 'military-time',
    next: 'next-steps',
  };

  const nextSteps = [
    { title: 'Veterans Benefits for Assisted Living', to: 'https://www.seniorly.com/resources/articles/veterans-benefits-for-assisted-living' },
    { title: '4 Commemorative Veterans Day Activities', to: 'https://www.seniorly.com/resources/articles/veterans-day-activities' },
    { title: '5 Ways to Honor Our Senior Veteran\'s This Memorial Day', to: 'https://www.seniorly.com/resources/articles/5-ways-to-honor-our-senior-veteran-s-this-memorial-day' },
    { title: '3 Female Senior Veterans We Honor', to: 'https://www.seniorly.com/resources/articles/3-female-senior-veterans-we-honor-this-memorial-day' },
  ];

  const TableOfContents = () => {
    return (
      <>
        <Heading level="subtitle" size="subtitle">
          Table of Contents
        </Heading>
        <Paragraph pad="xxLarge">
          <StyledLink
            href={`#${sectionIdMap.scc}`}
            onClick={e => handleAnchor(e, sccRef)}
          >
            Service-Connected Compensation
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.dicss}`}
            onClick={e => handleAnchor(e, dicssRef)}
          >
            Dependency and Indemnity Compensation (DIC)/Surviving Spouses
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.whoss}`}
            onClick={e => handleAnchor(e, whossRef)}
          >
            Who is a Surviving Spouse?
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.vetpn}`}
            onClick={e => handleAnchor(e, vetpnRef)}
          >
            Veteran Pension/Survivor Pension
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.aar}`}
            onClick={e => handleAnchor(e, aarRef)}
          >
            Aid and Attendance Rates
          </StyledLink>
          <StyledLink
            href={`#${sectionIdMap.ml}`}
            onClick={e => handleAnchor(e, mlRef)}
          >
            Military Time
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
          <Heading level="title" size="title" ref={alRef} >What is Assisted Living for Veterans?</Heading>
          <Paragraph pad="xxLarge">Long-term care costs quickly add up, but for Veterans and their surviving spouses,
            assistance may be available to help with these costs. Unfortunately, it’s hard to know what help is available,
            if you qualify, and how to apply. In fact, many Veterans and their families struggle through the application
            process only to be denied. The information we’ve compiled in this document is based on the new law effective October
            2018 with updated information as of February 2020.  It is our hope that this page will provide you the most current
            Vetaran’s data available. Two main benefits are available until...
          </Paragraph>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Service-connected disability benefits
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Veteran Pension/Survivor Pension
            </ListItem>
          </ListWrapper>

          <Paragraph pad="xxLarge">
            If you qualify, you can add special monthly benefits to these benefits stated above. The two most common include:
          </Paragraph>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Housebound
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Aid and Attendance
            </ListItem>
          </ListWrapper>

          <Paragraph pad="xxLarge">
            We’re going to take a closer look at each option so you can easily determine which one, if any,
            applies to your specific situation. We’ll highlight and address the most frequently asked questions.
            Our goal is to give you enough information to decide whether you want to pursue a Veterans benefit claim.
          </Paragraph>

          <StyledArticle>
            <Paragraph pad="xxLarge">
              <StyledImage path="react-assets/hub/veterans-benefit/veterans-salute.png" alt="Veterans Salute Assisted Living" height={640} />
            </Paragraph>
          </StyledArticle>

          <Link
            href={`#${sectionIdMap.rc}`}
            onClick={e => handleAnchor(e, alRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" ref={sccRef}>Service-Connected Compensation</Heading>
          <Paragraph pad="xxLarge">
            This is a monthly payment made to a Veteran who suffered an injury while on active duty or had a pre-existing
            condition aggravated by his/her service. The severity of the disability is given a specific percentage rating.
            For example, you may have a single rating of 10% or multiple individual ratings adding up to 70% or more.
            Some individuals carry 120%+ ratings when totaled but will only be paid the 100% rate. Each percentage rating
            carries a designated dollar value set by law. The ability to obtain this rating must come from a VA Medical
            Center (VAMC) exam and is called a C & P exam. You must be enrolled in the VA Medical System to request this exam.
            The VAMC will contact you for the exam, and it’s critical to make sure you attend this appointment! If you have
            been seeing a PCP, take your medical history with you to support your claim for disability.
          </Paragraph>
          <Paragraph pad="xxLarge">To enroll: <Link href="https://www.va.gov/healthbenefits/apply/">www.va.gov/healthbenefits/apply/</Link></Paragraph>
          <Paragraph pad="xxLarge">You can enroll online, via phone or in person.</Paragraph>
          <Paragraph pad="xxLarge">Married Veterans with a dependent can have aid and attendance added for their spouse to their monthly
            payment if the spouse can demonstrate the need for aid and attendance. The Veteran must be at least 30% rated
            for a spouse to claim aid and attendance benefits under the Veteran’s service-connected disability. Unfortunately,
            this is a small sum, and not enough to cover all care needs, but every dollar counts when it comes to care.
            Examples for 2018:
          </Paragraph>

          <TwoColumnGrid>
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
            <Span>A 100% rated Veteran can also have the housebound benefit or aid and attendance added to their income if
              they demonstrate the need for housebound or aid and attendance. This can add an additional $500-$700 or so to
              the household income. You can also receive 100% rated pay if you are granted IU — individual unemployable.
              This means your disability is so severe that you are unable to sustain gainful employment. For IU to come into
              play, the following must apply:
            </Span>
            <PercentageDiv>60%</PercentageDiv>
            <Span>
              <Paragraph pad="xxLarge">
                One disability rating of 60% or more OR multiple disabilities with one disability rated at 40% or higher and
                a total rating of 70% percent or more.
              </Paragraph>
              <Paragraph pad="xxLarge">
                A compensation rating table can be found at:
                <Link href="https://www.benefits.va.gov/COMPENSATION/resources_comp01.asp"> www.benefits.va.gov/COMPENSATION/resources_comp01.asp</Link>
              </Paragraph>
            </Span>
          </TwoColumnGrid>

          <Link
            href={`#${sectionIdMap.rc}`}
            onClick={e => handleAnchor(e, alRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" ref={dicssRef} >
            Dependency and Indemnity Compensation (DIC)/Surviving Spouses
          </Heading>

          <Paragraph pad="xxLarge">
            This payment should be made automatically to a surviving spouse whose Veteran spouse carried a 100% service connected
            rating at the time of death and cause of death can be linked to why they were granted the 100% rating.
          </Paragraph>
          <Paragraph pad="xxLarge">
            In 2018, this monthly payment was $1238.11/mth*
          </Paragraph>
          <Paragraph pad="xxLarge">
            If the Veteran carried the 100% rating for the last 8 years of his/her life and was married to the same spouse those
            last 8 years, the spouse is entitled to an additional marriage stipend of $272.46/mth*
          </Paragraph>
          <Paragraph pad="xxLarge">
            If the surviving spouse needs a third party to attend to their personal care needs, an additional $317.87* can also
            be added.
          </Paragraph>
          <Paragraph pad="xxLarge">
            In total this can equate to $1873.44/mth* if all conditions are met.
          </Paragraph>
          <Paragraph pad="xxLarge">
            *Rate is subject to change
          </Paragraph>

          <StyledArticle>
            <Paragraph pad="xxLarge">
              <StyledImage path="react-assets/hub/veterans-benefit/vet-with-wife.png" alt="Veteran with Wife" height={640} />
            </Paragraph>
          </StyledArticle>

          <Link
            href={`#${sectionIdMap.rc}`}
            onClick={e => handleAnchor(e, alRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>

          <Heading level="title" size="title" ref={whossRef}>
            Who is a Surviving Spouse?
          </Heading>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Married to the Veteran at the time the Veteran passed away
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Can produce a marriage certificate evidencing the marriage
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Claiming spouse is named on the deceased Veteran’s death certificate
            </ListItem>
          </ListWrapper>

          <Paragraph pad="xxLarge">If you divorced the Veteran, you are NOT the surviving spouse even if neither party remarried. No VA
            disability benefits are available to surviving ex-spouses. This can be confusing as the SSA allows ex-spouses
            to claim on deceased spouses under certain circumstances. VA law and SSA law are not the same.
          </Paragraph>

          <Link
            href={`#${sectionIdMap.rc}`}
            onClick={e => handleAnchor(e, alRef)}
          >
            Back to top
          </Link>
        </StyledArticle>
        <StyledArticle>
          <Heading level="title" size="title" ref={vetpnRef} >
            Veteran Pension/Survivor Pension — Used to be called Non-Service-Connected Basic Pension
          </Heading>

          <Paragraph pad="xxLarge">
            The language the government proposed to help aged and disabled Veterans. However, some qualifications must be met.
          </Paragraph>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Must be age 65; or
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              If you are under age 65 you must be receiving SSD and/or SSI; or
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Be a long-term resident in skilled nursing
            </ListItem>
          </ListWrapper>


          <StyledTable>
            <thead>
              <tr>
                <th>
                  2019 Pension Rates
                </th>
                <th>
                  *Rates are tied to COLA and are subject to change
                </th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Surviving Spouse</td><td>$756</td> </tr>
              <tr><td>Single Veteran</td><td>$1,128</td> </tr>
              <tr><td>Married Veteran</td><td>$1,477</td> </tr>
            </tbody>
          </StyledTable>

          <Paragraph pad="xxLarge">
            Examples:
          </Paragraph>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Veteran is aged 72 and has an income of $800/mth. The VA promised a minimum income of $1128/mth. The VA will
              currently pay $328/mth to bring the Veteran’s income up to basic pension of 1128/mth.
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Surviving spouse is 62 but is on SSI and has an income of $550/mth. The VA will pay $206/mth to bring the
              surviving spouse’s income up to basic pension rate of $756/mth.
            </ListItem>
          </ListWrapper>


          <StyledArticle>
            <Paragraph pad="xxLarge">
              <StyledImage path="react-assets/hub/veterans-benefit/veteran-pension.png" alt="Veterans Pension" height={640} />
            </Paragraph>
          </StyledArticle>

          <Link
            href={`#${sectionIdMap.rc}`}
            onClick={e => handleAnchor(e, alRef)}
          >
            Back to top
          </Link>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" ref={aarRef} >
            Aid and Attendance Rates 2019
          </Heading>

          <StyledTable>
            <tbody>
              <tr><td>Surviving Spouse</td><td>$453/month</td> </tr>
              <tr><td>Single Veteran</td><td>$753/month</td> </tr>
              <tr><td>Married Veteran</td><td>$753/month</td> </tr>
            </tbody>
          </StyledTable>

          <Paragraph pad="xxLarge">
            Add the basic pension rate above with the aid and attendance rate and you get the maximum potential payout per month as follows:
          </Paragraph>

          <StyledTable>
            <tbody>
              <tr><td>Surviving Spouse</td><td>$1,209/month</td> </tr>
              <tr><td>Single Veteran</td><td>$1,881/month</td> </tr>
              <tr><td>Married Veteran</td><td>$2,230/month</td> </tr>
            </tbody>
          </StyledTable>

          <Paragraph pad="xxLarge">
            There are three criteria which must be met to qualify for pension plus aid and attendance:
          </Paragraph>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Military service time
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Medical need — assistance with personal care needs
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Monetary need — demonstrate a limited net worth
            </ListItem>
          </ListWrapper>

          <StyledArticle>
            <Paragraph pad="xxLarge">
              <StyledImage path="react-assets/hub/veterans-benefit/saluting-veteran.png" alt="Veterans Salute Assisted Living" height={640} />
            </Paragraph>
          </StyledArticle>

        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" ref={mlRef} >
            Military Time
          </Heading>

          <Paragraph pad="xxLarge">
            Veteran needs to have 90 consecutive days of active duty service with 1 day falling in a time of declared
            conflict and honorably discharged.
          </Paragraph>

          <TwoColumnGridTable>
            <TwoColumnGridTableItem>WWII</TwoColumnGridTableItem>
            <TwoColumnGridTableItem>12/7/41 – 12/31/46</TwoColumnGridTableItem>
            <TwoColumnGridTableItem>Korea</TwoColumnGridTableItem>
            <TwoColumnGridTableItem>6/27/50 – 1/31/55</TwoColumnGridTableItem>
            <TwoColumnGridTableItem>Vietnam I</TwoColumnGridTableItem>
            <TwoColumnGridTableItem>
              <div>2/28/61 – 8/4/64 <Block color="grey">(Must have been boots on the ground in Vietnam or brown water Navy)</Block></div>
            </TwoColumnGridTableItem>
            <TwoColumnGridTableItem>Vietnam II</TwoColumnGridTableItem>
            <TwoColumnGridTableItem>8/5/64 - 5/7/75</TwoColumnGridTableItem>
            <TwoColumnGridTableItem>Mideast</TwoColumnGridTableItem>
            <TwoColumnGridTableItem>
              <div>8/02/90 – present <Block color="grey">(Two years active duty with 1 day falling during declared time of conflict and honorably discharged)</Block></div>
            </TwoColumnGridTableItem>
          </TwoColumnGridTable>

        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" >
            Medical Need
          </Heading>

          <Paragraph pad="xxLarge">
            Veteran needs to have 90 consecutive days of active duty service with 1 day falling in a time of declared
            conflict and honorably discharged.
          </Paragraph>

          <Heading level="subtitle" size="subtitle" >
            Activities of Daily Living (ADLs) are as follows and are delivered on a regular basis:
          </Heading>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Bathing/showering
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Dressing
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Incontinence concerns
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Transferring (getting up or down, or in and out of bed, for example)
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Ambulation
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Eating
            </ListItem>
          </ListWrapper>

          <Heading level="subtitle" size="subtitle" >
            Assistance with medications if claimant is in a custodial care setting (not at home):
          </Heading>

          <Paragraph pad="xxLarge">
            Medication administration, if performed by a health care provider, would be a health care expense under § 3.278(c)(1). A medication reminder
            from a provider who is not a health care provider would not be a medical expense unless the individual requires
            custodial care and the provisions of final § 3.278(d) apply. A claimant can be paid as little as a $1 up to the
            full amount based on deductible medical expenses or, in VA vernacular unreimbursed Medical Expenses (UME).
          </Paragraph>
        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" >
            Monetary Need
          </Heading>

          <Paragraph pad="xxLarge">
            Annual income + countable assets – unreimbursed medical expenses =&lt; $123,600
          </Paragraph>

          <StyledArticle>
            <Paragraph pad="xxLarge">
              <StyledImage path="react-assets/hub/veterans-benefit/veteran-holding-hand.png" alt="Veterans Holding Hand Assisted Living" height={640} />
            </Paragraph>
          </StyledArticle>

        </StyledArticle>

        <StyledArticle>
          <Heading level="title" size="title" >
            How do you receive the full award/amount to help with long-term care costs?
          </Heading>
          <Paragraph pad="xxLarge">
            Primarily if the monthly cost of your care exceeds your income by 5%, then the full award is made. One may
            deduct dollar for dollar of unreimbursed, recurring, predictable care costs from one’s income. VA does deduct
            unreimbursed medical expenses that exceed 5% of the maximum annual pension rate (MAPR) allowed by Congress,
            to reduce income for VA purposes.
          </Paragraph>

          <Heading level="subtitle" size="subtitle" >
            Examples:
          </Heading>

          <ListWrapper>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              <Block>Surviving spouse income is $1,600/month, and her cost of care in <Link href="https://www.seniorly.com/assisted-living">assisted living</Link> is $1,800/month. She effectively
                has a negative monthly income. ($1,600 – $1,800 = negative $200.) The VA said if her income fell beneath $756
                they would pay the difference. In this case, since she has a negative income and she would receive the full
                $757, and since her income was driven down by her need for care (aid and attendance) they will add $453 to the
                payment for a total monthly payment of $1209.
              </Block>
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              <div>
                <Paragraph pad="xxLarge">
                  Veteran has an income of $2,600/month. His cost of care is $2,400/month. Since the Veteran is not spending
                  all of his income on deductible medical expenses, the award would be approximately $1,587/month. The more
                  unreimbursed, predictable, recurring medical expenses the claimant has each month, the closer they are to
                  being awarded the maximum amount.
                </Paragraph>
                <Paragraph pad="xxLarge">
                  In order to receive an award of pension plus aid and attendance, you must be able to show evidence that you
                  are incurring unreimbursed medical expenses as defined by the VA.
                </Paragraph>
                <Paragraph pad="xxLarge">
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
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              <Block>Monthly fees from an <Link href="https://www.seniorly.com/assisted-living">assisted living community</Link></Block>
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Supplemental medical insurance premiums
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Monthly fees from home care agencies
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Unreimbursed diabetic supplies
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Incontinence supplies
            </ListItem>
            <ListItem icon="checkmark-circle" iconPalette="primary" iconVariation="base">
              Custodial care in a retirement community
            </ListItem>
          </ListWrapper>

          <Paragraph pad="xxLarge">
            To be clear, the VA does not count your mortgage, lawn service, pet grooming, credit card debt, or groceries as
            unreimbursed medical expenses.
          </Paragraph>

          <StyledArticle>
            <Heading level="title" size="title" >
              Recent Changes in Law Affecting Eligibility
            </Heading>

            <TwoColumnGrid>
              <Image src={assetPath('images/hub/icons/primary-residency.png')} />
              <Paragraph pad="xxLarge">
                <Span weight="medium">Your primary residence is exempt: </Span>This is defined as your home and 2 acres. If your
                home is on 10 acres, then the fair market value of the additional 8 acres will be counted in tabulating your net
                worth. If you can evidence that any additional land you own is exempt, this will be considered. For example, the
                land may be landlocked and inaccessible. The fair market value of a second residence will also be included in
                tabulating net worth. If you are receiving rent from your primary residence, the rent will count as income, and
                the fair market value of the home will also be tabulated in your net worth. It can be argued this is now
                investment property and not your primary residence.
              </Paragraph>
              <Image src={assetPath('images/hub/icons/net-worth-limit.png')} />
              <Paragraph pad="xxLarge">
                <Span weight="medium">Net worth limit: </Span>
                There is a $123,600 net worth limit regardless of age, married, single Veteran or a surviving spouse. This is a
                highly technical figure, Do not rule out benefits until you have spoken with someone knowledgeable in VA law.
              </Paragraph>
              <Image src={assetPath('images/hub/icons/net-worth.png')} />
              <Paragraph pad="xxLarge">
                <Span weight="medium">Net worth: </Span>
                Defined as the sum of the claimant’s net annual income plus all countable assets.
              </Paragraph>
              <Image src={assetPath('images/hub/icons/assets.png')} />
              <Paragraph pad="xxLarge">
                <Span weight="medium">Countable assets is another highly technical term: </Span>
                Principal balances in annuities (unless mandated at retirement — the payment still counts as income), liquid
                assets in revocable and irrevocable trusts (if created in the last 36 months), IRA principal, checking, savings,
                CDs, stocks, bonds, etc. plus marketable real property.
              </Paragraph>
              <Image src={assetPath('images/hub/icons/look-back-period.png')} />
              <Paragraph pad="xxLarge">
                <Span weight="medium">Look back period: </Span>
                There will be a 36-month “look back” period from the date of the pension application for any transferred assets
                (homes quitclaimed, trusts created, purchased financial products). Any transfers made before the look back date
                are exempt.
              </Paragraph>
              <Image src={assetPath('images/hub/icons/deductables.png')} />
              <Paragraph pad="xxLarge">
                <Span weight="medium">Countable deductions: </Span>
                Unreimbursed medical expenses, health insurance premiums, cost of care (i.e. <Link href="https://www.seniorly.com/assisted-living">assisted living</Link> monthly fees,
                private care, custodial care, home care, etc.). These amounts are deducted from your net worth and eligibility
                may exist if the deductions bring your net worth to $123,600 or lower.
              </Paragraph>
              <Image src={assetPath('images/hub/icons/penalties.png')} />
              <Paragraph pad="xxLarge">
                <Span weight="medium">Penalties for transfers: </Span>
                The penalty is <Span weight="medium">$2,230 per month for 2019</Span> (Veteran plus one dependent pension plus
                aid and attendance rate) per month for transferred assets - not to exceed 5 years. Similar to pre — 2006 Medicaid
                rules, a penalty applies and begins to run on the date of the most recent transfer, not on the date of the
                application. Any penalty remaining on the application will result in no pension until it expires.
              </Paragraph>
              <Image src={assetPath('images/hub/icons/penalty-cures.png')} />
              <Paragraph pad="xxLarge">
                <Span weight="medium">Penalties for transfers: </Span>
                If a penalty is imposed, the claimant has 60 days to cure the transfer and 90 days to notify the VA of the cure.
              </Paragraph>
            </TwoColumnGrid>

            <Paragraph pad="xxLarge">
              We’ve worked hard to reduce volumes of material concerning VA law into just a handful of pages. Only the highlights
              have been noted so you can quickly look through and determine if one of these two benefits can be used to cover
              long-term care costs. It is not meant to thoroughly discuss or demonstrate all portions and nuances of VA law. This
              is not legal advice. It is merely a general guide.
            </Paragraph>

            <StyledArticle>
              <Paragraph pad="xxLarge">
                <StyledImage path="react-assets/hub/veterans-benefit/3-veterans.png" alt="Veterans Benefit Assisted Living" height={640} />
              </Paragraph>
            </StyledArticle>

          </StyledArticle>

          <StyledArticle>
            <Heading level="title" size="title" >
              Who Can Help You?
            </Heading>

            <Paragraph pad="xxLarge">
              As tens of thousands of families can share with you, it’s not easy to make this trek alone. Many are denied, and
              others just give up. In October 2018, the application has gone from roughly 6 pages to 26 pages as has the burden
              of evidence that must now be met and supplied.
            </Paragraph>

            <Paragraph pad="xxLarge">
              If you want to discuss where or even if you are on the eligibility spectrum for benefits, Seniorly has worked with
              Veterans Benefits Aid Counsel on the creation of this document. You can call them at (888) 388-1404. They would be
              proud to conduct a no-cost pre-filing consultation. Contacting them in no way is an expression of your intent to
              file, but to learn.
            </Paragraph>

            <Paragraph pad="xxLarge">
              Make sure that anyone or any organization assisting or advising you with a claim holds current VA Accreditation by
              the Office of General Counsel. The VA accredits attorneys, Veteran service officers and claims agents only. If they
              are not accredited and/ or are unable to produce their accreditation, then be very circumspect of their advice and
              offer of assistance. An individual is in violation of federal law if they assist someone with filing and are not
              accredited by the VA.
            </Paragraph>

            <Paragraph pad="xxLarge">
              This violation also applies to individuals who state or give the false impression that they are accredited, and they
              offer to help prepare and give advice on a claim, but the actual claim itself is filed by an accredited individual.
              There is a reason the OGC accredits individuals and it is to protect the claimant.
            </Paragraph>

            <Paragraph pad="xxLarge">
              OGC accreditation can be checked by using this site:
              <Link href="https://www.va.gov/ogc/apps/accreditation/index.asp"> www.va.gov/ogc/apps/accreditation/index.asp</Link>
            </Paragraph>

            <Paragraph pad="xxLarge">
              As authors of this booklet, you can see Mr. Fincher’s accreditation under the attorney section.
            </Paragraph>
          </StyledArticle>

          <StyledArticle>
            <NextSteps
              nextRef={nextRef}
              toc="Veteran’s Benefits"
              label="Recommended reading:"
              links={nextSteps}
            />

            <Link
              href={`#${sectionIdMap.rc}`}
              onClick={e => handleAnchor(e, alRef)}
            >
              Back to top
            </Link>
          </StyledArticle>

        </StyledArticle>
      </>
    );
  };

  const title = 'Guide to VA Benefits and Senior Living';
  const description = 'The Seniorly Veterans Benefits Guide answers your questions about the Veterans Aid and Attendance Pension Program, and several other ways to qualify for government assistance for long term care.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <HubHeader
        imagePath="react-assets/hub/veterans-benefit/veteran-benefit.png"
        heading="Veteran’s Benefits for Assisted Living"
        toc="Veteran’s Benefits"
        showSearch={false}
        mobileBGGradientPalette="slate"
        mobileBGGradientVariation="dark"
        laptopBBGradientPalette="slate"
        laptopBBGradientVariation="dark"
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
