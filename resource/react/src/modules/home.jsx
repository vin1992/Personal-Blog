
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import MyMenu from "../components/MyMenu";
import MyForm from '../components/NormalLoginForm';
const WrappedNormalLoginForm = Form.create()(MyForm);

import { Layout, Carousel, Row, Col, Avatar, Icon } from 'antd';
import { List, Spin } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';

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
  }

  componentDidMount() {
    console.log(List);
    let res = [
      '/statics/img/slide1.jpg',
      '/statics/img/slide2.jpg',
    ];
    let data =
      [{
        menu: "total",
        route: "/",
        hasChildren: 0,
        subMenu: []
      }, {
        menu: "react",
        route: "/react",
        hasChildren: 1,
        subMenu: [{
          title: "virtualDOM",
          url: "/react/virtualDOM"
        }, {
          title: "diffAgorism",
          url: "/react/diffAgorism"
        }]
      }, {
        menu: "html",
        route: "/html",
        hasChildren: 0,
        subMenu: []
      }, {
        menu: "css",
        route: "/css",
        hasChildren: 0,
        subMenu: []
      }]

    const list = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
    ];





    this.setState({
      banner: res,
      menus: data,
      list: list,
    })
  }

  renderBanner() {
    return this.state.banner.map((e, id) => {
      return (
        <img src={e} key={id} />
      )
    })
  }


  renderMenu() {

  }

  getFakeData = () => {
    var list = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
    ];
    return function () {
      list = list.concat(list);
      this.setState({ loadingMore: true });
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({
          list: list,
        }, () => {
          this.setState({
            loading: false,
            loadingMore: false,
          })
        });
      }, 500);
    }
  }

  FakeRequest = this.getFakeData();

  onLoadMore() {
    this.FakeRequest();
  }

  render() {
    let banners = this.state.banner;
    let list = this.state.menus;
    const { loading, loadingMore, showLoadingMore, list: _data } = this.state;

    const loadMore = showLoadingMore ? (
      <div className="loader-btn">
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore.bind(this)}>查看更多</Button>}
      </div>
    ) : null;

    return (
      <Layout>
        <Carousel autoplay>
          {
            banners.length > 0 &&
            this.renderBanner()
          }
        </Carousel>
        <div className="menu" >
          {
            list.length > 0 && (<MyMenu menus={list} />)
          }
        </div>
        <Content >
          <Row>
            <Col span={12} offset={5}>
              <List
                itemLayout="horizontal"
                dataSource={_data}
                loading={loading}
                itemLayout="horizontal"
                loadMore={loadMore}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            </Col>
            <Col span={6} >
              <div className="form-wrapper">
                <WrappedNormalLoginForm />

              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}
