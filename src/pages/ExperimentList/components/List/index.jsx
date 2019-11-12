import React, { useState } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Dialog, Button } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import ContainerTitle from '@/components/ContainerTitle';
import styles from './index.module.scss';

import Axios from 'axios';

import moment from 'moment';

class ExperimentList extends React.Component {
  state = {
    reportList: [],
    viewingReport: {},
    viewReportVisible: false,
    viewReportDetailVisible: false,
  }

  handleDelete = (index) => {
    Dialog.confirm({
      content: '确认删除吗',
      onOk: () => {
        const data = [...dataSource];
        console.log(index);
        data.splice(index, 1);
        setDataSource(data);
      },
    });
  };

  renderTime = (value) => {
    return moment.utc(value).format("YYYY-MM-DD HH:mm:ss");
  };

  renderOper = (value, index) => {
    return (
      <div>
        <Link to={`/article/create/${value}`} className={styles.edit}>
          修改
        </Link>
        <a
          onClick={() => handleDelete(index)}
          className={styles.link}
        >
          删除
        </a>
      </div>
    );
  };

  getReportList = (experimentId) => {
    Axios('/report/list', {
      params: {
        experimentId
      }
    }).then(res => {
      res = res.data;

      if (res.success) {
        this.setState({
          reportList: res.data
        });
      }
    })
  }

  renderViewReport = (experimentId) => {
    return <Button onClick={() => {
      this.setState({
        viewReportVisible: true
      }, () => {
        this.getReportList(experimentId);
      })
    }}>查看</Button>
  }

  viewReportDetail = (record) => {
    this.setState({
      viewingReport: record,
      viewReportDetailVisible: true
    })
  }

  renderViewDetail = (...params) => {
    return <Button shape="text" type="primary" onClick={this.viewReportDetail.bind(this, params[2])}>查看详情</Button>
  }

  render() {
    const { viewingReport, viewReportDetailVisible, reportList, viewReportVisible } = this.state;

    console.log(reportList);

    return (
      <IceContainer className={styles.container}>
        <ContainerTitle
          title="实验列表"
          className={styles.title}
        />
        <Table dataSource={this.props.experimentList}>
          <Table.Column title="实验ID" dataIndex="experimentId" />
          <Table.Column title="实验题目" dataIndex="experiment_title" />
          <Table.Column title="发布人" dataIndex="user.user_name" />
          <Table.Column title="发布时间" dataIndex="createdAt" cell={this.renderTime} />
          <Table.Column title="更新时间" dataIndex="updatedAt" cell={this.renderTime} />
          <Table.Column title="实验报告查看" dataIndex="experimentId" cell={this.renderViewReport} />
          <Table.Column title="操作" dataIndex="articleId" cell={this.renderOper} />
        </Table>

        {
          viewReportVisible ? (
            <Dialog
              visible
              style={{width: 600, minHeight: 200}}
              title="实验报告列表"
              footer={false}
              onClose={() => {
                this.setState({viewReportVisible: false})
              }}
            >
              <Table dataSource={reportList}>
                <Table.Column title="报告ID" dataIndex="reportId" />
                <Table.Column title="提交人" dataIndex="user.user_name" />
                <Table.Column title="提交时间" dataIndex="createdAt" cell={this.renderTime} />
                <Table.Column title="实验报告查看" dataIndex="reportId" cell={this.renderViewDetail} />
              </Table>
            </Dialog>
          ) : null
        }

        {
          viewReportDetailVisible ? (
            <Dialog
              visible
              style={{width: 820, minHeight: 765}}
              isFullScreen
              title="报告详情"
              footer={false}
              onClose={() => {
                this.setState({viewReportDetailVisible: false})
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: viewingReport.report_content}}></div>

              <img src={viewingReport.report_capture} width="800" height="765" />
            </Dialog>
          ) : null
        }
      </IceContainer>
    );
  }
}

export default withRouter(ExperimentList);
