import React from 'react';

import Axios from 'axios';

import ExperimentList from './components/List';

export default class ArticleListPage extends React.Component {
  state = {
    experimentList: [],
  }

  componentDidMount() {
    Axios.get('/experiment/list').then(response => {
      const res = response.data;

      this.setState({
        experimentList: res.data
      });
    });
  }

  render() {
    const { experimentList } = this.state;

    return (
      <ExperimentList experimentList={experimentList} />
    );
  }
}
