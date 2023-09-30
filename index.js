import express from "express";
import bodyParser from "body-parser";

var addedtask=[];
var completed = [];
const port = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
    res.render("index.ejs",{task:addedtask,complete:completed});
});
app.post("/add",(req,res)=>{
    var newTask = req.body.task;
    addedtask.push(newTask);
    res.redirect("/");
});
app.post("/remove",(req,res)=>{
    var completeTask = req.body.check;
if (typeof completeTask === "string") {
     completed.push(completeTask);
  addedtask.splice(addedtask.indexOf(completeTask), 1);
} else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) 
    {     completed.push(completeTask[i]);
    addedtask.splice(addedtask.indexOf(completeTask[i]), 1);
    }
}
   res.redirect("/");
});
app.listen(port,()=>{
    console.log(`Server listening at port ${port}`);
});