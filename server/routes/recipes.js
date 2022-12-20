const express = require("express");

const mysqlConnect = require("../data_base.js");

const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    mysqlConnect.query("SELECT * from recipes", (err, row, field) => {
      if (!err) {
        res.status(200).send(row);
      } else {
        console.log(err);
      }
    });
  })
  .post((req, res) => {
    const post = {
      recipeId: req.body.id,
      recipeTitle: req.body.title,
      recipeAuthor: req.body.author,
      recipeContent: req.body.content,
      recipeCategory: req.body.category,
      createdAt: req.body.category,
    };
    console.log(post);
    mysqlConnect.query("INSERT INTO recipes SET?", post, (err, results) => {
      if (!err) {
        res.status(201).send(`post added with ID:${results.insertId}`);
      } else {
        console.log(err);
      }
    });
  })
  .put((req, res) => {
    const id = req.body.id;
    const post = {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      category: req.body.category,
    };
    console.log(post)
    mysqlConnect.query(
      "UPDATE recipes SET ? WHERE id = ?",
      [post, id],
      (err, results) => {
        if (!err) {
          res.send(`Recipe update with ID: ${id}`);
        } else {
          console.log(err);
        }
      }
    );
  })
  .delete((req, res) => {
    const id = req.params.id;
    mysqlConnect.query(
      "DELETE FROM recipes WHERE id = ?",
      id,
      (err, results) => {
        if (!err) {
          res.send(`Recipe deleted with ID:${id}`);
        } else {
          console.log(err);
        }
      }
    );
  });

module.exports = Router;
