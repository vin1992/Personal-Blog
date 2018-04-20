
import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import MyMenu from "../../components/MyMenu";
import MyForm from '../../components/LoginForm';
import IconText from '../../components/IconText';
import { Layout, Carousel, Row, Col, Avatar, Icon } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import Filter from '../../support/filter';

const FormItem = Form.Item;
const { Header, Sider, Content, Footer } = Layout;
const WrappedNormalLoginForm = Form.create()(MyForm);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
      current: '',
      menus: [],
      details: {},
    }
  }

  componentDidMount() {
    let request = [
      axios.get('/blog/ajax/carousel'),
      axios.get('/blog/ajax/menu'),
      axios.get('/blog/ajax/details', { id: 200 }),
    ];

    this.request = axios.all(request)
      .then(axios.spread((a, b, c) => {
        console.log(c, 'details');
        this.setState({
          banner: a.data.data.list,
          menus: b.data.data.list,
          details: c.data.data.data,
        })
      }))
  }

  renderBanner() {
    return this.state.banner.map((e, id) => {
      return (
        <img src={e} key={id} />
      )
    })
  }

  render() {
    let { banner, menus, details } = this.state;

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
        <Content className="details">
          <Row>
            <Col span={12} offset={5}>
              {details && (
                <article>
                  <div className="art-head">
                    <h1>{details.title}</h1>
                    <small>author:{details.author}</small>
                    <small>write in:{Filter.formatDate(details.createTime)} </small>
                  </div>
                  <div className="art-content">
                    <p>{details.content}</p>
                  </div>
                </article>
              )}

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
