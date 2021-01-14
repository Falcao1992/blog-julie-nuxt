<template>
  <div>
    <Header
      v-if="bgImg"
      :bg-img="bgImg"
    />
    <v-row
      align="center"
      class="ma-0"
    >
      <v-col
        class="text-center dark primary--text py-12"
        cols="12"
      >
        <h2 class="text-h3 py-4">
          Besoin d'information ?
        </h2>
        <p class="py-4">
          Pour toute demande d'informations, Veuillez remplir le formulaire ci-dessous, je vous répondrais dans les plus bref délais.
        </p>
      </v-col>
    </v-row>
    <v-row class="ma-0">
      <ContactInformation />
      <ContactForm />
    </v-row>
    <Quote :quote="quote" />
  </div>
</template>

<script>
import Header from "../../components/Header/Header"
import getSiteMeta from "../../utils/getSiteMeta"
import ContactForm from "../../components/ContactForm/ContactForm"
import ContactInformation from "../../components/ContactInformation/ContactInformation"
import Quote from "../../components/Quote/Quote"

export default {
  name: "Contact",
  components: {
    Quote,
    ContactInformation,
    ContactForm,
    Header
  },
  async asyncData({$strapi, route}) {

    const infoPage = await $strapi.find("Contenu-pages", {page: route.name})
    const bg_img = infoPage[0].bg_img
    const quote = infoPage[0].citation

    return {
      bgImg: bg_img,
      quote: quote
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
        description: "Besoin d'une information sur un dessert, n'hésitez pas à me contacter en remplissant le formulaire de contact.",
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
