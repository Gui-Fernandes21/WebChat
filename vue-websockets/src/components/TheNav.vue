<template>
  <nav>
    <div class="logo">
      <img src="" alt="" />
    </div>
    <ul>
      <li>
        <a href="#login" @click="toggleDialog('login')" v-if="!isAuth">Login</a>
        <a href="#signup" @click="toggleDialog('signup')" v-if="!isAuth">Signup</a>
        <a href="#logout" @click="logout" v-else>Logout</a>
      </li>
    </ul>
    <auth-dialog
      :auth-mode="dialogMode"
      :show="show"
      @close="toggleDialog('close')"
    ></auth-dialog>
  </nav>
</template>

<script>
import AuthDialog from '../components/auth/AuthDialog.vue';
export default {
  props: ['isAuth'],
  data() {
    return {
      show: false,
      dialogMode: {
        signup: false,
        login: false
      }
    };
  },
  methods: {
    toggleDialog(mode) {
      if (mode === 'login') {
        this.dialogMode.login = true;
        this.dialogMode.signup = false;
      } else if (mode === 'signup') {
        this.dialogMode.login = false;
        this.dialogMode.signup = true;
      } else if (mode === 'close') {
        this.dialogMode.login = false;
        this.dialogMode.signup = false;
      }
      this.show = !this.show;
    },
    logout() {
      this.$store.dispatch('logout');
    }
  },
  components: {
    AuthDialog
  }
};
</script>

<style scoped>
nav {
  background: black;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
ul {
  display: flex;
  justify-content: space-between;
  width: 10rem;
}
li {
  list-style: none;
}
li a {
  margin: 1rem;
  text-decoration: none;
  color: white;
  border: 1px solid white;
  padding: 0.5rem 1rem;
}
li a:hover {
  background: #fff;
  color: black;
  border: 1px solid black;
}
</style>
