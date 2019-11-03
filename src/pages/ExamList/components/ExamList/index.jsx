import React, { useState } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Dialog } from '@alifd/next';

import { withRouter, Link } from 'react-router-dom';

import moment from 'moment';

import ContainerTitle from '@/components/ContainerTitle';

import mockData from './data';
import styles from './index.module.scss';


function ExamList(props) {
  const [dataSource, setDataSource] = useState(mockData);

  const handleAdd = () => {
    props.history.push('/exam/create');
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

  const renderTime = (value) => {
    return moment.utc(value).format("YYYY-MM-DD HH:mm:ss");
  };

  return (
    <IceContainer className={styles.container}>
      <ContainerTitle
        title="试卷列表"
        buttonText="新增试卷"
        className={styles.title}
        onClick={handleAdd}
      />
      <Table dataSource={props.examList} hasBorder={false}>
        <Table.Column title="试卷ID" dataIndex="examId" />
        <Table.Column title="试卷名称" dataIndex="exam_name" />
        <Table.Column title="发布人" dataIndex="user.user_name" />
        <Table.Column title="发布时间" dataIndex="createdAt" cell={renderTime} />
        <Table.Column title="更新时间" dataIndex="updatedAt" cell={renderTime} />
        <Table.Column title="操作" dataIndex="id" cell={renderOper} />
      </Table>
    </IceContainer>
  );
}

export default withRouter(ExamList);
