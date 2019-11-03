import React from 'react';

import { Dialog, Field, Form, Input, Radio, Button } from '@alifd/next';

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

export default class JudgeQues extends React.Component {
  field = new Field(this);

  // TODO: 校验每个选项不能为空
  handleSubmit = () => {
    this.field.validate((errors, values) => {
      if (errors) {
        return;
      }

      this.props.handleSubmit(Object.assign({}, values, {
        type: 'judge'
      }));
    })
  };

  render() {
    const { init } = this.field;

    return (
      <Dialog
        visible
        title="判断题"
        footer={<div><Button type="primary" onClick={this.handleSubmit}>确认</Button></div>}
        onClose={() => {
          this.props.handleClose('judge');
        }}
      >
        <Form field={this.field} style={{ width: 600 }} {...formItemLayout}>
          <FormItem label="题目描述">
            <Input.TextArea {...init('title', {
              rules: [{ required: true, message: '题目描述不能为空' }]
            })} placeholder="题目描述" />
          </FormItem>
          <FormItem label="正确答案">
            <Radio.Group {...init('answer', {
              initValue: true
            })}>
              <Radio value={true}>对</Radio>
              <Radio value={false}>错</Radio>
            </Radio.Group>
          </FormItem>
        </Form>
      </Dialog>
    );
  }
}