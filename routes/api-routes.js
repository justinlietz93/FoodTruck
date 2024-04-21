// API routes for the website

// Import required modules
const express = require('express');
const router = express.Router();
const { getCollection, ObjectId } = require('../foodtruck_db');

//////////////////////////////       MENU        //////////////////////////////

// GET /api/v1/menu                        (id, name, description, price)
router.get('/menu', async (req, res) => {
    const collection = await getCollection('foodtruck', 'menu')
    const menu = await collection.find().toArray();
    res.json(menu);
})

// POST /api/v1/menu                       (name, description, price)
router.post('/menu', async (req, res) => {
    const { name, description, price } = req.body;
    const collection = await getCollection('foodtruck', 'menu')
    const result = await collection.insertOne({ name, description, price });
    res.json(result);
})


// PUT /api/v1/menu/:id                    (name, description, price)
router.put('/menu/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const collection = await getCollection('foodtruck', 'menu')
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: {name, description, price} })

    res.json(result)
})

// DELETE /api/v1/menu/:id 
router.delete('/menu/:id', async (req, res) => {
    const { id } = req.params;
    const collection = await getCollection('foodtruck', 'menu')
    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    res.json(result)
})

//////////////////////////////       EVENTS        //////////////////////////////

// GET /api/v1/events                      (id, name)
router.get('/events', async (req, res) => {
    const collection = await getCollection('foodtruck', 'events')
    const events = await collection.find().toArray();

    res.json(events);
})


// GET /api/v1/events/:id                  (name, location, date, hours)
router.get('/events/:id', async (req, res) => {
    const { id } = req.params;
    const collection = await getCollection('foodtruck', 'events')
    const result = await collection.findOne({ _id: new ObjectId(id) }, { $set: {name, location, date, hours} })

    res.json(result);
})

// POST /api/v1/events                     (name, location, dates, hours)
router.post('/events', async (req, res) => {
    const { name, location, dates, hours } = req.body;
    const collection = await getCollection('foodtruck', 'events')
    const result = await collection.insertOne({ name, location, dates, hours });
    res.json(result);
})


// PUT /api/v1/events/:id                  (name, location, dates, hours)
router.put('/events/:id', async (req, res) => {
    const { id } = req.params;
    const collection = await getCollection('foodtruck', 'events')
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: req.body })

    res.json(result)
})

// DELETE /api/v1/events/:id
router.delete('/events/:id', async (req, res) => {
    const { id } = req.params;
    const collection = await getCollection('foodtruck', 'events')
    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    res.json(result)
})


module.exports = router;
