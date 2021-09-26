import React, { useState } from 'react';
import { Formik } from 'formik';
import 'antd/dist/antd.css';
import './index.css';
import { Tree } from 'antd';

const initialOptions = [
  {
    title: '0',
    key: '0',
    children: [
      {
        title: '0-0',
        key: '0-0',
        children: [
          {
            title: '0-0-0',
            key: '0-0-0',
          },
          {
            title: '0-0-1',
            key: '0-0-1',
          },
          {
            title: '0-0-2',
            key: '0-0-2',
          },
        ],
      },
      {
        title: '0-1',
        key: '0-1',
        children: [
          {
            title: '0-1-0',
            key: '0-1-0',
          },
          {
            title: '0-1-1',
            key: '0-1-1',
          },
          {
            title: '0-1-2',
            key: '0-1-2',
          },
        ],
      },
      {
        title: '0-2',
        key: '0-2',
      },
    ],
  },
  {
    title: '1',
    key: '1',
    children: [
      {
        title: '1-0',
        key: '1-0',
      },
      {
        title: '1-1',
        key: '1-1',
      },
      {
        title: '1-2',
        key: '1-2',
      },
    ],
  },
  {
    title: '2',
    key: '2',
  },
];

const selectedOptions = [
  {
    title: '2',
    key: '2',
  },
];

const App = () => {
  const [checkedKeys, setCheckedKeys] = useState(selectedOptions.map(option => option.key));
  const [selectedTreeData, setSelectedTreeData] = useState(selectedOptions);

  const updateRootNode = (key: string, isChecked: boolean) => {
    if (isChecked) {
      const selectedOption = initialOptions[key as unknown as number];
      setSelectedTreeData([...selectedTreeData, selectedOption!]);
    } else {
      const newTreeData = selectedTreeData.filter((opt) =>  opt.key !== key);
      console.log('newTreeData', newTreeData)
      setSelectedTreeData(newTreeData);
    }
  }

  // const updateFirstChildNode = (key: string) => {
  //   return null;
  // }

  // const updateFirstChildNode = (key: string) => {
    
  // }

  const onCheck = (checkedKeysValue: any, e: any) => {
    console.log('checkedKeysValue', checkedKeysValue);
    console.log('e', e);
    const {key} = e.node;

    if (key.length === 1) {
      updateRootNode(key, e.checked);
    }



    setCheckedKeys(checkedKeysValue);
  };

  return (
    <Formik
       initialValues={{ treeData: initialOptions }}
       onSubmit={(values, { setSubmitting }) => {
         alert(JSON.stringify(selectedTreeData));
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
          <form onSubmit={handleSubmit}>
            <Tree
              checkable
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              treeData={values.treeData}
            />
            <button type="submit">submit</button>
          </form>
        )}
    </Formik>
  );
};

export default App;
