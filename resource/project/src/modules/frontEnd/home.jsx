
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
      current: '',
      list: [],
      menus: [],
      loading: false,
      loadingMore: false,
      showLoadingMore: true,
    }
    this.timer = 0;
    this.request = null;
  }
  componentDidMount() {
    this.setState({ loading: true, }, this.getArticleList());
    this.getAllTags();
  }

  getAllTags() {
    axios.get('/api/ajax/getTags').then(response => {
      let tags = response.data.data;
      this.setState({ menus: tags });
    }).catch(err => {
      throw new Error(err);
    })
  }



  getArticleList() {
    axios.get('/api/ajax/list?isPublish=true').then(response => {
      let list = response.data.data.list;
      console.log(list);
      this.setState({ list, loading: false });
    }).catch(err => {
      throw new Error(err);
    })
  }

  onLoadMore() {
    alert('no more data');
  }

  render() {
    const { list, menus } = this.state;
    const { loading, loadingMore, showLoadingMore, list: _data } = this.state;

    const loadMore = showLoadingMore ? (
      <div className="loader-btn">
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore.bind(this)}>查看更多</Button>}
      </div>
    ) : null;

    return (
      <Layout>
        <div className="menu" >
          {
            menus.length > 0 && (<MyMenu menus={menus} list={this.state.list} context={this} />)
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
                    key={item._id}
                    actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                    extra={<img width={272} alt="logo" src={item.image} />}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<Link to={`frontEnd/details/${item._id}`}>{item.title}</Link>}
                      description={item.description}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}
