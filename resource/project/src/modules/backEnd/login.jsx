import React, { Component } from 'react';
import { Form, Icon, Input, Button, Layout } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;


export default class Login extends Component {
  state = {
    user: '',
    password: ''
  }

  componentDidMount() {
    console.log(this.props, 'sss');
    this.setState({});
  }

  register() {
    let { user, password } = this.state;
    axios.post(`/api/admin/user/register`, { user, password }).then(response => {
      // todo
      alert('注册成功');
      this.props.router.push({ pathname: '/backEnd/home' });
    }).catch(err => { throw new Error(err); alert('注册失败'); })
  }

  login() {
    let { user, password } = this.state;
    axios.get(`/api/admin/user/login?user=${user}&password=${password}`).then(response => {
      alert('登陆成功');
      this.props.router.push({ pathname: '/backEnd/home' });
      console.log(this.props, 'sss');
    }).catch(err => { throw new Error(err); })
  }

  render() {
    console.log('渲染');
    return (
      <Layout className="login">
        <Form layout="inline" onSubmit={this.handleSubmit} className="login-box">
          <FormItem>
            <Input placeholder="用户名" type="text" value={this.state.user} onChange={(e) => { this.setState({ user: String(e.target.value).trim() }) }} />
          </FormItem>
          <FormItem>
            <Input placeholder="密码" type="password" value={this.state.password} onChange={(e) => { this.setState({ password: String(e.target.value).trim() }) }} />
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.login.bind(this)}>登录</Button>
            <Button className="register" onClick={this.register.bind(this)}>注册</Button>
          </FormItem>
        </Form>
      </Layout>
    )
  }
}

