const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minLength: 3,
    required: true,
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedOject) => {
    returnedOject.id = returnedOject._id.toString();
    delete returnedOject._id;
    delete returnedOject.__v;
    delete returnedOject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
