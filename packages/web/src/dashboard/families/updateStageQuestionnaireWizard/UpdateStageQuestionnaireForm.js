import React from 'react';
import { Field } from 'react-final-form';
import { func, object } from 'prop-types';

import FieldAdapter from 'sly/web/components/common/FinalForm/FieldAdapter';
import { Block } from 'sly/common/system';
import { Wizard, WizardPage, Header, Error, Condition } from 'sly/web/components/common/FinalForm/Wizard';
import {
  MEDIUM_OPTIONS,
  LOOKING_FOR_OPTIONS_SHORT,
  MOVE_TIMELINE_OPTIONS,
  TYPE_CARE_OPTIONS,
  LEAD_EXPECTATION_OPTIONS,
  LEAD_STAGE_OPTIONS,
  LEAD_QUALITY_OPTIONS,
} from 'sly/web/constants/familyDetails';


const UpdateStageQuestionnaireForm = ({ handleSubmit, initialValues, hideModal, name }) => {
  const headerTitle = `${name}'s connected questionnaire`;
  return (
    <>
      <Block padding="xLarge">
        <>
          <Wizard
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            <WizardPage
              validate={(values) => {
              const errors = {
                referralInfo: {},
              };
              if (values?.referralInfo?.leadMedium === undefined || values?.referralInfo?.leadMedium?.length < 1) {
                errors.referralInfo.leadMedium = 'Required';
              }
              return errors;
            }}
            >
              <>
                <Header
                  headerTitle={headerTitle}
                  heading="On which medium did you connect with the family?"
                  description="Choose all that apply."
                  onClose={hideModal}
                />
                <Field
                  name="referralInfo.leadMedium"
                  type="boxChoice"
                  multiChoice
                  align="left"
                  options={MEDIUM_OPTIONS}
                  component={FieldAdapter}
                />
                <Error name="referralInfo.leadMedium" />
              </>
            </WizardPage>
            <WizardPage
              validate={(values) => {
              const errors = {
                housingInfo: {},
              };
              if (values?.housingInfo?.lookingFor === undefined) {
                errors.housingInfo.lookingFor = 'Required';
              }
              if (values?.housingInfo?.lookingFor === 'Other' && values?.housingInfo?.other === undefined) {
                errors.housingInfo.other = 'Required';
              }
              return errors;
              }}
            >
              <>
                <Header
                  headerTitle={headerTitle}
                  heading="Who is the contact looking for?"
                  onClose={hideModal}
                />
                <Field
                  name="housingInfo.lookingFor"
                  type="boxChoice"
                  hasRadio
                  align="left"
                  options={LOOKING_FOR_OPTIONS_SHORT}
                  component={FieldAdapter}
                />
                <Condition
                  when="housingInfo.lookingFor"
                  is="Other"
                  // is={value => (((!LOOKING_FOR_OPTIONS.map(({ value }) => value).includes(value) && value.length > 0) || value === 'Other') || value)}
                >
                  <>
                    <label>Who is the contact looking for?</label>
                    <Field
                      name="housingInfo.other"
                      component={FieldAdapter}
                      type="text"
                      placeholder="Type your answer"
                    />
                    <Error name="housingInfo.other" />
                  </>
                </Condition>
                <Error name="housingInfo.lookingFor" />
              </>

            </WizardPage>
            <WizardPage
              validate={(values) => {
              const errors = {
                housingInfo: {},
              };
              if (values?.housingInfo?.moveTimeline === undefined) {
                errors.housingInfo.moveTimeline = 'Required';
              }
              return errors;
              }}
            >
              <>
                <Header
                  headerTitle={headerTitle}
                  heading="What is your best estimate of this families timeline?"
                  onClose={hideModal}
                />
                <Field
                  name="housingInfo.moveTimeline"
                  type="boxChoice"
                  align="left"
                  hasRadio
                  options={MOVE_TIMELINE_OPTIONS}
                  component={FieldAdapter}
                />
                <Error name="housingInfo.moveTimeline" />
              </>

            </WizardPage>
            <WizardPage
              validate={(values) => {
              const errors = {
                housingInfo: {},
              };
              if (values?.housingInfo?.typeCare === undefined || values?.housingInfo?.typeCare?.length < 1) {
                errors.housingInfo.typeCare = 'Required';
              }
              return errors;
              }}
            >
              <>
                <Header
                  headerTitle={headerTitle}
                  heading="What is the potential resident’s care level?"
                  description="Please give best estimate."
                  onClose={hideModal}
                />
                <Field
                  name="housingInfo.typeCare"
                  type="boxChoice"
                  align="left"
                  multiChoice
                  options={TYPE_CARE_OPTIONS}
                  component={FieldAdapter}
                />
                <Error name="housingInfo.typeCare" />
              </>

            </WizardPage>
            <WizardPage
              validate={(values) => {
              const errors = {
                referralInfo: {},
              };
              if (values?.referralInfo?.leadExpectation === undefined) {
                errors.referralInfo.leadExpectation = 'Required';
              }
              return errors;
              }}
            >
              <>
                <Header
                  headerTitle={headerTitle}
                  heading="What stage of the the search process is the family in?"
                  description="Please give best estimate."
                  onClose={hideModal}
                />
                <Field
                  name="referralInfo.leadExpectation"
                  type="boxChoice"
                  align="left"
                  hasRadio
                  options={LEAD_EXPECTATION_OPTIONS}
                  component={FieldAdapter}
                />
                <Error name="referralInfo.leadExpectation" />
              </>

            </WizardPage>
            <WizardPage
              validate={(values) => {
              const errors = {
                referralInfo: {},
              };
              if (values?.referralInfo?.leadStage === undefined) {
                errors.referralInfo.leadStage = 'Required';
              }
              return errors;
              }}
            >
              <>
                <Header
                  headerTitle={headerTitle}
                  heading="What stage of the the search process is the family in?"
                  description="Please give best estimate."
                  onClose={hideModal}
                />
                <Field
                  name="referralInfo.leadStage"
                  type="boxChoice"
                  align="left"
                  hasRadio
                  options={LEAD_STAGE_OPTIONS}
                  component={FieldAdapter}
                />
                <Error name="referralInfo.leadStage" />
              </>
            </WizardPage>
            <WizardPage
              validate={(values) => {
              const errors = {
                referralInfo: {},
              };
              if (values?.referralInfo?.leadQuality === undefined) {
                errors.referralInfo.leadQuality = 'Required';
              }
              return errors;
              }}
            >
              <>
                <Header
                  headerTitle={headerTitle}
                  heading="Rate the quality of this lead from the information you know now"
                  onClose={hideModal}
                />
                <Field
                  name="referralInfo.leadQuality"
                  type="boxChoice"
                  align="left"
                  hasRadio
                  options={LEAD_QUALITY_OPTIONS}
                  component={FieldAdapter}
                />
                <Error name="referralInfo.leadQuality" />
              </>
            </WizardPage>
          </Wizard>
        </>
      </Block>
    </>
  );
};

UpdateStageQuestionnaireForm.propTypes = {
  handleSubmit: func,
  initialValues: object,
  hideModal: func,
};

export default UpdateStageQuestionnaireForm;
