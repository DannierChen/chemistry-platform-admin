import React from 'react';
import Layout from '@icedesign/layout';
import cx from 'classnames';
import Logo from '../Logo';
import styles from './index.module.scss';

export default function Footer({ className, style }) {
  return (
    <Layout.Footer
      className={cx(styles.iceLayoutFooter, className)}
      style={{
        ...style,
        backgroundColor: 'transparent',
        lineHeight: '36px',
      }}
    >
      <div className={styles.iceLayoutFooterBody}>
        <div style={{ filter: 'grayscale(100%)', opacity: 0.3 }}>
          <Logo style={{ color: '#666' }} />
        </div>
      </div>
    </Layout.Footer>
  );
}
