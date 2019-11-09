// 菜单配置
// headerMenuConfig：头部导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

// asideMenuConfig：侧边导航配置

const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'home',
    children: [
      {
        name: '数据概况',
        path: '/dashboard',
      },
    ],
  },
  {
    name: '文章管理',
    icon: 'cascades',
    children: [
      { name: '文章列表', path: '/article/list' },
      { name: '新建文章', path: '/article/create' },
    ],
  },
  {
    name: '试卷管理',
    icon: 'shezhi',
    children: [
      { name: '试卷列表', path: '/exam/list' },
      { name: '新建文章', path: '/exam/create' },
    ],
  },
  {
    name: '实验管理',
    icon: 'shezhi',
    children: [
      { name: '实验列表', path: '/experiment/list' },
      { name: '创建实验', path: '/experiment/create' },
    ],
  },
  {
    name: '基本设置',
    path: '/setting',
    icon: 'yonghu',
    children: [{ name: '个人设置', path: '/setting/my' }],
  },
];

export { headerMenuConfig, asideMenuConfig };
