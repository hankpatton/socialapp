import React, { PropTypes } from 'react'
import moment from 'moment'
import classNames from 'classnames/bind'
import styles from './Post.scss'

import Icon from 'components/Icon/Icon'

const cx = classNames.bind(styles)

const propTypes = {
  postCreatedAt: PropTypes.string
}

const PostListItemHeader = ({postCreatedAt}) => {
  return (
    <div className={cx('post-item-header-container')}>
      <div className={cx('post-item-user-info-container')}>
        <div className={cx('post-item-avatar')} style={{backgroundImage: 'url("/headshot.jpg")'}} />
        <div className={cx('post-item-user-info')}>
          <div className={cx('post-user-name')}>John Q. User</div>
          <div className={cx('post-date')}>{moment(postCreatedAt).fromNow()}</div>
        </div>
      </div>
      <div className={cx('post-item-location-container')}>
        <div className={cx('post-item-location')}>Anytown, USA <Icon icon='location_on' size='sm' color='gray-lt' /></div>
      </div>
    </div>
  )
}

PostListItemHeader.propTypes = propTypes
export default PostListItemHeader
