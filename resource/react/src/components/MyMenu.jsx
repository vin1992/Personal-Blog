import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;

export default class MyMenu extends Component {
  static propTypes = {
    menus: PropTypes.array,
  }

  static defaultProps = {
    menus: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      current: '',
    }
  }

  handleRoute(route) {
    console.log(route, this.props);
    location.href = location.protocol + '//' + location.host + route;
  }

  renderParent(list) {
    console.log(list);
    return list.map((e, id) => {
      return (
        <MenuItem key={id} >
          <Link to={`/details/${e.categoryId}`} >{e.menu}</Link>
        </MenuItem>
      )
    })
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    let list = this.props.menus;

    return (
      <Menu
        // onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        {list.length > 0 && this.renderParent(list)}
      </Menu>
    )
  }


}
