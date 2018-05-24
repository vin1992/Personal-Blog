
import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Filter from '../../support/filter';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
      current: '',
      details: {},
    }
  }

  componentDidMount() {
    console.log(this.props, 'props');
    let art_id = this.props.router.params.categoryId;
    this.setState({ loading: true }, this.getArticleDetails(art_id));
  }

  getArticleDetails(id) {
    axios.get(`/api/ajax/details?id=${id}`).then(res => {
      console.log(res);
      let details = res.data.data;
      this.setState({ details });
    }).catch(err => {
      throw new Error(err);
    })
  }

  enterHTML() {
    let { details } = this.state;
    return { __html: details.content };
  }

  render() {
    let { details } = this.state;

    return (
      <div className="details">
        {details && (
          <article>
            <div className="art-head">
              <h1>{details.title}</h1>
              <span>{Filter.formatDate(details.time)} 于 {details.tag} </span>
            </div>
            <div className="art-content">
              <p dangerouslySetInnerHTML={this.enterHTML()}></p>
            </div>
          </article>
        )}

      </div>
    )
  }
}
