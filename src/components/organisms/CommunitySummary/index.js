import React from 'react';
import PropTypes from 'prop-types';
import smoothscroll from 'smoothscroll-polyfill';
import NumberFormat from 'react-number-format';

import { Link } from 'sly/components/atoms';
import List from 'sly/components/molecules/List';

export default class communitySummary extends React.Component {
  static propTypes = {
    phoneNumber: PropTypes.string,
    user: PropTypes.shape({
      phoneNumber: PropTypes.string,
    }),
    twilioNumber: PropTypes.shape({
      numbers: PropTypes.arrayOf(PropTypes.number),
    }),
    amenityScore: PropTypes.string,
    communityHighlights: PropTypes.arrayOf(PropTypes.string),
    startingRate: PropTypes.number,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number,
    })),
    innerRef: PropTypes.object,
  };

  static sectionIdMaps = {
    pricingAndFloorPlans: 'pricing-and-floor-plans',
    amenitiesAndFeatures: 'amenities-and-features',
    reviews: 'property-reviews',
  };

  static scrollToSection(e, section) {
    // Link triggers router navigation so need to preventDefault.
    // TODO: find better way to do it with any other component without much styling code
    e.preventDefault();
    const sectionRef = document.getElementById(this.sectionIdMaps[section]);
    if (sectionRef) {
      sectionRef.scrollIntoView({ behavior: 'smooth' });
    }
  }

  componentDidMount() {
    // this is not required when running in test env created by jsdom
    if (document.documentElement.clientHeight) {
      smoothscroll.polyfill();
    }
  }

  render() {
    const {
      twilioNumber, phoneNumber, user, amenityScore, communityHighlights, startingRate, reviews, innerRef,
    } = this.props;
    const highlights = [];

    if (twilioNumber && twilioNumber.numbers.length) {
      highlights.push((
        <span>
          Pricing & Availability&nbsp;
          <Link href={`tel:${twilioNumber.numbers[0]}`}>
            <NumberFormat value={twilioNumber.numbers[0]} format="(###) ###-####" displayType="text" />
          </Link>
        </span>
      ));
    }
    if (phoneNumber || (user && user.phoneNumber)) {
      highlights.push((
        <span>
          Reception&nbsp;
          <Link href={`tel:${phoneNumber || user.phoneNumber}`}>
            <NumberFormat value={phoneNumber || user.phoneNumber} format="(###) ###-####" displayType="text" />
          </Link>
        </span>
      ));
    }
    if (amenityScore) {
      const parsedAmenityScore = parseFloat(amenityScore);
      if (parsedAmenityScore) {
        highlights.push((
          <Link
            href={`#${this.constructor.sectionIdMaps.amenitiesAndFeatures}`}
            onClick={e => this.constructor.scrollToSection(e, 'amenitiesAndFeatures')}
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
          onClick={e => this.constructor.scrollToSection(e, 'amenitiesAndFeatures')}
        >
          Alzheimer's & Dementia support
        </Link>
      ));
    }
    highlights.push((
      <Link
        href={`#${this.constructor.sectionIdMaps.pricingAndFloorPlans}`}
        onClick={e => this.constructor.scrollToSection(e, 'pricingAndFloorPlans')}
      >
        Rooms Available
      </Link>
    ));
    if (startingRate) {
      highlights.push((
        <span>
          Pricing starts from&nbsp;
          <Link
            href={`#${this.constructor.sectionIdMaps.pricingAndFloorPlans}`}
            onClick={e => this.constructor.scrollToSection(e, 'pricingAndFloorPlans')}
          >
            <NumberFormat value={startingRate} thousandSeparator displayType="text" prefix="$" />
          </Link>
        </span>
      ));
    }
    if (reviews) {
      let totalRating = 0;
      reviews.forEach((review) => {
        totalRating += review.value;
      });
      const avgReviews = reviews.length > 0 ? totalRating / reviews.length : 0;
      if (avgReviews > 0) {
        highlights.push((
          <Link
            href={`#${this.constructor.sectionIdMaps.reviews}`}
            onClick={e => this.constructor.scrollToSection(e, 'reviews')}
          >
            Rating {avgReviews.toFixed(1).replace(/\.0+$/, '')}-Star Average
          </Link>
        ));
      }
    }

    return (
      <section ref={innerRef}>
        <List items={highlights} />
      </section>
    );
  }
}
