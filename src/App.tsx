import { Tree } from 'antd';
import React, { useCallback, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { initialOptions } from './const';
import { getTreeByKeys } from './utils';

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
