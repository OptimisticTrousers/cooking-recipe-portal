const express = require('express');

const mysqlConnect = require('../data_base.js');

const Route = express.Router();

Route.get('/',(req,res)=>{
	mysqlConnect.query("SELECT * from recipies",(err,row,field)=>{
		if(!err){
			res.status(200).send(row);
		}else{
			console.log(err);
		}
	})
});

module.exports = Route;

