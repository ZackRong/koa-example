import React, { Component, PureComponent } from 'react';
import { Button } from 'antd';
import './index.less';

const prefixCls = 'my-blog-home';

class Home extends (PureComponent || Component) {
  render () {
    return (
      <div className={prefixCls}>
        home
      </div>
    );
  }
}

export default Home;
