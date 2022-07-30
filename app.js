let express = require('express');
let app = express();
let morgan = require('morgan');
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 9870;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient
let mongoUrl = "mongodb+srv://Shivam:Shivam123@cluster0.qx3cftb.mongodb.net/?retryWrites=true&w=majority"
let db;

app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send('Hii From Express')
})

app.get('/categories', (req, res) => {
    db.collection('categories').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.get('/sub_categories', (req, res) => {
    db.collection('sub_categories').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.get('/products', (req, res) => {
    db.collection('products').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

// app.get('/products/:id', (req, res) => {
//     let id = req.params.id;
//     db.collection('products').find({ subCategory_id: Number(id) }).toArray((err, result) => {
//         if (err) throw err;
//         res.send(result)
//     })
// })



app.get('/products/:categoryId', (req, res) => {
    let query = {}
    let categoryId = Number(req.params.categoryId);
    let subcategoryId = Number(req.query.subcategoryId);
    if (subcategoryId) {
        query = {
            // subcategory_id: subcategoryId,
            // "color.color_id": colorId
            category_id:categoryId,
            "sub-category_id":subcategoryId
        }
    }
    else {
        query = {
            category_id:categoryId
        }
    }

    db.collection('products').find(query).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })
})


// connection with db
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) console.log(`Error While Connecting`);
    db = client.db('edurekaEcomm')
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})
