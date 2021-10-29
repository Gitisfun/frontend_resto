const state = {
  myOrders: [],
  myOrderIDs: [],
};

const getters = {
  getMyOrders: (state) => {
    if (JSON.parse(localStorage.getItem("myorders"))) {
      state.myOrders = JSON.parse(localStorage.getItem("myorders"));
    }
    return state.myOrders;
  },
  getMyOrderIDs: (state) => {
    if (JSON.parse(localStorage.getItem("myorderids"))) {
      state.myOrderIDs = JSON.parse(localStorage.getItem("myorderids"));
    }
    return state.myOrderIDs;
  },
};

const actions = {
  async setMyOrders({ commit }, myOrders) {
    commit("setMyOrders", myOrders);
  },
  async setMyOrderIDs({ commit }, myOrderIDs) {
    commit("setMyOrderIDs", myOrderIDs);
  },
};

const mutations = {
  setMyOrders: (state, myOrders) => {
    localStorage.setItem("myorders", JSON.stringify(myOrders));
    state.myOrders = myOrders;
  },
  setMyOrderIDs: (state, myOrderIDs) => {
    localStorage.setItem("myorderids", JSON.stringify(myOrderIDs));
    state.myOrderIDs = myOrderIDs;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
