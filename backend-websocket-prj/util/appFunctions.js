const mongoose = require('mongoose');

const User = require('../models/user.js');
const Chat = require('../models/chats.js');

exports.checkExistingChat = async (
  userId,
  selectedUserId,
  createNewChat = true
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('Failed to fetch user in checkExistingChat function');
  }

  const matchingUserChatObj = await user.chats.find(
    (cht) => cht.userId == selectedUserId
  );

  if (!matchingUserChatObj && createNewChat === true) {
    const newChat = this.createChat(userId, selectedUserId);
    return newChat;
  } else if (!matchingUserChatObj && createNewChat === false) {
    return {};
  }

  const chat = await Chat.findById(matchingUserChatObj.chatId);

  if (!chat) throw new Error('Failed to fetch chat with chatId');
  
  return chat;
};

exports.createChat = async (userId, selectedUserId) => {
  const data = {
    users: [
      { id: mongoose.Types.ObjectId(userId) },
      { id: mongoose.Types.ObjectId(selectedUserId) },
    ],
    messageList: [],
  };

  const chat = new Chat(data);

  const savedChat = await chat.save();

  // ---------------------------------------------------------------------------------

  const user = await User.findById(userId);

  if (!user) {
    throw new Error('Failed to Fetch User in createChat');
  }

  user.chats.push({
    chatId: savedChat._id,
    userId: mongoose.Types.ObjectId(selectedUserId),
  });

  await user.save();

  // ---------------------------------------------------------------------------------

  const selectedUser = await User.findById(selectedUserId);

  if (!selectedUser) {
    throw new Error('Failed to Fetch selectedUser in createChat');
  }

  selectedUser.chats.push({
    chatId: savedChat._id,
    userId: mongoose.Types.ObjectId(userId),
  });

  await selectedUser.save();

  // ----------------------------------------------------------------------------------

  return savedChat;
};
