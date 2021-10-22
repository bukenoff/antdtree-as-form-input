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
