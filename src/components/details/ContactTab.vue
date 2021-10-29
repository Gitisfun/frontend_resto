<template>
  <div class="tab-context-box">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h1 class="title is-4 has-text-black">Contactgegevens</h1>
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
      <div class="columns">
        <div class="column">
          <InfoItem title="Website" :value="contact.website" />
          <InfoItem title="Telefoon" :value="contact.phonenumber" />
          <InfoItem title="Fax" :value="contact.fax" />
        </div>
        <div class="column">
          <InfoItem title="E-mail" :value="contact.email" />
          <InfoItem title="GSM" :value="contact.gsm" />
        </div>
      </div>
    </div>
    <div v-show="editMode">
      <div class="columns">
        <div class="column">
          <b-field label="Website">
            <b-input v-model="contact.website" placeholder="..." size="is-small"> </b-input>
          </b-field>
          <b-field label="Telefoon">
            <b-input v-model="contact.phonenumber" placeholder="..." size="is-small"> </b-input>
          </b-field>
          <b-field label="Fax">
            <b-input v-model="contact.fax" placeholder="..." size="is-small"> </b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="E-mail">
            <b-input v-model="contact.email" placeholder="..." size="is-small"> </b-input>
          </b-field>
          <b-field label="GSM">
            <b-input v-model="contact.gsm" placeholder="..." size="is-small"> </b-input>
          </b-field>
        </div>
      </div>
      <Submit @save="save" @cancel="cancel" />
    </div>
  </div>
</template>

<script>
import EditButton from "../../components/buttons/EditButton";
import InfoItem from "../../components/textfields/InfoItem";
import Submit from "../../components/forms/Submit";

import { getById, updateWithCallback } from "../../api/apiCalls";
import { getContact, updateContact } from "../../api/routes/contactinfo";
import store from "../../store";

export default {
  name: "ContactTab",
  components: {
    EditButton,
    InfoItem,
    Submit,
  },
  data() {
    return {
      editMode: false,
      contact: {
        website: null,
        email: null,
        phonenumber: null,
        gsm: null,
        fax: null,
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getById(
        getContact,
        store.getters.getUser.horeca_id,
        (res) => {
          this.contact = res.data[0];
        },
        this
      );
    },
    toggleMode() {
      this.editMode = true;
    },
    save() {
      updateWithCallback(updateContact, this.contact, this, () => this.cancel());
    },
    cancel() {
      this.fetchData();
      this.editMode = false;
    },
  },
};
</script>
