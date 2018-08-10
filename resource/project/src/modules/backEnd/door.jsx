import React, { Component } from 'react';
import { Layout } from 'antd';
import axios from 'axios';

export default class Door extends Component {
  componentDidMount() {
    // 判断 当前session中是否存在用户信息，否就跳到登录页
    axios.get('/api/admin/user/userInfo').then(response => {
      if (response.code == 1) {
        this.props.router.push({ pathname: '/login' });
      } else {
        this.props.router.push({ pathname: '/backEnd/home' });
      }
    }).catch(err => {
      this.props.router.replace({ pathname: '/login' });
    });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }} className="home">
        <div>{this.props.children}</div>
      </Layout>
    )
  }
}

