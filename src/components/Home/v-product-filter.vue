<template>
  <div class="v-product-filter">
    <div class="f-title">Фильтрация товара</div>
    <div class="f-filtr">
      Цена от <input class="f-input" type="number" v-model="minPrise" /> до
      <input class="f-input" type="number" v-model="maxPrise" />
      <button @click="sortByPrise">Применить</button>
      <button @click="discharge">Очистить</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      minPrise: "",
      maxPrise: "",
    };
  },
  computed: {
    ...mapGetters(["MIN_PRISE", "MAX_PRISE"]),
  },
  watch: {
    MIN_PRISE: function() {
      if (this.MIN_PRISE == 0) {
        this.minPrise = "";
      }
    },
    MAX_PRISE: function() {
      if (this.MAX_PRISE == 100000) {
        this.maxPrise = "";
      }
    },
  },
  methods: {
    ...mapActions(["GET_MIN_PRISE", "GET_MAX_PRISE"]),
    sortByPrise() {
      if (this.minPrise.length != 0 && this.maxPrise.length != 0) {
        if (+this.minPrise > +this.maxPrise) {
          let temp = this.minPrise;
          this.minPrise = this.maxPrise;
          this.maxPrise = temp;
        }
        this.GET_MIN_PRISE(this.minPrise);
        this.GET_MAX_PRISE(this.maxPrise);
      }
    },
    discharge() {
      this.minPrise = "";
      this.maxPrise = "";
      this.GET_MIN_PRISE(0);
      this.GET_MAX_PRISE(100000);
    },
  },
};
</script>

<style lang="scss">
// Убрать стрелочки с <input type=“number”>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.v-product-filter {
  border: $border;
  border-radius: $radius;
  margin: $padding 0;
  height: $height-navbar;
  display: flex;
  padding: 0 $padding/2;
  justify-content: space-between;
  align-items: center;
}
.f-title {
  font-size: 24px;
  font-weight: 700;
}
.f-filtr {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.f-input {
  height: 30px;
  width: 100px;
  padding: $padding/3;
  margin: 0 $padding/2;
}
</style>
