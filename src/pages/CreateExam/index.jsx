import React from 'react';

import { Form, MenuButton, Input, Radio, Button, Field, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';

import QuesList from './components/QuesList';
import JudgeQues from './components/JudgeQues';
import ChooseQues from './components/ChooseQues';

import styles from './index.module.scss';

import Axios from 'axios';

const QUES_TYPE = [
  {
    label: '判断题',
    value: 'judge',
  },
  {
    label: '单选题',
    value: 'singleChoose',
  },
  {
    label: '多选题',
    value: 'multipleChoose',
  },
];

export default class ExamDetail extends React.Component {

  field = new Field(this);

  state = {
    quesList: [],
    judgeVisible: false,
    singleChooseVisible: false,
    multipleChooseVisible: false,
  }

  handleQuesClose = (field) => {
    this.setState({
      [`${field}Visible`]: false,
    });
  }

  handleQuesSubmit = (ques) => {
    this.setState(prevState => {
      const quesList = prevState.quesList;

      quesList.push(ques);

      return {
        quesList,
      }
    }, () => {
      this.setState({
        [`${ques.type}Visible`]: false,
      })
    });
  }

  handleExamSubmit = () => {
    this.field.validate((errors, values) => {
      if (errors) {
        return;
      }

      const { quesList } = this.state;

      if (!errors && quesList.length < values.examCount) {
        Message.error('试卷题目不够');
        return;
      }

      Axios.post('/exam/create', Object.assign({}, values, {
        quesList,
      })).then(res => {
        res = res.data;

        if (res.success) {
          Message.success({
            content: res.message,
            afterClose: () => {
              this.props.history.push('/exam/list');
            }
          });
        } else {
          Message.error(res.message);
        }
      });
    });
  }

  getQuesTypeMenu = () => {
    return QUES_TYPE.map(quesType => {
      return (
        <MenuButton.Item onClick={() => {
          this.setState({
            [`${quesType.value}Visible`]: true,
          });
        }}>
          {quesType.label}
        </MenuButton.Item>
      )
    });
  }

  render() {
    const { init, getValue } = this.field;
    const { quesList, judgeVisible, singleChooseVisible, multipleChooseVisible } = this.state;

    return (
      <div>
        <IceContainer>
          <Form inline field={this.field} className={styles.examInfoForm}>
            <Form.Item label="试卷名称:" required hasFeedback={false}>
              <Input {...init('exam_name', {
                rules: [{ required: true, message: '试卷名称不能为空' }],
              })} placeholder="请输入试卷名称" />
            </Form.Item>

            <Form.Item label="题目数量:" required hasFeedback={false}>
              <Radio.Group {...init('ques_count', {
                initValue: 4,
              })}>
                <Radio value={4}>4道</Radio>
                <Radio value={5}>5道</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label=" ">
              <Button.Group>
                <MenuButton disabled={getValue('examCount') === quesList.length} label="添加题目" type="secondary">{this.getQuesTypeMenu()}</MenuButton>
                <Button type="primary" onClick={this.handleExamSubmit}>发布试卷</Button>
              </Button.Group>
            </Form.Item>
          </Form>
        </IceContainer>

        <QuesList quesList={quesList} />

        {judgeVisible ? <JudgeQues handleClose={this.handleQuesClose} handleSubmit={this.handleQuesSubmit} /> : null}

        {singleChooseVisible ? <ChooseQues type="singleChoose" handleClose={this.handleQuesClose} handleSubmit={this.handleQuesSubmit} /> : null}

        {multipleChooseVisible ? <ChooseQues type="multipleChoose" handleClose={this.handleQuesClose} handleSubmit={this.handleQuesSubmit} /> : null}
      </div>
    );
  }
}
