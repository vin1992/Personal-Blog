
import React, { Component } from 'react';
import { Link } from 'react-router';
import MyMenu from '../../components/MyMenu';
import axios from 'axios';
import Filter from '../../support/filter';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      list: [],
      menus: [],
      loading: false,
      loadingMore: false,
      showLoadingMore: true,
    }
    this.timer = 0;
    this.request = null;
  }
  componentDidMount() {
    this.setState({ loading: true, }, this.getArticleList());
    this.getAllTags();
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

  onLoadMore() {
    alert('no more data');
  }

  renderItem() {
    const { list } = this.state;
    return list.map(item => {
      return (
        <Link to={`frontEnd/details/${item._id}`} key={item._id}>
          <div className="item" >
            <h3 className="title">{item.title}</h3>
            <p className="content">{'这是概要这是概要这是概要这是概要这是概要这是概要这是概要这是概要这是概要这是概要这是概要这是概要' || item.content}</p>
            <div className="author">
              <img src="http://www.gravatar.com/avatar/4a35d104523ef520dd5d9f60c7e1eeb1?s=250&d=mm&r=x" alt="" />
              <div className="at-name">{item.author} 于 {item.tag}</div>
              <div className="time">{Filter.formatDate(item.time)} </div>
            </div>
          </div>
        </Link>
      )
    })
  }

  render() {
    const { list, menus } = this.state;
    const { loading, loadingMore, showLoadingMore, list: _data } = this.state;


    return (
      <div className="home">
        <div className="banner">
          <h1>Vin_Coder`s Life</h1>
          <h2>Learn,thought and stories</h2>
        </div>
        <div >
          {/* <div className="menu" >
            {
              menus.length > 0 && (<MyMenu menus={menus} list={this.state.list} context={this} />)
            }
          </div> */}
          <div className="content" >
            <div className="list">
              {
                list.length > 0 && this.renderItem()
              }
            </div>
          </div>
        </div>
      </div>

    )
  }
}
