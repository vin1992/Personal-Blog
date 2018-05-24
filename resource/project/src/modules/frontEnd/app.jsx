
import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
      current: '',
      menus: [],
      list: [],
      loading: false,
      loadingMore: false,
      showLoadingMore: true,
    }
    this.timer = 0;
    this.request = null;
  }
  componentDidMount() {
    this.setState({ loading: true, });
  }

  renderBanner() {
    return this.state.banner.map((e, id) => {
      return (
        <img src={e} key={id} />
      )
    })
  }


  render() {
    const { menus } = this.state;

    return (
      <div className="app">
        <div className="content">
          {this.props.children}
        </div>
        <div className="footer">
          Vin Coder ©2018
        </div>
      </div>
    )
  }
}
