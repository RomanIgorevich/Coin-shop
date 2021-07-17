<template>
  <div class="v-main-categori">
    <ul>
      <li v-for="catg of CATEGORY" :key="catg.text">
        <div class="categori-link" @click="vubrannajaKategoria(catg.category)">
          {{ catg.text }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "v-main-categori",
  computed: {
    ...mapGetters(["CATEGORY"]),
  },
  methods: {
    ...mapActions(["TEST_KAT", "GET_CATEGORI_FROM_API"]),
    vubrannajaKategoria(category) {
      this.TEST_KAT(category);
    },
  },
  mounted() {
    this.GET_CATEGORI_FROM_API();
  },
};
</script>

<style lang="scss">
.v-main-categori {
  width: 25%;
  height: 100%;
  margin-right: $padding;
  border: $border;
  border-radius: $radius;
  overflow: hidden;
  cursor: pointer;
}
.v-main-categori li:hover {
  background: $background-hover;
}
.categori-link {
  padding: $padding/2;
  font-size: 20px;
  white-space: pre-line;
}
</style>
