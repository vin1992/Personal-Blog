import React, { Component } from 'react';
import { Link, Redirect } from 'react-router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;



export default class Home extends Component {
  state = {
    collapsed: false
  }

  render() {
    return (
      <h1>我的博客</h1>
    )
  }
}

