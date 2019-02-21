var express = require('express');
var app = express();
var hostname = '127.0.0.1';
port = process.env.port || 3001;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/testing', function(req,res){

    res.send("Hello!!!");
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
  })