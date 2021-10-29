<template>
  <div id="staffbox">
    <div class="box">
      <h1 class="title is-4 has-text-black">Personeelslid toevoegen</h1>
      <hr />
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <div class="columns">
          <div class="column">
            <ValidatedInput rules="required" type="text" label="Voornaam" size="is-small" v-model="staff.firstname" placeholder="..." />
            <b-field label="Geboortedatum" grouped>
              <b-datepicker locale="nl-NL" v-model="staff.date_of_birth" :mobile-native="false">
                <template v-slot:trigger>
                  <b-button size="is-small" icon-left="calendar-today" type="is-primary" />
                </template>
              </b-datepicker>
              <b-input size="is-small" expanded readonly :value="dateOfBirthString" />
            </b-field>
            <b-field label="Email">
              <b-input v-model="staff.email" placeholder="..." size="is-small"> </b-input>
            </b-field>
            <ValidatedInput rules="required" type="text" label="Job" size="is-small" v-model="staff.job" placeholder="..." />
          </div>
          <div class="column">
            <ValidatedInput rules="required" type="text" label="Achternaam" size="is-small" v-model="staff.lastname" placeholder="..." />
            <b-field label="In dienst sinds" grouped>
              <b-datepicker locale="nl-NL" v-model="staff.hire_date" :mobile-native="false">
                <template v-slot:trigger>
                  <b-button size="is-small" icon-left="calendar-today" type="is-primary" />
                </template>
              </b-datepicker>
              <b-input size="is-small" expanded readonly :value="hireDateString" />
            </b-field>
            <b-field label="Telefoon">
              <b-input v-model="staff.phonenumber" placeholder="..." size="is-small"> </b-input>
            </b-field>
            <ValidatedSelect rules="required" label="Rol" size="is-small" v-model="staff.role_id" placeholder="...">
              <option v-for="role in roles" :value="role.id" :key="role.id">
                {{ role.name }}
              </option>
            </ValidatedSelect>
          </div>
        </div>
        <hr />
            <ValidatedInput rules="required" type="text" label="Gebruikersnaam" size="is-small" v-model="staff.username" placeholder="..." />
        <div class="columns">
          <div class="column">
            <ValidatedInput vid="confirmation" rules="required" type="password" label="Paswoord" size="is-small" v-model="staff.password" placeholder="..." />
          </div>
          <div class="column">
            <ValidatedInput rules="required|confirmed:confirmation" type="password" label="Paswoord bevestigen" size="is-small" v-model="passwordCheck" placeholder="..." />
          </div>
        </div>
        <hr />
        <Submit @save="passes(save)" @cancel="cancel" />
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidatedSelect from "../../components/input/ValidatedSelect";
import ValidatedInput from "../../components/input/ValidatedInput";
import Submit from "../../components/forms/Submit";
import moment from "moment";

import { getAll, create } from "../../api/apiCalls";
import { getAllRoles } from "../../api/routes/roles";
import { createStaff } from "../../api/routes/staff";

export default {
  name: "CreateStaff",
  components: {
    ValidationObserver,
    ValidatedInput,
    ValidatedSelect,
    Submit,
  },
  data() {
    return {
      passwordCheck: null,
      staff: {
        firstname: null,
        lastname: null,
        image: null,
        job: null,
        hire_date: null,
        date_of_birth: null,
        email: null,
        phonenumber: null,
        username: null,
        password: null,
        role_id: null,
      },
      roles: [],
    };
  },
  computed: {
    dateOfBirthString() {
      return this.staff.date_of_birth ? moment(this.staff.date_of_birth).format("DD/MM/YYYY") : "";
    },
    hireDateString() {
      return this.staff.hire_date ? moment(this.staff.hire_date).format("DD/MM/YYYY") : "";
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAll(getAllRoles, "", (res) => (this.roles = res.data), this);
    },
    save() {
      if (this.staff.date_of_birth != null) {
        this.staff.date_of_birth = new Date(this.staff.date_of_birth.getTime() + 86400000);
      }
      if (this.staff.hire_date != null) {
        this.staff.hire_date = new Date(this.staff.hire_date.getTime() + 86400000);
      }
      create(createStaff, this.staff, this, true);
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
#staffbox {
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
}
</style>
