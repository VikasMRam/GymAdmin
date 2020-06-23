import React, { Component } from 'react';
import { func, bool, object, arrayOf } from 'prop-types';
import { sortableContainer } from 'react-sortable-hoc';

import { imagePropType } from 'sly/web/propTypes/gallery';
import MediaItem from 'sly/web/services/s3Uploader/components/MediaItem';
import IconButton from 'sly/web/components/molecules/IconButton';
import HelpBubble from 'sly/web/components/form/HelpBubble';
import { Section, SectionHeader, SectionSortable } from 'sly/web/components/templates/DashboardWithSummaryTemplate';
import S3Uploader from 'sly/web/services/s3Uploader/components/S3Uploader';
import NewModal from 'sly/web/components/atoms/NewModal';
import EditImageModal from 'sly/web/services/s3Uploader/components/EditImageModal';

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

export default class DashboardCommunityPhotosForm extends Component {
  static propTypes = {
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    onUpload: func.isRequired,
    onUploadError: func.isRequired,
    saveImage: func.isRequired,
    deleteImage: func.isRequired,
    onSortEnd: func.isRequired,
    images: arrayOf(imagePropType),
    changes: object,
  };

  state = {
    editingImage: null,
  };

  editImage = (image) => {
    this.setState({
      editingImage: image,
    });
  };

  stopEditing = () => {
    this.setState({
      editingImage: null,
    });
  }

  render() {
    const {
      onUpload, onUploadError, onSortEnd, saveImage, deleteImage, canEdit, images, changes,
    } = this.props;


    const actions = canEdit && (
      <S3Uploader
        uploadRequestHeaders={{}}
        onFinish={onUpload}
        onError={onUploadError}
      >
        <IconButton icon="add" hideTextInMobile>
          Add Image
        </IconButton>
      </S3Uploader>
    );

    const deletedMessage = changes.deleted.length === 0
      ? undefined
      : changes.deleted
        .map(image => <>{image.id}{image.attributes.path}<br /></>);

    const isNew = image => (changes?.newImages || []).includes(image);

    return (
      <>
        <EditImageModal
          image={this.state.editingImage}
          saveImage={saveImage}
          canEdit={canEdit}
          onClose={this.stopEditing}
        />
        <Section>
          {deletedMessage && (
            <HelpBubble
              trigger="This images were deleted"
            >
              {deletedMessage}
            </HelpBubble>
          )}
          <SectionHeader actions={actions}>
            Images
          </SectionHeader>
          <SectionSortable useDragHandle onSortEnd={onSortEnd}>
            {images && images.map((image, i) => (
              <MediaItem
                key={`item-${image.attributes?.path || genKey(image)}`}
                editImage={this.editImage}
                deleteImage={deleteImage}
                image={image}
                index={i}
                isNew={isNew(image)}
                disabled={!canEdit}
              />
            ))}
          </SectionSortable>
        </Section>
      </>
    );
  }
}

