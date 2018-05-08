import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

export default class createArticle extends Component {
  state = {
    title: '',
    content: '',
    tag: '', // 所属标签，目前暂时是 只支持单选
    dataSource: [],
    visible: false,

  }
  componentDidMount() {
    this.getAllTags();
  }

  filter(val) {
    let dataSource = this.state.dataSource;
    let res = dataSource.filter(item => item.includes(val));
    console.log(res);
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
    this.setState({ tag })
  }

  // 获取标签
  getAllTags() {
    axios.get('/api/admin/tags/getTags').then(res => {
      let tags = res.data.data;
      this.setState({ dataSource: tags });
    }).catch(err => {
      this.setState({ dataSource: [] });
      console.log(err);
    })
  }

  createArticle() {
    let { title, content, tag } = this.state;
    console.log(this.state, 111);

    let author = 'vin_coder';
    let time = Date.now();
    let isPublish = 1;

    axios.post('/api/admin/article/create', { title, content, tag, time, isPublish })
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
    axios.post('/api/admin/article/details', {})
    this.setState({ visible: true });
  }



  render() {
    const dataSource = this.state.dataSource;
    return (
      <div className="createArticle">
        <h1>发文</h1>
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
                  value={this.state.tag}
                  onChange={this.handleTags.bind(this)}
                  dataSource={dataSource}
                  style={{ width: 200 }}
                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                  placeholder="选择标签"
                />
              </FormItem>
              <FormItem className="create" >
                <Button htmlType="submit" onClick={this.createArticle.bind(this)}>发布</Button>
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