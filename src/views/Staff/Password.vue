<template>
  <div id="passwordbox">
    <div class="box">
      <h1 class="title is-4 has-text-black">Wachtwoord wijzigen</h1>
      <hr />
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <div class="columns">
          <div class="column">
            <ValidatedInput vid="confirmation" rules="required" type="password" label="Nieuw wachwoord" size="is-small" v-model="staff.password" placeholder="..." />
          </div>
          <div class="column">
            <ValidatedInput rules="required|confirmed:confirmation" type="password" label="Wachtwoord bevestigen" size="is-small" v-model="passwordCheck" placeholder="..." />
          </div>
        </div>
        <br />
        <Submit @save="passes(save)" @cancel="cancel" />
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidatedInput from "../../components/input/ValidatedInput";
import Submit from "../../components/forms/Submit";

import { update } from "../../api/apiCalls";
import { updatePassword } from "../../api/routes/staff";

export default {
  name: "Password",
  components: {
    ValidationObserver,
    ValidatedInput,
    Submit,
  },
  data() {
    return {
      passwordCheck: null,
      staff: {
        id: null,
        password: null,
      },
    };
  },
  created() {
    this.staff.id = this.$route.params.id;
  },
  methods: {
    save() {
      update(updatePassword, this.staff, this, true);
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
#passwordbox {
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
}
</style>
