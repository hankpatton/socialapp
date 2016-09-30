import React, { Component, PropTypes } from 'react'
import classNames from 'classnames/bind'
import styles from 'components/Post/Post.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { actions as postActions } from 'redux/modules/Posts'
import { selectors as authSelectors } from 'redux/modules/Auth'

const cx = classNames.bind(styles)

class AddPost extends Component {
  static propTypes = {
    handleAddNewPost: PropTypes.func,
    profile: PropTypes.object,
    reset: PropTypes.func,
    handleSubmit: PropTypes.func,
    valid: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.submit = this._submit.bind(this)
  }

  async _submit (fields) {
    const { post } = fields
    const { profile } = this.props
    await this.props.handleAddNewPost(post, profile)
    this.props.reset()
  }

  render () {
    const { handleSubmit, valid } = this.props

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div className='form-group'>
          <Field name='post' component={renderInput} type='text' label='What do you want to say?' />
        </div>
        <button type='submit' className={cx('btn', 'btn-primary', 'btn-md', {'disabled': !valid})}>Submit</button>
      </form>
    )
  }
}

const renderInput = ({input, label, type}) => (
  <textarea {...input} placeholder={label} type={type} className='form-control' rows='5' required autoFocus />
)

const validate = (values) => {
  const errors = {}
  if (!values.post) {
    errors.post = 'Required'
  }
  return errors
}

// Decorate the form component
const AddPostForm = reduxForm({
  form: 'addPost',
  validate
})(AddPost)

function mapStateToProps (state, ownProps) {
  return {
    profile: authSelectors.profile(state)
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    handleAddNewPost: postActions.addPost
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostForm)
