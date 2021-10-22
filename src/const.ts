export const initialOptions = [
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