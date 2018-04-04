import { reduxForm } from 'redux-form';
import AdvancedInfoForm from 'sly/components/organisms/AdvancedInfoForm';

export default reduxForm({ 
  form: 'advancedInfo',
  initialValues: {
    type_of_care: [],
    type_of_room: [],
    time_to_move: [],
    budget: 5.5,
  },
})(AdvancedInfoForm);

