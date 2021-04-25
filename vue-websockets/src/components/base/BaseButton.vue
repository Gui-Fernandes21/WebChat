<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['mode']
}
</script>

<style scoped>
button {
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 15px;
}
.reverse {
  border: 1px solid black;
  color: black;
}
.reverse:hover {
  border: 1px solid white;
  color: white;
  background: black;
}
button:hover {
  border: 1px solid black;
  color: black;
  background: white;
}
</style>