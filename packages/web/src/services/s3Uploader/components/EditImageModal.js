import React from 'react';
import { bool, func } from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Modal, { HeaderWithClose, ModalActions, ModalBody } from 'sly/web/components/atoms/NewModal';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import { createValidator, required } from 'sly/web/services/validation';
import { Button } from 'sly/web/components/atoms';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import { imagePropType } from 'sly/common/propTypes/gallery';

const EditImageModalForm = ({ image, onClose, canEdit, handleSubmit, saveImage, invalid, submitting, ...props }) => {
  const imgPath = image?.attributes?.path;
  return (
    <Modal isOpen={!!image} {...props} onSubmit={handleSubmit}>
      <HeaderWithClose icon="edit" onClose={onClose}>Add a caption</HeaderWithClose>

      {imgPath && (
        <ResponsiveImage
          aspectRatio="4:3"
          path={imgPath}
        />
      )}

      <ModalBody>
        <Field
          label="Caption"
          placeholder="Write a caption that explains what families are seeing in this photo. "
          type="textarea"
          name="description"
          component={ReduxField}
        />
      </ModalBody>
      <ModalActions>
        <Button ghost onClick={onClose}>
          Cancel
        </Button>

        <Button type="submit" disabled={!canEdit || invalid || submitting}>
          Save changes
        </Button>
      </ModalActions>
    </Modal>
  );
};

EditImageModalForm.propTypes = {
  image: imagePropType,
  canEdit: bool,
  invalid: bool,
  submitting: bool,
  onClose: func,
  handleSubmit: func,
  saveImage: func,
};

const validate = createValidator({
  description: [required],
});

const ReduxForm = reduxForm({
  form: 'EditImageForm',
  validate,
})(EditImageModalForm);

export default function EditImageModal({ image, saveImage, onClose, ...props }) {
  const handleSubmit = (data) => {
    const newImage = {
      ...image,
      attributes: {
        ...image.attributes,
        description: data.description,
      },
    };
    return saveImage(newImage, image).then(onClose);
  };
  return (
    <ReduxForm
      as="form"
      onSubmit={handleSubmit}
      image={image}
      initialValues={image?.attributes}
      onClose={onClose}
      {...props}
    />
  );
}

EditImageModal.propTypes = {
  image: imagePropType,
  saveImage: func,
  onClose: func,
};

