import React from 'react';

import Modal, { HeaderWithClose, ModalActions, ModalBody } from 'sly/web/components/atoms/NewModal';
import { Field, reduxForm } from 'redux-form';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import { createValidator, dependentRequired, email, required, usPhone } from 'sly/web/services/validation';
import { Button } from 'sly/web/components/atoms';
import { SectionActions } from 'sly/web/components/templates/DashboardWithSummaryTemplate';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';

const EditImageModalForm = ({ image, onClose, canEdit, handleSubmit, saveImage, invalid, submitting, ...props }) => {
  const imgPath = image?.attributes?.path;
  return (
    <Modal isOpen={!!image} {...props} onSubmit={handleSubmit}>
      <HeaderWithClose onClose={onClose}>Add a caption</HeaderWithClose>

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

const formName = 'EditImageForm';
const validate = createValidator({
  description: [required],
});

const ReduxForm = reduxForm({
  form: formName,
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

