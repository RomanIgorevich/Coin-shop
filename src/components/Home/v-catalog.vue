<template>
  <div class="v-catalog">
    <div v-for="coin of COINS" :key="coin.artcle">
      <div
        class="product__cart"
        v-if="
          (!CATEG || CATEG == coin.category) &&
            MIN_PRISE < coin.price &&
            coin.price < MAX_PRISE
        "
      >
        <div class="product__cart-img">
          <img
            class="imger"
            :src="require(`../../assets/images/${coin.image}`)"
            alt=""
          />
        </div>
        <div class="flex-colr">
          <h2 class="cart-title">{{ coin.name }}</h2>
          <ul>
            <li>
              <span>Диаметр:</span>
              <span class="cart-text">{{ coin.diameter }}</span>
            </li>
            <li>
              <span>Тираж:</span>
              <span class="cart-text">{{ coin.circulation }}</span>
            </li>
            <li>
              <span>Вес монеты:</span>
              <span class="cart-text">{{ coin.weight }}</span>
            </li>
            <li>
              <span>Код товара:</span>
              <span class="cart-text">{{ coin.article }}</span>
            </li>
          </ul>
        </div>
        <div class="product__card-buy">
          <p class="prise">
            {{ coin.price | OkryglenieDoDvyxZnakovPosleZapjatoi | ZnakRyblja }}
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
          <div class="flex-cc">
            <button @click="opisanie(coin.article)">Описание</button>
            <button @click="addProduct(coin)">В корзину</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "v-catalog",
  props: {
    categoryCoins: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      temp: "",
    };
  },
  computed: {
    ...mapGetters(["COINS", "CATEG", "MIN_PRISE", "MAX_PRISE"]),
  },
  methods: {
    ...mapActions(["GET_COINS_FROM_API", "ADD_TO_CARD"]),
    addProduct(id) {
      this.ADD_TO_CARD(id);
    },
    opisanie(article) {
      this.$router.push("/description/" + article);
    },
  },
  mounted() {
    this.GET_COINS_FROM_API();
  },
  beforeUpdate() {
    this.temp = this.categoryCoins;
  },
};
</script>

<style lang="scss">
.v-catalog {
  width: 75%;
}
.flex-colr {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.product__cart {
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
.product__cart-img {
  max-width: 200px;
  max-height: 200px;
  border: $border;
  margin-right: $padding/2;
  border-radius: $radius;
  padding: $padding/3;
}
.product__card-buy {
  min-height: 200px;
  padding-top: $padding * 2;
  position: relative;
  align-items: center;
  margin-left: $padding/2;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.imger {
  max-width: 180px;
}
.cart-title {
  padding-bottom: $padding/2;
}
.cart-text {
  color: rgb(209, 57, 57);
  padding-left: $padding/4;
}
.prise {
  color: $color-price;
  font-size: 20px;
}
button + button {
  margin-left: $padding/2;
}
.kolichestvo {
  white-space: nowrap;
}
</style>
