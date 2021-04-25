const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const idSubSchema = new Schema(
  {
    id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { _id: false }
);

const messageSubSchema = new Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
});

const chatSchema = new Schema({
  users: [idSubSchema],
  messageList: [messageSubSchema],
});

module.exports = mongoose.model('Chat', chatSchema);
