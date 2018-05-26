
import React, { Component } from 'react';
import { Link } from 'react-router';
import MyMenu from '../../components/MyMenu';
import axios from 'axios';
import clazz from 'classnames';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      menus: [],
      list: [],
      menuStatus: false,
    }
    this.timer = 0;
    this.request = null;
  }
  componentDidMount() {
    this.getAllTags();
    this.getArticleList();
  }

  renderBanner() {
    return this.state.banner.map((e, id) => {
      return (
        <img src={e} key={id} />
      )
    })
  }

  getAllTags() {
    axios.get('/api/ajax/getTags').then(response => {
      let tags = response.data.data;
      this.setState({ menus: tags });
    }).catch(err => {
      throw new Error(err);
    })
  }

  getArticleList() {
    axios.get('/api/ajax/list?isPublish=true').then(response => {
      let list = response.data.data.list;
      console.log(list);
      this.setState({ list, loading: false });
    }).catch(err => {
      throw new Error(err);
    })
  }
  toggleMenu() {
    this.setState((previous) => {
      console.log(previous);
      return {
        menuStatus: !previous.menuStatus
      }
    })
  }


  render() {
    const { menus, list, menuStatus } = this.state;

    return (
      <div className="app">
        <div className="wrap">
          <div className="content" onClick={this.toggleMenu.bind(this)}>
            {React.cloneElement(this.props.children, { articleList: list })}
          </div>
          <div className={clazz('side-bar', { 'menu-show': menuStatus, 'menu-hide': !menuStatus })}>
            <div className="nav-box">
              <div className="nav-title">MENU</div>
              {
                menus.length > 0 && (<MyMenu menus={menus} list={this.state.list} context={this} />)
              }
            </div>
          </div>
        </div>
      </div >
    )
  }
}
