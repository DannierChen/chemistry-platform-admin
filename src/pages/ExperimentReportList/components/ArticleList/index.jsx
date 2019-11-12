import React, { useState } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Table, Dialog } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import ContainerTitle from '@/components/ContainerTitle';
import mockData from './data';
import styles from './index.module.scss';

import moment from 'moment';

class ArticleList extends React.Component {

  state = {
    reportDetail: {},
    reportDetailVisible: false
  }

  renderTime = (value) => {
    return moment.utc(value).format("YYYY-MM-DD HH:mm:ss");
  };

  render() {
    const { reportDetail, reportDetailVisible } = this.state;

    return (
      <IceContainer className={styles.container}>
        <Table dataSource={this.props.articleList}>
          <Table.Column title="实验标题" dataIndex="articleTitle" width="20%" />
          <Table.Column title="试卷名称" dataIndex="examName" />
          <Table.Column title="试卷得分" dataIndex="score" cell={(value, index, record) => {
            if (!value) return <span>暂未完成</span>

            return <span>{record.score}</span>;
          }} />
          <Table.Column title="完成时间" dataIndex="createdAt" cell={this.renderTime} />
          <Table.Column title="实验报告" dataIndex="createdAt" cell={(...params) => {
            return <Button disabled={!params[2].reportInfo} onClick={() => {
              this.setState({
                reportDetailVisible: true,
                reportDetail: params[2].reportInfo
              })
            }} type="primary">查看报告</Button>
          }} />
        </Table>

        {
          reportDetailVisible ? (
            <Dialog
              visible
              style={{width: 820, minHeight: 765}}
              isFullScreen
              title="报告详情"
              footer={false}
              onClose={() => {
                this.setState({reportDetailVisible: false})
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: reportDetail.report_content}}></div>

              <img src={reportDetail.report_capture} width="800" height="765" />
            </Dialog>
          ) : null
        }

      </IceContainer>
    );
  }
}

export default withRouter(ArticleList);
