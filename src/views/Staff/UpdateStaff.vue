<template>
  <div id="updatestaffbox">
    <div class="box">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title is-4 has-text-black">Personeelslid</h1>
          </div>
        </div>
        <div class="level-right">
          <div v-if="authenticator(309)" class="level-item">
            <ExtraEditButton text="Paswoord wijzigen" :isVisible="!editMode" @clicked="navigate" />
          </div>
          <div v-if="authenticator(303)" class="level-item">
            <EditButton text="Bewerken" :isVisible="!editMode" @clicked="toggleMode" />
          </div>
          <div v-if="authenticator(304)" class="level-item">
            <DeleteButton text="Verwijderen" :isVisible="!editMode" @clicked="deleteStaff" />
          </div>
        </div>
      </div>
      <hr />
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <div v-show="!editMode">
          <div class="columns">
            <div class="column">
              <InfoItem title="Voornaam" :value="staff.firstname" />
              <InfoItem title="Geboortedatum" :value="staff.date_of_birth | dateFormatter" />
              <InfoItem title="E-mail" :value="staff.email" />
              <InfoItem title="Job" :value="staff.job" />
            </div>
            <div class="column">
              <InfoItem title="Achternaam" :value="staff.lastname" />
              <InfoItem title="In dienst sinds" :value="staff.hire_date | dateFormatter" />
              <InfoItem title="Telefoon" :value="staff.phonenumber" />
              <InfoItem title="Rol" :value="roleName" />
            </div>
          </div>
        </div>
        <div v-show="editMode">
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
              <b-field label="E-mail">
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
          <Submit @save="passes(save)" @cancel="cancel" />
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidatedInput from "../../components/input/ValidatedInput";
import ValidatedSelect from "../../components/input/ValidatedSelect";
import ExtraEditButton from "../../components/buttons/ExtraEditButton";
import EditButton from "../../components/buttons/EditButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import Submit from "../../components/forms/Submit";
import InfoItem from "../../components/textfields/InfoItem";
import moment from "moment";

import { getMultiple, updateWithCallback, deleteById } from "../../api/apiCalls";
import { getAllRoles } from "../../api/routes/roles";
import { getStaff, updateStaff, deleteStaff } from "../../api/routes/staff";

import YesOrNoModal from "../../modals/general/YesOrNoModal";
import { showYesOrNoModal } from "../../logic/modals/modals";

export default {
  name: "UpdateStaff",
  components: {
    ValidationObserver,
    ValidatedInput,
    ValidatedSelect,
    ExtraEditButton,
    EditButton,
    DeleteButton,
    InfoItem,
    Submit,
  },
  data() {
    return {
      editMode: false,
      staff: {
        firstname: null,
        lastname: null,
        image: null,
        job: null,
        hire_date: null,
        date_of_birth: null,
        email: null,
        phonenumber: null,
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
    roleName() {
      if (this.roles != [] && this.staff.role_id != null) {
        for (let i = 0; this.roles.length; i++) {
          if (this.roles[i].id === this.staff.role_id) {
            return this.roles[i].name;
          }
        }
      }
      return "";
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getMultiple(
        [getAllRoles(""), getStaff(this.$route.params.id)],
        (res) => {
          this.roles = res[0].data;
          this.staff.id = res[1].data[0].id;
          this.staff.firstname = res[1].data[0].firstname;
          this.staff.lastname = res[1].data[0].lastname;
          if (res[1].data[0].date_of_birth != null) {
            this.staff.date_of_birth = new Date(res[1].data[0].date_of_birth);
          }
          if (res[1].data[0].hire_date != null) {
            this.staff.hire_date = new Date(res[1].data[0].hire_date);
          }
          this.staff.email = res[1].data[0].email;
          this.staff.phonenumber = res[1].data[0].phonenumber;
          this.staff.job = res[1].data[0].job;
          this.staff.role_id = res[1].data[0].role_id;
          this.staff.image = res[1].data[0].image;
          //this.staff = res[1].data[0];
        },
        this
      );
    },
    toggleMode() {
      this.editMode = true;
    },
    navigate() {
      this.$router.push({
        name: "Password",
        params: { id: this.staff.id },
      });
    },
    save() {
      if (this.staff.date_of_birth != null) {
        this.staff.date_of_birth = new Date(this.staff.date_of_birth.getTime() + 86400000);
      }
      if (this.staff.hire_date != null) {
        this.staff.hire_date = new Date(this.staff.hire_date.getTime() + 86400000);
      }
      updateWithCallback(updateStaff, this.staff, this, () => this.cancel());
    },
    deleteStaff() {
      showYesOrNoModal(this, YesOrNoModal, (value) => {
        if (value) {
          deleteById(deleteStaff, this.staff.id, this, true);
        }
      });
    },
    cancel() {
      this.fetchData();
      this.editMode = false;
    },
  },
  filters: {
    dateFormatter(date) {
      if (date != null) {
        return moment(date).format("DD/MM/YYYY");
      }
    },
  },
};
</script>

<style>
#updatestaffbox {
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
}
</style>
