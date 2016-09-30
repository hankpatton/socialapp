import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Collapse from 'react-collapse'
import classNames from 'classnames/bind'
import styles from './HomeView.scss'
import { selectors as postSelectors, actions as postActions } from 'redux/modules/Posts'
import { selectors as authSelectors, actions as authActions } from 'redux/modules/Auth'

import Container from 'components/Container/Container'
import Loader from 'components/Loader/Loader'
import Icon from 'components/Icon/Icon'
import AddPostForm from 'forms/AddPostForm'

const cx = classNames.bind(styles)

import PostList from 'components/PostList/PostList'

class HomeView extends Component {
  static propTypes = {
    postsFetching: PropTypes.bool,
    fetchPosts: PropTypes.func,
    posts: PropTypes.object,
    handleAddPost: PropTypes.func,
    handleLogin: PropTypes.func,
    loggedIn: PropTypes.bool,
    toggleAddPostForm: PropTypes.func,
    handleAddLike: PropTypes.func,
    handleDeleteLike: PropTypes.func,
    addPostFormOpen: PropTypes.bool,
    loading: PropTypes.bool,
    userId: PropTypes.string
  }

  componentWillMount () {
    this.props.fetchPosts()
  }

  render () {
    const {
      handleLogin,
      toggleAddPostForm,
      addPostFormOpen,
      loggedIn,
      posts,
      loading,
      userId
    } = this.props

    // Container Header
    const timelineHeader = (
      <div className={cx('timeline-header')}>
        <div>Timeline</div>
        {!loading &&
          <button
            className={cx('btn', 'btn-danger', 'btn-md')}
            style={{ minWidth: 110 }}
            onClick={loggedIn ? toggleAddPostForm : handleLogin}
          >
            <Icon icon='question_answer' size='sm' isBtn /> Add Post
          </button>
        }
      </div>
    )

    // Add Post Form
    const addPostForm = (
      <Collapse isOpened={addPostFormOpen} springConfig={{stiffness: 170, damping: 22}}>
        <div className={cx('timeline-add-post-container')}>
          <AddPostForm />
        </div>
        <hr className={cx('add-post-divider')} />
      </Collapse>
    )

    // Base Component
    return (
      <div>
        <div className='row'>
          <div className='col-lg-12 col-xl-10 offset-xl-1'>
            <Container header={timelineHeader}>
              {addPostForm}
              {loading
                ? <Loader loaderStyle={{marginTop: 35, marginBottom: 35}} />
                : <PostList
                  posts={posts}
                  loading={loading}
                  addPostFormOpen={addPostFormOpen}
                  userId={userId}
                />
              }
            </Container>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    posts: postSelectors.posts(state),
    loading: postSelectors.loading(state),
    addPostFormOpen: postSelectors.addPostFormOpen(state),
    loggedIn: authSelectors.loggedIn(state),
    userId: authSelectors.userId(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchPosts: postActions.fetchPosts,
    handleLogin: authActions.login,
    toggleAddPostForm: postActions.toggleAddPostForm
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
