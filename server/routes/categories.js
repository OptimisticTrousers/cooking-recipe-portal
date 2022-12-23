const express = require("express");

const Router = express.Router();

const mysqlConnect = require("../data_base.js");

Router.route("/")
  .get((req, res) => {
    mysqlConnect.query("SELECT * from categories", (err, row, field) => {
      if (!err) {
        res.status(200).send(row);
      } else {
        console.log(err);
      }
    });
  })
  .post((req, res, next) => {
    const category = { ...req.body };
    mysqlConnect.query(
      "INSERT INTO categories SET?",
      category,
      (err, results) => {
        if (!err) {
          res
            .status(201)
            .send(`Category added with name:${category.categoryName}`);
        } else {
          console.log(err);
        }
      }
    );
  });

Router.route("/:categoryId")
  .get((req, res) => {
    const id = req.params.categoryId;
    mysqlConnect.query(
      "SELECT * FROM recipes WHERE categoryId= ?",
      [id],
      (err, results) => {
        if (!err) {
          const [row] = results;
          res.status(200).send(row);
        } else {
          console.log(err);
        }
      }
    );
  })
  .put((req, res) => {
    const category = { ...req.body };
    const categoryId = req.params.categoryId;
    mysqlConnect.query(
      "UPDATE categories SET ? WHERE categoryId = ?",
      [category, categoryId],
      (err, results) => {
        if (!err) {
          res.send(`Category update with id: ${categoryId}`);
        } else {
          console.log(err);
        }
      }
    );
  })
  .delete((req, res) => {
    const categoryId = req.params.categoryId;
    mysqlConnect.query(
      "DELETE FROM categories WHERE categoryId = ?",
      categoryId,
      (err, results) => {
        if (!err) {
          res.send(`Category deleted with ID: ${categoryId}`);
        } else {
          res.send(err);
        }
      }
    );
  });

module.exports = Router;
