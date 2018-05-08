
import React, { Component } from 'react';
import { Link } from 'react-router';
import MyMenu from "../../components/MyMenu";
import IconText from '../../components/IconText';
import { Layout, Carousel, Row, Col, Avatar, Icon } from 'antd';
import { List, Spin } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const { Header, Sider, Content, Footer } = Layout;
const { Item } = List;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
      current: '',
      menus: [],
      list: [],
      loading: false,
      loadingMore: false,
      showLoadingMore: true,
    }
    this.timer = 0;
    this.request = null;
  }
  componentDidMount() {
    this.setState({ loading: true, });
  }

  renderBanner() {
    return this.state.banner.map((e, id) => {
      return (
        <img src={e} key={id} />
      )
    })
  }


  render() {
    const { banner, menus } = this.state;

    return (
      <Layout className="app">
        <Carousel>
          {
            banner.length > 0 &&
            this.renderBanner()
          }
        </Carousel>
        {/* <div className="menu" >
          {
            menus.length > 0 && (<MyMenu menus={menus} context={this} />)
          }
        </div> */}
        <div>
          {this.props.children}
        </div>
        <Footer>
          Vin Coder ©2018 Created by Vin_Coder
        </Footer>
      </Layout>
    )
  }
}
