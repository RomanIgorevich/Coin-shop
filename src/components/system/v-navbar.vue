<template>
  <div class="v-navbar">
    <div class="container flex-jc">
      <div class="menu" @click="temp = !temp">
        <span class="material-icons">
          menu
        </span>
      </div>
      <ul class="category-btn" :class="{ vid: temp }">
        <li v-for="catg of CATEGORY" :key="catg.text">
          <div
            class="categori-link-btn"
            @click="vubrannajaKategoria(catg.category)"
          >
            {{ catg.text }}
          </div>
        </li>
      </ul>
      <div class="logo flex-cc" @click="discharge">logo</div>
      <router-link class="cart flex-cc" to="/cart">
        <i class="material-icons">shopping_cart</i>
        <div v-if="CART.length > 0" class="quantity flex-cc">
          {{ cartKolTovara }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "v-navbar",
  data() {
    return {
      searchValue: "",
      temp: true,
    };
  },
  filters: {},
  computed: {
    ...mapGetters(["CATEGORY", "CART"]),
    cartKolTovara() {
      let result = 0;
      if (this.$store.getters.CART.length) {
        for (let item of this.$store.getters.CART) {
          result = result + item.zakazTovara;
        }
        return result;
      }
      return 0;
    },
  },
  methods: {
    ...mapActions([
      "TEST_KAT",
      "GET_CATEGORI_FROM_API",
      "GET_MIN_PRISE",
      "GET_MAX_PRISE",
    ]),
    vubrannajaKategoria(category) {
      this.TEST_KAT(category);
      this.GET_MIN_PRISE(0);
      this.GET_MAX_PRISE(100000);
      this.temp = !this.temp;
      this.$router.push({ name: "Home" }).catch(() => {});
    },
    discharge() {
      this.GET_MIN_PRISE(0);
      this.GET_MAX_PRISE(100000);
      this.TEST_KAT("");
      this.$router.push({ name: "Home" }).catch(() => {});
    },
  },
  mounted() {
    this.GET_CATEGORI_FROM_API();
  },
};
</script>

<style lang="scss">
.v-navbar {
  background: $background;
  border-bottom: $border;
  position: fixed;
  padding-top: 6px;
  width: 100%;
  height: $height-navbar;
  top: 0;
  left: 0;
  font-size: 32px;
  z-index: 10;
}
.logo {
  width: 100px;
  height: 40px;
  border: $border;
  border-radius: $radius;
  color: $color;
  text-decoration: none;
  cursor: pointer;
}
.menu,
.cart {
  width: 40px;
  height: 40px;
  border: $border;
  border-radius: $radius;
  color: $color;
  position: relative;
}
.menu {
  display: none;
  cursor: pointer;
}
.quantity {
  background: $background;
  width: 30px;
  height: 30px;
  border: $border;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  left: 15px;
  font-size: 16px;
  padding-top: 2px;
  color: $color;
}
.category-btn {
  position: fixed;
  top: $height-navbar;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: $background;
  border-bottom: $border;
  z-index: 4;
  display: none;
  cursor: pointer;
}
.category-btn.vid {
  display: none;
}

.category-btn li {
  font-size: 24px;
}
.categori-link-btn {
  padding: $padding;
  text-align: center;
}
.categori-link-btn:hover {
  padding: $padding;
  background: $background-hover;
}
</style>
