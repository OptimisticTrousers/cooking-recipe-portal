const express = require('express');
const mysqlConnect = require('../data_base.js');
const Route = express.Router();

Route.get('/:id',(req,res)=>{
	mysqlConnect.query(`SELECT * from recipies where id=${req.params.id}`,(err,row,fields)=>{
		if(!err){
			res.status(201).send(row);
		}else{
			console.log(err);
		}
	})
})

module.exports = Route;
