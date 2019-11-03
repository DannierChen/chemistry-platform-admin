import React from 'react';

import Axios from 'axios';

import Overview from './components/Overview';
import ArticleList from './components/ArticleList';

export default class ArticleListPage extends React.Component {
  state = {
    articleList: [],
  }

  componentDidMount() {
    Axios.get('/article/list').then(response => {
      const res = response.data;

      this.setState({
        articleList: res.data
      });
    });
  }

  render() {
    const { articleList } = this.state;

    return (
      <div>
        <Overview />
        <ArticleList articleList={articleList} />
      </div>
    );
  }
}
