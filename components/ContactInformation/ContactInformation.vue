<template>
  <v-col
    class="pa-0"
    :cols="$vuetify.breakpoint.smAndDown ? 12 : 6"
    :order="$vuetify.breakpoint.smAndDown ? 2 : 0"
  >
    <v-img
      :src="require('~/assets/images/contactFormImg.png')"
      class="d-flex align-center fill-height"
      gradient="90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%"
    >
      <v-col
        cols="10"
        class="mx-auto white--text"
        style="line-height: 2rem"
      >
        <h3
          class="py-2 contact-information__title"
          style="position: relative; width: max-content"
        >
          Moumousse Company
        </h3>
        <p>Bourges, 18000</p>
        <p class="gold--text">
          Moumousse.recettes@gmail.com
        </p>
      </v-col>
    </v-img>
  </v-col>
</template>

<script>
export default {
  name: "ContactInformation"
}
</script>

<style scoped>
.contact-information__title::after {
  content: "";
  position: absolute;
  width: 80%;
  height: 2px;
  background-color: #cfa052;
  left: 0;
  bottom: 0;
}
</style>
