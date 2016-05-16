'use strict';

const express = require('express');
const Todo = require('../models/todo');
let router = express.Router();


router.get('/todo', (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      res.status(404).json({
        message: 'not found',
      });
    } else {
      res.status(200).json({
        data: todos,
      });
    }
  });
});

router.get('/todo/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err || !todo) {
      res.status(404).json({
        message: 'not found',
      });
    } else {
      res.status(200).json({
        data: todo,
      });
    }
  });
});

router.post('/todo', (req, res) => {
  Todo.push(req.body.todo, (err, todo) => {
    if (err || !todo) {
      res.status(500).json({
        message: 'o_O something wrong',
      });
    } else {
      res.status(200).json({
        data: todo,
      });
    }
  });
});

router.post('/todo/:id', (req, res) => {
  let todo = {
    todo: req.body.todo,
    done: req.body.done,
  };
  Todo.findOneAndUpdate({ _id: req.params.id * 1 }, todo, { new: 'true' }, (err, data) => {
    if (err || !data) {
      res.status(404).json({
        message: 'not found',
      });
    } else {
      res.status(200).json({ data: data });
    }
  });
});

router.delete('/todo/:id', (req, res) => {
  Todo.remove({ _id: req.params.id }, (err, idx) => {
    if (err || idx === undefined) {
      res.status(404).json({
        message: 'not found',
      });
    } else {
      res.status(200).json({
        data: idx,
      });
    }
  });
});

module.exports = router;
