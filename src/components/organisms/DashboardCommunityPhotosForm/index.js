import React, { Component } from 'react';
import { func, bool, object, arrayOf } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';

import { size, palette, columnWidth } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { Block, Button } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import FormSection from 'sly/components/molecules/FormSection';
import { imagePropType } from 'sly/propTypes/gallery';
import MediaItem from 'sly/services/s3Uploader/components/MediaItem';

const genKey = ((cache = {}) => (image) => {
  // check if our key exists
  const keys = Object.keys(cache);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (cache[key] === image) {
      return key;
    }
  }
  // otherwise generate one and pair it with the image
  // eslint-disable-next-line no-bitwise
  const key = (Math.random() * 0xFFFFFF << 0).toString(16);
  cache[key] = image;
  return key;
})();

const FormSectionSortable = sortableContainer(FormSection);

const StyledButton = pad(Button, 'regular');

const FormScrollSection = styled.div`
  // max-height: calc(100vh - 240px);
`;

const FormBottomSection = styled.div`
  margin-top: ${size('spacing.xLarge')};
`;

export default class DashboardCommunityPhotosForm extends Component {
  static propTypes = {
    currentValues: object,
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    handleSubmit: func.isRequired,
    onSortEnd: func.isRequired,
    images: arrayOf(imagePropType),
  };

  render() {
    const {
      handleSubmit, onSortEnd, invalid, submitting, images, canEdit, currentValues,
    } = this.props;

    return (
      <div>
        <FormScrollSection>
          <FormSectionSortable heading="Base Costs" useDragHandle onSortEnd={onSortEnd} onSubmit={handleSubmit}>
            {images && images.map((image, i) => (
              <MediaItem
                sortable
                key={`item-${image.attributes?.path || genKey(image)}`}
                image={image}
                index={i}
              />
            ))}
          </FormSectionSortable>
        </FormScrollSection>

        {canEdit &&
          <FormBottomSection>
            <StyledButton type="submit" disabled={invalid || submitting}>
              Save changes
            </StyledButton>
          </FormBottomSection>
        }
      </div>
    );
  }
}

