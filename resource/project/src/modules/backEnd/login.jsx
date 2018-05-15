import React, { Component } from 'react';
import { Form, Icon, Input, Button, Layout } from 'antd';

const FormItem = Form.Item;


export default class Login extends Component {
  state = {

  }

  render() {
    return (
      <Layout className="login">
        <Form layout="inline" onSubmit={this.handleSubmit} className="login-box">
          <FormItem>
            <Input placeholder="用户名" type="text" value={this.state.user} />
          </FormItem>
          <FormItem>
            <Input placeholder="密码" type="password" value={this.state.password} />
          </FormItem>
          <FormItem>
            <Button type="primary">登录</Button>
          </FormItem>
        </Form>
      </Layout>
    )
  }
}

