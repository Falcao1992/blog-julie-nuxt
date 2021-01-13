<template>
  <v-row class="primary py-8 ma-0">
    <v-col
      cols="10"
      class="mx-auto"
    >
      <h2 class="text-center text-h3 dark--text mb-8">
        Dernières recettes
      </h2>
      <p class="text-center">
        Laissez vous tentez pas une selection de nos dernières recettes.
      </p>
    </v-col>
    <v-col
      :cols="$vuetify.breakpoint.xsOnly ? 12 : 10"
      class="d-flex flex-wrap mx-auto"
    >
      <v-col
        v-for="recipe in lastRecipes"
        :key="recipe.id"
        :cols="$vuetify.breakpoint.xsOnly ? 12 : $vuetify.breakpoint.smOnly ? 6 : 3"
        class="pa-4"
      >
        <v-card
          :to="`/recipes/${recipe.id}`"
          elevation="5"
        >
          <v-img
            :src="recipe.image.url"
            alt=""
            :aspect-ratio="16/9"
          />
          <v-card-text class="white dark--text text-subtitle-1 text-truncate text-center py-4">
            {{ recipe.titre }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
export default {
name: "RecipesLast",
  props: {
    lastRecipes: {
      type: Array,
      default: () => [],
      require: true
    }
  }
}
</script>

<style scoped>

</style>
