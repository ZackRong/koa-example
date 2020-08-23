import React, { Component, PureComponent, Fragment } from 'react';
import { Spin } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import '../../../../mock';
import './index.less';

const prefixCls = 'my-blog-list';

class List extends (PureComponent || Component) {
  state = {
    loading: true,
    blogList: [],
  }

  componentDidMount() {
    axios({
      method: 'post',
      url: '/api/listBlog',
      data: {
        count: 10
      }
    }).then((res = {}) => {
      const { data = {} } = res;
      const { errorCode, response = [] } = data;
      console.log(response)
      if (errorCode === 200) {
        this.setState({blogList: response});
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
              <Fragment>
                {
                  blogList.map(blog => {
                    const { token, createTime, title = '', content = '', creator = '', avator, agreeCount = 0 } = blog;

                    return (
                      <a key={token} className={prefixCls + '-item'}>
                        <div className='info-wrapper'>
                          <div className='user-info'>
                            <img alt='' src={avator} />
                            <div className='name'>{creator}</div>
                          </div>
                          <div className='blog-info'>
                            <div className='title'>{title}</div>
                            <div className='content'>{content}</div>
                          </div>
                        </div>
                        <div className='other-info'>
                          <div className='create-time'>{`创建于：${moment(createTime).format('YYYY-MM-DD HH:mm')}`}</div>
                          {agreeCount > 0 && (
                            <div className='agree'>
                              <LikeOutlined />
                              {`(${agreeCount})`}
                            </div>
                          )}
                        </div>
                      </a>
                    );
                  })
                }
              </Fragment>
            )
          }
        </div>
      </Spin>
    );
  }
}

export default List;
