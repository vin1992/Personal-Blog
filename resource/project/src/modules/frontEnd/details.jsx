
import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Filter from '../../support/filter';
import FetchList from '../../components/FetchList';

const Detail = ({ data, isLoading }) => {

  const enterHTML = () => {
    return { __html: data.content };
  }

  return (
    <div className="details">
      {
        isLoading && (
          <div>正在加载数据。。。</div>
        )
      }
      {data && (
        <article>
          <div className="art-head">
            <h1>{data.title}</h1>
            <span>{Filter.formatDate(data.time)} 于 {data.tag} </span>
          </div>
          <div className="art-content">
            <p dangerouslySetInnerHTML={enterHTML()}></p>
          </div>
        </article>
      )}
      <div className="footer">
        Vin Coder ©2018
      </div>
    </div>
  )
}

const conf = {
  methods: 'get',
  url: '/api/ajax/details',
  data: (props) => ({ id: props.params.categoryId })
}

export default FetchList(conf)(Detail);
