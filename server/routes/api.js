/**
 * Created by aliska on 23.01.2018.
 */
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const connection = (closure) =
>
{
    return MongoClient.connect('mongodb://XXXX@ds113098.mlab.com:13098/meantest', (err, client) = > {
            var Mydb = client.db('meantest');

    closure(Mydb);
})
    ;
}
;

let response = {
    status: 200,
    data: [],
    message: null
};

router.get('/news', (req, res) = > {
    var pageSize = 5;
var page = req.query.page;
connection((db) = >
{
    db.collection('News')
    .find()
    .skip(pageSize * (page - 1))
    .limit(5)
    .toArray()
    .then((meantest) = > {
    response.data = meantest;
res.json(response.data);
})
})
})

router.get('/dbcount', (req, res) = > {
    connection((db) =
>
{
    db.collection('News')
        .find()
        .count()
        .then((meantest) = > {
        response.data = meantest;
    res.json(response.data);
})
}
)
})

router.post('/news', (req, res) = > {
    var newNews = req.body;
connection((db) = > {
    db.collection('News')
    .insertOne(newNews, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    })
})
})

router.post('/newsfilterby', (req, res) = > {
    var filterParam = req.body.category_id;
connection((db) = > {
    db.collection('News')
    .find({"category": filterParam})
    .toArray()
    .then((meantest) = > {
    response.data = meantest;
res.json(response.data);
})
})
})

router.get('/news/:id', (req, res) = > {
    connection((db) =
>
{
    db.collection('News')
        .find()
        .toArray()
        .then((meantest) = > {
        response.data = meantest;
    res.json(response);
})
}
)
})

module.exports = router;
