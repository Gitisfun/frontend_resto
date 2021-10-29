<template>
  <div class="tab-context-box">
    <ValidationObserver ref="observer" v-slot="{ passes }">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title is-4 has-text-black">Adres</h1>
          </div>
        </div>
        <div class="level-right">
          <div v-if="authenticator(102)" class="level-item">
            <EditButton text="Bewerken" :isVisible="!editMode" @clicked="toggleMode" />
          </div>
        </div>
      </div>
      <hr />
      <div v-show="!editMode">
        <div style="margin-bottom: -25px" class="columns">
          <div class="column is-6">
            <InfoItem title="Straat" :value="address.street" />
          </div>
          <div class="column is-3">
            <InfoItem title="Huisnummer" :value="address.number" />
          </div>
          <div class="column is-3">
            <InfoItem title="Bus" :value="address.bus" />
          </div>
        </div>
        <div style="margin-bottom: -25px" class="columns">
          <div class="column">
            <InfoItem title="Postcode" :value="address.postal_code" />
          </div>
          <div class="column">
            <InfoItem title="Gemeente" :value="address.county" />
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <InfoItem title="Provincie" :value="address.province" />
          </div>
          <div class="column">
            <InfoItem title="Land" :value="address.country" />
          </div>
        </div>
      </div>
      <div v-show="editMode">
        <div style="margin-bottom: -25px" class="columns">
          <div class="column is-6">
            <ValidatedInput rules="required" label="Straat" type="text" size="is-small" v-model="address.street" placeholder="Straat" />
          </div>
          <div class="column is-3">
            <ValidatedInput rules="required" label="Huisnummer" type="text" size="is-small" v-model="address.number" placeholder="Huisnummer" />
          </div>
          <div class="column is-3">
            <b-field label="Bus">
              <b-input v-model="address.bus" placeholder="..." size="is-small"> </b-input>
            </b-field>
          </div>
        </div>
        <div style="margin-bottom: -25px" class="columns">
          <div class="column">
            <ValidatedInput rules="required" label="Postcode" type="text" size="is-small" v-model="address.postal_code" placeholder="Postcode" />
          </div>
          <div class="column">
            <ValidatedInput rules="required" label="Gemeente" type="text" size="is-small" v-model="address.county" placeholder="Gemeente" />
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <ValidatedInput rules="required" label="Provincie" type="text" size="is-small" v-model="address.province" placeholder="Provincie" />
          </div>
          <div class="column">
            <ValidatedInput rules="required" label="Land" type="text" size="is-small" v-model="address.country" placeholder="Land" />
          </div>
        </div>
        <Submit @save="passes(save)" @cancel="cancel" />
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidatedInput from "../../components/input/ValidatedInput";
import EditButton from "../../components/buttons/EditButton";
import InfoItem from "../../components/textfields/InfoItem";
import Submit from "../../components/forms/Submit";

import { getById, updateWithCallback } from "../../api/apiCalls";
import { getAddress, updateAddress } from "../../api/routes/address";

import store from "../../store";

export default {
  name: "AddressTab",
  components: {
    ValidationObserver,
    ValidatedInput,
    EditButton,
    InfoItem,
    Submit,
  },
  data() {
    return {
      editMode: false,
      address: {
        street: null,
        number: null,
        bus: null,
        postal_code: null,
        county: null,
        province: null,
        country: null,
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getById(
        getAddress,
        store.getters.getUser.horeca_id,
        (res) => {
          this.address = res.data[0];
        },
        this
      );
    },
    toggleMode() {
      this.editMode = true;
    },
    save() {
      updateWithCallback(updateAddress, this.address, this, () => this.cancel());
    },
    cancel() {
      this.fetchData();
      this.editMode = false;
    },
  },
};
</script>

<style></style>
