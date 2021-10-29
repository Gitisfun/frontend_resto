<template>
  <div id="settingsbox">
    <div class="box">
      <b>Mijn instellingen</b>
      <hr />
      <div class="box settings-item-box">
        <b-field>
          <b-switch v-model="isModern" :true-value="1" :false-value="0" :rounded="false" size="is-small">Bestellingen worden via het scherm "Bestellingen" afgehandeld</b-switch>
        </b-field>
        <p style="font-size: 10px; color: orange">Bij het uitzetten van deze functie kan je nog altijd een overzicht van alle bestellingen zien</p>
      </div>
      <div class="box settings-item-box">
        <b-field>
          <b-switch v-model="isPrinted" :true-value="1" :false-value="0" :rounded="false" size="is-small">Bestellingen worden rechtstreeks naar de keuken afgeprint</b-switch>
        </b-field>
        <p style="font-size: 10px; color: orange">Bestellingen zullen rechstreeks naar de keuken worden gestuurd en zullen hier automatisch worden uitgeprint</p>
      </div>
      <br />
      <div class="levels">
        <div class="level-right">
          <div class="level-item">
            <SaveButton style="width: 125px;" text="Opslaan" @clicked="save" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getById, updateWithCallback } from "../../api/apiCalls";
import { getSetting, updateSetting } from "../../api/routes/settings";
import store from "../../store";
import SaveButton from "../../components/buttons/SaveButton";

export default {
  name: "Settings",
  components: {
    SaveButton,
  },
  data() {
    return {
      horeca_id: null,
      isModern: null,
      isPrinted: null,
    };
  },
  created() {
    this.horeca_id = store.getters.getUser.horeca_id;
    this.fetchData();
  },
  methods: {
    fetchData() {
      getById(
        getSetting,
        this.horeca_id,
        (res) => {
          this.isModern = res.data[0].isModern;
          this.isPrinted = res.data[0].isPrinted;
        },
        this
      );
    },
    save() {
      const settings = {
        id: this.horeca_id,
        isModern: this.isModern,
        isPrinted: this.isPrinted,
      };
      updateWithCallback(updateSetting, settings, this, () => this.fetchData());
    },
  },
};
</script>

<style>
.settings-item-box {
  border: 0.1px solid #f5f6fa;
}

#settingsbox {
  padding: 25px;
}
</style>
