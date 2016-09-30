import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectors as postSelectors, actions as postActions } from 'redux/modules/Posts'
import { selectors as authSelectors, actions as authActions } from 'redux/modules/Auth'

import Post from 'components/Post/Post'

class PostContainer extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    userId: PropTypes.string,
    userName: PropTypes.string,
    userImage: PropTypes.string,
    handleDeletePost: PropTypes.func
  }

  constructor (props) {
    super(props)
    // bind methods
    this.deleteRedirect = this._deleteRedirect.bind(this)
  }

  _deleteRedirect () {
    this.props.handleDeletePost(this.props.post.id)
    window.location.href = '/'
  }

  render () {
    const { post, userId, ...postProps } = this.props
    return (
      <Post
        post={post}
        userId={userId}
        isAuthor={userId === post.user}
        handleDeletePostRedirect={this.deleteRedirect}
        {...postProps}
      />
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    comments: postSelectors.comments(state),
    likes: postSelectors.likes(state),
    likeId: postSelectors.likeId(ownProps.post.id, ownProps.userId)(state),
    userLikedPosts: postSelectors.userLikedPosts(ownProps.userId)(state),
    editPostFormOpen: postSelectors.editPostFormOpen(state),
    editCommentId: postSelectors.editCommentId(state),
    loggedIn: authSelectors.loggedIn(state),
    userName: authSelectors.userName(state),
    userId: authSelectors.userId(state),
    userImage: authSelectors.userImage(state)
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    handleDeletePost: postActions.deletePost,
    handleAddLike: postActions.addLike,
    handleDeleteLike: postActions.deleteLike,
    handleLogin: authActions.login,
    handleEditToggle: postActions.toggleEditPost,
    handleDeleteComment: postActions.deleteComment,
    handleSetEditCommentId: postActions.setEditCommentId
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)
