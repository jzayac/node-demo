import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import styles from './LoginForm.css';
import { connect } from 'react-redux';
import * as authActions from '../../redux/modules/auth';
// import validation from '../../../utils/validation';

@connect(
  state => ({ user: state.auth.user, loginError: state.auth.loginError }),
  authActions)
export default class LoginForm extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    // getTodo: PropTypes.func,
    // updateTodo: PropTypes.func,
    // deleteTodo: PropTypes.func,
    // loader: PropTypes.bool,
  }
  handleUserLogin = () => {
    const user = this.refs.username;
    const pass = this.refs.userpass;
    this.props.login(user.value, pass.value);
    user.value = '';
    pass.pass = '';
  }

  render() {
    const { user } = this.props;
    return (
      <div className={styles.loginForm}>
       {!user &&
         <form className="login-form form-inline" >
           <h2>Please sign in </h2>
           <input
             type="text" ref="username" placeholder="Enter a username"
             className={`${styles.widthFull} form-control`}
           />
           <input
             type="password" ref="userpass" placeholder="Enter password"
             className={`${styles.widthFull} form-control`}
           />
           <Button
             className="btn btn-lg btn-primary btn-block"
             onClick={this.handleUserLogin}
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
