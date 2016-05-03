'use strict';

function User() {
  let that = {};
  const users = [
    { id: 123, email: 'root@doman.com', password: '' },
    { id: 223, user: 'todo2', password: '' },
    { id: 323, user: 'todo3', password: '' },
    { id: 423, user: 'todo4', password: '' },
    { id: 523, user: 'todo5', password: '' },
  ];
  let key = users.length + 1;

  function findInArray(email, callback) {
    let idx;

    let user = users.find((user, index) => {
      if (user.email == email) {
        idx = index;
        return user;
      }
    });
    callback(user, idx);
  }

  that.find = (filter, callback) => {
    if (Object.keys(filter).length === 0) {
      return callback(undefined, users);
    } else {
      return callback({ error: 'not implemented' });
    }
  };

  that.findOne = (filter, callback) => {
    // if (Object.keys(filter).length !== 0 ) {
    let email = filter.email;
    findInArray(email, ( user ) => {
      if (user) {
        callback(undefined, user);
      } else {
        callback({ status: 'not found' });
      }
    });
  }


  that.findById = (id, callback) => {
    findInArray(id, (user) => {
      if (user) {
        return callback(undefined, user);
      } else {
        return callback({ status: 'not found' });
      }
    });
  };

  that.push = (text, callback) => {
    let user = {
      id: key++,
      user: text,
      done: false,
    }
    users.push(user);
    callback(undefined, user);
  }

  that.findOneAndUpdate = (filter, updateTodo, back, callback) => {
    findInArray(filter._id, (user, idx) => {
      if (idx !== undefined) {
        users[idx].user = updateTodo.user ? updateTodo.user : users[idx].user;
        users[idx].done = updateTodo.done ? updateTodo.done : users[idx].done;
        callback(undefined, users[idx]);
      } else {
        callback({status: 'not found'});
      }
    });
  }

  that.remove = (filter, callback) => {
    findInArray(filter._id, (user, idx) => {
      if (idx !== undefined) {
        users.splice(idx, 1);
        callback(undefined, idx);
      } else {
        callback({status: 'not found'});
      }
    });
  }

  return that;
}

module.exports = User();
