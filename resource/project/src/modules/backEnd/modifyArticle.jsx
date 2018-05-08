import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

export default class ModifyArticle extends Component {
  state = {
    title: '',
    content: '',
    tag: '', // 所属标签，目前暂时是 只支持单选
    defaultTags: '',
    tags: [],
    visible: false,
  }
  componentDidMount() {
    this.getAllTags();
    this.getArtDetails();
  }


  handleTitle(e) {
    let title = e.target.value;
    this.setState({ title })
  }

  handleContent(e) {
    let content = e.target.value;
    this.setState({ content });
  }

  handleTags(val) {
    let tag = val;
    this.setState({ defaultTags: tag })
  }

  handleSearch(val) {
    console.log('aaaa', val);
  }

  //获取文章详情
  getArtDetails() {
    let art_id = this.props.router.params.id;
    axios.get(`/api/admin/article/details?id=${art_id}`)
      .then(res => {
        let { title, content, tag } = res.data.data;
        this.setState({ title, content, defaultTags: tag });
      })
      .catch(err => {
        this.setState({ title: '', content: '', defaultTags: '' });
        throw new Error(err);
      })
  }


  // 获取标签
  getAllTags() {
    axios.get('/api/admin/tags/getTags').then(res => {
      let tags = res.data.data;
      this.setState({ tags });
    }).catch(err => {
      this.setState({ tags: [] });
    })
  }

  modifyArticle() {
    let id = this.props.router.params.id;
    let { title, content, defaultTags } = this.state;
    let author = 'vin_coder';
    let time = Date.now();
    let isPublish = 1;

    let tag = defaultTags;

    axios.post('/api/admin/article/modify', { id, title, content, tag, time, isPublish })
      .then(response => {
        console.log(response);
      })
      .catch(error => {

        console.log(error);
      })
  }

  handleOk() {
    this.setState({ visible: false });
  }

  overview() {
    this.setState({ visible: true });
  }



  render() {
    const { tag, tags } = this.state;
    return (
      <div className="createArticle">
        <h1>改文</h1>
        <Modal
          title={this.state.title}
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          footer={[
            <Button key="back" onClick={this.handleOk.bind(this)}>关闭</Button>,
          ]}
        >
          <p>{this.state.content}</p>
        </Modal>
        <Form >
          <Row>
            <Col>
              <FormItem label="标题">
                <Input value={this.state.title} onChange={this.handleTitle.bind(this)} />
              </FormItem>
              <FormItem label="正文">
                <TextArea rows={12} value={this.state.content} onChange={this.handleContent.bind(this)} />
              </FormItem>
              <FormItem label="标签">
                <AutoComplete
                  value={this.state.defaultTags}
                  dataSource={this.state.tags}
                  onChange={this.handleTags.bind(this)}
                  style={{ width: 200 }}
                  placeholder="选择标签"
                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                />
              </FormItem>
              <FormItem className="create" >
                <Button onClick={this.modifyArticle.bind(this)}>修改</Button>
                <Button >保存</Button>
                <Button onClick={this.overview.bind(this)}>预览</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}