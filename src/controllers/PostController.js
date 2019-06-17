const sharp = require('sharp');
const Post = require('../models/Post');
const path = require('path');
const fs = require('fs');

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },

  async store(req, res) {
    // console.log(req.body);
    // console.log(req.file);
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', fileName));

    //deleta imagem principal
    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName
    });

    //emite informação para todos usuarios conectados na aplicação
    req.io.emit('post', post);

    return res.json(post);
  }
};
