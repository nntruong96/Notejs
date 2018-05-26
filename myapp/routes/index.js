var express = require('express');
var fs = require('fs');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res, next) {
	// res.status(200).json({
	// 	message:'My web'
	// })
	res.render('index',{title:'My web'});
});

router.get('/getlist', function(req, res) {
	var list = 'listitem.json';
    fs.readFile( __dirname + "/" + list, 'utf8', function (err, data) {
        if (err) {
        	console.log(err);
        	res.end(err);
        }
        else{
        	res.end(data)
         }
      });
});

router.post('/deletelist',function(req,res){
	var list = 'listitem.json';
    fs.unlink( __dirname + "/" + list,function(err){
        if(err) {
         	console.log(err);
         	res.end(err);
        }
        else {
        	res.status(200).json({
				message:'Deleted'
			})
        }
      })
   })

router.post('/createitem',urlencodedParser,function(req,res){
    var list = 'listitem.json';
    var n,v,check = true;
    n = req.body.nameitem;  v = req.body.value;
  
    if(n == '' || v ==''){
       	res.status(200).json({
				message:'Cannot createitem'
			})
    }
    else {
    	var item = {
	   		[n] : {
	     		"name" : n,
	     	 	"value": v 
	   		}
		}
		//console.log(item);
	    fs.readFile( __dirname + "/" + list, 'utf8', function (err, data) {
	        if (err ) {
	         	console.log(err);
	        }
	        else {
	            data = JSON.parse( data );
	            for(i in data){
	            	if( i == n){
	            		res.status(200).json({
							message:'Cannot createitem'
						})
						res.end();
	            	}
	            }
	        data[n] = item[n];
	      	data =JSON.stringify(data) 
            fs.writeFile(__dirname + "/" +list,data,function(err){
                res.status(200).json({
					message:'Created'
				})
            });   
	         }
	    });
	}
})

router.post('/updateitem',urlencodedParser,function(req,res){
    var check = false, n = req.body.nameitem;  v =-1;
    var list = 'listitem.json';
    console.log(v);
    if(n == '' || v == ''){
    	res.status(200).json({
				message:'Cannot Update'
			})
    	res.end();
    }
    else {
    	var item = {
	   		[n] : {
	     		"name" : n,
	     	 	"value": v 
	   		}
		}
	    fs.readFile( __dirname + "/" + list, 'utf8', function (err, data) {
	        if (err) {
	        	console.log(err);
	        }
	        else{
	            data = JSON.parse( data );
	            for( i in data){
	            	if(i == n)
	                	data[i] = item[n];
	                	check = true;
	                }
	            }
	            var data = JSON.stringify(data);
	            if(!check){
	                	res.status(200).json({
							message:'Cannot find name item'
						})
			    		res.end();
			    }
			    else{
		            fs.writeFile(__dirname + "/" +list,data,function(err){		                		            
	              	    res.status(200).json({
							message:'Updated'
						})
			    		res.end();		             		                
		            });  
	            }
	    });
	}
})

router.delete('/deleteitem',urlencodedParser,function(req,res){
	var list = 'listitem.json';
    var check = false, n = req.body.nameitem;
	    fs.readFile( __dirname + "/" + list, 'utf8', function (err, data) {
		    if (err) {
	        	console.log(err);
	        }
	        else {
		        data = JSON.parse(data);
		        for(var i in data)
		        	if(i == n)
		        		check = true;
		        if(check){
		        	delete data[n];
		        	console.log(data);
			        var data = JSON.stringify(data);
			        fs.writeFile(__dirname + "/"+list,data,function(err){ 
			        	if(err){
			        		console.log(err);
			        	}
			        	else 
			        	res.status(200).json({
							message:'Deleted'
						})
		        	});
			    }
			    else{
			    	res.status(200).json({
						message:'Cannot find name item'
					})
		      		res.end();
			    }
		    }
		});
})

module.exports = router;