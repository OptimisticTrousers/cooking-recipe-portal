const express = require("express");

const Router = express.Router();

const mysqlConnect = require("../data_base.js");

Router.route("/").get((req, res) => {
mysqlConnect.query("SELECT * from categories",(err,row,field)=>{
	if(!err){
		res.status(200).send(row);
	}else{
		console.log(err);
	}
})
})

}).post((req, res, next) => {
    const { name, description } = req.body;
    const category = { name, description};
    mysqlConnect.query("INSERT INTO categories SET?", category, (err, results) => {
      if (!err) {
        res.status(201).send(`category added with ID:${results.insertId}`);
      } else {
        console.log(err);
      }
    });

}).put((req, res) => {

}).delete((req, res) => {
   const id = req.params.id;
	mysqlConnect.query("DELETE FROM categories WHERE id = ?",id
		,(err,results)=>{
			if(!err){
				res.send(`category deleted with ID: ${id}`);
			}else{
				console.log(err);
			}
		})
})
})

module.exports = Router
