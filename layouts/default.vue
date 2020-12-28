<template>
  <v-app>
    <NavBar />
    <v-main class="pa-0">
      <v-container
        fluid
        class="pa-0"
      >
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from "../components/NavBar/NavBar"
import Footer from "../components/Footer/Footer"

export default {
  name: 'Default',
  components: {
    Footer,
    NavBar},

  data() {
    return {}
  }
}
</script>
<style>

</style>
