// 菜单配置
// headerMenuConfig：头部导航配置

import Cookies from 'js-cookie';

const headerMenuConfig = [
  {
    name: '首页',
    path: `${location.origin}/portal`,
    icon: 'home',
  }
];

// asideMenuConfig：侧边导航配置

const userType = Cookies.get('userType');

let asideMenuConfig = [
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
  }
];

if (userType == 2) {
  asideMenuConfig = [
    {
      name: '自主学习记录查看',
      icon: 'shezhi',
      children: [
        { name: '扩展阅读', path: '/record/article'},
        { name: '视频学习', path: '/record/articles'}
      ]
    },
    {
      name: '实验记录查看',
      icon: 'shezhi',
      path: '/report/experiment'
    }
  ];
}



export { headerMenuConfig, asideMenuConfig };
