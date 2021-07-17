<template>
  <div class="v-cart container">
    <div class="cart-left">
      <div class="catr-title">Оформить покупку</div>
      <table class="tab-2">
        <tbody>
          <tr>
            <td class="left2">Количество товаров:</td>
            <td class="right2">{{ cartKolTovara | DopisyemSht }}</td>
          </tr>
          <tr>
            <td class="left2">Общая сумма:</td>
            <td class="right2">
              {{
                cartTotalCost | OkryglenieDoDvyxZnakovPosleZapjatoi | ZnakRyblja
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn-3">Оформить покупку</button>
    </div>
    <div class="cart-right">
      <div class="cart-right-top">
        <div class="title-cart">Ваша корзина</div>
        <button v-if="CART.length" @click="ydalenieTovaraSkorzinu">
          Очистить корзину
        </button>
      </div>
      <div class="cart-right-bottom">
        <div v-if="!CART.length" class="por-product__cart">
          Ваша корзина пуста...
        </div>
        <div
          class="por-product__cart"
          v-for="(coin, index) of CART"
          :key="coin.article"
        >
          <div class="por-product__cart-img">
            <img
              class="por-imger"
              :src="require(`../assets/images/${coin.image}`)"
              alt=""
            />
          </div>
          <div class="por-product__cart-info">
            <h2 class="por-cart-title">
              {{ coin.name }}
            </h2>
            <div class="redactirovanie">
              <button @click="minysTovar(index)">
                -
              </button>
              <p class="kol">{{ coin.zakazTovara }}</p>
              <button @click="plusTovar(index)">+</button>
            </div>
          </div>
          <div class="por-product__card-buy">
            <p class="por-prise">
              {{
                coin.price | OkryglenieDoDvyxZnakovPosleZapjatoi | ZnakRyblja
              }}
            </p>
            <p class="kolichestvo">
              В наличии
              <span v-if="coin.inStock == 1"> 1 штука</span>
              <span v-else-if="coin.inStock == 2"> 2 штуки</span>
              <span v-else-if="coin.inStock < 5"> меньше 5 штук</span>
              <span v-else-if="coin.inStock > 5 && coin.inStock < 10">
                больше 5 штук</span
              >
              <span v-else-if="coin.inStock > 10 && coin.inStock < 20">
                больше 10 штук</span
              >
              <span v-else-if="coin.inStock > 20"> больше 20 штук</span>
            </p>
            <div class="por-btns">
              <button @click="opisanie(coin.article)">Описание</button>
              <button @click="deleteFromCart(index)">Удалить товар</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "v-cart",
  computed: {
    ...mapGetters(["CART"]),
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
    cartTotalCost() {
      let result = [];
      if (this.$store.getters.CART.length) {
        for (let item of this.$store.getters.CART) {
          result.push(item.price * item.zakazTovara);
        }
        return result.reduce(function(sum, el) {
          return sum + el;
        });
      }
      return 0;
    },
  },
  methods: {
    ...mapActions([
      "YDALENIE_TOVARA_IZ_CORZINU",
      "DELETE_FROM_CART",
      "YMENSHENIE",
      "YVELICHENIE",
    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    },
    opisanie(id) {
      this.$router.push("/description/" + id);
    },
    ydalenieTovaraSkorzinu() {
      this.YDALENIE_TOVARA_IZ_CORZINU();
    },
    minysTovar(index) {
      this.YMENSHENIE(index);
    },
    plusTovar(index) {
      this.YVELICHENIE(index);
    },
  },
};
</script>

<style lang="scss">
.v-cart {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding-top: $padding !important;
}
.cart-left {
  width: 25%;
  max-height: 360px;
  margin-right: $padding;
  border: $border;
  border-radius: $radius;
  padding: $padding/2;
}
.cart-right {
  width: 75%;
}
.cart-right-top {
  border: $border;
  border-radius: $radius;
  padding: $padding/2;
  margin-bottom: $padding;
}
.catr-title {
  font-size: 26px;
  font-weight: 700;
  padding-bottom: $padding/3 * 2;
}
.tab-2 {
  width: 100%;
  table-layout: fixed;
  margin-bottom: $padding/3 * 2;
}
.left2 {
  padding: $padding/3 0;
  text-align: left;
}
.right2 {
  width: 100px;
  text-align: right;
  padding: $padding/3 0;
}
.btn-3 {
  width: 100%;
}
.title-cart {
  font-size: 26px;
  font-weight: 700;
}
.por-product__cart {
  width: 100%;
  padding: $padding/2;
  background: $background;
  border: $border;
  border-radius: $radius;
  margin-bottom: $padding;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.por-product__cart-img {
  max-width: 200px;
  max-height: 200px;
  border: $border;
  margin-right: $padding;
  border-radius: $radius;
  padding: $padding/3;
}
.por-product__cart-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 200px;
  align-self: flex-start;
}
.por-product__card-buy {
  min-height: 200px;
  padding-top: $padding/3 * 10;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.por-imger {
  max-width: 180px;
}
.por-btns {
  display: flex;
  justify-content: space-between;
}
.por-prise {
  color: blue;
  font-size: 20px;
}
.redactirovanie {
  display: flex;
  justify-content: center;
  padding-bottom: $padding * 2;
}
.por-cart-title {
  padding-bottom: $padding/4 * 5;
}
.kol {
  font-size: 28px;
  padding: 0 $padding;
}
.cart-right-top {
  display: flex;
  justify-content: space-between;
}
</style>
