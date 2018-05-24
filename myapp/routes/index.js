var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'My web' });
});

router.get('/getlist', function(req, res, next) {
 // res.render('getlist', { title: req.query.namelist });
 	var name = [],value = [];
    fs.readFile( __dirname + "/" + req.query.namelist+'.json', 'utf8', function (err, data) {
        if (err) {
        	console.log(err);
          	res.render('index',{title: 'Cannot find list'})
        }
        else{
            data = JSON.parse( data );
            console.log(data);
            for( i in data.item){
            	name[i] = data.item[i].name;
            	value[i] = data.item[i].value;
            }
            res.render('getlist',{title:req.query.namelist, name : name , value: value})
            res.end();
         }
      });
});

router.get('/deletelist',function(req,res){
    fs.unlink( __dirname + "/" + req.query.namelist+'.json',function(err){
        if(err) {
         	console.log(err);
         	console.log(__dirname + "/" +req.query.namelist+'.json');
         	res.render('index',{title: 'Cannot find list'})
        }
        else {
    	    res.render('index',{title: 'Deleted'})  
        }
      })
   })

router.get('/createitem',function(req,res){
    var obj = {
        item: []
        }; 
    var n,v,check = true;
    n = req.query.nameitem;  v = req.query.value;
    if(n == '' || v ==''){
      	res.render('index',{title: 'Cannot create item'})
      	res.end();
    }
    else {
	    fs.readFile( __dirname + "/" + req.query.namelist+'.JSON', 'utf8', function (err, data) {
	        if (err ) {
	         	console.log(err);
	            res.render('index',{title: 'Cannot find list'});
	        }
	        else {
	            console.log(req.query.namelist);
	            data = JSON.parse( data );
	            var i;
	            for( i in data.item){
	               obj.item.push({name: data.item[i].name, value: data.item[i].value});
	               if(n == data.item[i].name )
	                  check = false;
	            }

	            if(check)
	               obj.item.push({name: n, value: v});
	            var tmp = JSON.stringify(obj);
	            fs.writeFile(__dirname + "/" +req.query.namelist+'.json',tmp,function(err){
	                if(!check){
	                	res.render('index',{title: 'Cannot create item'})}
	                else{
	                    res.render('index',{title: 'Created'})
	                }
	            });
	            
	        }
	    });
	}
})

router.get('/updateitem',function(req,res){
    var obj = {
        item: []
        }; 
    var check, n = req.query.nameitem, v = req.query.value;
    if(n == '' || v ==''){
    	res.render('index',{title: 'Cannot updated item'})
      	res.end();
    }
    else {
	    fs.readFile( __dirname + "/" + req.query.namelist+'.JSON', 'utf8', function (err, data) {
	        if (err || req.query.namelist =='') {
	        	console.log(err);
	        	res.render('index',{title: 'Cannot find list'})    
	        }
	        else{
	            data = JSON.parse( data );
	            var i,n = req.query.nameitem, v = req.query.value;
	            for( i in data.item){
	                if(data.item[i].name != n)
	        	        obj.item.push({name: data.item[i].name, value: data.item[i].value});
	                else if(v!='') {
	            	    obj.item.push({name: n, value: v});
	                	check = true;
	                }
	            }
	            var tmp = JSON.stringify(obj);
	            fs.writeFile(__dirname + "/" +req.query.namelist+'.json',tmp,function(err){
	                if(!check){
	                	res.write('Cannot find name');}
	                else{
	              	    res.render('index',{title: 'Updated'})
	                }
	            });
	        }  
	    });
	}
})

router.get('/deleteitem',function(req,res){
    var obj = {
        item: []
        }; 
    var check, n = req.query.nameitem,i;
    if(n == ''){
      	res.render('index',{title: 'Cannot find item'})
      	res.end();
    }
    else {
	    fs.readFile( __dirname + "/" + req.query.namelist+'.json', 'utf8', function (err, data) {
		    if (err) {
	        	console.log(err);
	          	res.render('index',{title: 'Cannot find list'})
	        }
	        else {
		        data = JSON.parse(data);
		        for( i in data.item){
		           if(data.item[i].name != n )
		              obj.item.push({name: data.item[i].name, value: data.item[i].value});
		           else check = true;
		        }
		        var tmp = JSON.stringify(obj);

		        fs.writeFile(__dirname + "/"+req.query.namelist+'.json',tmp,function(err){
		           if(err)res.write('ERR');
		           else 
		           if(!check){
		           		res.render('index',{title: 'Cannot find name'})}
		           else{
		             	res.render('index',{title: 'deleted'})
		           }
		        });
		    }
		});
	}
})

module.exports = router;