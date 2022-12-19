const express = require('express');

const mysqlConnect = require('../data_base.js');

const Route = express.Router();

Route.post('/post',(req,res)=>{
	let createAt = new Date().toISOString().slice(0,10);
	const {title,author,content} = req.body;
	const post = {title,author,content,createAt};
	mysqlConnect.query('INSERT INTO recipies SET?',post,(err,results)=>{
		if(!err){
			res.status(201).send(`post added with ID:${results.insertId}`);
		}else{
			console.log(err);
		}
	})
});

module.exports = Route;
