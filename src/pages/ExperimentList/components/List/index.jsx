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
    props.history.push('/experiment/create');
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
        buttonText="新增文章"
        className={styles.title}
        onClick={handleAdd}
      />
      <Table dataSource={props.articleList}>
        <Table.Column title="试卷ID" dataIndex="articleId" />
        <Table.Column title="题目" dataIndex="article_title" />
        <Table.Column title="发布人" dataIndex="userName" />
        <Table.Column title="学期" dataIndex="termName" />
        <Table.Column title="章节" dataIndex="chapterName" />
        <Table.Column title="发布时间" dataIndex="createdAt" cell={renderTime} />
        <Table.Column title="更新时间" dataIndex="updatedAt" cell={renderTime} />
        <Table.Column title="操作" dataIndex="articleId" cell={renderOper} />
      </Table>
    </IceContainer>
  );
}

export default withRouter(ArticleList);
