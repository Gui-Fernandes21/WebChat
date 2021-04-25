const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSubSchema = new Schema(
  {
    chatId: { type: mongoose.Types.ObjectId, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
  },
  { _id: false }
);

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  chats: [chatSubSchema],
});

module.exports = mongoose.model('User', userSchema);
