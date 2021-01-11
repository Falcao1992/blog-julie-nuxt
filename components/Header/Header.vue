<template>
  <header style="position: relative">
    <v-img
      v-if="bgImg"
      :src="bgImg.url"
      :style="[headerStyle]"
    />
    <div
      class="text-center primary--text pa-0"
      :style="{transform: $vuetify.breakpoint.smAndDown ? 'translate(-50%, 0)' : 'translate(-50%, -50%)' ,top: $vuetify.breakpoint.smAndDown ? '104px' : '25%',left: '50%',position: 'absolute'}"
    >
      <h1
        class="text-h2 text-md-h1 font-weight-normal"
        :style="{opacity: hideWhenLoading, filter:'drop-shadow(3px 10px 2px black)'}"
      >
        {{ generateHeaderTittle }}
      </h1>
    </div>
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
          height: `100vh`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative"
        }
      }
      return styleObject
    },
    generateHeaderTittle: function () {
      if (this.$route.name === "recipes") {
        return "Les Recettes"
      } else if (this.$route.name === "recipes-id") {
        return ""
      } else if (this.$route.name === "contact") {
        return "Contact"
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
