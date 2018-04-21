
import React, { Component } from 'react';
import { Link } from 'react-router';
import MyMenu from "../../components/MyMenu";
import MyForm from '../../components/LoginForm';
import IconText from '../../components/IconText';
import { Layout, Carousel, Row, Col, Avatar, Icon } from 'antd';
import { List, Spin } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';

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
    this.request = null;
  }
  componentDidMount() {
    this.setState({ loading: true, });
    this.setState({
      banner: [
        '/statics/img/slide1.jpg',
        '/statics/img/slide2.jpg',
        '/statics/img/slide1.jpg',
        '/statics/img/slide2.jpg',
      ],
      menus: [{
        categoryId: 1,
        menu: "total",
        hasChildren: 0,
        subMenu: []
      }, {
        categoryId: 2,
        menu: "react",
        hasChildren: 1,
        subMenu: [{
          title: "virtualDOM",
          url: "/react/virtualDOM"
        }, {
          title: "diffAgorism",
          url: "/react/diffAgorism"
        }]
      }, {
        categoryId: 3,
        menu: "html",
        hasChildren: 0,
        subMenu: []
      }, {
        categoryId: 4,
        menu: "css",
        hasChildren: 0,
        subMenu: []
      }]
    })
    /*
    let request = [
      axios.get('/api/ajax/carousel'),
      axios.get('/api/ajax/menu'),
      axios.get('/api/ajax/list'),
    ];

    this.request = axios.all(request)
      .then(axios.spread((a, b, c) => {
        this.setState({
          banner: a.data.data.list,
          menus: b.data.data.list,
          list: c.data.data.list,
          loading: false,
        })
      }))
    */

    axios.get('/api/ajax/list', { tag: 'javascript', isPublish: true }).then(response => {
      let list = response.data.data.list;
      console.log(list);

      this.setState({ list, loading: false });


    }).catch(err => {
      console.log(err);
    })
  }

  renderBanner() {
    return this.state.banner.map((e, id) => {
      return (
        <img src={e} key={id} />
      )
    })
  }

  onLoadMore() {
    alert('no more data');
  }

  render() {
    const { banner, list, menus } = this.state;
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
            banner.length > 0 &&
            this.renderBanner()
          }
        </Carousel>
        <div className="menu" >
          {
            menus.length > 0 && (<MyMenu menus={menus} />)
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
                    key={item.id}
                    actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                    extra={<img width={272} alt="logo" src={item.image} />}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<Link to={`frontEnd/details/${item.id}`}>{item.title}</Link>}
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
