
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyMenu from "../components/MyMenu";
import MyForm from '../components/NormalLoginForm';
import IconText from '../components/IconText';
import { Layout, Carousel, Row, Col, Avatar, Icon } from 'antd';
import { List, Spin } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;
const { Header, Sider, Content, Footer } = Layout;
const { Item } = List;
const WrappedNormalLoginForm = Form.create()(MyForm);

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

    var list = [
      {
        href: 'http://ant.design',
        title: `ant design part 1`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      }
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
    var list = [];
    for (let i = 0; i < 5; i++) {
      list.push({
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      });
    }

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
        <Carousel>
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
        <Content className="home" >
          <Row>
            <Col span={12} offset={5}>
              <List
                size="Large"
                itemLayout="vertical"
                dataSource={_data}
                loading={loading}
                loadMore={loadMore}
                renderItem={item => (
                  <List.Item
                    key={item.title}
                    actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                    extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<Link to={'/details'}>{item.title}</Link>}
                      description={item.description}
                    />
                    {item.content}
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
        <Footer>
          Vin Coder ©2018 Created by Vin_Coder
        </Footer>
      </Layout>
    )
  }
}
