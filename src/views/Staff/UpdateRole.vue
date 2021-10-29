<template>
  <div id="rolebox">
    <div class="box">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title is-4 has-text-black">Rol aanpassen</h1>
          </div>
        </div>
        <div class="level-right">
          <div v-if="authenticator(307)" class="level-item">
            <EditButton text="Bewerken" :isVisible="!editMode" @clicked="toggleMode" />
          </div>
          <div v-if="authenticator(308)" class="level-item">
            <DeleteButton text="Verwijderen" :isVisible="!editMode" @clicked="deleteRole" />
          </div>
        </div>
      </div>
      <hr />
      <div v-show="!editMode">
        <InfoItem title="Rol" :value="role.name" />
        <br />
        <PermissionBoxReadOnly :permissieList.sync="permissies" />
      </div>
      <ValidationObserver v-show="editMode" ref="observer" v-slot="{ passes }">
        <ValidatedInput size="is-small" rules="required" type="text" label="Naam" v-model="role.name" placeholder="..." />
        <SmallInfoText text="Geef een naam aan de rol die je wenst aan te passen." />
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
import { getById, update, deleteById } from "../../api/apiCalls";
//import { getMultiple } from "../../api/apiCalls";
import { getRole, updateRole, deleteRole } from "../../api/routes/roles";
//import { getAllPermissions } from "../../api/routes/permissions";

import { ValidationObserver } from "vee-validate";
import ValidatedInput from "../../components/input/ValidatedInput";
import SmallInfoText from "../../components/textfields/SmallInfoText";
import Submit from "../../components/forms/Submit";
import PermissionBox from "../../components/staff/PermissionBox";
import PermissionBoxReadOnly from "../../components/staff/PermissionBoxReadOnly";
import EditButton from "../../components/buttons/EditButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import InfoItem from "../../components/textfields/InfoItem";

import YesOrNoModal from "../../modals/general/YesOrNoModal";
import { showYesOrNoModal } from "../../logic/modals/modals";

export default {
  name: "UpdateRole",
  components: {
    ValidationObserver,
    ValidatedInput,
    SmallInfoText,
    EditButton,
    DeleteButton,
    InfoItem,
    Submit,
    PermissionBox,
    PermissionBoxReadOnly,
  },
  data() {
    return {
      editMode: false,

      role: {
        name: "",
        permissions: "",
      },
      permissies: [],
    };
  },
  created() {
    this.fetchData(this.$route.params.id);
  },
  methods: {
    fetchData(id) {
      getById(
        getRole,
        id,
        (res) => {
          this.role = res.data[0];
          this.permissies = JSON.parse(res.data[0].permissions);
        },
        this
      );
    },
    save() {
      this.role.permissions = JSON.stringify(this.permissies);
      update(updateRole, this.role, this, true);
    },
    cancel() {
      this.editMode = false;
    },
    toggleMode() {
      this.editMode = true;
    },
    deleteRole() {
      showYesOrNoModal(this, YesOrNoModal, (value) => {
        if (value) {
          deleteById(deleteRole, this.role.id, this, true);
        }
      });
    },
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
