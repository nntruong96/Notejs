var express = require('express');
var fs = require('fs');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res, next) {
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
<<<<<<< HEAD
    	var item = {
	   		[n] : {
	     		"name" : n,
	     	 	"value": v 
	   		}
		}
		//console.log(item);
	    fs.readFile( __dirname + "/" + list, 'utf8', function (err, data) {
=======
	    fs.readFile( __dirname + "/" + req.query.namelist+'.json', 'utf8', function (err, data) {
>>>>>>> 1d1e2b2eaa8ba6873e3fd86a99eb30baa34994e0
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
    var check = false, n = req.body.nameitem;  v = req.body.value;
    var list = 'listitem.json';
    if(n == '' || v ==''){
    	res.status(200).json({
				message:'Cannot Update'
			})
    	res.end();
    }
    else {
<<<<<<< HEAD
    	var item = {
	   		[n] : {
	     		"name" : n,
	     	 	"value": v 
	   		}
		}
	    fs.readFile( __dirname + "/" + list, 'utf8', function (err, data) {
	        if (err) {
=======
	    fs.readFile( __dirname + "/" + req.query.namelist+'.json', 'utf8', function (err, data) {
	        if (err || req.query.namelist =='') {
>>>>>>> 1d1e2b2eaa8ba6873e3fd86a99eb30baa34994e0
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

router.post('/deleteitem',urlencodedParser,function(req,res){
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
