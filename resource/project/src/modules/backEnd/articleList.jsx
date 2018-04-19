import React, { Component } from 'react';
import { List, Avatar, Button, Spin } from 'antd';
import { Link, Redirect } from 'react-router';


export default class ArticleList extends Component {

  render() {
    const data = [{
      name: '站三',
    }, {
      name: '里斯',
    }, {
      name: '王五',
    }, {
      name: '赵六',
    }]
    return (
      <List
        className="demo-loadmore-list"
        dataSource={data}
        renderItem={item => (
          <List.Item actions={[<Link to={`/backEnd/create`}>编辑</Link>, <Link to={`/backEnd/articleDetails/${111}`}>更多</Link>]}>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<Link to={`/backEnd/articleDetails/${111}`}>{item.name}</Link>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    )
  }
}