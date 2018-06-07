'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });


var app = module.exports = express();

app.use(bodyParser.json())
app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));



app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });



app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});



// UPLOADS THE FILE AND EXTRACTS THE NAME, TYPE AND SIZE TO DISPLAY
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  
  let name = req.file.originalname;
  let type = req.file.mimetype;
  let size = req.file.size;
  
  res.json(
    {
      "name" : name,
      "type" : type,
      "size" : size
    }
  )
})



app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
