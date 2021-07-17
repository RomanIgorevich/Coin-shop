<template>
  <div id="app">
    <v-navbar />
    <div class="indent">
      <router-view />
    </div>
  </div>
</template>

<script>
import vNavbar from "./components/system/v-navbar.vue";

export default {
  name: "App",
  components: {
    vNavbar,
  },
};
</script>

<style lang="scss">
.indent {
  padding-top: $height-navbar;
}
</style>
