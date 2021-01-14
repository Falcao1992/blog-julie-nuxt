<template>
  <div>
    <Header
      v-if="bgImg"
      :bg-img="bgImg"
    />
    <RecipesLast :last-recipes="lastRecipes" />
    <RecipesSearch :all-recipes-array="allRecipesArray" />
    <Quote :quote="quote" />
  </div>
</template>

<script>
import RecipesSearch from "../../components/RecipesSearch/RecipesSearch"
import getSiteMeta from "../../utils/getSiteMeta"
import RecipesLast from "../../components/RecipesLast/RecipesLast"
import Quote from "../../components/Quote/Quote"

export default {
  name: "Recipes",
  components: {
    Quote,
    RecipesLast,
    RecipesSearch
  },
  async asyncData({$strapi, route}) {
    const allRecipesArrayQuery = await $strapi.find("Recettes")

    const infoPage = await $strapi.find("Contenu-pages", {page: route.name})
    const bg_img = infoPage[0].bg_img
    const quote = infoPage[0].citation

    return {
      allRecipesArray: allRecipesArrayQuery,
      bgImg: bg_img,
      quote: quote
    }
  },
  data: () => ({
    BASE_URL: process.env.WebsiteBaseUri
  }),
  head() {
    return {
      title: "Les Recettes",
      meta: [...this.meta],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `${this.BASE_URL}/recipes`
        }
      ]
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: "recettes",
        title: "Les Recettes",
        description: "Ici vous pourrez trouvez la recette du dessert que vous désirez parmi un large de choix de tartes, gateaux, goûter etc ...",
        url: `${this.BASE_URL}/recipes`,
        mainImage: this.bgImg.url
      }
      return getSiteMeta(metaData)
    },
    lastRecipes() {
      let lastRecipes = null
      let nbElToKeep = 4
      if (this.allRecipesArray) {
        lastRecipes = JSON.parse(JSON.stringify(this.allRecipesArray))
        lastRecipes.sort(function (a, b) {
          return new Date(b.published_at) - new Date(a.published_at)
        })
        lastRecipes.splice(0, lastRecipes.length - nbElToKeep)
      }
      return lastRecipes
    }
  }
}
</script>

<style scoped>

</style>
