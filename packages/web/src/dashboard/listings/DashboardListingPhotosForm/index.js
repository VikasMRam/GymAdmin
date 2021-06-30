import React, { useState } from 'react';
import { func, bool, object, arrayOf } from 'prop-types';
import { sortableContainer } from 'react-sortable-hoc';

import { imagePropType } from 'sly/common/propTypes/gallery';
import MediaItem from 'sly/web/services/s3Uploader/components/MediaItem';
import IconButton from 'sly/common/components/molecules/IconButton';
import S3Uploader from 'sly/web/services/s3Uploader/components/S3Uploader';
import EditImageModal from 'sly/web/dashboard/listings/components/EditImageModal';
import Block from 'sly/web/components/atoms/Block';
import { Section, SectionHeader } from 'sly/web/dashboard/DashboardWithSummaryTemplate';

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

const SectionSortable = sortableContainer(({
  images,
  editImage,
  deleteImage,
  canEdit,
}) => (
  <Block padding="xLarge">
    {images && images.map((image, i) => (
      <MediaItem
        key={`item-${image.attributes?.path || genKey(image)}`}
        editImage={editImage}
        deleteImage={deleteImage}
        image={image}
        index={i}
        disabled={!canEdit}
      />
    ))}
  </Block>
));

const DashboardListingPhotosForm = ({ onUpload, onUploadError, onSortEnd, saveImage, deleteImage, canEdit, images, imageCategories }) => {
  const [editingImage, setEditingImage] = useState(null);

  const editImage = image => setEditingImage(image);

  const stopEditing = () => setEditingImage(null);

  const actions = canEdit && (
    <S3Uploader
      onFinish={onUpload}
      onError={onUploadError}
    >
      <IconButton icon="add" hideTextInMobile>
        Add Image
      </IconButton>
    </S3Uploader>
  );


  return (
    <>
      <EditImageModal
        image={editingImage}
        saveImage={saveImage}
        canEdit={canEdit}
        onClose={stopEditing}
        imageCategories={imageCategories}

      />
      <Section>
        <SectionHeader actions={actions}>
          Images
        </SectionHeader>
        <SectionSortable
          useDragHandle
          onSortEnd={onSortEnd}
          images={images}
          editImage={editImage}
          deleteImage={deleteImage}
          canEdit={canEdit}
        />
      </Section>
    </>
  );
};

DashboardListingPhotosForm.propTypes = {
  invalid: bool,
  canEdit: bool,
  submitting: bool,
  onUpload: func.isRequired,
  onUploadError: func.isRequired,
  saveImage: func.isRequired,
  deleteImage: func.isRequired,
  onSortEnd: func.isRequired,
  images: arrayOf(imagePropType),
};

export default DashboardListingPhotosForm;

