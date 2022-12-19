const express = require('express');

const mysqlConnect = require('../data_base.js');


const Route = express.Router();



Route.put('/:id',(req,res)=>{
	const id = req.params.id;
	let createdAt = new Date().toISOString().slice(0,10);
	const {title,author,content} = req.body;
  const post = {title,author,content,createAt};
	mysqlConnect.query('UPDATE recipies SET ? WHERE id = ?',[post,id],(err,results)=>{
		if(!err){
			res.send(`post update with ID: ${id}`);
		}else{
			console.log(err);
		}
	})
});


module.exports = Route;

