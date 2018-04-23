import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;

export default class MyMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: '',
    }
  }


  renderParent(list) {
    console.log(list);
    return list.map((e, id) => {
      return (
        <MenuItem key={id} >
          <Link to={`/frontEnd/details/${e.name}`} >{e.name}</Link>
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
