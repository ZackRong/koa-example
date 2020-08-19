import React, { Component, PureComponent, Fragment } from 'react';
import { Spin } from 'antd';
import axios from 'axios';
import '../../../../mock';
import './index.less';

const prefixCls = 'my-blog-list';

class List extends (PureComponent || Component) {
  state = {
    loading: true,
    blogList: [],
  }

  componentDidMount() {
    axios('/api/listBlog').then((res = {}) => {
      const { data = {} } = res;
      const { errorCode, list = [] } = data;
      if (errorCode === 200) {
        this.setState({blogList: list});
      }
    }).finally(() => {
      this.setState({loading: false});
    })
  }

  render () {
    const { loading, blogList } = this.state;
    return (
      <Spin spinning={loading}>
        <div className={prefixCls}>
          {
            blogList.length === 0 && !loading && (
              <div className={prefixCls + '-empty'}>暂时没有内容</div>
            )
          }
          {
            blogList.length > 0 && (
              <Fragment></Fragment>
            )
          }
        </div>
      </Spin>
    );
  }
}

export default List;
