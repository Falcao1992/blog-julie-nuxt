<template>
  <v-row
    v-if="recipe"
    :class="[$vuetify.breakpoint.smAndDown ? 'py-14 px-10' : 'pa-10', 'dark primary--text ma-0' ]"
    align="center"
    justify="center"
    tag="article"
  >
    <v-col
      :cols="$vuetify.breakpoint.smAndDown ? 12 : 6"
      order="1"
    >
      <div
        :class="[$vuetify.breakpoint.mdAndUp && 'mx-auto']"
        :style=" {width: $vuetify.breakpoint.smAndUp && '80%', position: 'relative'}"
      >
        <AnimSpanGeometric :normal-direction="true" />
        <span> {{ recipe.sous_categories[0].name }}</span>
        <h1 class="text-h4 my-8">
          {{ recipe.titre }}
        </h1>
        <p v-animate-on-scroll>
          {{ recipe.description }}
        </p>
      </div>
    </v-col>
    <v-col
      :cols="$vuetify.breakpoint.smAndDown ? 12 : 6"
      order="2"
    >
      <a
        :href="recipe.images[0].url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-img
          :aspect-ratio="16/9"
          :src="recipe.images[0].url"
        />
      </a>
    </v-col>
  </v-row>
</template>

<script>
import AnimSpanGeometric from "../animation/AnimSpanGeometric"

export default {
  name: "Recipe",
  components: {AnimSpanGeometric},
  props: {
    recipe: {
      type: Object,
      default: () => {
      },
      require: true
    }
  },
  data: () => ({})
}
</script>

<style scoped>

</style>
