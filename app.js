var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
	extended: true
}));

mongoose.connect("mongodb://localhost/blog");

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var blog = mongoose.model("blog", blogSchema);

app.get("/", function(req, res){
	res.redirect("/blog");
});

app.get("/blog", function(req, res){
	blog.find({}, function(err, data){
		if(err){
			console.log("something wrong with db");
		}else{
			res.render("blog", {data: data});
		}
	});
});

app.get("/blog/new", function(req, res){
	res.render("new");
});

app.post("/blog", function(req, res){
	blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("blog");
		}else{
			res.redirect("blog");
		}
	});
});

app.listen(3000, function(){
	console.log("Server has been connected!");
});
