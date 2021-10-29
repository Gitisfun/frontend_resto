<template>
  <div id="categorie" class="box">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p style="font-weight: 600">{{ categorie.name }}</p>
        </div>
      </div>
      <div class="level-right">
        <div v-if="authenticator(507)" class="level-item">
          <SmallEditButton style="margin-right: 15px" text="Bewerken" @clicked="updateCategory" />
        </div>
        <div v-if="authenticator(508)" class="level-item">
          <SmallDeleteButton text="Verwijderen" @clicked="deleteCategory" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpdateCategoryModal from "../../modals/products/UpdateCategoryModal"
import YesOrNoModal from "../../modals/general/YesOrNoModal"
import {showUpdateModal, showYesOrNoModal } from "../../logic/modals/modals"
import {updateCategories, deleteCategories} from "../../api/routes/categories";
import {update, deleteById} from "../../api/apiCalls";

import SmallEditButton from "../buttons/SmallEditButton"
import SmallDeleteButton from "../buttons/SmallDeleteButton"

export default {
  name: "Category",
  props: {
    categorie: Object,
  },
  components: {
    SmallEditButton,
    SmallDeleteButton
  },
  methods: {
    updateCategory() {
      showUpdateModal(this, UpdateCategoryModal, this.categorie, (value) => { update(updateCategories, value, this, false) })
    },
    deleteCategory() {
      showYesOrNoModal(this, YesOrNoModal, (value) => { if(value){ deleteById(deleteCategories, this.categorie.id, this, false) }})
    },
  },
};
</script>

<style>
#categorie {
  border: 0.1px solid #f5f6fa;
  margin-bottom: 15px;
}
</style>