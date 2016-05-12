import React from 'react';
import styles from './Main.css';
import Helmet from 'react-helmet';
import { Jumbotron } from 'react-bootstrap';
import { LoginForm } from '../../components';

// export default class Main extends Component {
export default function Main() {
  return (
    <div className={styles.main}>
      <Helmet title="home" />
      <Jumbotron>
        <h1>Demo</h1>
        <p>This is a simple hero unit, a simple jumbotron-style
          component for calling extra attention to featured
          content or information.
        </p>
        <LoginForm />
      </Jumbotron>
    </div>
  );
}
