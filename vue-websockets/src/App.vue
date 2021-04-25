<template>
  <the-nav :isAuth="isAuth"></the-nav>
  <main class="main-container">
    <div class="glass">
      <dashboard :isAuth="isAuth"></dashboard>
      <router-view v-if="isAuth"></router-view>
    </div>
    <div class="circle1"></div>
    <div class="circle2"></div>
  </main>
</template>

<script>
import TheNav from './components/TheNav.vue';
import Dashboard from './components/DashBoard.vue';

export default {
  components: {
    TheNav,
    Dashboard
  },
  data() {
    return {};
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
    isAuth() {
      return this.$store.getters.isAuth;
    }
  },
  created() {
    this.$store.dispatch('autoLogin');
  },
  watch: {
    didAutoLogout(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.$forceUpdate();
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  outline: none;
  font-family: 'Poppins', sans-serif;
}
body::-webkit-scrollbar {
  width: 10px;
  background: transparent;
}
body::-webkit-scrollbar-track {
  background: transparent;
}
body::-webkit-scrollbar-thumb {
  background: rgba(121, 121, 121, 0.411);
  border-radius: 30px;
  width: 5px;
  margin: 10px;
}
</style>

<style scoped>
.main-container {
  position: relative;
  background: linear-gradient(to right top, #059e5c, #a4c7b8);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.glass {
  position: relative;
  display: flex;
  height: 80vh;
  width: 60%;
  background: linear-gradient(
    to left top,
    rgba(255, 255, 255, 0.551),
    rgba(255, 255, 255, 0.208)
  );
  border: 1px solid rgba(255, 255, 255, 0.351);
  border-radius: 2rem;
  z-index: 2;
}

.circle1,
.circle2 {
  position: absolute;
  height: 12rem;
  width: 12rem;
  border-radius: 50%;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.418),
    rgba(255, 255, 255, 0.208)
  );
  z-index: 1;
}
.circle1 {
  top: 65%;
  left: 15%;
}
.circle2 {
  top: 5%;
  left: 70%;
}
</style>
