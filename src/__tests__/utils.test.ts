import { TreeStructure } from "../models";
import { getTreeByKeys, getTreeByKeysProcess, normalizeKeys } from "../utils"

describe('normalizeKeys function', () => {
  it('should exist', () => {
    expect(normalizeKeys).toBeDefined();
  })

  it('should normalize keys', () => {
    const result = normalizeKeys(['john', 'paul', 'george', 'ringo']);
    const expected_result = {
      john: true,
      paul: true,
      george: true,
      ringo: true,
    };

    expect(result).toEqual(expected_result);
  })

  it('should handle empty input', () => {
    const result = normalizeKeys([]);
    const expected_result = {};

    expect(result).toEqual(expected_result);
  })
})

describe('getTreeByKeysProcess function', () => {
  it('should exist', () => {
    expect(getTreeByKeys).toBeDefined();
  })

  it('should pick nodes of a tree according to checked keys', () => {
    const tree: TreeStructure[] = [
      {
        title: 'Marcus Aurelius',
        key: 'ma',
        children: [
          {
            title: 'Lucilia',
            key: 'l',
          },
          {
            title: 'Commodus',
            key: 'c',
          }
        ] 
      },
    ];

    const normalizedKeys = {
      c: true,
    }

    const result = getTreeByKeysProcess(normalizedKeys, tree);
    const expected_result: TreeStructure[] = [
      {
        title: 'Marcus Aurelius',
        key: 'ma',
        children: [
          {
            title: 'Commodus',
            key: 'c',
          }
        ],
      },
    ];

    expect(result).toEqual(expected_result);
  })
})
