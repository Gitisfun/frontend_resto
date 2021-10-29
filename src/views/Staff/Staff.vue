<template>
  <div class="staffbox">
    <!-- 
    <h1 class="title is-2 has-text-white">Overzicht</h1>
      Default message toevoegen als er nog geen menus zijn toegevoegd 
    -->
    <div class="box">
      <b-tabs>
        <b-tab-item label="Personeel" icon="face">
          <div class="tab-context-box">
            <TitleFour :isVisible="authenticator(302)" title="Personeel" btnText="Nieuw personeelslid" @clicked="newStaff" />
            <hr />
            <StaffItem @update="updateStaff(item.id)" @remove="deleteStaff(item.id)" v-for="item in staff" :key="item.id" :name="`${item.firstname} ${item.lastname}`" :role="item.role_name" :color="item.role_color" />
          </div>
        </b-tab-item>
        <b-tab-item label="Rollen" icon="briefcase-account">
          <div class="tab-context-box">
            <TitleFour :isVisible="authenticator(306)" title="Rollen" btnText="Nieuwe rol" @clicked="newRole" />
            <hr />
            <RoleItem @update="updateRole(item.id)" @remove="deleteRole(item.id)" v-for="item in roles" :key="item.id" :name="item.name" />
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
    <!--
    <div class="box">
      <TitleFour title="Personeel" btnText="Nieuw personeelslid" @clicked="newStaff" />
      <hr />
      <StaffItem @update="updateStaff(item.id)" @remove="deleteStaff(item.id)" v-for="item in staff" :key="item.id" :name="`${item.firstname} ${item.lastname}`" :role="item.role_name" :color="item.role_color" />
    </div>
    <div class="box">
      <TitleFour title="Rollen" btnText="Nieuwe rol" @clicked="newRole" />
      <hr />
      <RoleItem @update="updateRole(item.id)" @remove="deleteRole(item.id)" v-for="item in roles" :key="item.id" :name="item.name" />
    </div>
    -->
  </div>
</template>

<script>
import TitleFour from "../../components/titles/TitleFour";
import RoleItem from "../../components/staff/RoleItem";
import StaffItem from "../../components/staff/StaffItem";

import { getMultiple, deleteById } from "../../api/apiCalls";
import { getAllRoles, deleteRole } from "../../api/routes/roles";
import { getAllStaff } from "../../api/routes/staff";

import YesOrNoModal from "../../modals/general/YesOrNoModal";
import { showYesOrNoModal } from "../../logic/modals/modals";

export default {
  name: "Staff",
  components: {
    TitleFour,
    RoleItem,
    StaffItem,
  },
  data() {
    return {
      roles: [],
      staff: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getMultiple(
        [getAllRoles(""), getAllStaff("")],
        (res) => {
          this.roles = res[0].data;
          this.staff = res[1].data;
        },
        this
      );
    },
    newStaff() {
      this.$router.push({
        name: "CreateStaff",
      });
    },
    updateStaff(id) {
      this.$router.push({
        name: "UpdateStaff",
        params: { id: id },
      });
    },
    newRole() {
      this.$router.push({
        name: "CreateRole",
      });
    },
    updateRole(id) {
      this.$router.push({
        name: "UpdateRole",
        params: { id: id },
      });
    },
    deleteRole(id) {
      showYesOrNoModal(this, YesOrNoModal, (value) => {
        if (value) {
          deleteById(deleteRole, id, this, false);
        }
      });
    },
  },
};
</script>

<style>
.staffbox {
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
  min-height: 100%;
  background: #c7ecee;
  border-radius: 5px 0px 0px 0px;
}

.tab-context-box {
  margin-top: 15px;
}
</style>
