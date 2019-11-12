import React, { useState } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Dialog } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import ContainerTitle from '@/components/ContainerTitle';
import mockData from './data';
import styles from './index.module.scss';

import moment from 'moment';

function ArticleList(props) {
  const [dataSource, setDataSource] = useState(mockData);

  const handleAdd = () => {
    props.history.push('/article/create');
  };

  const handleDelete = (index) => {
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

  const renderTime = (value) => {
    return moment.utc(value).format("YYYY-MM-DD HH:mm:ss");
  };

  const renderOper = (value, index) => {
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

  return (
    <IceContainer className={styles.container}>
      <ContainerTitle
        title="文章列表"
        className={styles.title}
      />
      <Table dataSource={props.articleList}>
        <Table.Column title="记录ID" dataIndex="score_record_id" />
        <Table.Column title="文章题目" dataIndex="articleTitle" width="20%" />
        <Table.Column title="感想" dataIndex="thoughts" />
        <Table.Column title="试卷得分" dataIndex="score" cell={(value, index, record) => {
          if (!value) return <span>暂未完成</span>

          return <span>{record.score}</span>;
        }} />
        <Table.Column title="完成时间" dataIndex="createdAt" cell={renderTime} />
      </Table>
    </IceContainer>
  );
}

export default withRouter(ArticleList);
