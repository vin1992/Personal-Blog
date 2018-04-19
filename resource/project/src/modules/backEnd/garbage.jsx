import React, { Component } from 'react';
import { List, Avatar, Button, Spin } from 'antd';
import { Link, Redirect } from 'react-router';

export default class Garbage extends Component {
  state = {}

  render() {
    const data = [{
      name: '哈哈',
    }, {
      name: '哈哈',
    }, {
      name: '哈哈',
    }]
    return (
      <List
        className="demo-loadmore-list"
        dataSource={data}
        renderItem={item => (
          <List.Item actions={[<Link to={`/backEnd/create`}>恢复</Link>, <Link to={`/backEnd/articleDetails/${111}`}>彻底删除</Link>]}>
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