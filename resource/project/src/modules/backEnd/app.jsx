import React, { Component } from 'react';
import { Link, Redirect } from 'react-router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
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

  LinkToSomeWhere(d) {
    console.log(d);
    if (d == 1) {
      location.href = 'http://127.0.0.1:1024/frontEnd/';
    }
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }} className="home">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span onClick={this.LinkToSomeWhere.bind(this, 1)}>
                我的博客
              </span>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={`/backEnd/create/`}>
                <Icon type="desktop" />
                <span onClick={this.LinkToSomeWhere.bind(this, 2)}>发布文章</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>文章管理</span></span>}
            >
              <Menu.Item key="3"><Link to={`/backEnd/articleList`}>查看</Link></Menu.Item>
              <Menu.Item key="4"><Link to={`/backEnd/delete`}>删除</Link></Menu.Item>
              <Menu.Item key="5"><Link to={`/backEnd/garbage`}>垃圾桶</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>权限管理</span></span>}
            >
              <Menu.Item key="6"><Link to={`/backEnd/logger`}>登录日志</Link></Menu.Item>
              <Menu.Item key="8"><Link to={`/backEnd/access`}>用户权限</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Link to={`/backEnd/person`}>
                <Icon type="file" />
                <span>个人主页</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>发布文章</Breadcrumb.Item>
              {/* <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Vin Coder ©2018 Created by Vin_Coder
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

