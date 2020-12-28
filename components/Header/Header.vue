<template>
  <header>
    <v-img
      v-if="bgImg"
      :src="bgImg.url"
      :style="[headerStyle]"
    >
      <v-row
        align="center"
        justify="center"
        style="width: fit-content;margin: auto;"
      >
        <v-col
          :style="{ transform: $vuetify.breakpoint.xsOnly ? 'translateY(60%)' : 'translateY(65%)',
                    top: '0'}"
          class="text-center primary--text"
        >
          <h1
            :class="[$vuetify.breakpoint.smAndUp && 'mt-4' ,'text-h2 text-md-h1 font-weight-normal pb-4']"
            :style="{opacity: hideWhenLoading, filter:'drop-shadow(3px 10px 2px black)'}"
          >
            {{ generateHeaderTittle }}
          </h1>
        </v-col>
      </v-row>
    </v-img>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    bgImg: {
      type: Object,
      default: () => {
      },
      require: true
    }
  },
  data: () => ({
    hideWhenLoading: '0'
  }),
  computed: {
    headerStyle: function () {
      let styleObject = {}
      if (this.$route.name === "recipes-id") {
        styleObject = {
          height: "70vh",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }
      } else {
        styleObject = {
          height: "100vh",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }
      }
      return styleObject
    },
    generateHeaderTittle: function () {
      if (this.$route.name === "recipes") {
        return "Les Recettes"
      } else if (this.$route.name === "recipes-id") {
        return ""
      } else {
        return "Blog de Moumousse"
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.hideWhenLoading = '1'
    },500)
  }
}
</script>

<style scoped>
h1 {
  transition: opacity .5s linear;
}

h4 {
  letter-spacing: 1px;
}
</style>
