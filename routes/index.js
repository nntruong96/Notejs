var express = require('express');
var fs = require('fs');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function(req, res, next) {
	// res.setHeader('Access-Control-Allow-Origin', '*');
 //    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
 //    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
 //    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    res.render('index',{title:'My web'});
});




router.get('/listitem', function(req, res) {
	var list = 'listitem.json';
    fs.readFile( __dirname + "/" + list, 'utf8', function (err, data) {
        if (err) {
        	console.log(err);
        	res.end(err);
        }
        else{
        	res.end(data);
         }
      });
});

router.delete('/listitem',function(req,res){
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

router.post('/listitem',urlencodedParser,function(req,res){
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

router.put('/listitem',urlencodedParser,function(req,res){
    var check = false, n = req.body.nameitem;  v =req.body.value;
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

router.delete('/listitem/:nameitem',urlencodedParser,function(req,res){
	var list = 'listitem.json';
    var check = false, n = req.params.nameitem;
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