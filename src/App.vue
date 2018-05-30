<template>
  <v-app>
  <v-navigation-drawer 
  app
  temporary
  v-model="drawer"
  >
  <v-list>
          <v-list-tile 
          v-for="link of links"
          :key="link.title"
          :to="link.url"
          >
            <v-list-tile-action>
      <v-icon>{{link.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="link.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile 
          @click="onLogout"
          v-if="isUserLoggedIn"
          >
            <v-list-tile-action>
      <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="'Выйти'"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
  </v-navigation-drawer>
  <v-toolbar app>
     <v-toolbar-side-icon
     @click="drawer = !drawer"
     class="hidden-md-and-up"
     ></v-toolbar-side-icon>
    <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Help Desk beta v.1</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn 
      v-for="link in links"
      :key="link.title"
      :to="link.url"
      flat><v-icon left color="primary darken-2">{{link.icon}}</v-icon>{{link.title}}</v-btn>
      <v-btn 
      @click="onLogout"
      flat
      v-if="isUserLoggedIn"
      >
      <v-icon left color="primary darken-2">exit_to_app</v-icon>Выйти</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-content>
      <router-view></router-view>
  </v-content>
  <template v-if="error">  
  <v-snackbar
      :timeout="5000"
      :multi-line="true"
      :top="true"
      color="error"
      @input="closeError"
      :value="true"
    >
      {{error}}
      <v-btn flat dark @click.native="closeError">Закрыть</v-btn>
    </v-snackbar>
    </template>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: "Orders", icon: "bookmark_border", url: "/orders" },
          { title: "Новая задача", icon: "note_add", url: "/new" },
          { title: "Мои задачи", icon: "list", url: "/list" }
        ];
      }

      return [
        { title: "Войти", icon: "lock", url: "/login" },
        { title: "Регистрация", icon: "face", url: "/registration" }
      ];
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    onLogout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
