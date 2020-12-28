<template>
  <v-footer
    color="white"
  >
    <v-row
      justify="center"
      class="py-8"
    >
      <v-btn
        v-for="link in links"
        :key="link.name"
        class="my-2"
        color="dark"
        rounded
        text
        :to="link.to"
      >
        {{ link.name }}
      </v-btn>
      <v-col
        class="white lighten-2 py-4 text-center dark--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Blog de Moumousse</strong>
        —
        By <a
          class="primaryDarken--text"
          href="https://eduardolepine.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        > Eduardo Lépine</a>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    links: [
      {
        name: "Accueil",
        to: "/"
      },
      {
        name: "Recettes",
        to: "/recipes"
      }
    ]
  })
}
</script>

<style scoped>

</style>
