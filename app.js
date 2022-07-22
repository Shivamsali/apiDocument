let express = require('express');
let app = express();

let dotenv = require('dotenv');
dotenv.config();

let port = process.env.PORT || 9870;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = "mongodb+srv://Shivam:Shivam123@cluster0.qx3cftb.mongodb.net/?retryWrites=true&w=majority";
let db;

app.get('/',(req,res)=>{
    res.send('Hii From Express')
})

app.get('/categories',(req,res)=>{
    db.collection('categories').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
}) 

app.get('/sub_categories',(req,res) =>{
    db.collection('sub_categories').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get('/products',(req,res) =>{
    db.collection('products').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// connection with db
MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log(`Error While Connecting`);
    db = client.db('edurekaEcomm')
    app.listen(port,() => {
        console.log(`listening on port ${port}`)
    })
})
