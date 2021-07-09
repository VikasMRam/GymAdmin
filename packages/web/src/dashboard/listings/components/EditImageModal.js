import React from 'react';
import { array, bool, func } from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Modal, { HeaderWithClose, ModalActions, ModalBody } from 'sly/web/components/atoms/NewModal';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import { createValidator, required } from 'sly/web/services/validation';
import { Button } from 'sly/web/components/atoms';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import { imagePropType } from 'sly/common/propTypes/gallery';
import { apiUrl } from 'sly/web/config';

const categoryColumn = { typeInfo: { api: `${apiUrl}/platform/image-categories?filter[name]=` }, value: 'category.name' };


const EditImageModalForm = ({ image, onClose, canEdit, handleSubmit, imageCategories, imageRef, saveImage, invalid, submitting, ...props }) => {
  let imageCategoryColumn = [];
  if (imageCategories) {
    imageCategoryColumn = imageCategories.map(({ id, name }) => name);
  }
  const categoryOptions = imageCategoryColumn.map((s, i) => <option key={i} value={s}>{s}</option>);
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
          // name="description"
          name="attributes.description"
          component={ReduxField}
        />
        <Field
          name="category.name"
          label="Category"
          type="select"
          component={ReduxField}
        >
          <>
            <option>Select an option</option>
            {categoryOptions}
          </>
        </Field>

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
  imageCategories: array,
};

const validate = createValidator({
  description: [required],
});

const ReduxForm = reduxForm({
  form: 'EditImageForm',
  validate,
})(EditImageModalForm);

export default function EditImageModal({ image, saveImage, imageCategories, onClose, ...props }) {
  const imageRef = React.useRef();


  let initialImageCategory;

  if (image && imageCategories) {
    imageRef.current = image;
    const { relationships } = imageRef.current;
    const { category } = relationships;
    if (category.data !== null) {
      initialImageCategory = imageCategories.find(({ id }) => id === category.data.id);
    }
  }


  if (initialImageCategory && imageRef.current !== null) {
    imageRef.current.category = initialImageCategory;
  }

  const handleSubmit = (data) => {
    const { attributes, category } = data;
    let { relationships } = data;

    if (category) {
      const { name: catName } = category;
      const catId = imageCategories.find(({ name }) => name === catName);
      const jsonapiCategory = {
        type: 'ImageCategory',
        id: catId.id,
        attributes: {
          name: catName,
        },
      };
      relationships = {
        ...relationships,
        category: { data: jsonapiCategory },
      };
    }

    const newImage = {
      ...image,
      attributes: {
        ...image.attributes,
        description: attributes.description,
      },
      relationships,
    };

    return saveImage(newImage, image).then(onClose);
  };
  return (
    <ReduxForm
      as="form"
      onSubmit={handleSubmit}
      imageCategories={imageCategories}
      imageRef={imageRef.current}
      image={image}
      initialValues={imageRef.current}
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
