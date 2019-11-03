import React, { useState } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Dialog } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import ContainerTitle from '@/components/ContainerTitle';
import mockData from './data';
import styles from './index.module.scss';

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

  const renderProfile = (value, index, record) => {
    return (
      <div className={styles.profile}>
        <img src={record.avatar} alt="" className={styles.avatar} />
        <span className={styles.name}>{record.name}</span>
      </div>
    );
  };

  const renderOper = (value, index) => {
    return (
      <div>
        <Link to="/invite/add" className={styles.edit}>
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
      <Table dataSource={dataSource} hasBorder={false}>
        <Table.Column title="文章名" dataIndex="name" cell={renderProfile} />
        <Table.Column title="所属学期" dataIndex="email" />
        <Table.Column title="所属章节" dataIndex="role" />
        <Table.Column title="关联试卷" dataIndex="id" cell={renderOper} />
        <Table.Column title="发布时间" dataIndex="create_at" cell={renderOper} />
        <Table.Column title="更新时间" dataIndex="update_at" cell={renderOper} />
        <Table.Column title="操作" dataIndex="id" cell={renderOper} />
      </Table>
    </IceContainer>
  );
}

export default withRouter(ArticleList);
