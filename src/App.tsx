import React, { useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
import 'antd/dist/antd.css';
import './index.css';
import { Tree } from 'antd';

const initialOptions = [
  {
    title: '0',
    key: '0',
    parentKey: null,
    children: [
      {
        title: '0-0',
        key: '0-0',
        parentKey: '0',
        children: [
          {
            title: '0-0-0',
            key: '0-0-0',
            parentKey: '0-0',
          },
          {
            title: '0-0-1',
            key: '0-0-1',
            parentKey: '0-0',
          },
          {
            title: '0-0-2',
            key: '0-0-2',
            parentKey: '0-0',
          },
        ],
      },
      {
        title: '0-1',
        key: '0-1',
        parentKey: '0',
        children: [
          {
            title: '0-1-0',
            key: '0-1-0',
            parentKey: '0-1',
          },
          {
            title: '0-1-1',
            key: '0-1-1',
            parentKey: '0-1',
          },
          {
            title: '0-1-2',
            key: '0-1-2',
            parentKey: '0-1',
          },
        ],
      },
      {
        title: '0-2',
        key: '0-2',
        parentKey: '0',
      },
    ],
  },
  {
    title: '1',
    key: '1',
    parentKey: null,
    children: [
      {
        title: '1-0',
        key: '1-0',
        parentKey: '1',
      },
      {
        title: '1-1',
        key: '1-1',
        parentKey: '1',
      },
      {
        title: '1-2',
        key: '1-2',
        parentKey: '1',
      },
    ],
  },
  {
    title: '2',
    key: '2',
    parentKey: null,
  },
];

const App = () => {
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedTreeData, setSelectedTreeData] = useImmer(initialOptions);

  const onCheck = (checkedKeysValue: any, e: any) => {
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
        treeData={selectedTreeData}
      />
        <button type="submit">submit</button>
    </form>
  );
};

export default App;
