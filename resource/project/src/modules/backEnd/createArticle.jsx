import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

export default class createArticle extends Component {
  state = {
    title: '',
    content: '',
    tags: [], // 所属标签，目前暂时是 只支持单选
    dataSource: []

  }
  componentDidMount() {
    this.setState({
      dataSource: ['html', 'css', 'javascript', 'nodejs', 'typescript', 'react']
    })
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
    let tags = val;
    this.setState({ tags })
  }

  handleSubmit() {

  }

  test() {
    let { title, content, tags } = this.state;
    console.log(this.state, 111);

    let author = 'vin_coder';
    let time = Date.now();
    let isPublish = 1;
    /**
     * title,
        content,
        time,
        tags,
        isPublish
     */
    axios.post('/blog/admin/article/create', { title, content, tags, time, isPublish })
      .then(response => {
        alert(response)
        console.log(response);
      })
      .catch(error => {

        console.log(error);
      })
  }


  render() {
    const dataSource = this.state.dataSource;
    return (
      <div className="createArticle">
        <h1>发文</h1>
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
                  value={this.state.tags}
                  onChange={this.handleTags.bind(this)}
                  dataSource={dataSource}
                  style={{ width: 200 }}
                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                  placeholder="选择标签"
                />
              </FormItem>
              <FormItem className="create" >
                <Button htmlType="submit" onClick={this.test.bind(this)}>发布</Button>
                <Button >保存</Button>
                <Button >预览</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}