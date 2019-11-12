import React from 'react';
import styles from './index.module.scss';

const LoginIntro = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>高中化学自主学习平台</div>
        <p className={styles.description}>面向教师、学生和家长</p>
        <p className={styles.description}>支持在线拓展阅读和视频学习</p>
        <p className={styles.description}>支持在线实验设计</p>
      </div>
    </div>
  );
};


export default LoginIntro;
