import React, { Component } from 'react';
import { func, bool, object, string, number, array } from 'prop-types';
import styled from 'styled-components';
import { Prompt } from 'react-router';

import { Button } from 'sly/web/components/atoms';
import EditField from 'sly/web/components/form/EditField';
import { Section, SectionActions, SectionHeader } from 'sly/web/dashboard/DashboardWithSummaryTemplate';
import { space, color, Block, Grid, Span, sx$tablet } from 'sly/common/system/index';
import CollapsibleSection, { MainSection } from 'sly/web/components/molecules/CollapsibleSection';
import { size } from 'sly/common/components/themes';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import DashboardCommunityCTAPricingBox from 'sly/web/components/organisms/DashboardCommunityCTAPricingBox';
import {  costSectionOptions, costTypeOptions, memoryCareCostTypeOptions } from 'sly/web/constants/communityPricing';


const StyledCollapsibleSection = styled(CollapsibleSection)`
  border-radius:${space('xxs')};
  margin-bottom:${space('m')};
  background:${color('slate.lighter-95')};
  &:first-child {
    border-top-left-radius: ${size('border.xxLarge')};
    border-top-right-radius: ${size('border.xxLarge')};
  }

  &:last-child {
    border-bottom-width: ${size('border.regular')};
    border-bottom-left-radius: ${size('border.xxLarge')};
    border-bottom-right-radius: ${size('border.xxLarge')};
  }
  ${sx$tablet({
    marginBottom: 'l',
  })}
`;


StyledCollapsibleSection.defaultProps = {
  headingFont: 'title-s',
};


export default class DashboardCommunityPricingForm extends Component {
  static propTypes = {
    currentValues: object,
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    handleSubmit: func.isRequired,
    hasNewPricing: bool,
    eligibleForNewPricing: bool,
    newPricingOnWaitlist: bool,
    onUpdatePricingClick: func,
    careTypes: array,
    onJoinWaitListClick: func,
    shouldBlockNavigation: bool,
  };

  // TO DO: Add changes not saved logic
  componentDidUpdate() {
    const { shouldBlockNavigation } = this.props;
    if (shouldBlockNavigation) { window.addEventListener('beforeunload', this.beforeunload.bind(this)); }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload.bind(this));
  }

  beforeunload(e) {
    const { shouldBlockNavigation } = this.props;
    if (shouldBlockNavigation) {
      e.preventDefault();
      e.returnValue = true;
    }
  }

  render() {
    const {
      handleSubmit,  submitting, canEdit, currentValues, careTypes, hasNewPricing,
      eligibleForNewPricing,
      newPricingOnWaitlist,
      onUpdatePricingClick,
      onJoinWaitListClick,
      shouldBlockNavigation,
    } = this.props;


    return (
      <Section
        paddingX="0"
        sx$tablet={{
          paddingX: 'l',
        }}
        as="form"
        onSubmit={handleSubmit}
      >
        <Prompt
          when={shouldBlockNavigation}
          message="You have unsaved changes, are you sure you want to leave?"
        />
        {!hasNewPricing && eligibleForNewPricing &&
        <DashboardCommunityCTAPricingBox buttonProps={{ onClick: onUpdatePricingClick }} />}

        {!eligibleForNewPricing && !newPricingOnWaitlist &&
        <DashboardCommunityCTAPricingBox
          ctaText="Custom pricing is not yet available for all community types.
      Please join the waitlist to be emailed when pricing becomes available"
          buttonText="Join waitlist"
          buttonProps={{ onClick: onJoinWaitListClick }}
        />
    }

        {!eligibleForNewPricing && newPricingOnWaitlist &&
        <DashboardCommunityCTAPricingBox
          ctaText="You’re on the waitlist!
        We’ll let you know when customized pricing is available."
          buttonText="Join waitlist"
          color="slate"
          textAlign="center"
          buttonProps={{ display: 'none' }}
          background="slate.lighter-95"
          showButton={false}
        />}


        {hasNewPricing &&
        <>
          <SectionHeader>Pricing</SectionHeader>
          {careTypes.map((section, index) => (
            <StyledCollapsibleSection key={section} title={section} headingWeight="regular">
              <MainSection paddingTop="m !important" paddingX="m !important" sx$tablet={{ paddingTop: '0 !important', paddingX: 'l !important' }} css={{ background: 'white' }} >
                <Grid
                  display="none"
                  sx$tablet={{
                    display: 'grid',
                  }}
                  paddingTop="l"
                  gridTemplateColumns="11rem 1fr"
                  gridGap="l"
                  color="slate.lighter-40"
                  marginBottom="s"
                >
                  <Block>
                    {costSectionOptions[section].costHeading}
                  </Block>
                  <Block>
                    Monthly Pricing
                  </Block>
                </Grid>
                {costSectionOptions[section].costTypes.map((roomType) => {
                  return (
                    <DashboardCommunityPricingRow
                    // prices.data.[0].attributes.info.prices.studio.type
                      key={`${section}${roomType.value}`}
                      index={index}
                      to={currentValues?.prices?.[index]?.attributes?.info?.prices?.[roomType.value]?.to}
                      from={currentValues?.prices?.[index]?.attributes?.info?.prices?.[roomType.value]?.from}
                      range={currentValues?.prices?.[index]?.attributes?.info?.prices?.[roomType.value]?.type === 'range'}
                      disabled={currentValues?.prices?.[index]?.attributes?.info?.prices?.[roomType.value]?.type === 'disabled'}
                      section={section}
                      roomType={roomType}
                      canEdit={canEdit}
                    />
                );
                })}
              </MainSection>
            </StyledCollapsibleSection>
            ))}
          <SectionActions>
            <Button type="submit" disabled={!canEdit ||  submitting}>
              Save changes
            </Button>
          </SectionActions>
        </>}
      </Section>

    );
  }
}


