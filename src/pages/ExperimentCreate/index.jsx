import React from 'react';

import { Field,  Form, Input, CascaderSelect, Message, Select } from '@alifd/next';

import _ from 'lodash';
import Axios from 'axios';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    fixedSpan: 6
  },
  wrapperCol: {
    span: 18
  },
  labelTextAlign: 'left',
};

export default class Createexperiment extends React.Component {
  state = {
    examList: [],
    termList: [],
  }

  field = new Field(this, {
    onChange: (field, value) => {

    }
  })

  componentWillMount() {
    Axios.get('/exam/list').then((response) => {
      const res = response.data;

      if (res.data && res.data.length) {
        this.setState({
          examList: res.data
        });
      }
    });

    Axios.get('/getTermList').then((response) => {
      const res = response.data;

      if (res.data && res.data.length) {
        this.setState({
          termList: res.data
        });
      }
    });
  }

  componentDidMount () {
    if (this.props.match.params.experimentId) {
      Axios.get('/experiment/getExperimentData', {
        params: {
          experimentId: this.props.match.params.experimentId
        }
      }).then(res => {
        res = res.data;

        console.log((_.pick(res.data, ['experiment_id', 'experiment_title', 'term_id', 'chapter_id', 'term_id'])))

        if (res.success) {
          this.field.setValues(
            Object.assign({}, _.pick(res.data, ['experiment_id', 'experiment_title', 'term_id', 'chapter_id', 'exam_id']), {
              experiment_content: BraftEditor.createEditorState(res.data['experiment_content'])
            })
          )
        } else {

        }
      });
    } else {
      this.field.setValue('experiment_content', BraftEditor.createEditorState(null));
    }
  }

  handleSubmit = () => {
    this.field.validate((errors, value) => {
      if (errors) {
        console.log(errors);
      } else {
        value['experiment_content'] = value['experiment_content'].toHTML();

        if (!value['experiment_title']) {
          Message.error("不能为空");
        }

        const url = value['experiment_id'] ? '/experiment/update' : '/experiment/create';

        Axios.post(url, value).then(res => {
          res = res.data;

          if (res.success) {
            Message.success({
              content: res.message,
              afterClose: () => {
                this.props.history.push('/experiment/list');
              }
            })
          }
        });
      }
    });
  }

  render() {
    const { init, getValue } = this.field;
    const { examList, termList } = this.state;

    return (
      <Form style={{width: '100%'}} {...formItemLayout} >
        <FormItem label="标题">
          <Input
            style={{width: 300}}
            {...init('experiment_title', {
              initValue: '',
              rules: [{
                ruquired: true,
                message: '文章标题不能为空'
              }]
            })}
          />
        </FormItem>
        <FormItem label="文章内容">
          <BraftEditor
            value={BraftEditor.createEditorState(getValue('experiment_content'))}
            style={{backgroundColor: '#fff'}}
            onChange={(editorState) => {
              this.field.setValue('experiment_content', BraftEditor.createEditorState(editorState));
            }}
          />
        </FormItem>
        <FormItem label="所属学期">
          <CascaderSelect
            style={{width: 300}}
            defaultValue={getValue('chapter_id')}
            onChange={(value, data, extra) => {
              this.field.setValues({
                term_id: value,
                chapter_id: extra.selectedPath[0].value
              })
            }}
            dataSource={termList}
          />
        </FormItem>
        <FormItem label="关联试卷">
          <Select
            style={{width: 300}}
            {...init('exam_id', {
              initValue: '',
              rules: [{
                ruquired: true,
                message: '关联试卷不能为空'
              }]
            })}
          >
            {examList.map(item => {
              return (
                <Select.Option key={item} value={item.examId}>
                  {item.exam_name}
                </Select.Option>
              );
            })}
          </Select>
        </FormItem>
        <FormItem label=" ">
          <Form.Submit type="primary" onClick={this.handleSubmit}>确认</Form.Submit>
        </FormItem>
      </Form>
    );
  }
}
