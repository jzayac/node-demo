import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as todoActions from '../../redux/modules/todo';
import styles from './TodoComponent.css';
import { Button, Checkbox } from 'react-bootstrap';


// <Button bsStyle="primary" bsSize="large" active>Primary button</Button>
@connect(
  state => ({
    todos: state.todo.todos,
    loader: state.todo.loader,
    filter: state.todo.filter,
  }),
  todoActions)
export default class TodoComponent extends Component {
  static propTypes = {
    todos: PropTypes.array,
    addTodo: PropTypes.func,
    getTodo: PropTypes.func,
    updateTodo: PropTypes.func,
    deleteTodo: PropTypes.func,
    loader: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.state = {
      focusTodo: null,
    };
  }
  componentWillMount = () => {
    this.props.getTodo();
  }

  onUpdateTodo = (todo) => {
    this.setState({
      focusTodo: todo,
    });
  }

  handleAddTodo = (event) => {
    event.preventDefault();
    const input = this.refs.todoinput;
    this.props.addTodo(input.value);
    input.value = '';
  }

  toggleTodo = (todo) => {
    const c = {
      ...todo,
      done: !todo.done,
    };
    this.modifyTodo(c);
  }

  modifyTodo = (todo) => {
    this.props.updateTodo(todo);
  }

  handleChange = (event) => {
    this.setState({
      focusTodo: {
        ...this.state.focusTodo,
        todo: event.target.value,
      },
    });
  }

  handleChangeSubmit = (event) => {
    event.preventDefault();
    this.modifyTodo(this.state.focusTodo);
    this.setState({
      focusTodo: null,
    });
  }

  deleteTodo = (id) => {
    this.props.deleteTodo(id);
  }

  render() {
    const { todos, loader } = this.props;
    const { focusTodo } = this.state;
    const todoId = focusTodo ? focusTodo.id : -1;
    return (
      <div className="container">
        <div className={styles.todocomponent}>
          <div className={styles.todoHeader}>
            <input ref="todoinput" placeholder="new todo" ></input>
            <Button
              className="btn-success"
              onClick={this.handleAddTodo} disabled={loader}
            >{'add new'}</Button>
          </div>
          <div>
            {todos && todos.map((todo) =>
              <div className={styles.todoRow} key={todo.id}>
                <Checkbox
                  readOnly={loader} checked={todo.done}
                  className={styles.todoCheckbox}
                  onClick={() => this.toggleTodo(todo)}
                />
                {(todoId !== todo.id) &&
                  <span
                    className={todo.done ? styles.complete : ''}
                    onDoubleClick={() => this.onUpdateTodo(todo)}
                  >{todo.todo}</span>
                }
                {(todoId === todo.id) &&
                  <form onSubmit={this.handleChangeSubmit} className={styles.onSubmit}>
                    <input
                      className={styles.inputChange} type="text" ref="rit"
                      value={focusTodo.todo} onChange={this.handleChange}
                    ></input>
                  </form>
                }
                <Button
                  className={styles.todoButton}
                  onClick={() => this.deleteTodo(todo.id)}
                  disabled={loader}
                >X</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
