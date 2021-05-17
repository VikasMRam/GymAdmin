import loadable from '@loadable/component';


import { Button } from 'sly/common/components/atoms';
import { Input } from 'sly/web/components/atoms';
// leave as it is: cyclic dependency
import MultipleChoice from 'sly/web/components/molecules/MultipleChoice';
import CommunityChoice from 'sly/web/components/molecules/CommunityChoice';
import RatingInput from 'sly/web/components/molecules/RatingInput';
import Slider from 'sly/web/components/molecules/Slider';
import DateChoice from 'sly/web/components/molecules/DateChoice';
import DateRange from 'sly/web/components/molecules/DateRange';
import BoxChoice from 'sly/web/components/molecules/BoxChoice';
import PhoneInput from 'sly/web/components/molecules/PhoneInput';
import IconInput from 'sly/web/components/molecules/IconInput';
import Toggle from 'sly/web/components/molecules/Toggle';
import UserAutoComplete from 'sly/web/components/molecules/UserAutoComplete';
import OrganizationAutoComplete from 'sly/web/components/molecules/OrganizationAutoComplete';
import NumberInput from 'sly/web/components/molecules/NumberInput';
import Autocomplete from 'sly/web/components/molecules/Autocomplete';
import CheckboxInput from 'sly/web/components/molecules/CheckboxInput';
import CommunityAutoComplete from 'sly/web/components/molecules/CommunityAutoComplete';
import LocationSearch from 'sly/web/components/molecules/LocationSearch';
import RichTextArea from 'sly/web/components/atoms/RichTextArea';

const DatePicker = loadable(() => import(/* webpackChunkName: "chunkDatePicker" */'sly/web/components/molecules/DatePicker'));
const Select = loadable(() => import(/* webpackChunkName: "chunkAtomSelect" */'sly/web/components/atoms/Select'));

const getInputComponent = (type) => {
  switch (type) {
    case 'rating':
      return RatingInput;
    case 'singlechoice':
    case 'multiplechoice':
    case 'buttonlist':
      return MultipleChoice;
    case 'communitychoice':
      return CommunityChoice;
    case 'slider':
      return Slider;
    case 'boxChoice':
      return BoxChoice;
    case 'dateChoice':
      return DateChoice;
    case 'iconInput':
      return IconInput;
    case 'daterange':
      return DateRange;
    case 'date':
      return DatePicker;
    case 'select':
      return Input;
    case 'phone':
      return PhoneInput;
    case 'choice':
      return Select;
    case 'autocomplete':
      return Autocomplete;
    case 'community':
      return CommunityAutoComplete;
    case 'user':
      return UserAutoComplete;
    case 'organization':
      return OrganizationAutoComplete;
    case 'checkbox':
    case 'boolean':
      return CheckboxInput;
    case 'locationSearch':
      return LocationSearch;
    case 'richtextarea':
      return RichTextArea;
    case 'button':
      return Button;
    case 'number':
      return NumberInput;
    case 'toggle':
      return Toggle;
    default:
      return Input;
  }
};

export default getInputComponent;
