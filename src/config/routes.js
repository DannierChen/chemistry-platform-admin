import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';

import UserLogin from '@/pages/UserLogin';
import UserRegister from '@/pages/UserRegister';
import Dashboard from '@/pages/Dashboard';
import MySetting from '@/pages/MySetting';
import ArticleList from '@/pages/ArticleList';
import AddInvite from '@/pages/AddInvite';
import TopicList from '@/pages/TopicList';
import AddTopic from '@/pages/AddTopic';
import NotFound from '@/pages/NotFound';
import CreateArticle from '@/pages/CreateArticle';

import CreateExam from '@/pages/CreateExam';
import ExamList from '@/pages/ExamList';
// import ExamDetail from '@/pages/ExamDetail';

const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: UserLogin,
      },
      {
        path: '/register',
        component: UserRegister,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
      {
        component: NotFound,
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
      },
      {
        path: '/article/list',
        component: ArticleList,
      },
      {
        path: '/article/create',
        component: CreateArticle,
      },
      {
        path: '/exam/create',
        component: CreateExam,
      },
      {
        path: '/exam/list',
        component: ExamList,
      },
      // {
      //   path: '/exam/detail/:exmId',
      //   component: ExamDetail,
      // },
      {
        path: '/invite/add',
        component: AddInvite,
      },
      {
        path: '/topic/list',
        component: TopicList,
      },
      {
        path: '/topic/add',
        component: AddTopic,
      },
      {
        path: '/setting/my',
        component: MySetting,
      },
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routerConfig;
