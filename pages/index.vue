<template>
  <div>
    <Header
      v-if="bgImg"
      :bg-img="bgImg"
    />
    <Article
      v-for="(article, index) in articles"
      :key="article.id"
      :article="article"
      :article-is-large="article.description.length > 250"
      :article-is-pair="index % 2 === 0"
      :article-class="affectColorsToArticle(index)"
    />
  </div>
</template>

<script>
import Article from "../components/Article/Article"
import getSiteMeta from "../utils/getSiteMeta"

export default {
  name: "Home",
  components: {
    Article
  },
  async asyncData({$strapi, route}) {
    const matchingArticles = await $strapi.find("Contenu-pages", {
      page: route.name
    })
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
      articles: matchingArticles[0].articles,
      bgImg: bg_img
    }
  },
  data: () => ({}),
  head() {
    return {
      title: "Accueil",
      meta: [...this.meta]
    };
  },
  computed: {
    meta() {
      const metaData = {mainImage: this.bgImg.url}
      return getSiteMeta(metaData);
    }
  },
  methods: {
    affectColorsToArticle: function (index) {
      let white = [1,4,7,10]
      let dark = [2,5,8,11]
      if(index % 3 === 0) {
        return "primary dark--text"
      } else if (white.includes(index)) {
        return "white dark--text"
      } else if(dark.includes(index)) {
        return "dark primary--text"
      } else {
        return "red blue--text"
      }
    }
  }
}
</script>
<style>

</style>
