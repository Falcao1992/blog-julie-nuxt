<template>
  <v-col
    cols="12"
    lg="3" md="4" sm="6"
  >
    <v-card
      :to="{ path: `/recipes/${recipe.id}`}"
      class="fill-height transparent pa-2"
    >
      <v-img
        :height="$vuetify.breakpoint.smAndDown ? '35vh' : '250px'"
        :src="recipe.image.url"
        alt=""
      />
      <v-card-title class="d-block text-truncate primary--text text-subtitle-1 text-center">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
            >{{ recipe.titre }}</span>
          </template>
          <span>{{ recipe.titre }}</span>
        </v-tooltip>
      </v-card-title>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "RecipeCard",
  props: {
    recipe: {
      type: Object,
      default: () => {
      },
      require: true
    }
  },
  data: () => ({}),
  computed: {}
}
</script>

<style scoped>

</style>
