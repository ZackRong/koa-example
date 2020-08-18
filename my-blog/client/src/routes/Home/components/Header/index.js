import React, { PureComponent, Component } from 'react';
import { EditOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './index.less';

const prefixCls = 'my-blog-component-header';

class Header extends (PureComponent || Component) {
  render () {
    return (
      <div className={prefixCls}>
        <div className={prefixCls + '-menu'}>
          <a>
            <EditOutlined />
            写博客
          </a>
        </div>
        <div className={prefixCls + '-user-info'}>
          用户信息
        </div>
      </div>
    );
  }
}

Header.propTypes = {

};

Header.defaultProps = {

};

export default Header;
