<template>
  <div>
    <Header
      v-if="bgImg"
      :bg-img="bgImg"
    />
    <Recipe :recipe="recipe" />
    <RecipesSimilar
      :recipes-similar="recipesSimilar"
      :sub-categories="recipe.sous_categories"
    />
  </div>
</template>

<script>
import Recipe from "../../../components/Recipe/Recipe"
import RecipesSimilar from "../../../components/RecipesSimilar/RecipesSimilar"
import Header from "../../../components/Header/Header"
import getSiteMeta from "../../../utils/getSiteMeta"

export default {
  name: "RecipeId",
  components: {
    Header,
    RecipesSimilar,
    Recipe
  },
  async asyncData({$strapi, params, route}) {
    const BG_IMG_QUERY = await $strapi.findOne("Recettes", route.params.id)
    const bg_img = BG_IMG_QUERY.image

    const recipeQuery = await $strapi.findOne("Recettes", params.id)
    let recipesSimilarQuery = []
    if (recipeQuery.sous_categories.length > 1) {
      for (const subCat of recipeQuery.sous_categories.length) {
        recipesSimilarQuery.push(await $strapi.findOne("Sous-Categories", subCat.id))
      }
    } else {
      recipesSimilarQuery.push(await $strapi.findOne("Sous-Categories", recipeQuery.sous_categories[0].id))
    }

    return {
      recipe: recipeQuery,
      recipesSimilar: recipesSimilarQuery,
      bgImg: bg_img
    }
  },
  data: () => ({
    BASE_URL: process.env.WebsiteBaseUri
  }),
  head() {
    return {
      title: this.recipe.titre,
      meta: [
        ...this.meta,
        {
          property: "article:published_time",
          content: this.recipe.createdAt
        },
        {
          property: "article:modified_time",
          content: this.recipe.updatedAt
        },
        {
          property: "article:tag",
          content: this.recipe.tags ? this.recipe.tags.toString() : ""
        },
        {
          name: "twitter:label1",
          content: "Written by"
        },
        {
          name: "twitter:data1",
          content: "Bob Ross"
        },
        {
          name: "twitter:label2",
          content: "Filed under"
        },
        {
          name: "twitter:data2",
          content: this.recipe.tags ? this.recipe.tags.toString() : ""
        }
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `${this.BASE_URL}/recipes/${this.$route.params.id}`
        }
      ]
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: "recette",
        title: this.recipe.titre,
        description: this.recipe.description,
        url: `${this.BASE_URL}/recipes/${this.$route.params.id}`,
        mainImage: this.bgImg.url
      }
      return getSiteMeta(metaData)
    }
  }
}
</script>

<style scoped>

</style>
