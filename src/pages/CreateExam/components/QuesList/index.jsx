import React from 'react';
import { Radio, Checkbox } from '@alifd/next';

import IceContainer from '@icedesign/container/lib/IceContainer';

import styles from './index.module.scss';

export default class QuesList extends React.Component {

  renderSingleChooseQues = (ques, index) => {
    const { title, options, answer } = ques;

    return (
      <IceContainer className={styles.quesContainer}>
        <p className={styles.quesTitle}>{index + 1}. {title}</p>
        <div className={styles.optionsContainer}>
          <Radio.Group itemDirection="ver" value={answer}>
            {options.map((option, index) => {
              return <Radio value={option.identifier}>{option.content}</Radio>;
            })}
          </Radio.Group>
        </div>
      </IceContainer>
    )
  }

  renderMultipleChooseQues = (ques, index) => {
    const { title, options, answer } = ques;

    return (
      <IceContainer className={styles.quesContainer}>
        <p className={styles.quesTitle}>{index + 1}. {title}</p>
        <div className={styles.optionsContainer}>
          <Checkbox.Group itemDirection="ver" value={answer}>
            {options.map((option, index) => {
              return (
                <Checkbox value={option.identifier}>{option.content}</Checkbox>
              );
            })}
          </Checkbox.Group>
        </div>
      </IceContainer>
    )
  }

  renderJudgeQues = (ques, index) => {
    const { title, answer } = ques;

    return (
      <IceContainer className={styles.quesContainer}>
        <p className={styles.quesTitle}>{index + 1}. {title}</p>
        <div className={styles.optionsContainer}>
          <Radio.Group value={answer} readonly>
            <Radio value={true}>正确</Radio>
            <Radio value={false}>错误</Radio>
          </Radio.Group>
        </div>
      </IceContainer>
    )
  }

  renderQues = (ques, index) => {
    const { type } = ques;


    if (type === 'judge') {
      return this.renderJudgeQues(ques, index);
    }

    if (type === 'singleChoose') {
      return this.renderSingleChooseQues(ques, index);
    }

    if (type === 'multipleChoose') {
      return this.renderMultipleChooseQues(ques, index);
    }

    return null;
  }

  render() {
    return (
      <div>
        {this.props.quesList.map((ques, index) => {
          return this.renderQues(ques, index);
        })}
      </div>
    );
  }
}