<template>
  <div class="v-opisanie-tovara container">
    <div class="art" v-for="coin of COINS" :key="coin.article">
      <div class="fot" v-if="coin.article == id">
        <div class="opisanie-tovara__title">{{ coin.name }}</div>
        <div class="tovar">
          <div class="tovar__cart-imgs">
            <div class="malenkie_imgs">
              <div class="melk-img">
                <img
                  class="img-min"
                  :src="require(`../assets/images/${coin.image}`)"
                  alt=""
                />
              </div>
              <div class="melk-img">
                <img
                  class="img-min"
                  :src="require(`../assets/images/${coin.image}`)"
                  alt=""
                />
              </div>
              <div class="melk-img">
                <img
                  class="img-min"
                  :src="require(`../assets/images/${coin.image}`)"
                  alt=""
                />
              </div>
              <div class="melk-img">
                <img
                  class="img-min"
                  :src="require(`../assets/images/${coin.image}`)"
                  alt=""
                />
              </div>
              <div class="melk-img">
                <img
                  class="img-min"
                  :src="require(`../assets/images/${coin.image}`)"
                  alt=""
                />
              </div>
            </div>
            <div class="bolsh-img">
              <img
                class="img-max"
                :src="require(`../assets/images/${coin.image}`)"
                alt=""
              />
            </div>
          </div>
          <div class="tovar__cart-info">
            <div class="vnalicii">
              Осталось: {{ coin.inStock | DopisyemSht }}
            </div>
            <div class="tsena">
              Цена:
              {{
                coin.price | OkryglenieDoDvyxZnakovPosleZapjatoi | ZnakRyblja
              }}
            </div>
            <div class="tovar-btns">
              <button @click="addProduct(coin)">В корзину</button>
              <button @click="goToBack">Вернуться назад</button>
            </div>
            <table class="tab">
              <tbody>
                <tr>
                  <td>Тип:</td>
                  <td>{{ coin.type }}</td>
                </tr>
                <tr>
                  <td>Год:</td>
                  <td>{{ coin.year }}</td>
                </tr>
                <tr>
                  <td>Номинал:</td>
                  <td>{{ coin.denomination }}</td>
                </tr>
                <tr>
                  <td>Диаметр (мм):</td>
                  <td>{{ coin.diameter }}</td>
                </tr>
                <tr>
                  <td>Тираж (шт):</td>
                  <td>{{ coin.circulation }}</td>
                </tr>
                <tr>
                  <td>Материал:</td>
                  <td>{{ coin.material }}</td>
                </tr>
                <tr>
                  <td>Толщина (мм):</td>
                  <td>{{ coin.thickness }}</td>
                </tr>
                <tr>
                  <td>Вес предмета (г):</td>
                  <td>{{ coin.weight }}</td>
                </tr>
                <tr>
                  <td>Страна:</td>
                  <td>{{ coin.country }}</td>
                </tr>
                <tr>
                  <td>Код товара:</td>
                  <td>{{ coin.article }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "v-opisanie-tovara",
  data() {
    return {
      id: this.$route.params["id"],
    };
  },
  computed: {
    ...mapGetters(["COINS"]),
  },
  methods: {
    ...mapActions(["ADD_TO_CARD"]),
    addProduct(id) {
      this.ADD_TO_CARD(id);
    },
    goToBack() {
      this.$router.push({ name: "Home" });
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.v-opisanie-tovara {
  padding-top: $height-navbar;
}
.opisanie-tovara__title {
  font-size: 32px;
  padding: $padding/2;
  line-height: 1.5;
}
.fot {
  width: 100%;
}
.tovar__cart-imgs {
  display: flex;
  justify-content: flex-start;
  min-width: 50%;
}
.tovar__cart-info {
  min-width: 50%;
}
.tovar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: $border;
  border-radius: $radius * 2;
}
.malenkie_imgs {
  padding: $padding/2;
  max-width: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.melk-img {
  width: 100%;
  display: flex;
  align-items: center;
  border: $border;
  border-radius: $radius;
  padding: $padding/3;
}
.img-min {
  width: 100%;
  object-fit: cover;
}
.img-max {
  width: 100%;
  object-fit: cover;
}
.melk-img + .melk-img {
  margin-top: $padding/2;
}
.bolsh-img {
  min-width: 80%;
  padding: $padding/2;
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: $radius;
  margin: 18px 0;
}
.tovar__cart-info {
  padding: $padding/2;
}
.vnalicii {
  font-size: 26px;
  padding: $padding/2 0;
}
.tsena {
  padding: $padding/2 0 $padding;
  font-size: 32px;
}
.tab {
  width: 80%;
  height: 60%;
  table-layout: fixed;
  margin: 30px;
  margin-left: 10%;
  border-spacing: 0px;
  border-collapse: collapse;
}
.tab td {
  padding: 5px 10px;
  border: $border;
  text-align: left;
}
.tab tbody tr:nth-child(odd) {
  background: #fff;
}
.tab tbody tr:nth-child(even) {
  background: #f7f7f7;
}
.vnalicii,
.tsena,
.tovar-btns {
  padding-left: 10%;
}
</style>
