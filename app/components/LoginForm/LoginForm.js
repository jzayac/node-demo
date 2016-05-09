import React, { Component, PropTypes } from 'react';
import { Button, Alert } from 'react-bootstrap';
import styles from './LoginForm.css';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as authActions from '../../redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user,
    loginError: state.auth.loginError,
    loggingIn: state.auth.loggingIn,
  }),
  authActions)
export default class LoginForm extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    loginError: PropTypes.string,
    authDismissError: PropTypes.func,
    loggingIn: PropTypes.bool,
  }
  handleUserLogin = () => {
    const user = this.refs.email;
    const pass = this.refs.userpass;
    this.props.login(user.value, pass.value);
    user.value = '';
    pass.value = '';
  }

  render() {
    const { user, loginError, authDismissError, loggingIn } = this.props;
    return (
      <div className={styles.loginForm}>
        {loginError &&
          <Alert bsStyle="danger" onDismiss={authDismissError}>
            {loginError}
          </Alert>
        }
        {!user &&
          <form
            className="login-form form-inline"
            onSubmit={(e) => { e.preventDefault(); this.handleUserLogin(); }}
          >
            <h2>Please sign in </h2>
            <input
              type="text" ref="email" placeholder="Enter email"
              className={`${styles.widthFull} form-control`}
              disabled={loggingIn}
            />
            <input
              type="password" ref="userpass" placeholder="Enter password"
              className={`${styles.widthFull} form-control`}
              disabled={loggingIn}
            />
            <Link to="/signup">registration</Link>
            <Button
              className="btn btn-lg btn-primary btn-block"
              onClick={this.handleUserLogin}
              disabled={loggingIn}
            ><i className="fa fa-sign-in" />{' '}Log In
            </Button>
          </form>
        }
        {user &&
          <h2>Welcome {user.email}</h2>
        }
      </div>
    );
  }
}
