import Vuex from "vuex"
import Vue from "vue"
import auth from "./modules/auth"
import menu from "./modules/menu"
import products from "./modules/products"
import myorders from "./modules/myorders"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        menu,
        products,
        myorders
    }
})