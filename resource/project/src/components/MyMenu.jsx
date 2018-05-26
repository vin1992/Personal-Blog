import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class MyMenu extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
  }
  static defaultProps = {
    list: [],
  }
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
        <a className="nav-itm" key={id} onClick={this.getArticleListById.bind(this, e)} >{e.name}</a>
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
      <div className="nav-ls">
        {menus.length > 0 && this.renderParent(menus)}
      </div>
    )
  }


}
