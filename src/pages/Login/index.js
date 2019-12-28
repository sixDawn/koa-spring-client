import React from 'react';
import { connect } from 'dva';
import { Form, Button } from 'antd';
import { formRender } from 'antd-doddle';
import { bind } from 'antd-doddle/decorator';
import { fields } from './fields';
import './index.less';

let FormRender;
// 表单通用格式
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const back = 'https://doddle.oss-cn-beijing.aliyuncs.com/images/back.jpg';
@connect(({ login }) => ({ ...login }), dispatch => ({
  login(payload) {
    dispatch({ type: 'login/login', payload });
  }
}))

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { getFieldDecorator } = props.form;
    FormRender = formRender({
      getFieldDecorator,
      formItemLayout
    });
  }

  @bind
  handleLogin() {
    const { login, form: { validateFields } } = this.props;
    validateFields((errors, values) => {
      if (errors) {
        return;
      }
/*       fetch('http://localhost:4001/user/login', {
        method: 'POST',
        body: 'name=dom&pwd=123456',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error('请求错误'));
      })
        .then(data => console.log('json:', data))
        .catch(error => console.error('error:', error)); */
      login(values);
    });
  }

  render() {
    const { siteName, loading } = this.props;

    return (
      <div
        className="h-login-frame-viewport"
        style={{
          backgroundImage: `url(${back})`,
          backgroundPosition: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100%'
        }}
      >
        <div className="h-login-outer-logo">
          <div>
            <span>{siteName}</span>
            <span className="h-login-welcome">欢迎您</span>
          </div>
        </div>
        <div className="h-login-form">
          <h3 className="h-login-logo">系统登录</h3>
          <Form>
            {fields.map(field => <FormRender key={field.key} field={field} />)}
            <div style={{ textAlign: 'center' }}>
              <Button loading={loading.login} style={{ width: '100%' }} type="primary" onClick={this.handleLogin}>
                登录
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create({})(Login);
