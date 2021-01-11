<template>
  <section class="primaryDarken white--text">
    <v-row
      justify="center"
      class="ma-0"
    >
      <v-col
        class="py-8"
        cols="11"
      >
        <p class="text-center text-h4 font-weight-bold">
          {{ quote }}
        </p>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: "Quote",
  props: {
    quote: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
