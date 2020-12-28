<template>
  <v-row class="primaryDarken py-8 ma-0">
    <v-col
      cols="10"
      class="mx-auto"
    >
      <h2 class="text-center text-h3 white--text">
        Dernières recettes
      </h2>
    </v-col>
    <v-col
      :cols="$vuetify.breakpoint.xsOnly ? 12 : 10"
      class="d-flex flex-wrap mx-auto"
    >
      <v-col
        v-for="recipe in LastRecipes"
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
    LastRecipes: {
      type: Array,
      default: () => [],
      require: true
    }
  }
}
</script>

<style scoped>

</style>
