import React, { Component, PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { Detail, List } from './routes';
import { Header } from './components';
import './index.less';

const prefixCls = 'my-blog-home';

class Home extends (PureComponent || Component) {
  render () {
    const { match } = this.props;

    return (
      <div className={prefixCls}>
        <Header />
        <Route path={`${match.url}detail`} component={Detail} />
        <Route exact path={match.url} component={List} />
      </div>
    );
  }
}

export default Home;
