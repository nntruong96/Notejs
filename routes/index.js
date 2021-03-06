var express = require('express');
var fs = require('fs');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function(req, res, next) {
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

// router.delete('/listitem',function(req,res){
// 	var list = 'listitem.json';
//     fs.unlink( __dirname + "/" + list,function(err){
//         if(err) {
//          	console.log(err);
//          	res.end(err);
//         }
//         else {
//         	res.status(200).json({message:'Deleted'})
//         }
//       })
//    })

router.post('/listitem',urlencodedParser,function(req,res){
    var list = 'listitem.json';
    var n,v,check = true;
    n = req.body.nameitem;  v = req.body.value;
  
    if(n == '' || v ==''){
       	res.status(200).json({message:'Cannot createitem'})
    }
    else {
	    fs.readFile( __dirname + "/" + list, 'utf8', function (err, data) {
	        if (err ) {
	         	console.log(err);
	        }
	        else {
	            data = JSON.parse( data );
	            var id = 0;
	            for(i in data )
	            	id = i;
	            id ++;
	            //var id = Object.keys(data).length ;
	            console.log(data[id]);
	            var item = {
			   		[id] : {
			     		"name" : n,
			     	 	"value": v 
			   		}
				}
				
				//console.log(length);
	            for(i in data){
	            	if( data[i].name == n){
	            		res.status(200).json({message:'Cannot createitem'})
						res.end();
						check = false;
	            	}
	            }
	        	if(check){
			        data[id] = item[id];
			      	data =JSON.stringify(data) 
		            fs.writeFile(__dirname + "/" +list,data,function(err){
		                res.status(200).json({message:'Created'})
            		});
            	}   
	         }
	    });
	}
})

router.put('/listitem',urlencodedParser,function(req,res){
    var check = false, n = req.body.nameitem;  v =req.body.value;
    var list = 'listitem.json';
  //  console.log(n);
    if(n == '' || v == ''){
    	res.status(200).json({message:'Cannot Update'})
    	res.end();
    }
    else {
	    fs.readFile( __dirname + "/" + list, 'utf8', function (err, data) {
	        if (err) {
	        	console.log(err);
	        }
	        else{
	            data = JSON.parse( data );
	            var id = Object.keys(data).length + 1;
	            var item = {
			   		[id] : {
			     		"name" : n,
			     	 	"value": v 
			   		}
				}
	            for( i in data){
	            	if(data[i].name == n){
	                	data[i] = item[id];
	                	check = true;
	                }
	       		}
	            var data = JSON.stringify(data);
	            if(check == false){
	                	res.status(200).json({message:'Cannot find item'})
			    		res.end();
			    }
			    else{
		            fs.writeFile(__dirname + "/" +list,data,function(err){		                		            
	              	    res.status(200).json({message:'Updated'})
			    		res.end();		             		                
		            });  
	          	}
	        }
	    });
	}
})

router.delete('/listitem',urlencodedParser,function(req,res){
	var list = 'listitem.json';
    var check = false, n = req.body.nameitem;
	    fs.readFile( __dirname + "/" + list, 'utf8', function (err, data) {
		    if (err) {
	        	console.log(err);
	        }
	        else {
		        data = JSON.parse(data);
		        var id;
		        for(var i in data)
		        	if(data[i].name == n){
		        		check = true;
		        		id = i;
		        	}
		        if(check){
		        	delete data[id];
		        //	console.log(data);
			        var data = JSON.stringify(data);
			        fs.writeFile(__dirname + "/"+list,data,function(err){ 
			        	if(err){
			        		console.log(err);
			        	}
			        	else 
			        	res.status(200).json({message:'Deleted'})
		        	});
			    }
			    else{
			    	res.status(200).json({message:'Cannot find name item'})
		      		res.end();
			    }
		    }
		});
})

module.exports = router;