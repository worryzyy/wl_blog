export const sidebar = [
  {
    text: '开发日常',
    items: [
      { text: 'JS', link: '/DevRoutine/Js' },
      {
        text: 'Vue',
        collapsible: true,
        collapsed: false,
        items: [
          {
            text: '使用vis-network绘制拓扑图',
            link: '/DevRoutine/Vue/Topology',
          },
        ],
      },
      { text: 'APP上架审核', link: '/DevRoutine/CrossPlatform' },
      { text: 'Uniapp', link: '/DevRoutine/Uniapp' },
      { text: 'Ionic', link: '/DevRoutine/Ionic' },
    ],
  },
]
