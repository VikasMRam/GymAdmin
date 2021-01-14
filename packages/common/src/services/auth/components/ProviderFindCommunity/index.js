import React from 'react';
import { func, bool, string } from 'prop-types';

import { community as communityPropType } from 'sly/common/propTypes/community';
import { Button, Block, Form } from 'sly/common/components/atoms';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';
import Field from 'sly/common/components/molecules/Field';

const ProviderFindCommunity = ({
  handleSubmit, submitting, invalid, error, onNotFound, onSelectChange, community,
}) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="community"
      label="Community Name"
      type="community"
      placeholder="Enter Community Name"
      value={community}
      onChange={option => onSelectChange(option)}
    />
    <Button
      type="submit"
      pad={error ? 'large' : 'xLarge'}
      disabled={submitting || invalid}
      width="100%"
    >
      Continue
    </Button>
    {error && <Block pad="xLarge" palette="danger" size="caption">{error}</Block>}
    <ButtonLink display="flex" align="center" size="caption" palette="primary" onClick={onNotFound}>
      Can&apos;t find my community?
    </ButtonLink>
  </Form>
);

ProviderFindCommunity.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  error: string,
  onNotFound: func,
  onSelectChange: func,
  community: communityPropType,
};

export default ProviderFindCommunity;
