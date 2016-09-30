import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames/bind'
import styles from './Post.scss'

import PostHeader from './PostHeader'
import PostActionRow from './PostActionRow'
import PostComments from './PostComments'
import EditPostForm from 'forms/EditPostForm'

const cx = classNames.bind(styles)

const propTypes = {
  post: PropTypes.object.isRequired,
  userLikedPosts: PropTypes.object.isRequired,
  editPostFormOpen: PropTypes.bool.isRequired,
  isPostDetail: PropTypes.bool
}

const Post = (props) => {
  const { post, userLikedPosts, editPostFormOpen, isPostDetail, ...postProps } = props

  // Post Text
  const postContent = (
    !isPostDetail
    ? <Link to={`/posts/${post.id}`} className={cx('post-list-item-content')}>
      <p className={cx('post-content')}>{post.text}</p>
    </Link>
    : <div to={`/posts/${post.id}`} className={cx('post-list-item-content')}>
      <p className={cx('post-content')}>{post.text}</p>
    </div>
  )
  // Post Edit Form
  const postEditFormContainer = (
    <div className={cx('post-list-item-content')}>
      <EditPostForm postId={post.id} initialValues={{ text: post.text }} />
    </div>
  )

  return (
    <div className={cx('post-item')}>
      <PostHeader postCreatedAt={post.createdAt} />
      {editPostFormOpen ? postEditFormContainer : postContent}
      <PostActionRow
        postId={post.id}
        userLiked={userLikedPosts.has(post.id)}
        isPostDetail={isPostDetail}
        {...postProps}
      />
      <PostComments
        postId={post.id}
        likeCount={post.like_count}
        commentCount={post.comment_count}
        isPostDetail={isPostDetail}
        {...postProps}
      />
    </div>
  )
}

Post.propTypes = propTypes
export default Post
