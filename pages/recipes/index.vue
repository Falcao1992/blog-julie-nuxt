<template>
  <div>
    <Header
      v-if="bgImg"
      :bg-img="bgImg"
    />
    <RecipesLast :last-recipes="lastRecipes" />
    <RecipesSearch :all-recipes-array="allRecipesArray" />
  </div>
</template>

<script>
import RecipesSearch from "../../components/RecipesSearch/RecipesSearch"
import getSiteMeta from "../../utils/getSiteMeta"
import RecipesLast from "../../components/RecipesLast/RecipesLast"

export default {
  name: "Recipes",
  components: {
    RecipesLast,
    RecipesSearch
  },
  async asyncData({$strapi, route}) {
    const allRecipesArrayQuery = await $strapi.find("Recettes")

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
      allRecipesArray: allRecipesArrayQuery,
      bgImg: bg_img
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
        description: "un large choix de recettes",
        url: `${this.BASE_URL}/recipes`,
        mainImage: this.bgImg.url
      }
      return getSiteMeta(metaData)
    },
    lastRecipes() {
      let lastRecipes= null
      let nbElToKeep = 4
      if(this.allRecipesArray) {
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
