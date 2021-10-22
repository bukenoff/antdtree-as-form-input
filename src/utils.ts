import { TreeStructure } from "./models";

export const normalizeKeys = (keys: string[]) =>
    keys.reduce((acc: Record<string, boolean>, key) => {
        acc[key] = true;

        return acc;
    }, {});

export const getTreeByKeysProcess = (normalizedKeys: Record<string, boolean>, originalTree: TreeStructure[]) =>
    originalTree.reduce((acc: TreeStructure[], treeItem) => {
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

export const getTreeByKeys = (keys: string[], originalTree: TreeStructure[]) =>
    getTreeByKeysProcess(normalizeKeys(keys), originalTree);
