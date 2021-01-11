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
      :article-class="affectColorsToArticle(index)"
      :article-is-large="article.description.length > 250"
      :article-is-pair="index % 2 === 0"
    />
    <Quote :quote="quote" />
  </div>
</template>

<script>
import Article from "../components/Article/Article"
import getSiteMeta from "../utils/getSiteMeta"
import Quote from "../components/Quote/Quote"

export default {
  name: "Home",
  components: {
    Quote,
    Article
  },
  async asyncData({$strapi, route}) {

    const infoPage = await $strapi.find("Contenu-pages", {
      page: route.name
    })

    const quote = infoPage[0].citation
    const bg_img = infoPage[0].bg_img

    return {
      articles: infoPage[0].articles,
      bgImg: bg_img,
      quote: quote
    }
  },
  data: () => ({}),
  head() {
    return {
      title: "Accueil",
      meta: [...this.meta]
    }
  },
  computed: {
    meta() {
      const metaData = {mainImage: this.bgImg.url}
      return getSiteMeta(metaData)
    }
  },
  methods: {
    affectColorsToArticle: function (index) {
      let white = [1, 4, 7, 10]
      let dark = [2, 5, 8, 11]
      if (index % 3 === 0) {
        return "primary dark--text"
      } else if (white.includes(index)) {
        return "white dark--text"
      } else if (dark.includes(index)) {
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
