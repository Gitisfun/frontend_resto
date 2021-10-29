<template>
  <div id="createTablebox">
    <ValidationObserver ref="observer" v-slot="{ passes }">
      <div class="box">
        <h1 class="title is-4 has-text-black">Tafel toevoegen</h1>
        <hr>
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
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidatedInput from "../../components/input/ValidatedInput";
import { create } from "../../api/apiCalls";
import { createTables } from "../../api/routes/tables";
import Submit from "../../components/forms/Submit";

export default {
  name: "CreateTables",
  components: {
    ValidationObserver,
    ValidatedInput,
    Submit,
  },
  data() {
    return {
      table: {
        name: null,
        description: null,
        min: null,
        max: null,
        occupy_time: null,
      },
    };
  },
  methods: {
    save() {
      create(createTables, this.table, this, true);
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
#createTablebox {
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
