const express = require('express');
const mongoose = require(`mongoose`);
const cors = require('cors');
const bodyParser = require('body-parser');

const { checkExistingChat } = require('./util/appFunctions.js');

const mainRoutes = require('./routes/main.js');
const auth = require('./middleware/auth.js');

const URI = `mongodb+srv://GuiFernandes:Lp9BuXyM2YgJPn9@nodejs.hzibo.mongodb.net/WebSocketPrj?retryWrites=true&w=majority`;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(auth);

app.use(`/`, mainRoutes);


mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    const server = app.listen('3000');

    const io = require('socket.io')(server, {
      cors: {
        origin: 'http://localhost:8080',
        methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      },
    });

    io.on('connection', (socket) => {
      socket.on('message', async (message) => {

        const userId = message.loggedUser._id;
        const selectedUserId = message.selectedUser._id;

        const chat = await checkExistingChat(userId, selectedUserId, true);

        if(!chat) {
          throw new Error('Failed to fetch Chat inside socket');
        }

        const messageObj = {
          username: message.username,
          text: message.text,
        };

        chat.messageList.push(messageObj);

        await chat.save();

        io.emit('message-from-server', messageObj);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
