# Forms

We use [react-redux](https://github.com/redux-form/redux-form) for now but we whould explore moving to, for example [react-final-form](https://github.com/final-form/react-final-form) or [formik](https://github.com/jaredpalmer/formik)

## Dashboard forms

The idea is that when the user fills a form, a jsonapi representation of the data can be submitted to the api, this is achieved passing a json structure to the form that complies with the schema of that particular model, in the case of an update of a community (PATCH) like this: 

```javascript
const initialValues = pick(
  status.community.result.attributes,
  [
    'name',
    'propInfo.communityPhone',
    'propInfo.ownerName',
    'propInfo.ownerEmail',
    'propInfo.typeCare',
    'propInfo.respiteAllowed',
  ],
);


const form = (
  <ReduxForm
    onSubmit={this.handleSubmit}
    initialValues={initialValues}
    {...props}
  />
);
```

Then the fields can be named just like this:

```javascript
<Field
  name="propInfo.communityPhone"
  label="Front desk phone number"
  ...
/>
```

And in `handleSumbit` we can just:

```javascript
handleSumbit = (values) => {
  const { status, updateCommunity } = this.props; 
  const { id, type } = status.community.result;
  return updateCommunity({ id }, {
    id,
    type,
    attributes: values, 
  })
}
```

### Example of how we should _not_ do it

As our current implementation of client forms:

```javascript
const { info, status } = agent;
const { bio, parentCompany, displayName, cv, imageCaption, chosenReview, serviceArea } = info;
const { adminRegion, vacationStart, vacationEnd, adminNotes, slyScore } = info;
const initialValues = { bio, parentCompany, displayName, cv, imageCaption, chosenReview, vacation, adminRegion, zipcodesServed, status, adminNotes, slyScore };
...
```

And in `handleSubmit`:

```javascript
let agent = immutable.wrap(pick(rawAgent, ['id', 'type', 'attributes.status', 'attributes.info', 'attributes.info.serviceArea']))
  .set('attributes.info.bio', values.bio)
  .set('attributes.info.parentCompany', values.parentCompany)
  .set('attributes.info.displayName', values.displayName)
  .set('attributes.info.cv', values.cv)
  .set('attributes.info.imageCaption', values.imageCaption)
  .set('attributes.info.chosenReview', values.chosenReview)
  .set('attributes.info.adminRegion', values.adminRegion)
  .set('attributes.info.serviceArea.zipcodesServed', values.zipcodesServed)
  .set('attributes.status', parseInt(values.status, 10))
  .set('attributes.info.adminNotes', values.adminNotes)
  .set('attributes.info.slyScore', parseFloat(values.slyScore));
```

## What to do when the field does not conform with our datatype

### GETting and POSTting data to/from the form

If we pass down data coming to the database and the field does not display it properly, we have to fix the Field

For example I just fixed `<Select />` so when we are passing a type of care value array, it prints the values properly, so passing ['Assisted Living'] will select the right of the options passed, so the data mapping should be done in each field:

```javascript
// inside Select atom render function
// the passed value is an array of strings, Select accepts an array of 
// objects with { value, label } attributes
if (props.isMulti) {
  value = flattenedOptions.filter(o => value.includes(o.value));
} else {
  value = flattenedOptions.find((o => value === o.value));
}
```

Same thing should be done with onChange if necessary

## How to check that the form is keeping api-ready data

Just inspect the redux store's form object and check whether or not is a ready-to-go object for your model's attributes

```json
{
  "DashboardCommunityDetailsForm": {
    "values": {
      "name": "BEACH HOMES II",
      "propInfo": {
        "communityPhone": "(714) 856-4546",
        ...
      }
    }
  }
}
```

