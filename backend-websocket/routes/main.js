const express = require('express');

const authControllers = require('../controllers/auth.js');
const chatControllers = require('../controllers/chat.js');

const router = express.Router();

router.post('/signup', authControllers.signup);

router.post('/login', authControllers.login);

router.post('/fetch-user', authControllers.fetchUser);

router.post('/fetch-all-users', authControllers.fetchAllUsers);

router.post('/fetch-chat-messages', chatControllers.fetchChatMessages);

module.exports = router;
