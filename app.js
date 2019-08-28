let express = require('express');
let bodyParser = require('body-parser');
let ejs = require('ejs');
let app = express();
let router = express.Router();
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use("/images",express.static('images'));
app.use("/css",express.static('css'));
app.use(bodyParser.urlencoded({
    extended: false
}));
let db = [];

router.get('/', function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});
  
router.get('/newTask', function (req,res) {
    res.sendFile(__dirname + "/views/newTask.html");
});
  
router.get('/listTasks', function(req, res){
    let filename = __dirname + "/views/listTasks.html";
    res.render(filename, {
        database:db
    });
});

router.post("/addTask", function (req, res) {
    db.push(req.body);
    let filename = __dirname + "/views/listTasks.html";
    // after pushing the new customer to the database, redirect the client to newTask.html 
    res.render(filename, {
      database: db
    });
});

app.use('/', router);
app.listen("8080");