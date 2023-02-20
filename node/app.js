var express = require('express');


var bodyParser= require('body-parser');
var app=express();
app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/',function(req,res){
    // res.render('home',{title:"homepage"});
    res.render('home');

});

app.get('/contact',function(req,res){
    res.render('contact',{qs:req.query});
    // console.log("hello");
})

app.post('/contact',urlencodedParser,function(req,res){
    console.log(req.body);
    res.render('contact-data',{data:req.body});
    // console.log(req.query);
})


app.listen(3000);