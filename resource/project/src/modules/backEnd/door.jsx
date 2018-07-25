import React, { Component } from 'react';
import { Link, Redirect } from 'react-router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


export default class App extends Component {
  state = {
    collapsed: false
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  componentDidMount() {
    // 判断 当前session中是否存在用户信息，否就跳到登录页
    axios.get('/api/admin/user/userInfo').then(response => {
      if (response.code == 1) {
        this.props.router.push({ pathname: '/backEnd/login' });
      } else {
        this.props.router.push({ pathname: '/backEnd/home' });
      }
    }).catch(err => {
      this.props.router.replace({ pathname: '/backEnd/login' });
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

