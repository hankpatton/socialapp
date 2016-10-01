import React, { Component, PropTypes } from 'react'
import classNames from 'classnames/bind'
import styles from 'components/Post/Post.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { actions as postActions } from 'redux/modules/Posts'

const cx = classNames.bind(styles)

class EditPost extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    handleEditPost: PropTypes.func,
    reset: PropTypes.func,
    handleSubmit: PropTypes.func,
    valid: PropTypes.bool,
    handleEditToggle: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.submit = this._submit.bind(this)
  }

  async _submit (fields) {
    const { text } = fields
    await this.props.handleEditPost(text, this.props.postId)
    this.props.reset()
  }

  render () {
    const { handleSubmit, valid, handleEditToggle } = this.props

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div className='form-group'>
          <Field name='text' component={RenderInput} type='text' />
        </div>
        <button type='submit' className={cx('btn', 'btn-primary', 'btn-sm', {'disabled': !valid})}>Submit</button>
        <button onClick={() => handleEditToggle} className={cx('btn', 'btn-muted', 'btn-sm')} style={{marginLeft: 15}}>Cancel</button>
      </form>
    )
  }
}

const RenderInput = ({input, label, type}) => (
  <textarea {...input} type={type} className='form-control' rows='5' required autoFocus />
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
const EditPostForm = reduxForm({
  form: 'editPost',
  validate
})(EditPost)

function mapStateToProps (state, ownProps) {
  return {
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    handleEditPost: postActions.editPost,
    handleEditToggle: postActions.toggleEditPost
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostForm)
