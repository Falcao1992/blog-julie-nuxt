<template>
  <div>
    <Header
      v-if="bgImg"
      :bg-img="bgImg"
    />
    <v-row
      class="ma-0"
      align="center"
    >
      <v-col
        cols="12"
        class="text-center dark primary--text py-12"
      >
        <h2 class="text-h3 py-4">
          Besoin d'information ?
        </h2>
        <p class="py-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et excepturi illo labore neque perspiciatis
          praesentium quam quis sunt voluptates voluptatum!
        </p>
      </v-col>
    </v-row>
    <v-row class="ma-0">
      <ContactInformation />
      <ContactForm />
    </v-row>
  </div>
</template>

<script>
import Header from "../../components/Header/Header"
import getSiteMeta from "../../utils/getSiteMeta"
import ContactForm from "../../components/ContactForm/ContactForm"
import ContactInformation from "../../components/ContactInformation/ContactInformation"

export default {
  name: "Contact",
  components: {
    ContactInformation,
    ContactForm,
    Header
  },
  async asyncData({$strapi, route}) {
    let BG_IMG_QUERY
    let bg_img
    if (route.name === "recipes-id") {
      BG_IMG_QUERY = await $strapi.findOne("Recettes", route.params.id)
      bg_img = BG_IMG_QUERY.image
    } else {
      BG_IMG_QUERY = await $strapi.find("Contenu-pages", {page: route.name})
      bg_img = BG_IMG_QUERY[0].bg_img
    }
    return {
      bgImg: bg_img
    }
  },
  data: () => ({
    BASE_URL: process.env.WebsiteBaseUri
  }),
  computed: {
    meta() {
      const metaData = {
        type: "website",
        title: "Contact",
        description: "Contactez nous pour tout informations",
        url: `${this.BASE_URL}/contact`,
        mainImage: this.bgImg.url
      }
      return getSiteMeta(metaData)
    }
  }
}
</script>

<style scoped>

</style>
