import React, { Component, PureComponent, Fragment } from 'react';
import { Spin, Button, Modal, Pagination } from 'antd';
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
    total: 0,
    currentPage: 1,
    pageSize: 10,
  }

  componentDidMount() {
    this.list();
  }

  list = () => {
    this.setState({loading: true});
    const { pageSize, currentPage } = this.state;
    axios({
      method: 'post',
      url: '/api/listBlog',
      data: {
        pageSize,
        page: currentPage
      }
    }).then((res = {}) => {
      const { data = {} } = res;
      const { errorCode, response = {} } = data;
      console.log(response)
      if (errorCode === 200) {
        const { list = [], total } = response;
        this.setState({
          blogList: list,
          total
        });
      }
    }).finally(() => {
      this.setState({loading: false});
    })
  }

  // 删除
  onDelete = (token) => {
    Modal.confirm({
      title: '确定删除吗？',
      content: '此操作不可逆转，删除后数据将永久消失',
      onOk: () => {
        axios({
          method: 'post',
          url: '/api/deleteBlog',
          data: {token}
        }).then(() => {
          this.list();
        });
      }
    })
  }

  // 页码/每页大小修改
  onChange = (currentPage, newPageSize) => {
    const { pageSize } = this.state;
    this.setState({
      currentPage: +pageSize === +newPageSize ? currentPage : 1,
      pageSize: newPageSize
    }, this.list);
  }

  render () {
    const { loading, blogList, currentPage, total } = this.state;
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
                          <Button
                            className='delete'
                            onClick={() => this.onDelete(token)}
                          >
                            删除
                          </Button>
                        </div>
                      </a>
                    );
                  })
                }
                <Pagination
                  current={currentPage}
                  total={total}
                  onChange={this.onChange}
                  pageSizeOptions={['10', '20']}
                  showSizeChanger
                />
              </Fragment>
            )
          }
        </div>
      </Spin>
    );
  }
}

export default List;
