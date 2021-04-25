<template>
  <base-dialog :title="title" :show="show">
    <form @submit.prevent="submitAuthForm">
      <div class="form-control" v-if="formConfiguration">
        <label for="name">Username</label>
        <input name="name" type="text" v-model.trim="username" />
      </div>
      <div class="form-control">
        <label for="email">Email</label>
        <input name="email" type="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input name="password" type="password" v-model.trim="password" />
      </div>
      <base-button mode="reverse">{{ btnCaption }}</base-button>
    </form>
  </base-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean
    },
    authMode: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  computed: {
    title() {
      if (this.authMode.login) {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    formConfiguration() {
      if (this.authMode.login) {
        return false;
      } else {
        return true;
      }
    },
    btnCaption() {
      if (this.authMode.login) {
        return 'Login';
      } else {
        return 'Signup';
      }
    }
  },
  methods: {
    async submitAuthForm() {
      if (!this.email || !this.password) return;
      const data = {
        name: this.username,
        email: this.email,
        password: this.password
      };
      if (this.authMode.signup) {
        if (!this.username) return;
        this.$store.dispatch('signup', data);
      } else {
        this.$store.dispatch('login', data);
      }
      this.email = '';
      this.password = '';
      this.username = '';
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form-control {
  margin: 1rem;
  width: 80%;
  display: grid;
  place-items: center;
}
label {
  font-weight: 600;
}
input {
  border: none;
  border-bottom: 1px solid #059e5c;
  text-align: center;
}
input:hover,
input:focus {
  border-bottom: 3px solid #059e5c;
}
</style>
