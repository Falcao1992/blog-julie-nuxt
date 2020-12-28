import getSiteMeta from "./utils/getSiteMeta"

const meta = getSiteMeta()
const axios = require("axios")
const strapiBaseUri = process.env.API_URL || "http://localhost:1337"
const WebsiteBaseUri = process.env.WEBSITE_URL || "http://localhost:3000"

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",
  debug: !(process.env.NODE_ENV === 'production'),
  env: {
    strapiBaseUri,
    WebsiteBaseUri
  },

  // Custom Loading
  loading: '~/components/Loading.vue',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: "fr"
    },
    titleTemplate: "%s | Blog de moumousse",
    title: "Blog de moumousse",
    meta: [
      ...meta,
      {charset: "utf-8"},
      {
        name: "HandheldFriendly",
        content: "True"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        property: "og:site_name",
        content: "Blog de Moumousse"
      },
      {
        hid: "description",
        name: "description",
        content:
          "Recipes focused on the beautiful art of landscape painting."
      },
      {
        name: "twitter:site",
        content: "@Moumousse"
      },
      {
        name: "twitter:card",
        content: "summary_large_image"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
    ]
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@mdi/font/css/materialdesignicons.css', '~/assets/fonts/raleway.css', '~/assets/fonts/reenie_beanie.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/animateOnScroll.client.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    "@nuxtjs/strapi", "@nuxtjs/sitemap"
  ],
  strapi: {
    url: strapiBaseUri,
    entities: [
      {
        name: "Recettes",
        type: "collection"
      },
      {
        name: "Contenu-pages",
        type: "collection"
      },
      {
        name: "Sous-Categories",
        type: "collection"
      }
    ]
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    defaultAssets: {
      font: false,
      icons: false
    },
    theme: {
      light: false,
      themes: {
        light: {
          primary: "#E1C5AC",
          primaryDarken: "#523629",
          dark: "#000000",
          white: "#ffffff",
          gold: "#cfa052",
        }
      }
    }
  },
  sitemap: {
    hostname: WebsiteBaseUri,
    routes: async () => {
      const {data} = await axios.get(strapiBaseUri + "/recettes")
      return data.map((recipe) => `/recipes/${recipe.id}`)
    },
    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
      analyze: true,
      extractCSS: true
    }
  }
}
