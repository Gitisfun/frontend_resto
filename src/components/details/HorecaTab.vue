<template>
  <div class="tab-context-box">
    <ValidationObserver ref="observer" v-slot="{ passes }">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title is-4 has-text-black">Algemeen</h1>
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
            <InfoItem title="Naam van de horecazaak" :value="horecaInfo.name" />
            <InfoItem title="Soort zaak" :value="horecaInfo.type" />
          </div>
          <div class="column">
            <InfoItem title="Eigenaar" :value="horecaInfo.owner" />
            <InfoItem title="Keuken" :value="horecaInfo.kitchen" />
          </div>
        </div>
        <InfoItem title="Beschrijving" :value="horecaInfo.description" />
      </div>
      <div v-show="editMode">
        <div class="columns">
          <div class="column">
            <ValidatedInput rules="required" type="text" label="Naam van de horecazaak" size="is-small" v-model="horecaInfo.name" placeholder="..." />
            <b-field label="Soort zaak">
              <b-autocomplete v-model="horecaInfo.type" size="is-small" placeholder="Restaurant, café, brasserie, pizzeria, bar, ..." open-on-focus :data="filteredType" field="name" @select="(type) => (selected = type)" clearable> </b-autocomplete>
            </b-field>
          </div>
          <div class="column">
            <ValidatedInput rules="required" type="text" label="Eigenaar" size="is-small" v-model="horecaInfo.owner" placeholder="..." />
            <b-field label="Keuken">
              <b-autocomplete v-model="horecaInfo.kitchen" size="is-small" placeholder="Belgisch, Italiaans, Grieks, Aziatisch, ..." open-on-focus :data="filteredKitchen" field="name" @select="(type) => (selected = type)" clearable> </b-autocomplete>
            </b-field>
          </div>
        </div>
        <b-field label="Beschrijving">
          <b-input size="is-small" maxlength="255" type="textarea" v-model="horecaInfo.description" placeholder="..."></b-input>
        </b-field>
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
import { getHoreca, updateHoreca } from "../../api/routes/horeca";

import store from "../../store";

export default {
  name: "HorecaTab",
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
      horecaInfo: {
        id: null,
        name: null,
        description: null,
        owner: null,
        type: "",
        kitchen: "",
        pay_in_advance: false,
      },
      type: [
        {
          id: 1,
          name: "Restaurant",
        },
        {
          id: 2,
          name: "Café",
        },
        {
          id: 3,
          name: "Brasserie",
        },
        {
          id: 4,
          name: "Bar",
        },
        {
          id: 5,
          name: "Taverne",
        },
        {
          id: 6,
          name: "Bistro",
        },
        {
          id: 7,
          name: "Pizzeria",
        },
        {
          id: 8,
          name: "Cafetaria",
        },
        {
          id: 9,
          name: "Koffiehuis",
        },
        {
          id: 10,
          name: "Fastfood",
        },
        {
          id: 11,
          name: "Buffet",
        },
        {
          id: 12,
          name: "Vette lepel",
        },
        {
          id: 13,
          name: "Pub",
        },
        {
          id: 14,
          name: "Andere",
        },
      ],
      kitchen: [
        {
          id: 1,
          name: "Belgisch",
        },
        {
          id: 2,
          name: "Italiaans",
        },
        {
          id: 3,
          name: "Frans",
        },
        {
          id: 4,
          name: "Fastfood",
        },
        {
          id: 5,
          name: "Aziatisch",
        },
        {
          id: 6,
          name: "Chinees",
        },
        {
          id: 7,
          name: "Japans",
        },
        {
          id: 8,
          name: "Vietnamees",
        },
        {
          id: 9,
          name: "Grieks",
        },
        {
          id: 10,
          name: "Marokkaans",
        },
        {
          id: 11,
          name: "Arabisch",
        },
        {
          id: 12,
          name: "Amerikaans",
        },
        {
          id: 13,
          name: "Iraans",
        },
        {
          id: 14,
          name: "Turks",
        },
        {
          id: 15,
          name: "Thais",
        },
        {
          id: 16,
          name: "Indonesisch",
        },
        {
          id: 17,
          name: "Andere",
        },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    filteredType() {
      let temp = "";
      if (this.horecaInfo.type != null) {
        temp = this.horecaInfo.type;
      }
      return this.type.filter((option) => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(temp.toLowerCase()) >= 0
        );
      });
    },
    filteredKitchen() {
      let temp = "";
      if (this.horecaInfo.kitchen != null) {
        temp = this.horecaInfo.kitchen;
      }
      return this.kitchen.filter((option) => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(temp.toLowerCase()) >= 0
        );
      });
    },
  },
  methods: {
    fetchData() {
      getById(
        getHoreca,
        store.getters.getUser.horeca_id,
        (res) => {
          this.horecaInfo = res.data[0];
        },
        this
      );
    },
    toggleMode() {
      this.editMode = true;
    },
    save() {
      updateWithCallback(updateHoreca, this.horecaInfo, this, () => this.cancel());
    },
    cancel() {
      this.fetchData();
      this.editMode = false;
    },
  },
};
</script>

<style></style>
