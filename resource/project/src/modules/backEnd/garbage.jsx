import React, { Component } from 'react';
import { List, Avatar, Button, Spin } from 'antd';
import { Link, Redirect } from 'react-router';
import axios from 'axios';

export default class Garbage extends Component {
  state = {
    list: [],
  }

  componentDidMount() {
    this.getRemoveList();
  }

  getRemoveList() {
    axios.get('/api/admin/article/list?getDel=true').then(res => {
      let list = res.data.data.list;
      this.setState({ list });
      console.log(this.state.list, '2121');
    }).catch(err => {
      console.error(err);
    })
  }

  // 恢复
  recover(id) {
    axios.get(`/api/admin/article/recover?id=${id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        this.getRemoveList();
      })
  }

  // 彻底删除
  deleteArticle(id) {
    axios.get(`/api/admin/article/delete?id=${id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        this.getRemoveList();
      })
  }


  render() {
    let data = this.state.list;

    return (
      <List
        className="demo-loadmore-list"
        dataSource={data}
        renderItem={item => (
          <List.Item actions={[<div onClick={this.recover.bind(this, item._id)}>恢复</div>, <div onClick={this.deleteArticle.bind(this, item._id)}>彻底删除</div>]}>
            <List.Item.Meta
              title={<Link to={`/backEnd/home/articleDetails/${item._id}`}>{item.title}</Link>}
              description={item.content}
            />
          </List.Item>
        )}
      />
    )
  }
}