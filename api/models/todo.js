'use strict';

function Todos() {
  const that = {};
  const todos = [
      { id: 1, todo: 'todo1', done: false },
      { id: 2, todo: 'todo2', done: false },
      { id: 3, todo: 'todo3', done: false },
      { id: 4, todo: 'todo4', done: false },
      { id: 5, todo: 'todo5', done: false },
  ];
  let key = todos.length + 1;

  function findInArray(id, callback) {
    let idx;
    const todo = todos.find((todo, index) => {
      if (todo.id == id) {
        idx = index;
        return todo;
      }
    });
    callback(todo, idx);
  }

  that.find = (filter, callback) => {
    return callback(undefined, todos);
  }


  that.findById = (id, callback) => {
    findInArray(id, (todo) => {
      return callback(undefined, todo);
    });
  };

  that.push = (text, callback) => {
    const todo = {
      id: key++,
      todo: text,
      done: false,
    };
    todos.push(todo);
    callback(undefined, todo);
  };

  that.findOneAndUpdate = (filter, updateTodo, back, callback) => {
    findInArray(filter._id, (todo, idx) => {
      if (idx !== undefined) {
        todos[idx].todo = updateTodo.todo ? updateTodo.todo : todos[idx].todo;
        todos[idx].done = updateTodo.done ? updateTodo.done : todos[idx].done;
        callback(undefined, todos[idx]);
      } else {
        callback(undefined, undefined);
      }
    });
  };

  that.remove = (filter, callback) => {
    findInArray((filter._id *1), (todo, idx) => {
      if (idx !== undefined) {
        todos.splice(idx, 1);
      }
      callback(undefined, idx);
    });
  };

  return that;
}

module.exports = Todos();
