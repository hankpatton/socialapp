import React, { Component, PropTypes } from 'react'
import classNames from 'classnames/bind'
import styles from 'components/Post/Post.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { actions as postActions } from 'redux/modules/Posts'

const cx = classNames.bind(styles)

class EditComment extends Component {
  static propTypes = {
    handleEditComment: PropTypes.func,
    handleSetEditCommentId: PropTypes.func,
    handleClearEditCommentId: PropTypes.func,
    reset: PropTypes.func,
    handleSubmit: PropTypes.func,
    valid: PropTypes.bool,
    commentId: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.submit = this._submit.bind(this)
    this.closeEditForm = this._closeEditForm.bind(this)
  }

  _closeEditForm () {
    this.props.handleClearEditCommentId
  }

  async _submit (fields) {
    const { comment } = fields
    await this.props.handleEditComment(comment, this.props.commentId)
    this.props.reset()
  }

  render () {
    const { handleSubmit, valid } = this.props

    return (
      <form className={cx('edit-comment-form')} onSubmit={handleSubmit(this.submit)}>
        <div className='form-group'>
          <Field name='comment' component={RenderInput} type='text' />
        </div>
        <button type='submit' className={cx('btn', 'btn-primary', 'btn-sm', {'disabled': !valid})}>Submit</button>
        <button
          onClick={this.closeEditForm}
          className={cx('btn', 'btn-secondary', 'btn-sm')}
          style={{marginLeft: 15}}
        >
          Cancel
        </button>
      </form>
    )
  }
}

const RenderInput = ({input, label, type}) => (
  <textarea {...input} type={type} className='form-control' rows='3' required autoFocus />
)

RenderInput.propTypes = {
  input: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string
}

const validate = (values) => {
  const errors = {}
  if (!values.text) {
    errors.text = 'Required'
  }
  return errors
}

// Decorate the form component
const EditCommentForm = reduxForm({
  form: 'editComment',
  validate
})(EditComment)

function mapStateToProps (state, ownProps) {
  return {
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    handleEditComment: postActions.editComment,
    handleClearEditCommentId: postActions.clearEditCommentId
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCommentForm)
