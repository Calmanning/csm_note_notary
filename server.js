const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 8000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.send("The page is up")
})
app.get("/mypage", (req, res) =>{
    res.sendFile(path.join(__dirname,'/index.html'))
})

app.get("/form", (req, res) =>{
    res.sendFile(path.join(__dirname,'/form.html'))
})

app.get("/api/readdb",(req, res) =>{
    fs.readFile("db.json", "utf-8", (err, data)=> {
        if(err) throw err
        res.json(JSON.parse(data))
    })
})

app.post("/api/create", (req, res)=>{
   

    const saveTo = {
        name:req.body.userName,
        isStudent:JSON.parse(req.body.trueOrFalse)
    };
    fs.readFile("db.json", "utf-8", (err, data)=> {
        if(err) throw err
        let readFrom = JSON.parse(data)
        readFrom.push(saveTo)
        console.log(readFrom);
    
    fs.writeFile("db.json", JSON.stringify(readFrom), err =>{
        if(err) throw err
        console.log("all good.")
        res.json(req.body);
    })
        
})
})
app.listen(PORT, function () {
    console.log("You're listening to the smooth sounds of http://localhost:" + PORT);
});