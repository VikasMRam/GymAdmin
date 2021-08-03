import React, { Component } from 'react';
import { array, func, string, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router';

import { ModalActions } from 'sly/web/components/atoms/NewModal';
import { query, prefetch } from 'sly/web/services/api';
import withUser from 'sly/web/services/api/withUser';
import { createValidator, required } from 'sly/web/services/validation';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import { Button } from 'sly/web/components/atoms';
import { Close } from 'sly/common/icons';
import { Flex, Heading, space, Hr, sx } from 'sly/common/system';

const createOption = (label, id) => ({
  label,
  value: id,
});

const validate = createValidator({
  category: [required],
});


const SelectTagCategoryForm = ({ categories, onClose, handleSubmit, invalid, submitting  }) => {
  let categoryColumn = [];
  if (categories) {
    categoryColumn = categories.map(({ id, title }) => {
      return {
        id,
        title,
      };
    });
  }
  const categoryOptions = categoryColumn.map(({ id, title }) => <option key={id} value={id}>{title}</option>);
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="id"
        label="Category"
        type="select"
        component={ReduxField}
      >
        <>
          <option>Select an option</option>
          {categoryOptions}
        </>
      </Field>
      <ModalActions>
        <Button ghost onClick={onClose}>
          Cancel
        </Button>

        <Button type="submit" disabled={submitting || invalid}>
          Save changes
        </Button>
      </ModalActions>
    </form>
  );
};

SelectTagCategoryForm.propTypes = {
  categories: array,
  onClose: func,
  handleSubmit: func,
  invalid: bool,
  submitting: bool,
};

const ReduxForm = reduxForm({
  form: 'CreateTagForm',
  validate,
})(SelectTagCategoryForm);


@query('createTag', 'createTag')
@withUser
@withRouter
@prefetch('tagCategories', 'getTagCategories', req => req({
  'filter[category]': 'Client',
}))
class DashboardSelectTagCategoryContainer extends Component {
  state = { submitting: true };
  handleOnSubmit = (data) => {
    const { value, handleModalClose, createTag, initialOptions, setOptions } = this.props;
    const { id } = data;

    let relationships;
    if (id) {
      const jsonapiCategory = {
        type: 'TagCategory',
        id,
      };
      relationships = {
        category: { data: jsonapiCategory },
      };
    }


    const tag = {
      type: 'Tag',
      attributes: {
        name: value,
      },
      relationships,

    };

    return createTag(tag)
      .then((res) => {
        const label = res.body.data.attributes.name;
        const id = res.body.data.id;
        const newOption = createOption(label, id);
        setOptions([...initialOptions, newOption]);
      })
      .then(handleModalClose);
  };
  render() {
    const { value, handleModalClose, tagCategories, ...props } = this.props;

    return (
      <>
        <Flex pad="l">
          <Heading font="title-m">Choose a category for &quot;{value}&quot;</Heading>
          <Close onClick={handleModalClose} ml="auto" />
        </Flex>
        <Hr  pad="l" marginX={sx`-${space('l')}`} />
        <ReduxForm
          as="form"
          onSubmit={this.handleOnSubmit}
          categories={tagCategories}
          onClose={handleModalClose}
          submitting={this.state.submitting}
          {...props}
        />
      </>
    );
  }
}

DashboardSelectTagCategoryContainer.propTypes = {
  handleModalClose: func,
  value: string,
  tagCategories: array,
  createTag: func,
  initialOptions: array,
  setOptions: func,
};

export default DashboardSelectTagCategoryContainer;
