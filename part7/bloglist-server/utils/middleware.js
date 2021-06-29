const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('./logger');

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unkown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  switch (error.name) {
    case 'CastError':
      return res.status(400).send({ error: 'malformatted id' });
    case 'ValidationError':
      return res.status(400).json({ error: error.message });
    case 'JsonWebTokenError':
      return res.status(401).json({ error: 'invalid token' });
    case 'TokenExpiredError':
      return res.status(401).json({ error: 'token expired' });
    default:
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  } else {
    req.token = null;
  }

  next();
};

const userExtractor = async (req, res, next) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    req.user = await User.findById(decodedToken.id);
  }
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
