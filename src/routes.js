const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'Show all bootcamps' });
});

routes.get('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Show a bootcamp ${req.params.id}` });
});

routes.post('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'Create new bootcamp' });
});

routes.put('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Update bootcamp ${req.params.id}` });
});

routes.delete('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
});

module.exports = routes;