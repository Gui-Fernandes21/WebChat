<template>
  <div class="header">
    <h1>{{ selectedUser.name }}</h1>
  </div>
  <div class="chat">
    <ul>
      <li v-for="msg in messageList" :key="msg._id">
        <div>
          <div class="message">
            <h3>{{ msg.username }}</h3>
            <p>{{ msg.text }}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="type">
      <input type="text" v-model="text" @keypress.enter="sendMessage" />
      <button class="send" @click="sendMessage">
        <font-awesome-icon icon="paper-plane"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
var socket = null;

export default {
  data() {
    return {
      text: ''
    };
  },
  computed: {
    username() {
      return this.$store.getters.getUsername;
    },
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
    selectedUser() {
      return this.$store.getters.getSelectedUser
        ? this.$store.getters.getSelectedUser
        : '';
    },
    messageList() {
      return this.$store.getters.getMessages;
    }
  },
  methods: {
    async sendMessage() {
      if (!this.$store.getters.isAuth) {
        console.log('Not Authenticated');
        return;
      }

      if (!this.text.trim()) return;

      if (!this.selectedUser) {
        return console.log('Select one contact');
      }

      const loggedUser = this.$store.getters.getUser;

      const messageObject = {
        loggedUser,
        selectedUser: this.selectedUser,
        username: this.username,
        text: this.text
      };

      await socket.emit('message', messageObject);

      this.text = '';
    }
  },
  watch: {
    didAutoLogout(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.$router.replace('/');
      }
    },
  },
  mounted() {
    socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log(socket.connected);
    });

    socket.on('message-from-server', () => {
      this.$store.dispatch('fetchChatMessages');
    });
  }
};
</script>

<style scoped>
.header {
  margin: 1rem;
  padding: 0.8rem;
  width: 60%;
  max-height: 3rem;
  background: linear-gradient(
    to top right,
    rgba(255, 255, 255, 0.603),
    rgba(255, 255, 255, 0.178)
  );
  border-radius: 25px;
  text-align: center;
  color: rgba(27, 27, 27, 0.753);
}
.message {
  background: rgba(60, 165, 92, 0.5);
  display: inline-block;
  padding: 5px 8px;
  border-radius: 15px;
  margin: 3px;
}
.message h3 {
  font-size: 15px;
}
.message p {
  font-size: 13px;
  font-weight: 500;
}
.chat {
  position: absolute;
  left: 32%;
  top: 18%;
  height: 79%;
  width: 66%;
  border-radius: 15px;
  background: linear-gradient(
    to left top,
    rgba(255, 255, 255, 0.208),
    rgba(255, 255, 255, 0.551)
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
ul::-webkit-scrollbar-thumb {
  background: rgba(121, 121, 121, 0.411);
  border-radius: 30px;
  width: 5px;
}
ul::-webkit-scrollbar {
  width: 5px;
}
.chat input {
  width: 80%;
  height: 1rem;
  margin: auto;
  padding: 10px;
  border: none;
  border-radius: 35px;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.178),
    rgba(255, 255, 255, 0.248)
  );
}
.send {
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
}
.type {
  margin-bottom: 5px;
  display: flex;
  justify-content: space-around;
}
.chat input:hover,
.send:hover,
.chat input:focus {
  background: #81968d73;
}
ul {
  margin: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  /* display: flex;
  flex-direction: column;
  justify-content: flex-end; */
}
li {
  list-style: none;
  display: block;
}
</style>
