import React from 'react';
import { Icon, Layout } from 'antd';
import HeaderBtns from './HeaderBtns';
import styles from './index.less';

const { Header } = Layout;

function HeaderMap({ collapsed, onToggle, username, onLogout }) {
  return (
    <Header className={styles.header}>
      <HeaderBtns username={username} onLogout={onLogout} />
      <Icon
        className="trigger"
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={onToggle}
      />
    </Header>
  );
}

export default React.memo(HeaderMap);
