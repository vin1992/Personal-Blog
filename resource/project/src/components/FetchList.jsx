import React, { Component } from 'react';
import Axios from 'axios';

const FetchList = conf => WrappedComponent => {

  return class WrapperComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        isLoading: false
      }
    }

    componentDidMount() {

      this.setState({ isLoading: true })
      let request;
      let { methods, url, data } = conf;
      methods = methods || 'get'
      if (typeof data == 'function') {
        data = data(this.props);
      }
      if (methods.toLowerCase() == 'get') {
        request = Axios.get(url, { params: data });
      } else {
        request = Axios.post(url, data);
      }
      request.then(res => {
        if (res.data.code == 0) {
          this.setState({
            data: res.data.data
          })
        }
      }).catch(e => {
        throw new Error(e);
      }).finally(() => {
        this.setState({ isLoading: false })
      })
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />
    }

  }
}

export default FetchList;