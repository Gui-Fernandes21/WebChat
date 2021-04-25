const { checkExistingChat } = require('../util/appFunctions.js');

exports.fetchChatMessages = async (req, res, next) => {
  let chatMessageList;

  if (!req.isAuth) {
    throw new Error('Not Authorized');
  }

  const selectedUserId = req.body.selectedUserId;

  const chat = await checkExistingChat(req.userId, selectedUserId, false);

  if (!chat) {
    throw new Error('Failed to fetch chat in fetchChatMessages');
  }

  if(chat === {}) {
    chatMessageList = [];
  } else {
    chatMessageList = chat.messageList;
  }


  res.status(200).json({
    chatMessageList,
  });
};
