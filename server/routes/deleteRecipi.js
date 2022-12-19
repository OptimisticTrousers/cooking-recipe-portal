const express = require('express');

const mysqlConnect = require('../data_base.js');


const Route = express.Router();


Route.delete('/:id',(req,res)=>{
	const id = req.params.id;
	mysqlConnect.query('DELETE FROM recipies WHERE id = ?',id,(err,results)=>{
		if(!err){
			res.send(`Post deleted with ID:${id}`);
		}else{
			console.log(err);
		}
	})
});

module.exports = Route;
