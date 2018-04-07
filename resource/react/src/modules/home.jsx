
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Carousel } from 'antd';
import MyMenu from "../components/MyMenu";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
      current: '',
      menus: [],
    }
  }

  componentDidMount() {
    let res = [
      '/statics/img/slide1.jpg',
      '/statics/img/slide2.jpg',
    ];
    let data =
      [{
        menu: "total",
        route: "/",
        hasChildren: 0,
        subMenu: []
      }, {
        menu: "react",
        route: "/react",
        hasChildren: 1,
        subMenu: [{
          title: "virtualDOM",
          url: "/react/virtualDOM"
        }, {
          title: "diffAgorism",
          url: "/react/diffAgorism"
        }]
      }, {
        menu: "html",
        route: "/html",
        hasChildren: 0,
        subMenu: []
      }, {
        menu: "css",
        route: "/css",
        hasChildren: 0,
        subMenu: []
      }]


    this.setState({
      banner: res,
      menus: data,
    })
  }

  renderBanner() {
    return this.state.banner.map((e, id) => {
      return (
        <img src={e} key={id} />
      )
    })
  }


  renderMenu() {

  }

  render() {
    let banners = this.state.banner;
    let list = this.state.menus;
    return (
      <div>
        <Carousel autoplay >
          {
            banners.length > 0 &&
            this.renderBanner()
          }
        </Carousel>
        <div className="menu" >
          {
            list.length > 0 && (<MyMenu menus={list} />)
          }
        </div>

      </div>
    )
  }
}