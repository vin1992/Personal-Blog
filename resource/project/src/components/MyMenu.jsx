import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FetchList from './FetchList';

const MyMenu = (props) => {
  // debugger;
  let { data: menus, isLoading, callback } = props;
  console.log(props, menus, '提示');
  const renderMenu = (list) => {
    return list.map((e, id) => {
      return (
        <a className="nav-itm" key={id} onClick={() => callback(e.name)} >{e.name}</a>
      )
    })
  }

  return (
    <div className="nav-ls">
      {!isLoading && menus && menus.length > 0 && renderMenu(menus)}
      {isLoading && <div>正在加载菜单中。。。</div>}
    </div>
  )
}

/* MyMenu.propTypes = {
  menus: PropTypes.array.isRequired,
  callback: PropTypes.func.isRequired,
}

MyMenu.defaultProps = {
  menus: [],
  callback: () => { }
} */

const conf = {
  methods: 'get',
  url: '/api/ajax/getTags',
  data: {}
}

export default FetchList(conf)(MyMenu);
