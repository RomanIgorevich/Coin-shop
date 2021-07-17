<template>
  <div class="home container">
    <v-product-filter />
    <div class="flex-j">
      <v-categori />
      <v-catalog />
    </div>
  </div>
</template>

<script>
import vProductFilter from "../components/Home/v-product-filter.vue";
import vCategori from "../components/Home/v-categori.vue";
import vCatalog from "../components/Home/v-catalog.vue";

export default {
  name: "home",
  components: {
    vProductFilter,
    vCategori,
    vCatalog,
  },
};
</script>
