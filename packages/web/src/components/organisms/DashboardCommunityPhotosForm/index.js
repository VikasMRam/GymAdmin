import React, { Component } from 'react';
import { func, bool, object, arrayOf } from 'prop-types';
import styled from 'styled-components';
import { sortableContainer } from 'react-sortable-hoc';

import { size } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { Button } from 'sly/web/components/atoms';
import FormSection from 'sly/web/components/molecules/FormSection';
import { imagePropType } from 'sly/web/propTypes/gallery';
import MediaItem from 'sly/web/services/s3Uploader/components/MediaItem';
import IconButton from 'sly/web/components/molecules/IconButton';

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

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  margin: -${size('spacing.large')} 0;
`;

const HeadingText = styled.div`
  padding-top: ${size('spacing.regular')};
`;

const FormScrollSection = styled.div`
  // max-height: calc(100vh - 240px);
`;

export default class DashboardCommunityPhotosForm extends Component {
  static propTypes = {
    currentValues: object,
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    handleSubmit: func.isRequired,
    addImage: func.isRequired,
    saveImage: func.isRequired,
    deleteImage: func.isRequired,
    onSortEnd: func.isRequired,
    images: arrayOf(imagePropType),
  };

  render() {
    const {
      addImage, onSortEnd, saveImage, deleteImage, invalid, submitting, images, canEdit, currentValues,
    } = this.props;

    const heading = (
      <Heading>
        <HeadingText>Images</HeadingText>
        <IconButton icon="add" onClick={addImage} hideTextInMobile>
          Add Image
        </IconButton>
      </Heading>
    );

    return (
      <div>
        <FormScrollSection>
          <FormSectionSortable heading={heading} useDragHandle onSortEnd={onSortEnd}>
            {images && images.map((image, i) => (
              <MediaItem
                sortable
                key={`item-${image.attributes?.path || genKey(image)}`}
                saveImage={saveImage}
                deleteImage={deleteImage}
                image={image}
                index={i}
              />
            ))}
          </FormSectionSortable>
        </FormScrollSection>
      </div>
    );
  }
}

