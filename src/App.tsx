import React, { useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
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

const selectedOptions: any = [
  {
    title: '2',
    key: '2',
  },
];

const App = () => {
  const [checkedKeys, setCheckedKeys] = useState(selectedOptions.map((option: any) => option.key));
  const [selectedTreeData, setSelectedTreeData] = useImmer(selectedOptions);

  const selectedTreeDataNormalized = useMemo(() => {
    return selectedTreeData.reduce((acc: any, currentValue: any) => {
      const currentValueCopy = { ...currentValue };

      if (currentValueCopy.children?.length) {
        currentValueCopy.children = currentValueCopy.children.reduce((acc: any, child: any) => {
          acc[child.key] = child;
          return acc;
        }, {});
      }

      acc[currentValue.key] = currentValueCopy;
      return acc;
    }, {});
  }, [selectedTreeData]);

  const updateRootNode = (key: string, isChecked: boolean) => {
    if (isChecked) {
      const selectedOption = initialOptions[key as unknown as number];
      setSelectedTreeData((draft: any) => {
        draft.push(selectedOption!)
      });
    } else {
      const newTreeData = selectedTreeData.filter((opt: any) =>  opt.key !== key);
      setSelectedTreeData(newTreeData);
    }
  }

  const updateNestedChild = (key: string, isChecked: boolean) => {
    const [parent, child, grandChild] = key.split('-');
    console.log('parent', parent);
    console.log('child', child);
    console.log('grandChild', grandChild);
    const parentIsSelected = selectedTreeDataNormalized[parent];

    if (isChecked) {
      console.log('check:', key);
      if (parentIsSelected) {
        parentIsSelected[child]
      } else {
        // find parent in options check child
      }
    }

    if (!isChecked) {
      console.log('uncheck:', key);
      if ('parentChecked') {
        // find parent in selected uncheck child
      } else {
        // find parent in options uncheck child
      }
    }
  }

  const onCheck = (checkedKeysValue: any, e: any) => {
    const keys = e.node.key;

    if (keys.length === 1) {
      updateRootNode(keys, e.checked);
    } else {
      updateNestedChild(keys, e.checked);
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
