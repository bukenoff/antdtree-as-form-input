import React, { useState } from 'react';
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
      setSelectedTreeData(newTreeData);
    }
  }

  const onCheck = (checkedKeysValue: any, e: any) => {
    const {key} = e.node;

    if (key.length === 1) {
      updateRootNode(key, e.checked);
    }

    setCheckedKeys(checkedKeysValue);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('@@@@@@@');
    console.log('selectedTreeData', selectedTreeData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tree
        checkable
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        treeData={initialOptions}
      />
        <button type="submit">submit</button>
    </form>
  );
};

export default App;
