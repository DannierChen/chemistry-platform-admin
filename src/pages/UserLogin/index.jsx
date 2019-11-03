import React, { useState, useRef } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Checkbox, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import FoundationSymbol from '@icedesign/foundation-symbol';

import Axios from 'axios';

import styles from './index.module.scss';

function UserLogin(props) {
  const [formValue, setFormValue] = useState({
    userName: '',
    userPass: '',
  });
  const formEl = useRef(null);

  const formChange = (value) => {
    setFormValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formEl.current.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      Axios.post('/user/login', values).then(res => {
        res = res.data;

        if (!res.success) {
          Message.error(res.message);
        } else {
          props.history.push('/');
        }
      });
    });
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>登 录</h4>
      <IceFormBinderWrapper
        value={formValue}
        onChange={formChange}
        ref={formEl}
      >
        <div className={styles.formItems}>
          <div className={styles.formItem}>
            <FoundationSymbol type="person" size="small" className={styles.inputIcon} />
            <IceFormBinder name="userName" required message="必填">
              <Input
                maxLength={20}
                placeholder="用户名"
                className={styles.inputCol}
              />
            </IceFormBinder>
            <IceFormError name="username" />
          </div>

          <div className={styles.formItem}>
            <FoundationSymbol type="lock" size="small" className={styles.inputIcon} />
            <IceFormBinder name="userPass" required message="必填">
              <Input
                htmlType="password"
                placeholder="密码"
                className={styles.inputCol}
              />
            </IceFormBinder>
            <IceFormError name="password" />
          </div>

          <div className={styles.footer}>
            <Button
              type="primary"
              onClick={handleSubmit}
              className={styles.submitBtn}
            >
              登 录
            </Button>
            <Link to="/user/register" className={styles.tips}>
              立即注册
            </Link>
          </div>
        </div>
      </IceFormBinderWrapper>
    </div>
  );
}

export default withRouter(UserLogin);
