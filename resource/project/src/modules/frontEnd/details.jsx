
import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import MyMenu from "../../components/MyMenu";
import IconText from '../../components/IconText';
import { Layout, Carousel, Row, Col, Avatar, Icon } from 'antd';
import Filter from '../../support/filter';

const { Header, Sider, Content, Footer } = Layout;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
      current: '',
      details: {},
    }
  }

  componentDidMount() {
    console.log(this.props, 'props');
    let art_id = this.props.router.params.categoryId;
    this.setState({ loading: true }, this.getArticleDetails(art_id));
  }

  getArticleDetails(id) {
    axios.get(`/api/ajax/details?id=${id}`).then(res => {
      console.log(res);
      let details = res.data.data;
      this.setState({ details });
    }).catch(err => {
      throw new Error(err);
    })
  }

  render() {
    let { details } = this.state;

    return (
      <Layout>
        <Content className="details">
          <Row>
            <Col span={12} offset={5}>
              {details && (
                <article>
                  <div className="art-head">
                    <h1>{details.title}</h1>
                    <small>author:{details.author}</small>
                    <small>write in:{Filter.formatDate(details.time)} </small>
                  </div>
                  <div className="art-content">
                    <p>{details.content}</p>
                  </div>
                </article>
              )}

            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}
