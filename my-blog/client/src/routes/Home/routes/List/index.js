import React, { Component, PureComponent } from 'react';
import './index.less';

const prefixCls = 'my-blog-list';

class List extends (PureComponent || Component) {
  render () {
    return (
      <div className={prefixCls}>
        List
      </div>
    );
  }
}

export default List;
