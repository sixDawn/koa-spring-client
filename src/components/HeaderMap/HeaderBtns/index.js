import React from 'react';
import { Menu, Icon, Dropdown } from 'antd';
import styles from './index.less';

const MenuItem = Menu.Item;

function HeaderBtns({ username, onLogout }) {
  function getMenu() {
    return (
      <Menu>
        <MenuItem>
          <a onClick={onLogout}>
            退出登录
          </a>
        </MenuItem>
      </Menu>
    );
  }
  return (
    <div className={styles.controls}>
      <Dropdown overlay={getMenu()} className={styles.btns}>
        <a className="ant-dropdown-link">
          <Icon type="user" />
          <span className={styles.username}>{username}</span>
        </a>
      </Dropdown>
    </div>
  );
}

export default React.memo(HeaderBtns);
