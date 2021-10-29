const state = {
  products: { results: [], limit: 10, total: 0},
  categories: [],
  search: "",
};

const getters = {
  getProducts: (state) => state.products,
  getCategories: (state) => state.categories,
  getSearchForProducts: (state) => state.search,
};

const actions = {
  async changeProducts({ commit }, products) {
    commit("setProducts", products);
  },
  async changeCategories({ commit }, categories) {
    commit("setCategories", categories);
  },
  async changeSearchForProducts({ commit }, search) {
    commit("setSearch", search);
  },
};

const mutations = {
  setProducts: (state, products) => (state.products = products),
  setCategories: (state, categories) => (state.categories = categories),
  setSearch: (state, search) => (state.search = search),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
