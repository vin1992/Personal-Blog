import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;

export default class MyMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: '',
      list: this.props.list,
    }

  }
  componentDidMount() {
    console.log(this.props);
  }

  renderParent(list) {
    return list.map((e, id) => {
      return (
        <MenuItem key={id} >
          <a href="javascript:void 0" onClick={this.getArticleListById.bind(this, e)} >{e.name}</a>
        </MenuItem>
      )
    })
  }

  getArticleListById(item) {
    axios.get(`/api/ajax/list?isPublish=true&tag=${item.name}`).then(response => {
      let list = response.data.data.list;
      console.log('dsd', response);
      this.props.context.setState({
        list: list,
      });
    })
    console.log(item.name, 'aaa');
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }


  render() {
    let menus = this.props.menus;
    return (
      <Menu
        // onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        {menus.length > 0 && this.renderParent(menus)}
      </Menu>
    )
  }


}
