import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Prev = (props) => {
  let isDisabled = props.interCurrentPage <= 1 ? true : false;
  console.log(isDisabled, props, 'prev');
  let text = props.text || 'Prev';
  return (
    <button type="button" className={`previous`} disabled={isDisabled} onClick={props.prev}>
      &larr; {text}
    </button>
  )
}

const Next = (props) => {
  let isDisabled = props.interCurrentPage === props.interPageCount || props.interPageCount == 0;
  console.log(isDisabled, props, 'next');
  let text = props.text || 'Next';
  return (
    <button type="button" className={`next`} disabled={isDisabled} onClick={props.next}>
      &rarr; {text}
    </button>
  )
}

class Pagination extends Component {
  constructor(props) {
    super(props);
    let { currentPage, pageSize, total } = this.props;
    this.state = {
      interCurrentPage: currentPage,
      interPageCount: this.getValidPageCount(),
      pageSize,
      total
    };

  }

  prev() {
    let oldVal = this.state.interCurrentPage;
    let newVal = this.state.interCurrentPage - 1;

    this.setState({
      interCurrentPage: this.getValidCurrentPage(newVal)
    }, () => {
      if (this.state.interCurrentPage !== oldVal) {
        const currentChange = this.props.currentChange;
        currentChange && currentChange(this.state.interCurrentPage);
      }
    })
  }

  next() {
    let oldVal = this.state.interCurrentPage;
    let newVal = this.state.interCurrentPage + 1;

    this.setState({
      interCurrentPage: this.getValidCurrentPage(newVal)
    }, () => {
      if (this.state.interCurrentPage !== oldVal) {
        const currentChange = this.props.currentChange;
        currentChange && currentChange(this.state.interCurrentPage);
      }
    })
  }

  getValidCurrentPage(val) {
    let pageCount = this.getValidPageCount();
    let resetVal;
    if (pageCount) {
      if (val > pageCount) {
        resetVal = pageCount;
      } else if (val < 1) {
        resetVal = 1;
      } else {
        resetVal = val;
      }
    } else {
      resetVal = 1;
    }

    return resetVal === undefined ? val : resetVal;
  }

  getValidPageCount() {
    console.log(this.props, 'pageCount');
    let { total, pageSize } = this.props;
    return Math.ceil(total / pageSize);
  }


  render() {
    let { interCurrentPage, interPageCount } = this.state;
    return (
      <div className="pager">
        <Prev text="上一页" interCurrentPage={interCurrentPage} prev={this.prev.bind(this)} />
        <Next text="下一页" interCurrentPage={interCurrentPage} interPageCount={interPageCount} next={this.next.bind(this)} />
      </div>
    )
  }
}

Pagination.propTypes = {
  currentChange: PropTypes.func,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  total: PropTypes.number,
}

Pagination.defaultProps = {
  currentChange: () => { },
  pageSize: 4,
  currentPage: 1,
}

export default Pagination;