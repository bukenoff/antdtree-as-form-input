import React, { useCallback, useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
import 'antd/dist/antd.css';
import './index.css';
import { Tree, TreeProps } from 'antd';

const initialOptions = [
  {
    title: 'Developer responsibilities',
    key: '0',
    parentKey: null,
    children: [
      {
        title: 'Coding',
        key: '0-0',
        parentKey: '0',
        children: [
          {
            title: 'Implement new features',
            key: '0-0-0',
            parentKey: '0-0',
          },
          {
            title: 'Fix bugs',
            key: '0-0-1',
            parentKey: '0-0',
          },
          {
            title: 'Drink too much coffee to battle insomnia',
            key: '0-0-2',
            parentKey: '0-0',
          },
        ],
      },
      {
        title: 'Not coding',
        key: '0-1',
        parentKey: '0',
        children: [
          {
            title: 'Attend meetings',
            key: '0-1-0',
            parentKey: '0-1',
          },
          {
            title: 'Mentor juniors',
            key: '0-1-1',
            parentKey: '0-1',
          },
        ],
      },
    ],
  },
  {
    title: 'Manager responsibilities',
    key: '1',
    parentKey: null,
    children: [
      {
        title: 'Talk to client',
        key: '1-0',
        parentKey: '1',
      },
      {
        title: 'Make sure developer is doing well',
        key: '1-1',
        parentKey: '1',
      },
      {
        title: 'Occasionally bully developer',
        key: '1-2',
        parentKey: '1',
      },
    ],
  },
  {
    title: 'Tester responsibilities',
    key: '2',
    parentKey: null,
  },
];

export const normalizeKeys = (keys: string[]) =>
    keys.reduce((acc: Record<string, boolean>, key) => {
        acc[key] = true;

        return acc;
    }, {});

export const getTreeByKeysProcess = (normalizedKeys: any, originalTree: any) =>
    originalTree.reduce((acc: any, treeItem: any) => {
        if (normalizedKeys[treeItem.key]) {
            acc.push(treeItem);
        } else if (treeItem.children) {
            const children = getTreeByKeysProcess(normalizedKeys, treeItem.children);

            if (children.length) {
                acc.push({
                    ...treeItem,
                    children,
                });
            }
        }

        return acc;
    }, []);

export const getTreeByKeys = (keys: string[], originalTree: any) =>
    getTreeByKeysProcess(normalizeKeys(keys), originalTree);


const App = () => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [selectedTreeData, setSelectedTreeData] = useState([]);

  const onCheck = useCallback((checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  }, []);

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault();
    const value = getTreeByKeys(checkedKeys, initialOptions);
    setSelectedTreeData(value);
    console.log('%c selectedTreeData ', 'background: #222; color: #bada55', value);
  }, [checkedKeys]);

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
