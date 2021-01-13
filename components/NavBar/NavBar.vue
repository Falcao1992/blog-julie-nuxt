<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      app
      class="white"
      overlay-opacity=".4"
      stateless
      tag="div"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          exact
          router
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          style="cursor: pointer"
          @click.stop="miniVariant = !miniVariant"
        >
          <v-list-item-action>
            <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Minifier
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :class="['dark--text', $vuetify.breakpoint.smAndUp && 'pr-8']"
      app
      color="white"
      elevation="20"
      fixed
      hide-on-scroll
      tag="div"
    >
      <v-app-bar-nav-icon
        aria-label="Menu de Navigation"
        class="dark--text" @click.stop="drawer = !drawer"
      />
      <v-spacer v-if="$vuetify.breakpoint.xsOnly" />
      <v-toolbar-title>
        <NuxtLink
          :class="['dark--text text-decoration-none', $vuetify.breakpoint.smAndUp && 'pl-8' ]"
          to="/"
        >
          Blog de Moumousse
        </NuxtLink>
      </v-toolbar-title>
      <v-spacer v-if="$vuetify.breakpoint.smAndUp" />
      <v-toolbar-items
        v-if="$vuetify.breakpoint.smAndUp"
        class="ml-4"
      >
        <v-btn
          elevation="0"
          to="/recipes"
        >
          Recettes
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items
        v-if="$vuetify.breakpoint.smAndUp"
        class="ml-4"
      >
        <v-btn
          elevation="0"
          to="/contact"
        >
          Contact
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: "mdi-home",
          title: "Blog de Moumousse",
          to: "/"
        },

        {
          icon: "mdi-cupcake",
          title: "Recettes",
          to: "/recipes"
        },
        {
          icon: "mdi-contacts",
          title: "Contact",
          to: "/contact"
        }
      ],
      miniVariant: true
    }
  }
}
</script>
<style scoped>

</style>
