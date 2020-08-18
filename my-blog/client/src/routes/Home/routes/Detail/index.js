import React, { Component, PureComponent } from 'react';
import './index.less';

const prefixCls = 'my-blog-detail';

class Detail extends (PureComponent || Component) {
  render () {
    return (
      <div className={prefixCls}>
        Detail
      </div>
    );
  }
}

export default Detail;
