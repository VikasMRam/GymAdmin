import React from 'react';
import { arrayOf, string, number, object, shape, func } from 'prop-types';
import NumberFormat from 'react-number-format';
import { palette } from 'styled-theme';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { size } from 'sly/components/themes';
import { Link } from 'sly/components/atoms';
import List from 'sly/components/molecules/List';

const TooltipContent = styled(ReactTooltip)`
  padding: ${size('spacing.regular')};
  color: ${palette('white', 0)} !important;
  background-color: ${palette('grayscale', 0)} !important;
  border-radius: ${size('spacing.tiny')};
  font-size: ${size('text.caption')};
`;

export default class communitySummary extends React.Component {
  static propTypes = {
    phoneNumber: string,
    user: shape({
      phoneNumber: string,
    }),
    twilioNumber: shape({
      numbers: arrayOf(number),
    }),
    licenseUrl: string,
    amenityScore: string,
    communityHighlights: arrayOf(string),
    startingRate: number,
    estimatedPrice: object,
    reviewsValue: number,
    innerRef: object,
    pricingAndFloorPlansRef: object.isRequired,
    amenitiesAndFeaturesRef: object.isRequired,
    communityReviewsRef: object.isRequired,
    onConciergeNumberClicked: func,
    onReceptionNumberClicked: func,
    onHowSeniorlyWorks: func,
  };

  static sectionIdMaps = {
    amenitiesAndFeatures: 'amenities-and-features',
    pricingAndFloorPlans: 'pricing-and-floor-plans',
    reviews: 'reviews',
  };

  static scrollToSection(e, sectionRef) {
    // Link triggers router navigation so need to preventDefault.
    // TODO: find better way to do it with any other component without much styling code
    e.preventDefault();
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    const {
      isCCRC, twilioNumber, phoneNumber, user, licenseUrl, amenityScore, communityHighlights, startingRate,
      estimatedPrice, reviewsValue, innerRef, onConciergeNumberClicked, onReceptionNumberClicked, onHowSeniorlyWorks,
    } = this.props;

    const highlights = [];

    let receptionNumber = phoneNumber;
    if ((receptionNumber === undefined || receptionNumber === '') && user) {
      receptionNumber = user.phoneNumber;
    }

    let conciergeNumber = receptionNumber;
    if (twilioNumber && twilioNumber.numbers && twilioNumber.numbers.length) {
      conciergeNumber = twilioNumber.numbers[0];
    }
    const hasPricing = ( (estimatedPrice && (estimatedPrice.estimatedAverage || estimatedPrice.providedAverage )) || startingRate);

    let shownPricing = '';
    if (estimatedPrice) {
      shownPricing = estimatedPrice.estimatedAverage;
      if (estimatedPrice.providedAverage) {
        shownPricing = estimatedPrice.providedAverage;
      }
    }
    if (startingRate) {
      shownPricing = startingRate;
    }

    highlights.push((
      <span>
        Call free local advisor&nbsp;
        <Link href={`tel:${conciergeNumber}`} onClick={onConciergeNumberClicked}>
          <NumberFormat
            value={conciergeNumber}
            format="(###) ###-####"
            displayType="text"
            data-tip
            data-for="tooltipPhoneNumber"
          />
        </Link>
        <TooltipContent id="tooltipPhoneNumber" place="bottom" effect="solid" type="light" multiline>
          This phone number will connect you to the<br /> concierge team at Seniorly.
        </TooltipContent>
      </span>
    ));
    if (false) {
      highlights.push((
        <span>
          Reception&nbsp;
          <Link href={`tel:${receptionNumber}`} onClick={onReceptionNumberClicked}>
            <NumberFormat value={receptionNumber} format="(###) ###-####" displayType="text" />
          </Link>
        </span>
      ));
    }

    if (licenseUrl) {
      highlights.push((
        <Link
          href={licenseUrl}
          target="_blank"
        >
          State Inspection Reports
        </Link>
      ));
    }

    if (amenityScore) {
      const parsedAmenityScore = parseFloat(amenityScore);
      if (parsedAmenityScore) {
        highlights.push((
          <Link
            href={`#${this.constructor.sectionIdMaps.amenitiesAndFeatures}`}
            onClick={e => this.constructor.scrollToSection(e, this.props.amenitiesAndFeaturesRef)}
          >
            Amenity Score {parsedAmenityScore}
          </Link>
        ));
      }
    }
    const matchingHighlights = communityHighlights &&
      communityHighlights.filter((h) => {
        const lh = h.toLowerCase();
        return lh.includes('alzheimer') || lh.includes('dementia');
      });
    if (matchingHighlights && matchingHighlights.length) {
      highlights.push((
        <Link
          href={`#${this.constructor.sectionIdMaps.amenitiesAndFeatures}`}
          onClick={e => this.constructor.scrollToSection(e, this.props.amenitiesAndFeaturesRef)}
        >
          Alzheimer's & Dementia support
        </Link>
      ));
    }
    highlights.push((
      <Link
        href={`#${this.constructor.sectionIdMaps.pricingAndFloorPlans}`}
        onClick={e => this.constructor.scrollToSection(e, this.props.pricingAndFloorPlansRef)}
      >
        Available Floor Plans
      </Link>
    ));
    if (!isCCRC && hasPricing) {
      highlights.push((
        <span>
          { (startingRate || (estimatedPrice && estimatedPrice.providedAverage))
              ? 'Pricing starts from: '
              : 'Estimated Pricing: '
          }
          <Link
            href={`#${this.constructor.sectionIdMaps.pricingAndFloorPlans}`}
            onClick={e => this.constructor.scrollToSection(e, this.props.pricingAndFloorPlansRef)}
          >
            <NumberFormat value={shownPricing} thousandSeparator displayType="text" prefix="$" />
          </Link>
        </span>
      ));

    }
    if (reviewsValue > 0) {
      highlights.push((
        <Link
          href={`#${this.constructor.sectionIdMaps.reviews}`}
          onClick={e => this.constructor.scrollToSection(e, this.props.communityReviewsRef)}
        >
          Rating {reviewsValue.toFixed(1).replace(/\.0+$/, '')}-Star Average
        </Link>
      ));
    }

    highlights.push((
      <Link onClick={onHowSeniorlyWorks}>How Seniorly Works</Link>
    ));


    return (
      <article ref={innerRef}>
        <List items={highlights} />
      </article>
    );
  }
}
