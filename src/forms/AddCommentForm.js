import React, { Component, PropTypes } from 'react'
import classNames from 'classnames/bind'
import styles from 'components/Post/Post.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { actions as postActions } from 'redux/modules/Posts'
import { selectors as authSelectors } from 'redux/modules/Auth'

const cx = classNames.bind(styles)

class AddComment extends Component {
  static propTypes = {
    handleAddNewComment: PropTypes.func,
    profile: PropTypes.object,
    reset: PropTypes.func,
    handleSubmit: PropTypes.func,
    valid: PropTypes.bool,
    postId: PropTypes.string.isRequired,
    locationState: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.submit = this._submit.bind(this)
  }

  async _submit (fields) {
    const { comment } = fields
    const { profile, postId } = this.props
    await this.props.handleAddNewComment(postId, comment, profile)
    this.props.reset()
  }

  render () {
    const { handleSubmit, valid, locationState } = this.props
    return (
      <form onSubmit={handleSubmit(this.submit)} className={cx('post-item-add-comment-form')}>
        <Field name='comment' component={RenderInput} type='text' label='What do you want to say?' locationState={locationState} />
        <button type='submit' className={cx('btn', 'btn-success', 'btn-sm', 'post-item-add-comment-btn', {'disabled': !valid})}>Submit</button>
      </form>
    )
  }
}

const RenderInput = ({input, label, type, locationState}) => (
  <input {...input} placeholder={label} type={type} className={cx('form-control', 'form-control-sm', 'post-item-add-comment-input')} required autoFocus={locationState === 'addCommentFocus'} />
)

RenderInput.propTypes = {
  input: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  locationState: PropTypes.string
}

const validate = (values) => {
  const errors = {}
  if (!values.comment) {
    errors.comment = 'Required'
  }
  return errors
}

// Decorate the form component
const AddCommentForm = reduxForm({
  form: 'addComment',
  validate
})(AddComment)

function mapStateToProps (state, ownProps) {
  return {
    profile: authSelectors.profile(state)
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    handleAddNewComment: postActions.addComment
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentForm)
