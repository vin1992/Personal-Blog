import React, { Component } from 'react';
import axios from 'axios';

export default class ArticleDetails extends Component {
  state = {
    details: {}
  }

  componentDidMount() {
    let id = this.props.router.params.id;

    axios.get(`/api/admin/article/details?id=${id}`)
      .then(res => {
        let details = res.data.data;
        this.setState({ details });
        console.log(res)
      })
      .catch(err => {
        this.setState({ details: {} });
        console.error(err);
      })
  }

  render() {
    let details = this.state.details;

    return (
      <div className="wrapper">
        {
          details && (
            <div>
              <h1>{details.title}</h1>
              <article>
                {details.content}
              </article>
            </div>
          )
        }
        {
          !details && (
            <div>No Data</div>
          )
        }
      </div>
    )
  }
}