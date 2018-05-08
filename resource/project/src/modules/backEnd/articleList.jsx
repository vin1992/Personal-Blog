import React, { Component } from 'react';
import { List, Avatar, Button, Spin } from 'antd';
import { Link, Redirect } from 'react-router';
import axios from 'axios';
import { Table, Icon, Divider } from 'antd';
import Filter from '../../support/filter';

export default class ArticleList extends Component {

  state = {
    list: []
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    axios.get('/api/admin/article/list?getDel=false').then(res => {
      let list = res.data.data.list;
      this.setState({ list });
      console.log(this.state.list, '2121');
    }).catch(err => {
      console.error(err);
    })
  }
  modifyArticle(id) {
    console.log('修改id', id)
    axios.post(`/api/admin/article/modify`).then(res => {
      console.log(res)
      this.getList();
    }).catch(err => {
      console.log(err);
    })
  }

  removeArticle(id) {
    axios.get(`/api/admin/article/remove?id=${id}`).then(res => {
      console.log(res)
      this.getList();
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    let list = this.state.list;
    return (
      <table className="article-list">
        <thead>
          <tr>
            <td>标题</td>
            <td>作者</td>
            <td>创建时间</td>
            <td>分类</td>
            <td>是否发布</td>
            <td>浏览数量</td>
            <td>评论数量</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>

          {list.length > 0 && (
            list.map((item, id) => {
              return (<tr key={id}>
                <td><Link to={`/backEnd/articleDetails/${item._id}`}>{item.title}</Link></td>
                <td>{item.author}</td>
                <td>{Filter.formatDate(item.time)}</td>
                <td>{item.tag}</td>
                <td>{item.isPublish ? '是' : '否'}</td>
                <td>{item.viewCount}</td>
                <td>{item.commentCount}</td>
                <td className="art-option">
                  <Link to={`/backEnd/modify/${item._id}`}>修改</Link>
                  <span onClick={this.removeArticle.bind(this, item._id)}>移入回收站</span>
                </td>
              </tr>)
            })
          )}

          {
            list.length == 0 && (
              <tr>
                <td colSpan="7">No Data</td>
              </tr>
            )
          }
        </tbody>

      </table>
    )

  }
}