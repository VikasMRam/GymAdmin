import React from 'react';
import styled from 'styled-components';
import { func, shape, string, number, object, bool } from 'prop-types';
import NumberFormat from 'react-number-format';
import { Field } from 'redux-form';

import { size } from 'sly/components/themes';
import { Heading, Block, Button, Image, Hr } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';


const DetailsSection = styled.div`
  padding: ${size('spacing.xLarge')};
`;

const HeadingBlock = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;

const DetailsTable = styled.div`
  display: grid;
  grid-template-columns: ${size('layout.col2')} 1fr;
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

const CommunityFloorPlanPopupForm = ({
  handleSubmit, typeOfCare, floorPlanInfo, userDetails, error, submitting,
}) => {
  const {
    roomType, price, shareType, image, priceShared,
  } = floorPlanInfo;
  let priceToShow = price;
  if (shareType === 'Shared') {
    priceToShow = priceShared;
  }

  return (
    <div>
      {image && <StyledImage src={image} aspectRatio="16:9" />}
      <DetailsSection>
        <HeadingBlock size="subtitle" weight="medium">Inquire about {typeOfCare} - {roomType}</HeadingBlock>
        <DetailsTable>
          {priceToShow > 0 &&
          <>
            <Block size="caption">Pricing starts at</Block>
            <Block size="caption"><NumberFormat value={priceToShow} displayType="text" thousandSeparator prefix="$" /></Block>
          </>}
          {!!shareType &&
          <>
            <Block size="caption">Room type</Block>
            <Block size="caption">{shareType}</Block>
          </>}
        </DetailsTable>
        <Hr />
        {/* FIXME: Copied from CommunityBookATourContactForm. Make it reusable component */}
        <form onSubmit={handleSubmit}>
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
          <StyledButton type="submit" kind="jumbo" disabled={submitting}>Submit</StyledButton>
          <TosAndPrivacy />

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
