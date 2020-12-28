<template>
  <section>
    <Slider
      v-for="subCategory in recipesSimilar"
      :key="subCategory.id"
      :sub-category="subCategory"
    />
  </section>
</template>

<script>
import Slider from "../Slider/Slider"
export default {
  name: "RecipesSimilar",
  components: {Slider},
  props: {
    subCategories: {
      type: Array,
      default: () => [],
      require: true
    },
    recipesSimilar: {
      type: Array,
      default: () => [],
      require: true
    }
  },
  data: () => ({}),
}
</script>

<style scoped>

</style>
