import React, { Component, PropTypes } from 'react'
import classNames from 'classnames/bind'
import styles from './PostDetailView.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectors as postSelectors, actions as postActions } from 'redux/modules/Posts'
import { selectors as authSelectors } from 'redux/modules/Auth'
import { goBack } from 'react-router-redux'

import PostContainer from 'containers/PostContainer/PostContainer'
import Container from 'components/Container/Container'
import Loader from 'components/Loader/Loader'

const cx = classNames.bind(styles)

class PostDetailView extends Component {
  static propTypes = {
    post: PropTypes.object,
    handleBack: PropTypes.func,
    fetchPost: PropTypes.func,
    loading: PropTypes.bool,
    userId: PropTypes.string,
    locationState: PropTypes.string
  }

  componentWillMount () {
    this.props.fetchPost()
  }

  render () {
    const { post, loading, userId, handleBack, locationState } = this.props
    return (
      <div>
        <div className='row'>
          <div className='col-lg-12 col-xl-10 offset-xl-1'>
            <Container header={<div style={{cursor: 'pointer'}} onClick={handleBack}>Back</div>}>
              {loading
                ? <Loader loaderStyle={{marginTop: 35, marginBottom: 35}} />
                : !post.isEmpty()
                  ? <PostContainer
                    post={post.toJS()}
                    userId={userId}
                    isPostDetail
                    locationState={locationState}
                    />
                  : <div className={cx('no-post')}>Post does not exist.</div>
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
    post: postSelectors.post(ownProps.params.id)(state),
    loading: postSelectors.loading(state),
    addPostFormOpen: postSelectors.addPostFormOpen(state),
    userId: authSelectors.userId(state),
    locationState: ownProps.location.state
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    handleBack: goBack,
    fetchPost: () => postActions.fetchPost(ownProps.params.id)
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView)
