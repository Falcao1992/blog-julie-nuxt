<template>
  <v-row class="pa-4 white ma-0">
    <v-col cols="12">
      <h3 class="white--text text-center text-subtitle-1 primaryDarken pa-4">
        {{ `Découvrez d'autres recettes de ${subCategory.name}` }}
      </h3>
    </v-col>
    <div class="slider--container">
      <span
        v-show="sliderIndex > 0"
        class="slider--arrow prev"
        @click="countSliderIndex('prev')"
      >
        <v-icon
          :class="[$vuetify.breakpoint.smAndDown && 'text-subtitle-2']"
          large
        >mdi-chevron-left</v-icon>
      </span>
      <div
        :style="SliderStyleObject"
        class="slider"
      >
        <div
          v-for="recipe in subCategory.recettes"
          :key="recipe.id"
          :style="{padding: $vuetify.breakpoint.mdAndUp ? '20px' : '2px'}"
          class="slider--slide"
        >
          <NuxtLink
            :to="`/recipes/${recipe.id}`"
            class="dark--text text-decoration-none"
          >
            <v-img
              :src="recipe.image.url"
              alt=""
              class="fill-height slider--slide--img"
              max-height="50vh"
            >
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <span
                    v-if="$vuetify.breakpoint.mdAndUp"
                    v-bind="attrs"
                    class="slider--slide--title text-truncate white pa-2"
                    v-on="on"
                  >
                    {{
                      shortenContent(recipe.titre)
                    }}
                  </span>
                </template>
                <span>{{ recipe.titre }}</span>
              </v-tooltip>
            </v-img>
          </NuxtLink>
        </div>
      </div>

      <span
        v-show="sliderIndex < subCategory.recettes.length - 3"
        class="slider--arrow next"
        @click="countSliderIndex('next')"
      >
        <v-icon
          :class="[$vuetify.breakpoint.smAndDown && 'text-subtitle-2']"
          large
        >mdi-chevron-right</v-icon>
      </span>
    </div>
  </v-row>
</template>

<script>
export default {
  name: "Slider",
  props: {
    subCategory: {
      type: Object,
      default: () => {
      },
      require: true
    }
  },
  data: () => ({
    sliderIndex: 0
  }),
  computed: {
    SliderStyleObject: function () {
      return {
        transform: `translateX(-${this.sliderIndex * 33.33}%)`,
        transition: "transform .5s linear"
      }
    }
  },
  methods: {
    shortenContent: function (title) {
      if (title.length > 15) {
        return title.substring(0, 15) + " ..."
      } else {
        return title
      }
    },
    countSliderIndex: function (direction) {
      if (direction === "prev") {
        if (this.sliderIndex > 0) {
          this.sliderIndex -= 1
        }
      } else {
        if (this.sliderIndex < this.subCategory.recettes.length - 3) {
          this.sliderIndex += 1
        }
      }
    }
  }

}
</script>

<style scoped>

.slider--container {
  width: 85%;
  margin: auto;
  position: relative;
  overflow: hidden;
}

.slider {
  display: flex;
  /*transform: translateX(-33.33%);*/
}

.slider--arrow {
  top: 50%;
  padding: 8px;
  background-color: lightgrey;
  transform: translateY(-50%);
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  transition: all .3s ease-in;
  z-index: 2000;
}

.slider--arrow:hover {
  background-color: #523629;
}

.slider--arrow:hover i {
  color: white;
}

.prev {
  left: 0;
}

.next {
  right: 0;
}

.slider--slide {
  width: 33.33%;
  position: relative;
}

.slider--slide--img {
  opacity: .8;
  transition: all .3s ease-out;
}

.slider--slide--img:hover {
  opacity: 1;
  transform: scale(1.05);
}

.slider--slide--img:after {
  content: '';
  position: absolute;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  border: 1px solid #ffffff;
  left: 10px;
  top: 10px;
  bottom: 10px;
  right: 10px;
}

.slider--slide--title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

</style>
