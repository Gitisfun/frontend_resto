import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Login from "../views/General/Login.vue";

import Dashboard from "../views/Dashboard.vue";
import Payments from "../views/Payments/Payments.vue"
import Ticket from "../views/Payments/Ticket.vue"
import Orders from "../views/Orders/Orders.vue";
import OrderHistory from "../views/OrderHistory/OrderHistory.vue"
import Products from "../views/Products/Products.vue";
import Categories from "../views/Products/Categories.vue";
import CreateProduct from "../views/Products/CreateProduct.vue";
import UpdateProduct from "../views/Products/UpdateProduct.vue";
import Menucard from "../views/Menucard/Menucard.vue";
import CreateMenuCard from "../views/Menucard/CreateMenuCard.vue";
import UpdateMenuCard from "../views/Menucard/UpdateMenuCard.vue";
import Staff from "../views/Staff/Staff.vue";
import CreateRole from "../views/Staff/CreateRole.vue";
import UpdateRole from "../views/Staff/UpdateRole.vue";
import CreateStaff from "../views/Staff/CreateStaff.vue";
import UpdateStaff from "../views/Staff/UpdateStaff.vue";
import Password from "../views/Staff/Password.vue";
import Tables from "../views/Tables/Tables.vue";
import CreateTables from "../views/Tables/CreateTables.vue";
import UpdateTables from "../views/Tables/UpdateTables.vue";
import Details from "../views/Details/Details.vue";
import QrCode from "../views/QrCode/QrCode.vue"
import PrintQrCode from "../views/QrCode/PrintQrCode.vue"
import Settings from "../views/Settings/Settings.vue";
import Report from "../views/Report/Report.vue"
import PrivacyPolicy from "../views/PrivacyPolicy/PrivacyPolicy.vue"
import CustomerHome from "../views/Customer/Home/CustomerHome.vue";
import CustomerMenucard from "../views/Customer/Menucard/CustomerMenucard.vue";
import CustomerOrder from "../views/Customer/Orders/CustomerOrder.vue";
import CustomerPayment from "../views/Customer/Payment/CustomerPayment.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      group: "Dashboard",
      requiresAuth: true,
    },
  },
  {
    path: "/report",
    name: "Rapport",
    component: Report,
    meta: {
      group: "Rapport",
      requiresAuth: true,
    },
  },
  {
    path: "/payments",
    name: "Betalingen",
    component: Payments,
    meta: {
      group: "Betalingen",
      requiresAuth: true,
    },
  },
  {
    path: "/payments/print/:id",
    name: "Ticket",
    component: Ticket,
    meta: {
      group: "Betalingen",
      requiresAuth: true,
    },
  },
  {
    path: "/orders",
    name: "Bestellingen",
    component: Orders,
    meta: {
      group: "Bestellingen",
      requiresAuth: true,
    },
  },
  {
    path: "/orders/history",
    name: "Historiek",
    component: OrderHistory,
    meta: {
      group: "Historiek",
      requiresAuth: true,
    },
  },
  {
    path: "/products",
    name: "Producten",
    component: Products,
    meta: {
      group: "Producten",
      requiresAuth: true,
    },
  },
  {
    path: "/products/create",
    name: "CreateProduct",
    component: CreateProduct,
    meta: {
      group: "Producten",
      requiresAuth: true,
    },
  },
  {
    path: "/products/update/:id",
    name: "UpdateProduct",
    component: UpdateProduct,
    meta: {
      group: "Producten",
      requiresAuth: true,
    },
  },
  {
    path: "/products/categories",
    name: "Categories",
    component: Categories,
    meta: {
      group: "Producten",
      requiresAuth: true,
    },
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menucard,
    meta: {
      group: "Menu",
      requiresAuth: true,
    },
  },
  {
    path: "/menu/create",
    name: "CreateMenuCard",
    component: CreateMenuCard,
    meta: {
      group: "Menu",
      requiresAuth: true,
    },
  },
  {
    path: "/menu/update/:id",
    name: "UpdateMenuCard",
    component: UpdateMenuCard,
    meta: {
      group: "Menu",
      requiresAuth: true,
    },
  },
  {
    path: "/staff",
    name: "Personeel",
    component: Staff,
    meta: {
      group: "Personeel",
      requiresAuth: true,
    },
  },
  {
    path: "/staff/rollen/create",
    name: "CreateRole",
    component: CreateRole,
    meta: {
      group: "Personeel",
      requiresAuth: true,
    },
  },
  {
    path: "/staff/rollen/update/:id",
    name: "UpdateRole",
    component: UpdateRole,
    meta: {
      group: "Personeel",
      requiresAuth: true,
    },
  },
  {
    path: "/staff/create",
    name: "CreateStaff",
    component: CreateStaff,
    meta: {
      group: "Personeel",
      requiresAuth: true,
    },
  },
  {
    path: "/staff/update/:id",
    name: "UpdateStaff",
    component: UpdateStaff,
    meta: {
      group: "Personeel",
      requiresAuth: true,
    },
  },
  {
    path: "/staff/password/:id",
    name: "Password",
    component: Password,
    meta: {
      group: "Personeel",
      requiresAuth: true,
    },
  },
  {
    path: "/qrcode",
    name: "QR-code",
    component: QrCode,
    meta: {
      group: "Qrcode",
      requiresAuth: true,
    },
  },
  {
    path: "/qrcode/print",
    name: "PrintQrCode",
    component: PrintQrCode,
    meta: {
      group: "Qrcode",
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "Instellingen",
    component: Settings,
    meta: {
      group: "Instellingen",
      requiresAuth: true,
    },
  },
  {
    path: "/privacy",
    name: "Privacybeleid",
    component: PrivacyPolicy,
    meta: {
      group: "Privacy",
      requiresAuth: true,
    },
  },
  {
    path: "/tables",
    name: "Tafels",
    component: Tables,
    meta: {
      group: "Tafels",
      requiresAuth: true,
    },
  },
  {
    path: "/tables/create",
    name: "CreateTables",
    component: CreateTables,
    meta: {
      group: "Tafels",
      requiresAuth: true,
    },
  },
  {
    path: "/tables/update/:id",
    name: "UpdateTables",
    component: UpdateTables,
    meta: {
      group: "Tafels",
      requiresAuth: true,
    },
  },
  {
    path: "/details",
    name: "Mijn gegevens",
    component: Details,
    meta: {
      group: "Mijn gegevens",
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      group: "Dashboard",
    },
  },
  {
    path: "/horeca/info/:id",
    name: "CustomerHome",
    component: CustomerHome,
    meta: {
      group: "Customer",
    },
  },
  {
    path: "/horeca/menucard/:id",
    name: "CustomerMenucard",
    component: CustomerMenucard,
    meta: {
      group: "Customer",
    },
  },
  {
    path: "/horeca/order/:id",
    name: "CustomerOrder",
    component: CustomerOrder,
    meta: {
      group: "Customer",
    },
  },
  {
    path: "/horeca/payment",
    name: "CustomerPayment",
    component: CustomerPayment,
    meta: {
      group: "Customer",
    },
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0,0);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.getToken == null)
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    else {
      next();
    }
  } else {
    next();
  }
});

export default router;
