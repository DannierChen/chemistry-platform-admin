import React from 'react';

import { Dialog, Field, Form, Input, Table, Select, Message, Button } from '@alifd/next';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    fixedSpan: 10
  },
  labelAlign: 'top',
  wrapperCol: {
    span: 14
  }
};

const ENGLIST_INDEX = ['A', 'B', 'C', 'D'];

export default class SingleChooseQues extends React.Component {
  field = new Field(this);

  state = {
    options: []
  }

  // TODO: 校验每个选项不能为空
  handleSubmit = () => {
    this.field.validate((errors, values) => {
      if (errors) {
        return;
      }

      const { options } = this.state;

      if (!errors && options.length < 2) {
        Message.error('至少添加两个答案选项');
        return;
      }

      const { type, handleSubmit } = this.props;

      handleSubmit(Object.assign({}, values, {
        type,
        options
      }));
    })
  };

  handleAddOptionClick = () => {
    this.setState(prevState => {
      const options = prevState.options;

      if (options.length === 4) {
        Message.warning('最多添加4个选项');
        return;
      }

      options.push({
        content: '',
        identifier: ENGLIST_INDEX[options.length]
      });

      if (options.length === 1) {
        this.field.setValue('answer', 'A');
      }

      return {
        options
      }
    });
  }

  handleOptionContentChange = (index, content) => {
    this.setState(prevState => {
      const options = prevState.options;

      for (let i = 0; i < options.length; i++) {
        if (i === index) {
          options[i].content = content;
          break;
        }
      }

      return {
        options
      }
    })
  }

  renderOptionContent = (content, index) => {
    return <Input defaultValue={content} onChange={this.handleOptionContentChange.bind(this, index)} />
  }

  render() {
    const { init } = this.field;
    const { type } = this.props;
    const { options } = this.state;

    return (
      <Dialog
        visible
        title="添加题目"
        footer={<div><Button type="primary" onClick={this.handleSubmit}>确认</Button></div>}
        onClose={() => {
          this.props.handleClose(this.props.type);
        }}
      >
        <Form field={this.field} style={{ width: 600 }} {...formItemLayout}>
          <FormItem label="题目">
            <Input.TextArea {...init('title', {
              rules: [{ required: true, message: '题目描述不能为空' }]
            })} placeholder="题目描述" />
          </FormItem>

          <FormItem label="答案选项">
            <Button type="primary" onClick={this.handleAddOptionClick}>添加选项</Button>
            <Table style={{ marginTop: 16 }} dataSource={options}>
              <Table.Column title="序号" width="20%" dataIndex="identifier" />
              <Table.Column title="内容" width="80%" dataIndex="content" cell={this.renderOptionContent} />
            </Table>
          </FormItem>

          <FormItem label="正确答案">
            <Select
              mode={type === 'multipleChoose' ? 'multiple' : 'single'}
              {...init('answer', {
                defaultValue: options[0] && options[0].identifier
              })}
            >
              {options.map(option => {
                return <Select.Option value={option.identifier}>{option.identifier}</Select.Option>
              })}
            </Select>
          </FormItem>
        </Form>
      </Dialog>
    );
  }
}