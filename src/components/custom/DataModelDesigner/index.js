import React, { useContext } from 'react';
import { APP_PROPS } from '../../../constants';
import { withAll } from '../../../HOCs';
import { ModalContext } from '../../containers/Modal/ModalContext';
import Input from '../../controls/Input';

const DataModelDesigner = (props) => {
  const dataSource = [{}];
  const propsContext = '';
  const { create } = useContext(ModalContext);

  return (
    <button
      type="button"
      onClick={() => create({ title: 'Sample title', content: 'Sample content' })}
    >
      Show Modal
    </button>
  );

  if (dataSource && Array.isArray(dataSource)) {
    return dataSource.map((item, index) => {
      const context = [...propsContext, 'dataSource', index];
      return (
        <div key={context.join('.')} className="row">
          <div className="col-sm-3">
            {React.createElement(withAll(Input), {
              propsContext: context,
              [APP_PROPS.CONFIG]: {
                type: 'text',
                propertyReference: '.name',
                placeholder: 'Property Name',
              },
            })}
          </div>
          <div className="col-sm-3">
            {React.createElement(withAll(Input), {
              propsContext: context,
              [APP_PROPS.CONFIG]: {
                type: 'text',
                propertyReference: '.key',
                placeholder: 'Property Type',
              },
            })}
          </div>
        </div>
      );
    });
  }

  return 'DataModalDesigner';
};

export default DataModelDesigner;
