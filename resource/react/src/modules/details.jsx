
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MyMenu from "../components/MyMenu";
import MyForm from '../components/NormalLoginForm';
import IconText from '../components/IconText';
import { Layout, Carousel, Row, Col, Avatar, Icon } from 'antd';
import { List, Spin } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;
const { Header, Sider, Content, Footer } = Layout;
const { Item } = List;
const WrappedNormalLoginForm = Form.create()(MyForm);

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
  }

  componentDidMount() {
    let request = [
      axios.get('/blog/ajax/carousel'),
      axios.get('/blog/ajax/menu'),
      axios.get('/blog/ajax/list'),
    ];

    this.request = axios.all(request)
      .then(axios.spread((a, b, c) => {
        this.setState({
          banner: a.data.data.list,
          menus: b.data.data.list,
          list: c.data.data.list,
        })
      }))
  }

  renderBanner() {
    return this.state.banner.map((e, id) => {
      return (
        <img src={e} key={id} />
      )
    })
  }


  render() {
    let { banner,menus } = this.state;

    return (
      <Layout>
        <Carousel>
          {
            banner.length > 0 &&
            this.renderBanner()
          }
        </Carousel>
        <div className="menu" >
          {
            menus.length > 0 && (<MyMenu menus={menus} />)
          }
        </div>
        <Content className="details">
          <Row>
            <Col span={12} offset={5}>
              <article>
                <div className="art-head">
                  <h1>经常看手机和电脑会让眼睛「瞎掉」？这些技巧能保护好你的眼睛</h1>
                  <small>write in 2018-05-1</small>
                </div>
                <div className="art-content">
                  <p>
                    现如今，我们花费越来越多的时间面对电脑和手机，首先要发出抗议的恐怕就是我们的眼睛了，今天跟大家分享一下如何保护眼睛并让我们的数码设备对眼睛更「亲近」。本文会从以下四个方面分享：如何缓解眼睛疲劳在 iOS 上保护眼睛：Night ShiftiOS 进阶「夜间模式」开启技巧在 Mac 上保护眼睛：f.lux如何缓解眼睛疲劳长时间面对电脑，难免会让人眼睛干涩不舒服，我个人的解决办法是：眼保健操。对，就是小学时候我们每天都要做的眼保健操；眼保健操的使用也有两点是需要我们注意的：一定要保证卫生，洗手是必须的；不要过于用力，轻柔舒缓的动作为佳；如果有条件远眺或者看一看绿色植物，甚至走动一下，
                    让视线远离电脑去接触不同的事物也是很好的办法。在 iOS 上保护眼睛：Night ShiftiOS 系统在 iOS 9.3  之后就加入了「Night Shift」功能，下面是官网介绍：我们把许多醒着的时间，献给了对睡眠的思考。多项研究显示，在夜间接触明亮的蓝光可能会扰乱人体的生理节奏，使人们难以入眠。Night Shift 可利用你 iOS 设备中的时钟和定位信息来判断你所在地的日落时间，随后会自动将显示屏色彩调至较暖的色调，
                    使你的眼睛更舒适。而在早晨，它又会将显示屏恢复为常规设置。好了，祝你好梦。在滑动滑块时屏幕颜色会在冷暖色中间切换，但因录屏软件限制此 gif 中并无此效果。具体位置和设置如下图，「Night Shift」功能加入到控制中心，白天也可以快速切换到此模式了。下面再给大家介绍一个小技巧，只要是 iOS 设备都可以使用，虽然不能达到降低色温的效果，但可以让你的屏幕亮度瞬间变暗，间接达到 「夜间模式」 的效果。iOS 进阶 「夜间模式」 开启技巧有朋友说我不喜欢暖黄色的屏幕，还有朋友说我把屏幕亮度调到最低了，但在被窝里仍然感觉太亮了，怎么办啊？现在给大家带来一个小技巧，可以在最低亮度时候，
                    再次将亮度下降一个等级。打开 iOS 的「缩放」功能，操作见下图：「设置 - 通用 - 辅助功能 - 缩放」关键点：缩放区域：全屏幕缩放；缩放过滤器：弱光；注意：打开缩放后屏幕会变大，这时候需要用三指双击屏幕，即可恢复正常大小（因录屏软件限制，此效果未在录屏动画中体现）。打开后还没有结束，我们不可能每次都要进入这么深的设置中去打开/关闭，所以还需要设置一下快捷键：「通用 - 辅助功能 - 辅助功能快捷键 - 缩放」好了，我们已经把「夜间模式」的快捷键设置为「连按三次主屏幕按钮」，在任意界面下，只要连击三次 Home 键即可打开或关闭「夜间模式」，下面我们看看此「夜间模式」的效果如何：
                    在 Mac 上保护眼睛：f.luxf.lux 是一款免费的屏幕色温调节应用，它根据你所在地理位置的日出日落时间来计算你的环境光照强度，进而自动调节为最舒适的屏幕色温从而达到保护眼睛的效果。  关注少数派，在后台回复「健康」即可获得下载链接。我们知道 Macbook 在使用的时候是可以根据环境光线强弱来自动调节屏幕亮度的，那么 f.lux 是不是也是一样的功能呢？不一样，f.lux 改变的是屏幕色温，它并不改变亮度；而且 f.lux 不会识别环境光的变化来改变色温，它只会根据当地时间变化来调节色温。一般显示器的默认色温是 6500K，其他色温参考（此为 Mac 跟 iOS 默认色温值）：Candle（蜡烛）: 2300KTungsten（白炽灯）
                    : 2700KHalogen（卤素灯）: 3400KFluorescent（荧光灯）: 4200KDaylight（日光）: 5000K通过 f.lux 提供的色温测试工具测试在不同色温下的屏幕表现，观察网页背景色的变化：
                  </p>
                </div>
              </article>
            </Col>
            <Col span={6} >
              <div className="form-wrapper">
                <WrappedNormalLoginForm />
              </div>
            </Col>
          </Row>
        </Content>
        <Footer>
          Vin Coder ©2018 Created by Vin_Coder
        </Footer>
      </Layout>
    )
  }
}
