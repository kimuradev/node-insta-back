const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
//necessário para transpilar o formData da requisição
const upload = multer(uploadConfig);

// routes.get('/', (req, res) => {
//   return res.send(`hello a  ${req.query.name}`);
// });

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;
