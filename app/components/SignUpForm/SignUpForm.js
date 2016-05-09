import React, { Component, PropTypes } from 'react';
import { Button, Alert } from 'react-bootstrap';
import styles from './SignUpForm.css';
import { connect } from 'react-redux';
import * as authActions from '../../redux/modules/auth';
import * as validation from '../../../utils/validation';

@connect(
  state => ({
    loggingIn: state.auth.loggingIn,
    signUpError: state.auth.signUpError,
    signingUp: state.auth.signingUp,
  }),
  authActions)
export default class SingUpForm extends Component {
  static propTpyes = {
    loggingIn: PropTypes.string,
    authDismissError: PropTypes.func,
    signUpError: PropTypes.string,
    signUp: PropTypes.func,
    signingUp: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = { validationError: null };
  }

  validationError = (err) => {
    this.setState({
      validationError: (err || null),
    });
  }

  handleSingUp = () => {
    const user = this.refs.email;
    const pass = this.refs.userpass;
    const passConf = this.refs.userpassconf;
    // let err = '';
    if (pass.value !== passConf.value) {
      // err = `${err} </br> password not match`;
      this.validationError('password not match');
    } else if (!validation.isEmail(user.value)) {
      // console.log('not valid email');
      // console.log(user.value);
      this.validationError('not valid email');
    } else {
      this.validationError();
      this.props.signUp(user.value, pass.value);
      user.value = '';
      pass.value = '';
      passConf.value = '';
      // TODO: use some form
    }
  }

  render() {
    const { signUpError, signingUp, authDismissError } = this.props;
    const { validationError } = this.state;
    const error = validationError || signUpError;
    return (
      <div>
        {error &&
          <Alert bsStyle="danger" onDismiss={authDismissError}>
            {error}
          </Alert>
        }
        <form >
          <input
            type="text" ref="email" placeholder="Enter email"
            className={`${styles.widthFull} form-control`}
            disabled={signingUp}
          />
          <input
            type="password" ref="userpass" placeholder="Enter password"
            className={`${styles.widthFull} form-control`}
            disabled={signingUp}
          />
          <input
            type="password" ref="userpassconf" placeholder="Confirm password"
            className={`${styles.widthFull} form-control`}
            disabled={signingUp}
          />
          <Button
            className="btn btn-lg btn-primary btn-block"
            onClick={this.handleSingUp}
            disabled={signingUp}
          ><i className="fa fa-sign-in" />{' '}Log In
          </Button>
        </form>
      </div>
    );
  }
}
