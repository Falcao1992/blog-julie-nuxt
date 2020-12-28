<template lang="html">
  <div
    v-if="loading"
    class="loading-page"
  >
    <p>Chargement...</p>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #E1C5AC;
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
