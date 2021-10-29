import httpClient from "../../api/httpClient";

const state = {
  user: {
    id: null,
    username: null,
    firstname: null,
    lastname: null,
    image: null,
    job: null,
    hire_date: null,
    date_of_birth: null,
    email: null,
    phonenumber: null,
    role_id: null,
    role_name: null,
    role_color: null,
    horeca_id: null
  },
  permissions: [],
  token: null,
};

const getters = {
  getUser: (state) => {
    if (JSON.parse(localStorage.getItem("userws"))) {
      state.user = JSON.parse(localStorage.getItem("userws"));
    }
    return state.user;
  },
  getPermissions: (state) => {
    if (JSON.parse(localStorage.getItem("permissionslist"))) {
      state.user = JSON.parse(localStorage.getItem("permissionslist"));
    }
    return state.user;
  },
  getToken: (state) => {
    if (JSON.parse(localStorage.getItem("authtokenws"))) {
      state.token = JSON.parse(localStorage.getItem("authtokenws"));
    }
    return state.token;
  },
};

const actions = {
  setUser({ commit }, user) {
    commit("setUser", user);
  },
  setToken({ commit }, token) {
    commit("setToken", token);
  },
  setPermissions({ commit }, permissions) {
    commit("setPermissions", permissions);
  },
};

const mutations = {
  setUser: (state, user) => {
    localStorage.setItem("userws", JSON.stringify(user));
    state.user = user;
  },
  setPermissions: (state, permissions) => {
    localStorage.setItem("permissionslist", JSON.stringify(permissions));
    state.permissions = permissions;
  },
  setToken: (state, token) => {
    localStorage.setItem("authtokenws", JSON.stringify(token));
    httpClient.defaults.headers.common["authorization"] = `Bearer ${token}`;
    state.token = token;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
