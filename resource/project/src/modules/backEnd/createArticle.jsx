import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

export default class createArticle extends Component {
  state = {
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

  render() {
    const dataSource = this.state.dataSource;
    return (
      <div className="createArticle">
        <h1>发文</h1>
        <Form>
          <Row>
            <Col>
              <FormItem label="标题">
                <Input />
              </FormItem>
              <FormItem label="正文">
                <TextArea rows={12} />
              </FormItem>
              <FormItem label="标签">
                <AutoComplete
                  dataSource={dataSource}
                  style={{ width: 200 }}
                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                  placeholder="选择标签"
                />
              </FormItem>
              <FormItem className="create" >
                <Button htmlType="submit">发布</Button>
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