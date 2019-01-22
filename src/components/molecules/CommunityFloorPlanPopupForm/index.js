import React, { Fragment } from 'react';
import styled from 'styled-components';
import { func, shape, string, number, object, bool } from 'prop-types';
import NumberFormat from 'react-number-format';
import { Field } from 'redux-form';

import { size } from 'sly/components/themes';
import { Heading, Block, Link, Button, Image } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const DetailsSection = styled.div`
  padding: ${size('spacing.xLarge')};
`;

const HeadingBlock = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;

const DescriptionBlock = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const DetailsTable = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: ${size('spacing.large')};
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const StyledImage = styled(Image)`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
  }
`;

const TosBlock = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const CTAHeadingBlock = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const CommunityFloorPlanPopupForm = ({
  handleSubmit, typeOfCare, floorPlanInfo, userDetails, user, error, submitting,
}) => {
  const {
    roomType, description, price, shareType, bathroom, gender, accessibility, image, priceShared,
  } = floorPlanInfo;
  let priceToShow = price;
  if (shareType === 'Shared') {
    priceToShow = priceShared;
  }

  return (
    <div>
      {image && <StyledImage src={image} aspectRatio="3:2" />}
      <DetailsSection>
        <HeadingBlock size="subtitle" weight="medium">{typeOfCare} - {roomType}</HeadingBlock>
        <DescriptionBlock size="caption" palette="grey">{description}</DescriptionBlock>
        <DetailsTable>
          {priceToShow > 0 &&
          <Fragment>
            <Block size="caption">Price</Block>
            <Block size="caption"><NumberFormat value={priceToShow} displayType="text" thousandSeparator prefix="$" />*</Block>
          </Fragment>}
          {!!shareType &&
          <Fragment>
            <Block size="caption">Available as</Block>
            <Block size="caption">{shareType}</Block>
          </Fragment>}
          {!!bathroom &&
          <Fragment>
            <Block size="caption">Bathroom</Block>
            <Block size="caption">{bathroom}</Block>
          </Fragment>}
          {!!gender &&
          <Fragment>
            <Block size="caption">Gender</Block>
            <Block size="caption">{gender}</Block>
          </Fragment>}
          {!!accessibility &&
          <Fragment>
            <Block size="caption">Accessibility</Block>
            <Block size="caption">{accessibility}</Block>
          </Fragment>}
        </DetailsTable>
        {/* FIXME: Copied from CommunityBookATourContactForm. Make it reusable component */}
        <form onSubmit={handleSubmit}>
          <CTAHeadingBlock size="subtitle" weight="medium">Enquire about this listing</CTAHeadingBlock>
          {!(userDetails && userDetails.fullName) && <Field
            name="name"
            label="Full name"
            type="text"
            placeholder="Full name"
            component={ReduxField}
          />}
          {!(userDetails && userDetails.phone) &&
            <Field
              name="phone"
              label="Phone"
              type="text"
              placeholder="925-555-5555"
              component={ReduxField}
            />
          }
          {userDetails && userDetails.fullName &&
          <Field
            name="notes"
            label="Your Message"
            type="textarea"
            rows="5"
            placeholder=""
            component={ReduxField}
          />
          }
          {error && <Block palette="danger">{error}</Block>}
          {!user && <TosBlock size="tiny">By continuing, you agree to our <Link href="/tos" target="_blank">Terms of Service</Link> and <Link href="/privacy" target="_blank">Privacy Policy</Link></TosBlock>}
          <StyledButton type="submit" kind="jumbo" disabled={submitting}>Submit</StyledButton>
        </form>
      </DetailsSection>
    </div>
  );
};

CommunityFloorPlanPopupForm.propTypes = {
  handleSubmit: func,
  typeOfCare: string,
  floorPlanInfo: shape({
    image: string,
    roomType: string,
    description: string,
    price: number,
    priceShared: number,
    shareType: string,
    bathroom: string,
    gender: string,
    accessibility: string,
  }).isRequired,
  userDetails: object,
  user: object,
  error: string,
  submitting: bool,
};

export default CommunityFloorPlanPopupForm;