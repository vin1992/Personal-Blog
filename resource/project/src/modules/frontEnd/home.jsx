
import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import MyMenu from '../../components/MyMenu';
import Filter from '../../support/filter';
import Slideout from 'slideout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

function Loading() {
  return <div>Loading...</div>;
}

// react-loadable 懒加载
// const LoadMenu = Loadable({
//   loader: () => import('../../components/MyMenu'),
//   loading: Loading,
//   render(loaded, props) {
//     let Menu = loaded.default;
//     console.log({ ...props }, '懒加载');
//     return <Menu {...props} />
//   }
// })

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      list: [],
      page: 1,
      size: 3,
      total: 0,
    }
    this.timer = 0;
    this.request = null;
    this.slideout = null;
  }
  componentDidMount() {
    console.log('aaa');
    // const { menus, actions } = this.props;
    // if (menus.length == 0) {
    //   actions.getAllMenu();
    // }

    this.getAllTags();
    this.getArticleList();
    console.log(Slideout, 'sss', document.getElementById('panel'));
    this.slideout = new Slideout({
      'panel': document.getElementById('panel'),
      'menu': document.getElementById('menu'),
      'padding': 256,
      'tolerance': 70,
      'side': 'right'
    });
    axios.get(`/api/ajax/list?isPublish=true&page=${this.state.page}&size=${this.state.size}`).then(response => {
      let { list, total } = response.data.data;
      // console.log(list, 'dsd');
      this.setState({ list, total });
    }).catch(err => {
      throw new Error(err);
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

  getArticleList(dir) {
    if (dir === 1) {
      this.setState(prev => {
        if (prev.page * prev.size < prev.total) {
          return {
            page: prev.page + 1
          }
        } else {
          return {
            page: prev.page
          }
        }
      }, () => {
        axios.get(`/api/ajax/list?isPublish=true&page=${this.state.page}&size=${this.state.size}`).then(response => {
          let { list, total } = response.data.data;
          // console.log(list, 'dsd');
          this.setState({ list, total });
        }).catch(err => {
          throw new Error(err);
        })
      })
    } else if (dir === -1) {
      this.setState(prev => {
        console.log(prev.page, '设置的page');
        return {
          page: prev.page <= 1 ? 1 : prev.page - 1
        }
      }, () => {
        axios.get(`/api/ajax/list?isPublish=true&page=${this.state.page}&size=${this.state.size}`).then(response => {
          let { list, total } = response.data.data;
          // console.log(list, 'dsd');
          this.setState({ list, total });
        }).catch(err => {
          throw new Error(err);
        })
      })
    }

  }

  toggleMenu() {
    this.slideout.toggle();
  }

  renderItem() {
    const { list } = this.state;
    return list.map(item => {
      return (
        <Link to={`frontEnd/details/${item._id}`} key={item._id} >
          <div className="list-group-item item" >
            <h3 className="title">{item.title}</h3>
            <p className="desc">{item.description}</p>
            <div className="author row">
              <div className="col-md-1">
                <img src="http://www.gravatar.com/avatar/4a35d104523ef520dd5d9f60c7e1eeb1?s=250&d=mm&r=x" alt="" />
              </div>
              <div className="at-name col-xs-11 col-md-5">{item.author} 于 {item.tag}</div>
              <div className="time col-xs-12 col-md-6">{Filter.formatDate(item.time)} </div>
            </div>
          </div>
        </Link >
      )
    })
  }

  render() {
    const { menus, list, menuStatus } = this.state;


    return (
      <div className="home" >
        <div id="menu" className="menu slideout-menu slideout-menu-right">
          <div className="nav-box">
            <div className="nav-title">MENU</div>
            {
              menus.length > 0 && (<MyMenu menus={menus} list={this.state.list} context={this} />)
            }
          </div>
        </div>

        <div id="panel">
          <div className="toggle-menu" onClick={this.toggleMenu.bind(this)}>
            <span className="icon">☰</span>
            <span className="text">MENU</span>
          </div>
          <div className="jumbotron banner">
            <h1>Vin_Coder`s Life</h1>
            <h2>Learn,thought and stories</h2>
          </div>
          <div className="container">
            <div className="list-group list">
              {
                list && list.length > 0 && this.renderItem()
              }
            </div>

            <div className="pager">
              <div className="previous" onClick={this.getArticleList.bind(this, -1)} >&larr; PREV</div>
              <div className="next" onClick={this.getArticleList.bind(this, 1)}>&rarr; NEXT</div>
            </div>
          </div>
          <div className="footer center-block">
            Vin Coder ©2018
        </div>
        </div>
      </div>

    )
  }
}

// const mapStateToProps = state => ({
//   menus: state.menus
// })

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(actions, dispatch),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
