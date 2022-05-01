// import httpClient from "..";

const views = [
  {
    _id: 'app_view2',
    name: 'Test View',
    description: 'Test view',
    category: 'layout',
    type: 'view',
    properties: {
      children: [
        {
          identifier: '1*1',
          category: 'layout',
          key: '1577629298143',
          type: 'row',
          columns: [
            {
              type: 'column',
              children: [
                {
                  identifier: 'Dropdown',
                  category: 'control',
                  key: '1577731411313',
                  properties: {
                    type: 'text',
                    label: 'Dropdown',
                    position: 'vertical',
                    inputType: '',
                    labelValue: '',
                    propertyReference: '',
                  },
                },
                {
                  identifier: 'Input',
                  category: 'control',
                  key: '1577731413626',
                  properties: {
                    type: 'text',
                    label: 'Input',
                    position: 'vertical',
                    inputType: '',
                    labelValue: 'Label',
                    propertyReference: '.labelValue',
                  },
                },
                {
                  identifier: 'Input',
                  category: 'control',
                  key: '1577731414171',
                  properties: {
                    type: 'text',
                    label: 'Input',
                    position: 'vertical',
                    inputType: '',
                    labelValue: 'Property Reference',
                    propertyReference: '.propertyReference,',
                  },
                },
                {
                  identifier: 'Input',
                  category: 'control',
                  key: '1577731414642',
                  properties: {
                    type: 'text',
                    label: 'Input',
                    position: 'vertical',
                    inputType: '',
                    labelValue: 'Condition',
                    propertyReference: '.disableExpression',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    _id: 'AppView1',
    name: 'Sample View',
    description: 'Sample view for testing',
    type: 'view',
    category: 'layout',
    configurations: {
      children: [
        {
          component: 'Layout_1*1',
          category: 'layout',
          key: '1577629298143',
          type: 'row',
          columns: [
            {
              type: 'column',
              children: [
                {
                  component: 'Layout_1*2',
                  category: 'layout',
                  key: '1577637508174',
                  columns: [
                    {
                      children: [
                        {
                          component: 'Input',
                          category: 'control',
                          key: '1577637511716',
                          configurations: {
                            label: 'First Name',
                            position: 'vertical',
                            propertyReference: '.myProp',
                          },
                        },
                      ],
                    },
                    {
                      children: [
                        {
                          component: 'Input',
                          category: 'control',
                          key: '1577637513765',
                          configurations: {
                            label: 'Last Name',
                            position: 'vertical',
                            propertyReference: '.lastName',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  component: 'Layout_1*2',
                  category: 'layout',
                  key: '1577637516937',
                  columns: [
                    {
                      children: [
                        {
                          component: 'RadioButton',
                          category: 'control',
                          key: '1577637521092',
                          configurations: {
                            label: 'Gender',
                            position: 'vertical ',
                            propertyReference: '',
                          },
                        },
                      ],
                    },
                    {
                      children: [
                        {
                          component: 'Checkbox',
                          category: 'control',
                          key: '1577637523274',
                          configurations: {
                            label: 'Certifications',
                            position: 'vertical',
                            propertyReference: '',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  component: 'Layout_1*4',
                  category: 'layout',
                  key: '1587309263067',
                  columns: [{ children: [] }, { children: [] }, { children: [] }, { children: [] }],
                },
              ],
            },
          ],
        },
        {
          component: 'Layout_1*2',
          category: 'layout',
          key: '1577648695431',
          type: 'row',
          columns: [
            {
              children: [
                {
                  component: 'TextArea',
                  category: 'control',
                  key: '1577648698345',
                  configurations: {
                    label: 'Permanent Address',
                    position: 'vertical',
                    propertyReference: '',
                  },
                },
              ],
            },
            {
              children: [
                {
                  component: 'RadioButton',
                  category: 'control',
                  key: '1577648700681',
                  configurations: {
                    label: 'RadioButton',
                    position: 'vertical',
                    propertyReference: '',
                  },
                },
              ],
            },
          ],
        },
      ],
      dataSource: [],
    },
  },
  {
    _id: 'CreateViewTemplate',
    name: 'Creates new view',
    description: 'View UI to create new view',
    type: 'view',
    category: 'layout',
    configurations: {
      children: [
        {
          component: 'Layout_1*1',
          category: 'layout',
          key: '1588019505759',
          columns: [
            {
              children: [
                {
                  component: 'Input',
                  category: 'control',
                  key: '1588019605334',
                  configurations: { label: 'Name', propertyRef: '', position: 'vertical' },
                },
                {
                  component: 'Input',
                  category: 'control',
                  key: '1588019932019',
                  configurations: { label: 'component', propertyRef: '', position: 'vertical' },
                },
                {
                  component: 'TextArea',
                  category: 'control',
                  key: '1588019933863',
                  configurations: { label: 'Description', propertyRef: '', position: 'vertical' },
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    _id: 'InputFieldConfiguration',
    name: 'Input field design configuration',
    description: ' View for input field design configuration',
    category: 'layout',
    type: 'view',
    configurations: {
      children: [
        {
          component: 'Layout_1*1',
          category: 'layout',
          key: '1577629298143',
          type: 'row',
          columns: [
            {
              type: 'column',
              children: [
                {
                  component: 'Dropdown',
                  category: 'control',
                  key: '1577731411313',
                  configurations: {
                    label: 'Alignment',
                    position: 'vertical',
                    propertyReference: '.position',
                  },
                },
                {
                  component: 'Input',
                  category: 'control',
                  key: '1577731413626',
                  configurations: {
                    label: 'Label',
                    position: 'vertical',
                    propertyReference: '.label',
                  },
                },
                {
                  component: 'Input',
                  category: 'control',
                  key: '1577731414171',
                  configurations: {
                    label: 'Property Reference',
                    position: 'vertical',
                    propertyReference: '.propertyReference',
                  },
                },
                {
                  component: 'Input',
                  category: 'control',
                  key: '1577731414642',
                  configurations: {
                    label: 'Disable Condition',
                    position: 'vertical',
                    propertyReference: '.disableExpression',
                  },
                },
              ],
            },
          ],
        },
      ],
      dataSource: [{ name: 'lists', key: 'List_Positions' }],
    },
  },
  {
    _id: 'DropdownConfiguration',
    name: 'Dropdown design configuration',
    description: 'View for dropdown control design configuration',
    category: 'layout',
    type: 'view',
    configurations: {
      children: [
        {
          component: 'Layout_1*1',
          category: 'layout',
          key: '1577629298143',
          type: 'row',
          columns: [
            {
              type: 'column',
              children: [
                {
                  component: 'Dropdown',
                  category: 'control',
                  key: '1577731411313',
                  configurations: {
                    label: 'Alignment',
                    dataSource: 'List_Positions',
                    position: 'vertical',
                    propertyReference: '.position',
                  },
                },
                {
                  component: 'Input',
                  category: 'control',
                  key: '1577731413626',
                  configurations: {
                    label: 'Label',
                    position: 'vertical',
                    propertyReference: '.label',
                  },
                },
                {
                  component: 'Input',
                  category: 'control',
                  key: '1577731414171',
                  configurations: {
                    label: 'Property Reference',
                    position: 'vertical',
                    propertyReference: '.propertyReference',
                  },
                },
                {
                  component: 'Input',
                  category: 'control',
                  key: '1590000066879',
                  configurations: {
                    label: 'DataSource',
                    propertyReference: '.dataSource',
                    position: 'vertical',
                  },
                },
                {
                  component: 'Input',
                  category: 'control',
                  key: '1577731414642',
                  configurations: {
                    label: 'Disable Condition',
                    position: 'vertical',
                    propertyReference: '.disableExpression',
                  },
                },
              ],
            },
          ],
        },
      ],
      dataSource: [{ name: 'lists', key: 'List_Positions' }],
    },
  },
];

export default (action) => {
  const { url, method, data, accessToken, headers } = action;
  return new Promise((resolve, reject) => {
    // All views
    if (url === '/views') {
      resolve(views);
    } else {
      reject(new Error('Route not found'));
    }
  });
};
