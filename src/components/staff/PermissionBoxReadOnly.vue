<template>
  <div>
    <h1 class="title is-5 has-text-black" style="margin-bottom: 15px">Permissies</h1>
    <b-tabs>
      <b-tab-item :label="item.name" :icon="item.icon" v-for="item in permissies" :key="item.id">
        <p style="font-size: 17px; margin-top: 10px; margin-bottom: 15px" class="has-text-black has-text-weight-semibold">{{ item.name }}</p>
        <div v-for="permissie in item.items" :key="permissie.id" class="level" >
          <div class="level-left">
            <div style="font-size: 12px" class="level-item">{{ permissie.name }}</div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <b-checkbox size="is-small" disabled id="checkbox-margin-right" type="is-success" v-model="permissie.value"></b-checkbox>
            </div>
          </div>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>

export default {
  name: "PermissionBoxReadOnly",
  props: {
    permissieList: Array,
  },
  computed: {
    permissies: function() {
      return this.permissieList;
    },
  },
};
</script>

<style>
#checkbox-margin-right {
  margin-right: 0px;
}
</style>
