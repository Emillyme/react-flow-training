const express = require('express')
const cors = require('cors')
const fs = require('fs');

const app = express()

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));


let data;

app.get("/data", (req, res)=>{
    res.send(data)
})

app.post("/data", (req, res) =>{
   
    data = req.body
   
    setTimeout(() =>{
        res.send({status:true});
    }, 1200)
})

const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});