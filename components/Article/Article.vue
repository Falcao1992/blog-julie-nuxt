<template>
  <v-row
    v-if="article" :class="[articleClass, 'ma-0']"
    align="center"
    tag="article"
  >
    <v-col
      :cols="$vuetify.breakpoint.smAndDown ? 12 : articleIsLarge ? 5 : 6"
      :order="$vuetify.breakpoint.smAndDown ? 2 : articleIsPair ? 2 : 1"
      class="pa-0"
    >
      <v-img
        :src="article.image.url"
        height="70vh"
        class="fill-height"
      />
    </v-col>
    <v-col
      :class="$vuetify.breakpoint.smAndDown ? 'py-14 px-8' : 'pa-8'"
      :order="1"
    >
      <div
        :class="[articleIsPair ? 'text-left' : 'text-right', 'mx-auto' ]"
        :style="{ width: $vuetify.breakpoint.smAndDown ? '90%' : '80%', position: 'relative'}"
      >
        <AnimSpanGeometric :normal-direction="articleIsPair" />
        <span>Open</span>
        <h2
          class="text-h4 text-xl-h3 text-uppercase pt-4"
          style="letter-spacing: 2px"
        >
          {{ article.titre }}
        </h2>
        <p class="py-4">
          {{ article.description }}
        </p>
        <v-btn
          v-if="article.lien !== 'none'"
          :to="`/recipes/${article.lien}`"
          class="dark--text"
        >
          Voir la recette
        </v-btn>
        <span v-animate-on-scroll />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import AnimSpanGeometric from "../animation/AnimSpanGeometric"

export default {
  name: "Article",
  components: {AnimSpanGeometric},
  props: {
    article: {
      type: Object,
      default: () => {
      },
      require: true
    },
    articleIsPair: {
      type: Boolean,
      default: false,
      require: false
    },
    articleIsLarge: {
      type: Boolean,
      default: false
    },
    articleClass: {
      type: String,
      default: "primary dark-text"
    }
  },
  data: () => ({})
}
</script>

<style scoped>

</style>
