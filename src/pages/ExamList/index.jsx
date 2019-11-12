import React from 'react';
import Overview from './components/Overview';
import ExamList from './components/ExamList';

import Axios from 'axios';

export default class ExamListPage extends React.Component {
  state = {
    examList: [],
  };

  componentDidMount() {
    Axios.get('/exam/list').then((response) => {
      const res = response.data;

      this.setState({
        examList: res.data
      });
    });
  }

  render() {
    return (
      <div>
        <ExamList examList={this.state.examList} />
      </div>
    )
  }
};
