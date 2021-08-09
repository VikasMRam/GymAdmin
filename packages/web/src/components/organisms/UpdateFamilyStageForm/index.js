import React, { Component } from 'react';
import { func, string, arrayOf, bool, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { palette, size } from 'sly/common/components/themes';
import {
  FAMILY_STAGE_ORDERED,
  FAMILY_STAGE_WON,
  FAMILY_STAGE_LOST,
  FAMILY_STAGE_REJECTED,
  FAMILY_CLOSE_ORDERED,
  FAMILY_CLOSE_COMMUNITY,
  DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS,
  PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS,
  FAMILY_STAGE_FAMILY_CHOSEN,
  WAITLISTED,
  ESTIMATED_MOVE_IN,
} from 'sly/web/constants/familyDetails';
import { PLATFORM_ADMIN_ROLE, AGENT_ADMIN_ROLE } from 'sly/common/constants/roles';
import Role from 'sly/web/components/common/Role';
import pad from 'sly/web/components/helpers/pad';
import { priceFormatter, priceParser } from 'sly/web/services/helpers/pricing';
import { isBeforeNow, isAfterNow  } from 'sly/web/services/validation';
import { Block, Label } from 'sly/common/components/atoms';
import { Span } from 'sly/web/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import ThreeSectionFormTemplate from 'sly/web/components/molecules/ThreeSectionFormTemplate';
import { apiUrl } from 'sly/web/config';

const Warning = pad(styled(Block)`
  background-color: ${palette('warning.filler')};
  border-radius: ${size('spacing.small')};
  padding: ${size('spacing.large')};
`, 'xLarge');
Warning.displayName = 'Warning';

const Message = pad(styled(Block)`
  background-color: ${palette('blue.lighter-90')};
  border-radius: ${size('spacing.small')};
  padding: ${size('spacing.large')};
`, 'xLarge');
Warning.displayName = 'Warning';

const PaddedField = pad(Field, 'xLarge');
PaddedField.displayName = 'PaddedField';

const ReferralAgreementWrapper = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: ${size('spacing.large')};
  align-items: baseline;
`;

// FIXME: (new modals) hack to keep the options for closed inside the viewport, as they are overflowing
const ClosedReasonField = styled(Field)`
  .react-select__menu-list {
    max-height: 200px;
  }
`;

const communityColumn = { typeInfo: { api: `${apiUrl}/marketplace/search/community?filter[name]=` }, value: 'community.name' };
export default class UpdateFamilyStageForm extends Component {
  static propTypes = {
    handleSubmit: func,
    onCancel: func,
    name: string.isRequired,
    currentStageGroup: string,
    nextStageGroup: string,
    currentStage: string,
    nextStage: string,
    nextAllowedStages: arrayOf(string).isRequired,
    chosenDetails: string,
    lossReasons: arrayOf(string).isRequired,
    roomTypes: arrayOf(string).isRequired,
    rejectReasons: arrayOf(string),
    currentLossReason: string,
    change: func.isRequired,
    onLocationChange: func,
    isPaused: bool,
    monthlyFees: string,
    referralAgreement: string,
    referralAgreementType: string,
    currentRejectReason: string,
    canUpdateStage: bool,
    isCommunityUser: bool,
    initialValues: object,
    isQuestionnaireAlreadyFilled: bool,
    waitlisted: bool,
  };

  static defaultProps = {
    referralAgreement: '',
    monthlyFees: '',
    rejectReasons: [],
  };

  render() {
    const {
      handleSubmit, onCancel, name, currentStageGroup, nextStageGroup, currentStage, nextStage, chosenDetails, nextAllowedStages, lossReasons,
      currentLossReason, isPaused, referralAgreementType, referralAgreement, monthlyFees, roomTypes, rejectReasons, currentRejectReason,
      canUpdateStage, isCommunityUser, initialValues: { preferredLocation }, isQuestionnaireAlreadyFilled, waitlisted, ...props
    } = this.props;

    const reasonsOptions = rejectReasons.map(r => ({ value: r, label: r }));
    const NEW_FAMILY_STAGE_ORDERED = { ...FAMILY_STAGE_ORDERED };
    const options = Object.keys(NEW_FAMILY_STAGE_ORDERED).reduce((prev, sg) => {
      let stages = NEW_FAMILY_STAGE_ORDERED[sg].map(s => nextAllowedStages.indexOf(s) !== -1 && { value: s, label: s });
      stages = stages.filter(s => s);

      if (stages.length) {
        const option = {
          label: sg,
          options: stages,
        };
        prev.push(option);
      }
      return prev;
    }, []);

    let NEW_FAMILY_CLOSE_ORDERED = { ...FAMILY_CLOSE_ORDERED };
    if (isCommunityUser) {
      NEW_FAMILY_CLOSE_ORDERED = { ...FAMILY_CLOSE_COMMUNITY };
    }

    const closeOptions = Object.keys(NEW_FAMILY_CLOSE_ORDERED).reduce((prev, sg) => {
      const closeReasons = NEW_FAMILY_CLOSE_ORDERED[sg].map(s => ({ value: s, label: s }));

      const option = {
        label: sg,
        options: closeReasons,
      };
      prev.push(option);
      return prev;
    }, []);
    const roomTypeOptions = roomTypes.map(t => ({ value: t, label: t }));
    const lossReasonOptions = lossReasons.map(reason => ({ value: reason, label: reason }));
    const stageGroupChanged = nextStageGroup && currentStageGroup !== nextStageGroup;
    const shouldShowQuestionnaire =
      !isQuestionnaireAlreadyFilled &&
      ((currentStageGroup === 'New' || currentStageGroup === 'Prospects') && (nextStageGroup === 'Connected' && nextStage !== FAMILY_STAGE_FAMILY_CHOSEN));
    const stageChanged = currentStage !== nextStage;
    const StageField = stageGroupChanged ? Field : PaddedField;

    const isNext = (...stages) => stages.includes(nextStage);
    let moveInDateErrorMessage;
    let moveInDateValidator;
    if (!waitlisted) {
      moveInDateErrorMessage = 'Looks like you are choosing an expected move-in date that has already passed. Try updating to the stage "Won" and completing the move-in details';
      moveInDateValidator = isAfterNow;
    }
    let waitlistedDateErrorMessage;
    let waitlistedDateValidator;
    if (waitlisted) {
      waitlistedDateErrorMessage = 'Looks like you are choosing an estimated date that has already passed. Try updating to the stage "Won" and completing the move-in details';
      waitlistedDateValidator = isAfterNow;
    }
    if (isNext(FAMILY_STAGE_WON)) {
      moveInDateErrorMessage = 'Looks like you are choosing a move-in date that has not occurred yet. Try updating to the stage "Family Chose My Referral"';
      moveInDateValidator = isBeforeNow;
    }
    const buttonText = (stageGroupChanged && shouldShowQuestionnaire) ? 'Update and continue to questionnaire' :  'Update';

    return (
      <ThreeSectionFormTemplate
        {...props}
        hasCancel
        onCancelClick={onCancel}
        hasSubmit
        onSubmit={handleSubmit}
        heading={isNext(FAMILY_STAGE_REJECTED) ? 'Reject lead' : `Updating ${name}'s Stage`}
        submitButtonText={isNext(FAMILY_STAGE_REJECTED) ? 'Confirm' : buttonText}
      >
        <StageField
          name="stage"
          label="Stage"
          type="choice"
          component={ReduxField}
          options={options}
          disabled={!canUpdateStage}
        />
        {(stageGroupChanged && !shouldShowQuestionnaire) && (!isPaused || (isPaused && stageChanged)) &&
          <Warning size="caption">
            Updating to this stage will move this family from <strong>{currentStageGroup}</strong> to <strong>{nextStageGroup}</strong>.
          </Warning>
        }
        {(stageGroupChanged && shouldShowQuestionnaire) && (!isPaused || (isPaused && stageChanged)) &&
          <Message size="caption">
            We’re glad you were able to connect with this family! After updating this family’s stage we’ll direct you to a quick questionnaire.
          </Message>
        }
        {stageChanged && !stageGroupChanged && isPaused &&
          <Warning size="caption">
            Updating this family&apos;s stage will remove them from being <strong>Paused</strong>.
          </Warning>
        }
        {isNext(FAMILY_STAGE_WON, FAMILY_STAGE_FAMILY_CHOSEN) &&
          <Field
            name="communityName"
            label="What community is the resident moving into?"
            placeholder="Search by community name"
            type="autocomplete"
            column={communityColumn}
            required
            component={ReduxField}
          />
        }
        {(isNext(FAMILY_STAGE_WON) || (isNext(FAMILY_STAGE_FAMILY_CHOSEN) && !waitlisted)) &&
          <Field
            name="moveInDate"
            label="Move-In date"
            type="date"
            placeholder="MM/DD/YYYY"
            component={ReduxField}
            required
            dateFormat="MM/dd/yyyy"
            validate={moveInDateValidator}
            message={moveInDateErrorMessage}
          />
        }
        {((isNext(FAMILY_STAGE_FAMILY_CHOSEN) && waitlisted)) &&
          <Field
            name="waitlistedDate"
            label="Estimated month and year"
            type="date"
            placeholder="MM/DD/YYYY"
            component={ReduxField}
            required
            dateFormat="MM/dd/yyyy"
            validate={waitlistedDateValidator}
            message={waitlistedDateErrorMessage}
          />
        }
        {isNext(FAMILY_STAGE_FAMILY_CHOSEN) &&
          <>
            <Field
              name="waitlisted"
              label="Resident is waitlisted"
              type="boolean"
              component={ReduxField}
            />

          </>
        }
        {!isNext(FAMILY_STAGE_WON, FAMILY_STAGE_REJECTED, FAMILY_STAGE_LOST) &&
          <Field
            type="textarea"
            rows={3}
            name="note"
            label="Add a note"
            placeholder="Add a note on why you are updating this family's stage..."
            component={ReduxField}
          />
        }
        {isNext(FAMILY_STAGE_WON) &&
          <Field
            name="roomType"
            label="Room type"
            type="choice"
            component={ReduxField}
            options={roomTypeOptions}
          />
        }
        {isNext(FAMILY_STAGE_WON) &&
          <Field
            name="monthlyFees"
            label="Resident&apos;s monthly fees (rent + care)"
            type="iconInput"
            component={ReduxField}
            parse={priceParser}
            format={priceFormatter}
            required
          />
        }
        {isNext(FAMILY_STAGE_WON) &&
          <>
            <Label>Your community referral agreement %<Span palette="danger">*</Span></Label>
            <Field
              name="referralAgreementType"
              label="Percentage"
              type="radio"
              value="percentage"
              component={ReduxField}
            />
            <Field
              name="referralAgreementType"
              label="Flat-fee"
              type="radio"
              value="flat-fee"
              component={ReduxField}
            />
            {referralAgreementType &&
              <ReferralAgreementWrapper>
                <Field
                  name="referralAgreement"
                  type="iconInput"
                  icon={referralAgreementType === 'percentage' ? 'percentage' : 'dollar'}
                  component={ReduxField}
                  parse={priceParser}
                  format={priceFormatter}
                />
                {/* important to keep in mind that referralAgreement and monthlyFees will be available as string */}
                {referralAgreementType === 'percentage' && referralAgreement && referralAgreement.length > 0 && monthlyFees && monthlyFees.length > 0 &&
                  <Block weight="medium" size="caption" palette="green">Your referral total is ${priceFormatter(referralAgreement * 0.01 * monthlyFees)}</Block>}
              </ReferralAgreementWrapper>
            }
            <Role is={PLATFORM_ADMIN_ROLE | AGENT_ADMIN_ROLE}>
              <Field
                name="invoiceNumber"
                label="Invoice Number"
                type="text"
                placeholder="0000000"
                component={ReduxField}
              />
              <Field
                name="invoiceAmount"
                type="iconInput"
                icon="dollar"
                label="Invoice Amount"
                placeholder="0.00"
                component={ReduxField}
              />
              <Field
                name="invoicePaid"
                label="Invoice Paid?"
                type="choice"
                component={ReduxField}
                options={[
                  { value: 'yes', label: 'yes' },
                  { value: 'no', label: 'no' },
                ]}
              />
            </Role>
          </>
        }
        {isNext(FAMILY_STAGE_LOST) &&
          <ClosedReasonField
            name="lossReason"
            label="Closed reason"
            type="choice"
            component={ReduxField}
            options={closeOptions}
            required
          />
        }
        {isNext(FAMILY_STAGE_REJECTED) &&
          <Field
            name="rejectReason"
            label="Select a reason"
            type="choice"
            placeholder="Select rejection reason"
            component={ReduxField}
            options={reasonsOptions}
            required
          />
        }
        {isNext(FAMILY_STAGE_LOST, FAMILY_STAGE_REJECTED) &&
          (DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS.includes(currentRejectReason) ||
          DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS.includes(currentLossReason)) &&
          <Field
            type="textarea"
            rows={3}
            showCharacterCount
            name={FAMILY_STAGE_LOST ? 'lostDescription' : 'rejectDescription'}
            label="Description"
            placeholder="Please leave a note on the reason for closing this lead..."
            component={ReduxField}
            maxLength={200}
            required
          />
        }
        {isNext(FAMILY_STAGE_LOST) && !DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS.includes(currentLossReason) &&
          !PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS.includes(currentLossReason) &&
          <Field
            type="textarea"
            rows={3}
            showCharacterCount
            name="rejectNote"
            label="Additional Note(optional)"
            placeholder="Please leave a note on the reason for closing this lead..."
            component={ReduxField}
            maxLength={200}
          />
        }
        {((isNext(FAMILY_STAGE_LOST) && PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS.includes(currentLossReason)) ||
          (isNext(FAMILY_STAGE_REJECTED) && PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS.includes(currentRejectReason))) &&
          <Field
            name="preferredLocation"
            type="locationSearch"
            label="Family's Preferred location"
            address={preferredLocation}
            component={ReduxField}
            required
          />
        }
      </ThreeSectionFormTemplate>
    );
  }
}
