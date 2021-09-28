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

const selectedOptions: any = [
  {
    title: '2',
    key: '2',
  },
];

const mapDataToTrees = (data: any) => {
  const categories: Record<string, any> = {};
  const subcategories: Record<string, any> = {};
  const assignments: Record<string, any> = {};

  data.forEach((dataItem: any) => {
    categories[dataItem.key] = dataItem;

    if (categories[dataItem.key].children?.length) {
      categories[dataItem.key].children.forEach((item: any) => {
        subcategories[item.key] = item;

        if (subcategories[item.key].children?.length) {
          subcategories[item.key].children.forEach((assignment: any) => {
            assignments[assignment.key] = assignment;
          })
        }
      })
    }
  })

  return [categories, subcategories, assignments];
}

const [categories, subcategories, assignments] = mapDataToTrees(initialOptions);

const App = () => {
  const [checkedKeys, setCheckedKeys] = useState(selectedOptions.map((option: any) => option.key));
  const [halfCheckedKeys, setHaldCheckedKeys] = useState<string[]>([]);
  const [selectedTreeData, setSelectedTreeData] = useImmer(selectedOptions);

  const updateRootNode = (key: string, isChecked: boolean) => {
    if (isChecked) {
      const selectedOption = categories[key as unknown as number];
      setSelectedTreeData((draft: any) => {
        draft.push(selectedOption!)
      });
    } else {
      const newTreeData = selectedTreeData.filter((opt: any) =>  opt.key !== key);
      setSelectedTreeData(newTreeData);
    }
  }

  const onCheck = (checkedKeysValue: any, e: any) => {
    const keys = e.node.key;
    const isCategoryChecked = categories[keys];
    const isSubCategoryChecked = subcategories[keys];
    const isAssignmentChecked = assignments[keys];

    if (isCategoryChecked) {
      console.log('category checked');
      updateRootNode(keys, e.checked);
    }

    if (isSubCategoryChecked) {
      console.log('subcategory checked');
    }

    if (isAssignmentChecked) {
      console.log('assignment checked');
    }

    setCheckedKeys(checkedKeysValue);
    setHaldCheckedKeys(e.node.halfCheckedKeys);
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
