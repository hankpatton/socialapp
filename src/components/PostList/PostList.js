import React, { PropTypes } from 'react'
import PostContainer from 'containers/PostContainer/PostContainer'

const propTypes = {
  posts: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  userName: PropTypes.string,
  addPostFormOpen: PropTypes.bool.isRequired
}

const PostList = (props) => {
  const {
    posts,
    loading,
    userId,
    userName,
    addPostFormOpen
  } = props

  // Get Component
  const getComponent = () => {
    if (loading) {
      return <div>Loading</div>
    } else if (!addPostFormOpen && posts.isEmpty()) {
      return <div style={{fontSize: 18, textAlign: 'center'}}>Add a post to the timeline.</div>
    } else if (!posts.isEmpty() && !loading) {
      return (
        <div>
          {posts.toJS().map((post) => {
            return (
              <PostContainer
                key={post.id}
                post={post}
                userName={userName}
                userId={userId}
              />
            )
          })}
        </div>
      )
    }
    return <div />
  }

  return (
    getComponent()
  )
}

PostList.propTypes = propTypes
export default PostList
