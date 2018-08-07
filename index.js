let express = require("express");
const app = express();
let user_data = require('./state.js').users;
let fs = require('fs');
let bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/users",function(req,res,next){
    return res.send(user_data[0]);
})
app.get("/users/:userId",function(req,res,next){

    return res.send(user_data[req.params.userId]);
})
app.post("/users",function(req,res,next){
    newUser = {
        "_id": user_data.length+1,
        "name": req.body.name,
        "occupation": req.body.occupation,
    }
    user_data.push(newUser);

    return res.send(user_data);
})
app.put("users/1",function(req,res,next){
    user_data[0].occupation = "Undecided";
    text_data = "exports.users = "+JSON.stringify(user_data);
    fs.writeFileSync('./state.js',text_data)
    return res.send(user_data);
})
app.put("users/:userId",function(req,res,next){
    user_data[req.params.userId-1].occupation = "Undecided";
    text_data = "exports.users = "+JSON.stringify(user_data);
    fs.writeFileSync('./state.js',text_data)
    return res.send(user_data);
})
app.delete("/users", function(req,res,next){
    user_data.pop();
    return res.send(user_data);
})
app.delete("/users/:userId", function(req,res,next){
    user_data[req.param.userId-1]= { "isActive" : false };
    return res.send(user_data);
})
app.use(function(req, res, next) {
    return res.send(user_data);
});

app.listen(6767, (err) => {
    if (err) {
        return console.log("Error", err);
    }
    console.log("Web server is now living in apartment 3002");
});

