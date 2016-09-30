import React, { PropTypes } from 'react'
import classNames from 'classnames/bind'
import styles from './Post.scss'
import { Link } from 'react-router'

import Icon from 'components/Icon/Icon'

const cx = classNames.bind(styles)

const propTypes = {
  postId: PropTypes.string.isRequired,
  userName: PropTypes.string,
  userId: PropTypes.string,
  isAuthor: PropTypes.bool.isRequired,
  userLiked: PropTypes.bool.isRequired,
  likeId: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleAddLike: PropTypes.func.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
  handleDeletePostRedirect: PropTypes.func.isRequired,
  handleEditToggle: PropTypes.func.isRequired,
  isPostDetail: PropTypes.bool
}

const PostListItemActionRow = (props) => {
  const {
    postId,
    userName,
    userId,
    isAuthor,
    userLiked,
    likeId,
    loggedIn,
    handleLogin,
    handleAddLike,
    handleDeleteLike,
    handleDeletePostRedirect,
    handleEditToggle,
    isPostDetail
  } = props

  // Get Social Action
  const getSocialAction = () => {
    if (!loggedIn) { return handleLogin }
    if (!userLiked) { return () => handleAddLike(postId, userId, userName) }
    return () => handleDeleteLike(likeId, postId)
  }

  // Social Like and Comment Buttons
  const socialActions = (
    <div className={cx('post-list-item-actions-social')}>
      <div
        className={cx('post-list-item-social-icon')}
        onClick={getSocialAction()}
      >
        <Icon
          icon='favorite'
          size='sm'
          color={userLiked ? 'danger' : 'gray-lt'}
        />
        <span>Like</span>
      </div>
      <Link
        className={cx('post-list-item-social-icon')}
        to={{
          pathname: `/posts/${postId}`,
          state: 'addCommentFocus'
        }}
      >
        <Icon icon='mode_comment' size='sm' color='gray-lt' />
        <span>Comment</span>
      </Link>
    </div>
  )

  // Edit and Delete Buttons
  const authorActions = (
    <div className={cx('post-list-item-actions-edit')}>
      <div className={cx('post-list-item-edit-icon')} onClick={() => handleEditToggle()}>
        <Icon icon='edit' size='sm' color='gray-lt' />
        <span>Edit</span>
      </div>
      <div className={cx('post-list-item-edit-icon')} onClick={handleDeletePostRedirect}>
        <Icon icon='close' size='sm' color='danger' />
        <span>Delete</span>
      </div>
    </div>
  )

  // Base Component
  return (
    <div className={cx('post-list-item-actions-container')}>
      {socialActions}
      {isAuthor && isPostDetail && authorActions}
    </div>
  )
}

PostListItemActionRow.propTypes = propTypes
export default PostListItemActionRow
