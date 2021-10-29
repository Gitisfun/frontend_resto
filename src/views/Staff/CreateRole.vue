<template>
  <div id="rolebox">
    <div class="box">
      <h1 class="title is-4 has-text-black">Rol toevoegen</h1>
      <hr />
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <ValidatedInput size="is-small" rules="required" type="text" label="Naam" v-model="role.name" placeholder="..." />
        <SmallInfoText text="Geef een naam aan de rol die je wenst toe te voegen." />
        <br />
        <br />
        <PermissionBox :permissieList.sync="permissies" />
        <hr />
        <Submit @save="passes(save)" @cancel="cancel" />
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidatedInput from "../../components/input/ValidatedInput";
import SmallInfoText from "../../components/textfields/SmallInfoText";
import Submit from "../../components/forms/Submit";
import PermissionBox from "../../components/staff/PermissionBox";

import { getAll, create } from "../../api/apiCalls";
import { createRole } from "../../api/routes/roles";
import { getAllPermissions } from "../../api/routes/permissions";

export default {
  name: "CreateRole",
  components: {
    ValidationObserver,
    ValidatedInput,
    SmallInfoText,
    Submit,
    PermissionBox,
  },
  data() {
    return {
      role: {
        name: "",
        permissions: "",
      },
      permissies: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(){
      getAll(getAllPermissions, "", (res) => { this.permissies = res.data }, this)
    },
    save() {
      this.role.color = Math.floor(Math.random()*16777215).toString(16);
      this.role.permissions = JSON.stringify(this.permissies);
      create(createRole, this.role, this, true);
    },
    cancel(){
      this.$router.go(-1)
    }
  },
};
</script>

<style>
#rolebox {
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
}
</style>
