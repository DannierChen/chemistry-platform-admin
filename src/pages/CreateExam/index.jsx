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
    quesList: [
      {
        type: 'judge',
        title: '根据玻尔原子结构理论，氢原子的电子由外层轨道跃迁到内层轨道后，下列判断正确的是',
        answer: true,
      },
      {
        type: 'singleChoose',
        title: '根据玻尔原子结构理论，氢原子的电子由外层轨道跃迁到内层轨道后，下列判断正确的是',
        answer: 'A',
        options: [
          {
            identifier: 'A',
            content: '原子的能量增加，电子的动能减少'
          },
          {
            identifier: 'B',
            content: '原子的能量增加，电子的动能增加'
          },
          {
            identifier: 'C',
            content: '原子的能量减少，电子的动能减少'
          },
          {
            identifier: 'D',
            content: '原子的能量减少，电子的动能增加'
          }
        ]
      },
      {
        type: 'singleChoose',
        title: 'X、Y为两种元素的原子,X的阴离子与Y的阳离子具有相同的电子层结构',
        options: [
          {
            identifier: 'A',
            content: 'X的原子半径大于Y的原子半径',
          },
          {
            identifier: 'B',
            content: 'X的电负性小于Y的电负性',
          },
          {
            identifier: 'C',
            content: 'X的氧化性小于Y的氧化性'
          },
          {
            identifier: 'D',
            content: 'X的第一电离能大于Y的第一电离能'
          }
        ],
        answer: 'A',
      },
      {
        type: 'multipleChoose',
        title: '下列有关元素周期系的叙述正确的是',
        options: [
          {
            identifier: 'A',
            content: '元素周期系中ⅠA族元素又称为碱金属元素',
          },
          {
            identifier: 'B',
            content: '元素周期系中每一周期元素的种类均相等',
          },
          {
            identifier: '',
            content: '元素周期系的形成原因是核外电子排布的周期性变化',
          },
          {
            identifier: 'D',
            content: '每一周期的元素最外层电子数均是1→8，周而复始',
          },
        ],
        answer: ['C', 'D'],
      },
    ],
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
