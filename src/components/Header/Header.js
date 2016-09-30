import React, { PropTypes } from 'react'
import classNames from 'classnames/bind'
import styles from './Header.scss'
import { Link } from 'react-router'

const cx = classNames.bind(styles)

const propTypes = {
  handleLogin: PropTypes.func,
  handleLogout: PropTypes.func,
  loggedIn: PropTypes.bool,
  profile: PropTypes.object,
  postCount: PropTypes.number
}

export const Header = (props) => {
  const {
    handleLogin,
    handleLogout,
    loggedIn,
    profile,
    postCount
  } = props

  return (
    <div className={cx('header-container')}>
      <div
        className={cx('header-image-container')}
        style={{backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0) 30%,rgba(0,0,0,0.75) 100%), url("/venice_bg.jpg")'}}
      >
        <div className={cx('header-nav-bar')}>
          <div className={cx('header-nav-bar-brand')} />
          <div className={cx('header-nav-bar-login')}>
            {loggedIn
              ? <div className={cx('welcome-message-container')}>
                <div className={cx('welcome-message')}> Welcome, {profile.given_name}</div>
                <div className={cx('welcome-avatar')} style={{backgroundImage: `url(${profile.picture})`}} />
                <button className={cx('btn', 'btn-warning', 'header-login-btn')} onClick={handleLogout}>Logout</button>
              </div>
              : <button className={cx('btn', 'btn-primary', 'header-login-btn')} onClick={handleLogin}>Login</button>
            }

          </div>
        </div>
        <div className={cx('header-photos-collection-container')}>
          <div className={cx('header-photos-collection')}>
            <div className={cx('header-photo-label')}>RECENT PHOTOS:</div>
            <div className={cx('header-photo')} style={{backgroundImage: 'url(/florence.png)'}} />
            <div className={cx('header-photo')} style={{backgroundImage: 'url(/pyramid.png)'}} />
            <div className={cx('header-photo')} style={{backgroundImage: 'url(/mountain.png)'}} />
            <div className={cx('header-photo')} style={{backgroundImage: 'url(/vegas.png)'}} />
          </div>
        </div>
      </div>
      <div className={cx('header-info-container')}>
        <div className={cx('header-user-info-container')}>
          <Link to='/' className={cx('user-avatar')} style={{backgroundImage: 'url("/headshot.jpg")'}} />
          <div className={cx('user-info-content')}>
            <div className={cx('user-name')}>John Q. User</div>
            <div className={cx('user-description')}>Interesting Quote</div>
          </div>
        </div>
        <div className={cx('user-stats-container')}>
          <div className={cx('user-stat')}>
            <span className={cx('user-stat-number')}>
              {postCount > 0
                ? <span>{postCount} </span>
                : <span>0 </span>}
            </span>
            <span className={cx('user-state-label')}>
              {postCount > 1
                ? <span>Posts</span>
                : <span>Post</span>
              }
            </span>
          </div>
          <div className={cx('user-stat')}>
            <span className={cx('user-stat-number')}>999 </span>
            <span className={cx('user-state-label')}>Following</span>
          </div>
          <div className={cx('user-stat')}>
            <span className={cx('user-stat-number')}>0 </span>
            <span className={cx('user-state-label')}>Followers</span>
          </div>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = propTypes
export default Header
