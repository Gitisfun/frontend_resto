<template>
  <div id="customer-home-box">
    <div style="background: black; padding: 15px; font-weight: 700; color: white; text-align: center; font-size: 18px" v-if="info.horeca != null">
      {{ info.horeca.name }}
    </div>
    <b-tabs expanded>
      <b-tab-item icon="" label="Info">
        <CustomerInfoTab :info.sync="info" :id="id" />
      </b-tab-item>
      <b-tab-item icon="" label="Menu">
        <CustomerMenucardTab :horeca_id="$route.params.id" :menu.sync="menu" />
      </b-tab-item>
      <b-tab-item icon="" label="Tafels">
        <CustomerTableTab :tables="tables" />
      </b-tab-item>
      <b-tab-item icon="" label="Mijn bestellingen">
        <CustomerMyOrdersTab />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import CustomerInfoTab from "../../../components/customer/CustomerInfoTab";
import CustomerMenucardTab from "../../../components/customer/CustomerMenucardTab";
import CustomerTableTab from "../../../components/customer/CustomerTableTab";
import CustomerMyOrdersTab from "../../../components/customer/CustomerMyOrdersTab";

import io from "socket.io-client";
import { listenForNotifications } from "../../../logic/sockets/socketManager.js";

import { getMultiple, getAll, getById } from "../../../api/apiCalls";
import { getContact } from "../../../api/routes/contactinfo";
import { getAddress } from "../../../api/routes/address";
import { getTimetable } from "../../../api/routes/timetable";
import { getHoreca } from "../../../api/routes/horeca";
import { getCurrentlyActive } from "../../../api/routes/menus";
import { getAllMenuItems } from "../../../api/routes/menuItems";
import { getAllTablesByHorecaId } from "../../../api/routes/tables";

import menu from "../../../logic/menu.js";
import moment from "moment";

export default {
  name: "CustomerHome",
  components: {
    CustomerInfoTab,
    CustomerMenucardTab,
    CustomerTableTab,
    CustomerMyOrdersTab,
  },
  data() {
    return {
      socket: null,
      id: null,
      info: {
        horeca: null,
        contactinfo: null,
        address: null,
        timetable: null,
      },
      menu: null,
      tables: null,
    };
  },
  created() {
    this.socket = io("http://localhost:5000/");

    localStorage.setItem("myorder", null);

    this.id = this.$route.params.id;
    this.fetchData();
  },
  mounted() {
    listenForNotifications(this.socket, "tables", this.fetchData);
    listenForNotifications(this.socket, "menu", this.fetchData);
  },
  destroyed() {
    this.socket.close();
  },
  methods: {
    fetchData() {
      getMultiple(
        [getHoreca(this.id), getContact(this.id), getAddress(this.id), getTimetable(this.id), getCurrentlyActive(this.id), getAllTablesByHorecaId(this.id)],
        (res) => {
          this.info.horeca = res[0].data[0];
          this.info.contactinfo = res[1].data[0];
          this.info.address = res[2].data[0];
          this.info.timetable = JSON.parse(res[3].data[0].timetable);
          this.tables = res[5].data;
          const tempMenuList = res[4].data;
          if (tempMenuList.length != 0) {
            const index = this.searchActiveTimeslot(tempMenuList);
            let tempMenu = null;
            if (index != -1) {
              tempMenu = tempMenuList[index];
            } else {
              const index = this.searchActiveMenu(tempMenuList);
              tempMenu = tempMenuList[index];
            }
            getById(
              getAllMenuItems,
              tempMenu.id,
              (resItems) => {
                this.menu = menu.convertToFrontend(tempMenu, resItems.data);
              },
              this
            );
          } else {
            this.menu = null;
          }
        },
        this
      );
    },
    updateTables() {
      getAll(
        getAllTablesByHorecaId(this.id),
        "",
        (res) => {
          this.tables = res.data;
        },
        this
      );
    },
    searchActiveTimeslot(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].start_time && list[i].end_time) {
          const tempStart = moment(list[i].start_time, "HH:mm:ss");
          const tempEnd = moment(list[i].end_time, "HH:mm:ss");
          const now = moment();
          const check = now.isBetween(tempStart, tempEnd);
          if (check) {
            return i;
          }
        }
      }
      return -1;
    },
    searchActiveMenu(list) {
      for (let i = 0; i < list.length; i++) {
        if (!list[i].start_time && !list[i].end_time) {
          return i;
        }
      }
    },
  },
};
</script>

<style scoped>
#customer-home-box {
  min-height: 100%;
  /* background: #dff9fb; */
  background-image: linear-gradient(to bottom, #81ecec 0%, #81ecec 100%);
  padding: 0px;
  margin: 0px;
}
</style>
