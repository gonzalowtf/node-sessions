var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

// set the default views folder
//app.set('views', __dirname + '/views');
app.use('/views', express.static(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);
var users = [
		{
			username: "usr1",
			password: "pass1"
		}
		,
		{
			username: "usr2",
			password: "pass2"
		}
];

// register the session with it's secret ID
app.use(session({secret: 'uitisawesome'}));

// register the bodyParser middleware for processing forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){

	// Check if an e-mail address is set in the session.
	// If it is, we will redirect to the admin page.
	if(req.session.email) {
	    res.render('page1.html');
	}
	else {
	    res.render('index.html');
	}
});



app.post('/sessions',function(req,res){
	for(var i =0; i < users.length; i++){					
		if(req.body.email ===users[i].username){
			if(req.body.pass === users[i].password){
				req.session.email = req.body.email;
				req.session.password = req.body.pass;
				console.log(req.session);
				res.end('yes');
				
				}
			}
		}
		
	
});
app.get('/sessions/:page',function(req,res){
	var page = req.params.page;
	if(req.session.email) {
		if(page == "page1"){
			console.log("page1");
		}
		else
			if(page == "page2"){
				console.log("page2");
			}
			else{
				console.log("index");
	    		res.render('index.html');	    	    
			}
		
	    //res.render('page1.html');
	    
	    
	}
	else {
		console.log("index");
	    res.end('no');
	    	    
	}
			
	
});



app.get('/logout',function(req,res){
	
	// if the user logs out, destroy all of their individual session
	// information
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("logged out")
			res.redirect('/');
		}
	});

});

app.listen(3000,function(){
	console.log("App Started on port 3000");
});