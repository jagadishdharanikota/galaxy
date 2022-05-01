import Autocomplete from './components/controls/Autocomplete';
import AdvAutocomplete from './components/controls/AdvAutocomplete';
import Button from './components/controls/Button';
import Checkbox from './components/controls/Checkbox';
import Dropdown from './components/controls/Dropdown';
import Label from './components/controls/Label';
import Image from './components/controls/Image';
import Input from './components/controls/Input';
import RadioButton from './components/controls/RadioButton';
import TextArea from './components/controls/TextArea';
import TreeNavigation from './components/controls/TreeNavigation';

import View from './components/containers/View';
import ViewDesignerWithActions from './components/custom/ViewDesigner';
// import ViewDesigner from './components/custom/ViewDesigner/index_useReducer';
import PageDesignerWithActions from './components/custom/PageDesigner';
import DataModelDesigner from './components/custom/DataModelDesigner';

const componentsMap = {
  Autocomplete: {
    component: Autocomplete,
    path: '',
    designerView: 'AutocompleteConfiguration',
  },
  AdvAutocomplete: {
    component: AdvAutocomplete,
    path: '',
    designerView: '',
  },
  Button: {
    component: Button,
    path: '',
    designerView: '',
  },
  Checkbox: {
    component: Checkbox,
    path: '',
    designerView: 'CheckboxConfiguration',
  },
  DataModelDesigner: {
    component: DataModelDesigner,
    path: '',
    designerView: '',
  },
  Dropdown: {
    component: Dropdown,
    path: '',
    designerView: 'DropdownConfiguration',
  },
  Label: {
    component: Label,
    path: '',
    designView: '',
  },
  Image: {
    component: Image,
    path: '',
    designView: '',
  },
  Input: {
    component: Input,
    path: '',
    designerView: 'InputFieldConfiguration',
  },
  RadioButton: {
    component: RadioButton,
    path: '',
    designerView: 'RadioButtonConfiguration',
  },
  TextArea: {
    component: TextArea,
    path: '',
    designerView: 'InputFieldConfiguration',
  },
  TreeNavigation: {
    component: TreeNavigation,
    path: '',
    designerView: 'InputFieldConfiguration',
  },
  PageDesigner: {
    component: PageDesignerWithActions,
    path: '',
    designerView: '',
  },
  ViewDesigner: {
    component: ViewDesignerWithActions,
    path: '',
    designerView: '',
  },
  View: {
    component: View,
    path: '',
    designerView: '',
  },
};

export default componentsMap;
