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
    const category = {
      categoryId: req.body.categoryId,
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
      createdAt: req.body.createdAt,
    };
    mysqlConnect.query(
      "INSERT INTO categories SET?",
      category,
      (err, results) => {
        if (!err) {
          res.status(201).send(`category added with ID:${results.insertId}`);
        } else {
          console.log(err);
        }
      }
    );
  });

Router.route("/:categoryId")
  .put((req, res) => {
    const id = req.params.categoryId;
    const category = {
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
    };
    mysqlConnect.query(
      "UPDATE categories SET ? WHERE categoryId = ?",
      [category, id],
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
    const id = req.params.categoryId;
    mysqlConnect.query(
      "DELETE FROM categories WHERE categoryId = ?",
      id,
      (err, results) => {
        if (!err) {
          res.send(`category deleted with ID: ${id}`);
        } else {
          console.log(err);
        }
      }
    );
  });

module.exports = Router;
