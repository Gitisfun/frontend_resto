<template>
  <div id="updateTablebox">
    <div class="box">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title is-4 has-text-black">Tafel</h1>
          </div>
        </div>
        <div class="level-right">
          <div v-if="authenticator(203)" class="level-item">
            <EditButton text="Bewerken" :isVisible="!editMode" @clicked="toggleMode" />
          </div>
          <div v-if="authenticator(204)" class="level-item">
            <DeleteButton text="Verwijderen" :isVisible="!editMode" @clicked="deleteTable" />
          </div>
        </div>
      </div>
      <hr />
      <div v-show="!editMode">
        <InfoItem title="Naam" :value="table.name" />
        <div class="columns">
          <div class="column">
            <InfoItem title="Minimum aantal zitplaatsen" :value="table.min" />
          </div>
          <div class="column">
            <InfoItem title="Maximum aantal zitplaatsen" :value="table.max" />
          </div>
        </div>
        <InfoItem title="Beschrijving" :value="table.description" />
      </div>
      <div v-show="editMode">
        <ValidationObserver ref="observer" v-slot="{ passes }">
          <ValidatedInput size="is-small" rules="required" type="text" label="Naam" v-model="table.name" placeholder="..." />
          <div class="columns">
            <div class="column">
              <ValidatedInput size="is-small" rules="required|positive" type="text" label="Minimum aantal zitplaatsen" v-model="table.min" placeholder="..." />
            </div>
            <div class="column">
              <ValidatedInput size="is-small" rules="positive" type="text" label="Maximum aantal zitplaatsen" v-model="table.max" placeholder="..." />
            </div>
          </div>
          <b-field label="Beschrijving">
            <b-input size="is-small" maxlength="255" type="textarea" v-model="table.description" placeholder="..."></b-input>
          </b-field>
          <br />
          <br />
          <Submit @save="passes(save)" @cancel="cancel" />
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidatedInput from "../../components/input/ValidatedInput";
import { getById, updateWithCallback, deleteById } from "../../api/apiCalls";
import { getTables, updateTables, deleteTables } from "../../api/routes/tables";
import YesOrNoModal from "../../modals/general/YesOrNoModal";
import { showYesOrNoModal } from "../../logic/modals/modals";
import Submit from "../../components/forms/Submit";
import EditButton from "../../components/buttons/EditButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import InfoItem from "../../components/textfields/InfoItem";

export default {
  name: "UpdateTables",
  components: {
    ValidationObserver,
    ValidatedInput,
    EditButton,
    DeleteButton,
    InfoItem,
    Submit,
  },
  data() {
    return {
      editMode: false,
      table: {
        id: null,
        name: null,
        description: null,
        min: null,
        max: null,
        occupy_time: null,
      },
    };
  },
  created() {
    this.fetchData(this.$route.params.id);
  },
  methods: {
    toggleMode() {
      this.editMode = true;
    },
    fetchData(id) {
      getById(
        getTables,
        id,
        (res) => {
          this.table = res.data[0];
        },
        this
      );
    },
    save() {
      updateWithCallback(updateTables, this.table, this, () => this.cancel());
    },
    deleteTable() {
      showYesOrNoModal(this, YesOrNoModal, (value) => {
        if (value) {
          deleteById(deleteTables, this.table.id, this, true);
        }
      });
    },
    cancel() {
      this.fetchData(this.$route.params.id);
      this.editMode = false;
    },
  },
};
</script>

<style>
#updateTablebox {
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
}

.formBox {
  border-radius: 5px 5px 5px 5px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;

  background-color: white;
}
</style>
