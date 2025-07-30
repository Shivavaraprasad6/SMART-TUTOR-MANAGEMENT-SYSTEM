var express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql2');
var app=express();

app.use(express.static(__dirname + '/public'));

// app.use('/css', express.static(__dirname + '/css'));
// app.use('/js', express.static(__dirname + '/js'));
// app.use('/assets', express.static(__dirname + '/assets'));
app.use('/images', express.static(__dirname + '/images'));

app.use(bodyParser.urlencoded({ extended: true })); // For form data (x-www-form-urlencoded)
app.use(bodyParser.json()); // For raw JSON data

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get("/",(req,res)=>
{
res.sendFile(__dirname+"/index.html");
});
app.get("/aboutus",(req,res)=>
    {
    res.sendFile(__dirname+"/aboutus.html");
    });
app.get("/signup&login",(req,res)=>
     {
     res.sendFile(__dirname+"/signup&login.html");
     });
 app.get("/courses",(req,res)=>
    {
    res.sendFile(__dirname+"/courses.html");
    });
    
app.get("/student",(req,res)=>
    {
    res.sendFile(__dirname+"/student.html");
    });
app.get("/tutor",(req,res)=>
    {
    res.sendFile(__dirname+"/tutor.html");
    });
app.get("/StuDash",(req,res)=>
        {
        res.sendFile(__dirname+"/StuDash.html");
        });
app.get("/Tutordashboard",(req,res)=>
    {
    res.sendFile(__dirname+"/Tutordashboard.html");
    });


app.post("/reg",(req,res)=>
    {
    var fname=req.body.fname;
    var email=req.body.email;
    var pwd=req.body.pwd;
    var sub=req.body.sub;
    console.log(fname);
    console.log(email);
    console.log(pwd);
    console.log(sub);


var con=mysql.createConnection({
host:"localhost",
user:"root",
password:"Root@123",
database:"mydb6"
});
con.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL");
});

con.connect(function(err)
{
if (err) throw err;
con.query("insert into tutor(fname,email,pwd,sub) values(?,?,?,?)",[fname,email,pwd,sub],function(err,result)
{
if (err) throw err;
console.log("inserted");
res.redirect("/tutor");
});
});
});

app.post('/log',(req,res)=>
    {
        var email = req.body.email;
        var pwd = req.body.pwd;
        var con = mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"Root@123",
            database:"mydb6"
        });
        con.connect(function(err){
            if(err) throw err;
            con.query("select * from tutor where email=? and pwd=?",[email,pwd],function(err,result){
    
                if(err) throw err;
                if(result.length>0)
                res.redirect('/Tutordashboard');
                else
                res.sendFile(__dirname+"/tutor.html");
            });
            
        });
    
    });


    app.post("/reg1",(req,res)=>
        {
        var fname=req.body.fname;
        var email=req.body.email;
        var pwd=req.body.pwd;
        var pwd1=req.body.pwd1;
        console.log(fname);
        console.log(email);
        console.log(pwd);
        console.log(pwd1);
    
    
    var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Root@123",
    database:"mydb6"
    });
    con.connect((err) => {
        if (err) {
            console.error("Error connecting to MySQL:", err);
            return;
        }
        console.log("Connected to MySQL");
    });
    
    con.connect(function(err)
    {
    if (err) throw err;
    con.query("insert into student(fname,email,pwd,pwd1) values(?,?,?,?)",[fname,email,pwd,pwd1],function(err,result)
    {
    if (err) throw err;
    console.log("inserted");
    res.redirect("/student");
    });
    });
    });
    
    app.post('/log2',(req,res)=>
        {
            var email = req.body.email;
            var pwd = req.body.pwd;
            var con = mysql.createConnection({
                host:"localhost",
                user:"root",
                password:"Root@123",
                database:"mydb6"
            });
            con.connect(function(err){
                if(err) throw err;
                con.query("select * from student where email=? and pwd=?",[email,pwd],function(err,result){
        
                    if(err) throw err;
                    if(result.length>0)
                    res.redirect('/StuDash');
                    else
                    res.sendFile(__dirname+"/Student.html");
                    //  res.send("wrong pwd");
                    
                });
                
            });
        
        });
    


app.listen(2000);
