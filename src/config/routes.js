import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout-old';

import UserLogin from '@/pages/UserLogin';
import UserRegister from '@/pages/UserRegister';
import MySetting from '@/pages/MySetting';
import ArticleList from '@/pages/ArticleList';
import TopicList from '@/pages/TopicList';
import NotFound from '@/pages/NotFound';
import CreateArticle from '@/pages/CreateArticle';

import CreateExam from '@/pages/CreateExam';
import ExamList from '@/pages/ExamList';

import ExperimentList from '@/pages/ExperimentList';
import ExperimentCreate from '@/pages/ExperimentCreate';

import ArticleRecordList from '@/pages/ArticleRecordList';
import ExperimentReportList from '@/pages/ExperimentReportList';

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
        component: NotFound,
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/article/list',
        component: ArticleList,
      },
      {
        path: '/article/create/:articleId?',
        component: CreateArticle,
      },
      {
        path: '/exam/create/:articleId?',
        component: CreateExam,
      },
      {
        path: '/exam/list',
        component: ExamList,
      },
      {
        path: '/experiment/list',
        component: ExperimentList,
      },
      {
        path: '/experiment/create',
        component: ExperimentCreate,
      },
      // {
      //   path: '/exam/detail/:exmId',
      //   component: ExamDetail,
      // },
      {
        path: '/topic/list',
        component: TopicList,
      },
      {
        path: '/setting/my',
        component: MySetting,
      },
      {
        path: '/record/article',
        component: ArticleRecordList,
      },
      {
        path: '/report/experiment',
        component: ExperimentReportList,
      },
      {
        path: '/',
        redirect: '/article/list',
      },
      {
        component: NotFound,
      },
    ]
  }
];

export default routerConfig;
