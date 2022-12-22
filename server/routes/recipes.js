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
    const {
      recipeId,
			recipeTitle,
      recipeAuthor,
			createdAt,
      recipeContent,
      recipeCategory,
       } = req.body; 
		const post = [recipeId,recipeTitle,recipeAuthor,createdAt,recipeContent,recipeCategory];
		const sql = 'INSERT INTO recipes (recipeId,recipeTitle,recipeAuthor,createdAt,recipeContent,recipeCategory) VALUES (?,?,?,?,?,?)';
		// console.log(req.body);
    mysqlConnect.query(sql, post, (err, results) => {
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
