import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    coins: [],
    category: [],
    cart: [],
    categ: "",
    minPrise: 0,
    maxPrise: 100000,
  },
  mutations: {
    SET_COINS_TO_STATE: (state, coins) => {
      state.coins = coins;
    },
    SET_CATEGORY_TO_STATE: (state, category) => {
      state.category = category;
    },
    SET_CART_TO_STATE: (state, product) => {
      if (state.cart.length) {
        let isProductExists = false;
        state.cart.map((item) => {
          if (item.article === product.article) {
            isProductExists = true;
            if (item.zakazTovara < item.inStock) {
              item.zakazTovara++;
            }
          }
        });
        if (!isProductExists) {
          state.cart.push(product);
        }
      } else {
        state.cart.push(product);
      }
    },
    SET_YDALENIE_TOVARA: (state) => {
      state.cart = [];
    },
    REMOVE_FROM_CART: (state, index) => {
      state.cart.splice(index, 1);
    },
    SET_YMENSHENIE: (state, index) => {
      if (state.cart[index].zakazTovara > 1) state.cart[index].zakazTovara--;
    },
    SET_YVELISHENIE: (state, index) => {
      if (state.cart[index].inStock > state.cart[index].zakazTovara)
        state.cart[index].zakazTovara++;
    },
    SET_TEST_KAT: (state, index) => {
      state.categ = index;
    },
    SET_MIN_PRISE: (state, index) => {
      state.minPrise = index;
    },
    SET_MAX_PRISE: (state, index) => {
      state.maxPrise = index;
    },
  },
  actions: {
    GET_COINS_FROM_API({ commit }) {
      return axios
        .get(
          // "http://localhost:3000/coins"
          "https://raw.githubusercontent.com/RomanIgorevich/Coin-shop/main/coins.json"
        )
        .then((coins) => {
          commit("SET_COINS_TO_STATE", coins.data);
          return coins;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    GET_CATEGORI_FROM_API({ commit }) {
      return axios
        .get(
          // "http://localhost:3000/category"
          "https://raw.githubusercontent.com/RomanIgorevich/Coin-shop/main/category.json"
        )
        .then((category) => {
          commit("SET_CATEGORY_TO_STATE", category.data);
          return category;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },

    ADD_TO_CARD({ commit }, index) {
      commit("SET_CART_TO_STATE", index);
    },
    YDALENIE_TOVARA_IZ_CORZINU({ commit }) {
      commit("SET_YDALENIE_TOVARA");
    },
    DELETE_FROM_CART({ commit }, index) {
      commit("REMOVE_FROM_CART", index);
    },
    YMENSHENIE({ commit }, index) {
      commit("SET_YMENSHENIE", index);
    },
    YVELICHENIE({ commit }, index) {
      commit("SET_YVELISHENIE", index);
    },
    TEST_KAT({ commit }, index) {
      commit("SET_TEST_KAT", index);
    },
    GET_MIN_PRISE({ commit }, index) {
      commit("SET_MIN_PRISE", index);
    },
    GET_MAX_PRISE({ commit }, index) {
      commit("SET_MAX_PRISE", index);
    },
  },
  getters: {
    COINS(state) {
      return state.coins;
    },
    CATEGORY(state) {
      return state.category;
    },
    CART(state) {
      return state.cart;
    },
    CATEG(state) {
      return state.categ;
    },
    MIN_PRISE(state) {
      return state.minPrise;
    },
    MAX_PRISE(state) {
      return state.maxPrise;
    },
  },
});

export default store;
