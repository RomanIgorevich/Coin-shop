import Vue from "vue";
import VueRouter from "vue-router";
import Cart from "./pages/Cart";
import Description from "./pages/Description";
import Home from "./pages/Home";
import vError from "./components/system/v-error";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/cart", name: "Cart", component: Cart },
    {
      path: "*",
      component: vError,
      // redirect: { name: 'Home' }
    },
    {
      path: "/description/:id",
      name: "Description",
      component: Description,
    },
  ],
  mode: "hash",
  // mode: "history",
});
