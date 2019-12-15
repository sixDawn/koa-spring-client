/* eslint-disable react/button-has-type */
import React from 'react';
import { model } from 'antd-doddle/decorator';
import style from './index.less';

@model('index')
export default class Index extends React.PureComponent {
  login = () => {
    const { _login } = this.props;
    _login({ name: 'dom', pwd: 'dom456' });
  }

  render() {
    const { error, loading, _add, _subtract, count, user } = this.props;
    if (error) {
      return <div>{error.msg}</div>;
    }
    return (
      <div className={style.Action}>
        <div className="block">
          <h3>操作测试</h3>
          <div>
            <div>
              <button onClick={_add}>加1</button>
              <button onClick={_subtract}>减1</button>
            </div>
            <div>
              <span>计数:{count}</span>
            </div>
          </div>
        </div>
        <div className="block">
          <h3>请求测试</h3>
          <div>
            <div>
              <button onClick={this.login}>login</button>
            </div>
            <div>
              {loading.login ? <span>请求中</span> : <span>{user.name ? user.name : '未登录'}</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
