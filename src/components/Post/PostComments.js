import React, { PropTypes } from 'react'
import moment from 'moment'
import classNames from 'classnames/bind'
import styles from './Post.scss'

import Icon from 'components/Icon/Icon'
import AddCommentForm from 'forms/AddCommentForm'
import EditCommentForm from 'forms/EditCommentForm'

const cx = classNames.bind(styles)

const propTypes = {
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  loggedIn: PropTypes.bool,
  userImage: PropTypes.string,
  userId: PropTypes.string,
  isPostDetail: PropTypes.bool,
  comments: PropTypes.object,
  postId: PropTypes.string,
  handleDeleteComment: PropTypes.func,
  editCommentId: PropTypes.string,
  handleSetEditCommentId: PropTypes.func,
  locationState: PropTypes.string
}

const PostStats = (props) => {
  const {
    comments,
    likeCount,
    commentCount,
    loggedIn,
    userImage,
    userId,
    isPostDetail,
    postId,
    handleDeleteComment,
    editCommentId,
    handleSetEditCommentId,
    locationState
  } = props

  const commentStats = (
    <div className={cx('post-item-social-stats-container')}>
      <div className={cx('social-stats-item')}>
        <span className={cx('font-weight-bold')}>
          <span className={cx('number')}>{likeCount}</span>
          {likeCount === 1 ? <span> Person</span> : <span> People</span>}
        </span>
        <span> like this</span>
      </div>
      <span className={cx('social-stats-bullet')}>&bull;</span>
      <div className={cx('social-stats-item')}>
        <span>{commentCount}</span>
        {commentCount === 1 ? <span> Comment</span> : <span> Comments</span>}
      </div>
    </div>
  )

  return (
    <div className={cx('post-item-comment-list-container')}>
      {commentStats}
      {isPostDetail && !comments.isEmpty() &&
        <div className={cx('post-item-comments-container')}>
          {comments.toJS().map((comment, i) => {
            return (
              <div key={comment._id} className={cx('post-item-comment-container')}>
                <div className={cx('post-item-comment-avatar')} style={{backgroundImage: `url(${comment.user.image})`}} />
                <div className={cx('post-item-comment-content')}>
                  <div className={cx('post-item-comment-info')}>
                    <div className={cx('comment-author')}>{comment.user.name}</div>
                    <div className={cx('comment-date')}>{moment(comment.CreatedAt).fromNow()}</div>
                  </div>
                  {editCommentId === comment._id
                    ? <EditCommentForm commentId={comment._id} initialValues={{ comment: comment.text }} />
                    : <div className={cx('comment-text')}>{comment.text}</div>
                  }
                  {comment.user.id === userId &&
                    <div className={cx('post-item-comment-actions')}>
                      <div className={cx('comment-edit')} onClick={() => handleSetEditCommentId(comment._id)}><Icon icon='edit' /> Edit</div>
                      <div className={cx('comment-delete')} onClick={() => handleDeleteComment(comment._id, postId)}><Icon icon='close' /> Delete</div>
                    </div>
                  }
                </div>
              </div>
            )
          })}

        </div>
      }
      {isPostDetail && loggedIn &&
        <div className={cx('post-item-add-comment-container')}>
          <div className={cx('post-item-comment-avatar')} style={{backgroundImage: `url(${userImage})`}} />
          <AddCommentForm locationState={locationState} postId={postId} />
        </div>
      }
    </div>
  )
}

PostStats.propTypes = propTypes
export default PostStats
