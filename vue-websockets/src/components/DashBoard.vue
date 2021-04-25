<template>
  <div class="dashboard" v-if="isAuth">
    <div class="container">
      <div class="profile-content" v-if="username">
        <img
          class="profile-pic"
          src="../assets/chess-icon-png-27.png"
          alt="Profile Pic"
        />
        <h3>{{ username }}</h3>
      </div>
      <div class="contacts">
        <h2>Contacts</h2>
        <div
          class="contact-card"
          v-for="usr in users"
          :key="usr.name"
          @click="selectUser(usr._id)"
        >
          <h3>{{ usr.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isAuth'],
  data() {
    return {};
  },
  computed: {
    username() {
      return this.$store.getters.getUsername;
    },
    users() {
      return this.$store.getters.fetchUsers;
    },
    selectedUser() {
      return this.$store.getters.getSelectedUser;
    }
  },
  methods: {
    async selectUser(userId) {
      await this.$store.dispatch('fetchUser', userId);
    }
  },
  watch: {
    selectedUser(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.$store.dispatch('fetchChatMessages');
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.dashboard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 30%;
  border-radius: 2rem;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.551),
    rgba(255, 255, 255, 0.208)
  );
}
.profile-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.profile-content p {
  font-size: 10px;
}
.profile-pic {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
}
.contacts {
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
}
.contacts::-webkit-scrollbar {
  width: 5px;
}
.contacts.contacts::-webkit-scrollbar-thumb {
  background: rgba(121, 121, 121, 0.411);
  border-radius: 30px;
  width: 5px;
}
.contact-card {
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0.541),
    rgba(255, 255, 255, 0.164)
  );
  border-radius: 35px;
  width: 60%;
  margin: 3px 0;
  display: flex;
  padding: 10px;
  justify-content: center;
  cursor: pointer;
  text-overflow: ellipsis;
}
.contact-card h3 {
  font-size: 13px;
}
</style>
