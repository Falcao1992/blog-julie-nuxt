<template>
  <div>
    <Header
      v-if="bgImg"
      :bg-img="bgImg"
    />
    <ContactForm />
  </div>
</template>

<script>
import Header from "../../components/Header/Header"
import getSiteMeta from "../../utils/getSiteMeta"
import ContactForm from "../../components/ContactForm/ContactForm"

export default {
  name: "Contact",
  components: {
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
      console.log(route.name)
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
