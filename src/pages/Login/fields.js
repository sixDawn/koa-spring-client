import React from 'react';
import { Input } from 'antd';

const { Password } = Input;

export const fields = [{
  key: 'name',
  name: '账号',
  required: true,
  maxLength: 25,
}, {
  key: 'pwd',
  name: '密码',
  required: true,
  type: 'selfDefine',
  child: () => <Password placeholder="请输入密码" />
}];

export const code = {
  key: 'code',
  name: '验证码',
  required: true,
  style: {
    width: '150px'
  },
};
