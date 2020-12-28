<template>
  <v-container
    v-show="allRecipesArray"
    class="white pt-8 pb-0" fluid
  >
    <v-row class="justify-center">
      <v-col
        :cols="$vuetify.breakpoint.smAndDown ? '12' : '10'"
        class="text-center"
      >
        <h2 class="text-h3 mb-8">
          Chercher une recettes
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et excepturi illo labore neque perspiciatis
          praesentium quam quis sunt voluptates voluptatum!
        </p>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-form :class="['d-flex', 'justify-center', $vuetify.breakpoint.smAndDown && 'flex-column']">
        <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 8">
          <v-text-field
            v-model="fieldSearch"
            :label="`Rechercher par ${selectValue} ...`"
            append-icon="fas fa-search" hide-details outlined
          />
        </v-col>
        <v-col :cols="$vuetify.breakpoint.smAndDown ? 10 : 4">
          <v-select
            v-model="selectValue"
            :items="selectOptions"
            class="text-capitalize"
            label="Type de recherche"
            outlined
          />
        </v-col>
      </v-form>
    </v-row>
    <v-row :class="['dark', $vuetify.breakpoint.smAndDown ? 'pa-2' : 'pa-8']">
      <v-col cols="12">
        <p
          v-if="recipesFiltered"
          class="primary--text text-h6 text-md-h4 py-4"
        >
          {{ recipesFiltered.length }} recette<span v-show="recipesFiltered.length > 1">s</span>
          trouvé<span v-show="recipesFiltered.length > 1">es</span> :
        </p>
      </v-col>
      <RecipeCard
        v-for="recipe in recipesFiltered"
        :key="recipe.id"
        :recipe="recipe"
      />
    </v-row>
  </v-container>
</template>

<script>
import RecipeCard from "../RecipeCard/RecipeCard"

export default {
  name: "RecipesSearch",
  components: {
    RecipeCard
  },
  props: {
    allRecipesArray: {
      type: Array,
      default: () => [],
      require: true
    }
  },
  data: () => ({
    fieldSearch: "",
    selectOptions: ["ingredients", "titre"],
    selectValue: "titre"
  }),
  computed: {
    recipesFiltered() {
      return this.allRecipesArray.filter((recipe) => {
        if (this.selectValue === "titre") {
          return recipe.titre.toLowerCase().includes(this.fieldSearch.toLowerCase())
        } else {
          return recipe.ingredients.toLowerCase().includes(this.fieldSearch.toLowerCase())
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
