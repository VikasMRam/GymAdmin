import React from 'react';
import { arrayOf, string, number, object, shape } from 'prop-types';
import NumberFormat from 'react-number-format';

import { Link, Icon, Tooltip } from 'sly/components/atoms';
import List from 'sly/components/molecules/List';

export default class communitySummary extends React.Component {
  static propTypes = {
    phoneNumber: string,
    user: shape({
      phoneNumber: string,
    }),
    twilioNumber: shape({
      numbers: arrayOf(number),
    }),
    amenityScore: string,
    communityHighlights: arrayOf(string),
    startingRate: number,
    reviewsValue : number,
    innerRef: object,
    pricingAndFloorPlansRef: object.isRequired,
    amenitiesAndFeaturesRef: object.isRequired,
    communityReviewsRef: object.isRequired,
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
      twilioNumber, phoneNumber, user, amenityScore, communityHighlights, startingRate, reviewsValue, innerRef,
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


    highlights.push((
      <span>
        Pricing & Availability&nbsp;
        <Link href={`tel:${conciergeNumber}`}>
          <NumberFormat value={conciergeNumber} format="(###) ###-####" displayType="text" />
        </Link>
      </span>
    ));

    highlights.push((
      <span>
        Reception&nbsp;
        <Link href={`tel:${receptionNumber}`}>
          <NumberFormat value={receptionNumber} format="(###) ###-####" displayType="text" />
        </Link>
      </span>
    ));

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
    if (startingRate) {
      highlights.push((
        <span>
          Pricing starts from&nbsp;
          <Link
            href={`#${this.constructor.sectionIdMaps.pricingAndFloorPlans}`}
            onClick={e => this.constructor.scrollToSection(e, this.props.pricingAndFloorPlansRef)}
          >
            <NumberFormat value={startingRate} thousandSeparator displayType="text" prefix="$" />
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


    return (
      <article ref={innerRef}>
        <List items={highlights} />
      </article>
    );
  }
}