const DashboardCommunityPricingRow = ({ section, roomType, range, disabled, to, from, index, canEdit }) => {
  return (
    <Grid
      alignItems="center"
      gridTemplateColumns="1fr"
      sx$tablet={{ gridTemplateColumns: '11rem 1fr', gridGap: 'l' }}
    >
      <Span
        as="span"
        width="75%"
        sx={{
          '&:first-child': {
          width: '50px !important',
          },
        }}
      >
        <EditField
          label={roomType.label}
          name={`prices.${index}.attributes.info.prices.${roomType.value}.type`}
          enabledValue={from && !to ? 'from' : 'range'}
          type="toggle"
          component={ReduxField}
          readOnly={!canEdit}
        />
      </Span>
      <Grid
        gridTemplateColumns={range ? '1fr 1fr 1fr' : '8.75rem 1fr'}
        sx$tablet={{
          gridTemplateColumns: range ? '8.75rem 1fr 1fr' : '8.75rem 1fr',
        }}
      >
        <EditField
          disabled={disabled}
          name={`prices.${index}.attributes.info.prices.${roomType.value}.type`}
          type="choice"
          options={section === 'Memory Care' ? memoryCareCostTypeOptions : costTypeOptions}
          component={ReduxField}
          readOnly={!canEdit}
          theme={{ borderRadius: '4px 0 0 4px' }}
        />
        <EditField
          disabled={disabled}
          name={`prices.${index}.attributes.info.prices.${roomType.value}.from`}
          type="number"
          component={ReduxField}
          readOnly={!canEdit}
          dollars={!disabled}
          showIcon={false}
          noLeftMarginStyledInputMessage
          snap={range ? 'horizontalWithBorder' : 'leftWithBorder'}
        />
        {range && <EditField
          disabled={disabled}
          dollars={!disabled}
          name={`prices.${index}.attributes.info.prices.${roomType.value}.to`}
          type="number"
          showIcon={false}
          component={ReduxField}
          readOnly={!canEdit}
          noLeftMarginStyledInputMessage
          snap="left"
        />}
      </Grid>
    </Grid>
  );
};

DashboardCommunityPricingRow.propTypes = {
  roomType: object.isRequired,
  section: string.isRequired,
  range: bool,
  disabled: bool,
  to: number,
  from: number,
  index: number,
  canEdit: bool,
};

