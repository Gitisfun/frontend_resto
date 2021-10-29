<template>
  <div class="modal-card box" style="width: auto; background: #c7ecee">
    <div style="margin-bottom: 25px">
      <ModalTitle title="Tijdslot toevoegen" />
    </div>
    <div class="box" style="margin-bottom: 35px">
      <p class="timeslot-modal-submenu">Overzicht van bestaande tijdsloten:</p>
      <div v-if="currentTimeslots.length != 0">
        <p v-for="item in currentTimeslots" :key="item.id" style="padding-bottom: 5px; padding-top: 7px; margin-top: 10px; margin-right: 5px; margin-left: 5px">
          <span id="timeslot-menu-title">{{ item.name }}</span>
          <span style="margin-left: 50px; font-weight: 300" v-if="item.startTime == null && item.endTime == null">Dit menu is actief wanneer er geen tijdsloten zijn toegevoegd</span>
          <span style="margin-left: 50px; font-weight: 300" v-else>Van {{ item.startTime | convertTime }} tot {{ item.endTime | convertTime }}</span>
          <Icon @clicked="removeTimeslot(item.id)" style="margin-left: 15px; float: right;" icon="close-thick" size="is-small" type="is-danger" />
        </p>
      </div>
      <p v-else>Nog geen tijdsloten toegevoegd</p>
    </div>
    <b-tabs class="box">
      <b-tab-item label="Enkel tijdslot">
        <div style="margin-top: 5px;">
          <p class="timeslot-modal-submenu">Activeer enkel één menukaart:</p>
          <ValidationObserver ref="observer" v-slot="{ passes }">
            <div style="margin-bottom: 15px;">
              <ValidatedSelect size="is-small" rules="required" label="Menu" v-model="menu_id_activate" myplaceholder="Kies een menu...">
                <option v-for="option in menus" :value="option.id" :key="option.id">
                  {{ option.name }}
                </option>
              </ValidatedSelect>
            </div>
            <p style="font-size: 12px">Dit zal alle andere menukaarten inactief maken</p>
            <div class="level" style="margin-top: 35px">
              <div class="level-left"></div>
              <div class="level-right">
                <div class="level-item">
                  <button class="button is-success" @click="passes(activateOne)">Activeren</button>
                </div>
                <div class="level-item">
                  <button class="button is-dark" type="button" @click="close">
                    Sluiten
                  </button>
                </div>
              </div>
            </div>
          </ValidationObserver>
        </div>
      </b-tab-item>
      <b-tab-item label="Meerdere tijdslots">
        <ValidationObserver ref="observer" v-slot="{ passes }">
          <div style="margin-top: 5px;">
            <p class="timeslot-modal-submenu">Nieuw tijdslot toevoegen:</p>
            <div style="margin-bottom: 15px;">
              <ValidatedSelect size="is-small" rules="required" label="Menu" v-model="menu_id" myplaceholder="Kies een menu...">
                <option v-for="option in menus" :value="option.id" :key="option.id">
                  {{ option.name }}
                </option>
              </ValidatedSelect>
            </div>
            <div style="margin-bottom: 15px;">
              <ValidationProvider rules="required" v-slot="{ errors, valid }">
                <b-field size="is-small" label="Starttijd" :type="{ 'is-danger': errors[0], 'is-success': valid }" :message="errors">
                  <b-clockpicker :max-time="endTime" size="is-small" v-model="startTime" hour-format="24" placeholder="Van..."></b-clockpicker>
                </b-field>
              </ValidationProvider>
            </div>
            <div style="margin-bottom: 15px;">
              <ValidationProvider rules="required" v-slot="{ errors, valid }">
                <b-field size="is-small" label="Eindtijd" :type="{ 'is-danger': errors[0], 'is-success': valid }" :message="errors">
                  <b-clockpicker :min-time="startTime" size="is-small" v-model="endTime" hour-format="24" placeholder="Tot..."></b-clockpicker>
                </b-field>
              </ValidationProvider>
            </div>
            <p style="font-size: 12px">Dit zal alle andere menukaarten overschrijven indien er conflicten zijn</p>
            <div class="level" style="margin-top: 35px">
              <div class="level-left"></div>
              <div class="level-right">
                <div class="level-item">
                  <button class="button is-success" @click="passes(save)">Toevoegen</button>
                </div>
                <div class="level-item">
                  <button class="button is-dark" type="button" @click="close">
                    Sluiten
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ValidationObserver>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import io from "socket.io-client";
import { notify } from "../../../logic/sockets/socketManager.js";

import ModalTitle from "../../../components/textfields/ModalTitle";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import ValidatedSelect from "../../../components/input/ValidatedSelect";
import { getMultiple, updateWithCallback } from "../../../api/apiCalls";
import { getAllMenus, getCurrentlyActive, updateCurrentlyActive, activate, deactivate } from "../../../api/routes/menus";
import store from "../../../store";
import Icon from "../../../components/general/Icon";
import dateHelper from "../../../logic/dateHelper";

export default {
  name: "Timeslot",
  components: {
    ModalTitle,
    ValidationObserver,
    ValidationProvider,
    ValidatedSelect,
    Icon,
  },
  data() {
    return {
      currentTimeslots: [],
      startTime: null,
      endTime: null,
      isAmPm: false,
      menus: [],
      menu_id: null,
      menu_id_activate: null,
    };
  },
  created() {
    this.socket = io("http://localhost:5000/");
    this.fetchData();
  },
  destroyed() {
    this.socket.close();
  },
  methods: {
    fetchData() {
      getMultiple(
        [getCurrentlyActive(store.getters.getUser.horeca_id), getAllMenus("")],
        (res) => {
          this.currentTimeslots = [];
          if (res[0].data.length != 0) {
            const tempMenu = res[0].data;
            for (let i = 0; i < tempMenu.length; i++) {
              this.currentTimeslots.push({ id: tempMenu[i].id, name: tempMenu[i].name, startTime: tempMenu[i].start_time, endTime: tempMenu[i].end_time });
            }
          }
          this.menus = res[1].data;
        },
        this
      );
    },
    activateOne() {
      const body = {
        id: this.menu_id_activate,
      };
      updateWithCallback(updateCurrentlyActive, body, this, () => {
        notify(this.socket, "menu");
        this.fetchData();
      });
    },
    save() {
      const body = {
        id: this.menu_id,
        startTime: dateHelper.formatTime(this.startTime),
        endTime: dateHelper.formatTime(this.endTime),
      };
      updateWithCallback(activate, body, this, () => {
        notify(this.socket, "menu");
        this.fetchData();
      });
    },
    removeTimeslot(id) {
      const body = {
        id: id,
      };
      updateWithCallback(deactivate, body, this, () => {
        notify(this.socket, "menu");
        this.fetchData();
      });
    },
    close() {
      this.$emit("close");
      this.$parent.close();
    },
  },
  filters: {
    convertTime(time) {
      if (time) {
        return time.substring(0, 5);
      }
      return "";
    },
  },
};
</script>

<style>
.timeslot-modal-submenu {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
}
#timeslot-menu-title {
  display: inline-block;
  width: 200px;
  text-align: center;
  border: 1px solid #34495e;
  border-radius: 5px;
  padding-top: 5px;
  padding-right: 25px;
  padding-left: 25px;
  padding-bottom: 5px;
  background: #34495e;
  font-weight: 600;
  color: white;
}
</style>
