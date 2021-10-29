<template>
  <div id="customer-menucard-tab-box">
    <div v-if="menu" class="box info-box">
      <p class="customer-tab-menucard-title">Menukaart</p>
      <div class="customer-tab-submenu-box" v-for="submenu in menu.submenus" :key="submenu.id">
        <p class="customer-tab-menucard-subtitle">{{ submenu.name }}</p>
        <div style="clear: both;" id="textbox" v-for="item in submenu.items" :key="item.id">
          <p class="alignleft customer-tab-menucard-text">o {{ item.name }}</p>
          <p class="alignright customer-tab-menucard-text">€ {{ item.price }}</p>
        </div>
        <div style="clear: both;"></div>
      </div>
      <br>
      <div>
        <b-button size="is-small" type="is-primary" expanded @click="makeOder">Bestelling plaatsen</b-button>
      </div>
    </div>
    <div style="font-weight: 400; font-size: 14px" class="box" v-else>Geen menukaarten beschikbaar...</div>
  </div>
</template>

<script>
export default {
  name: "CustomerMenucardTab",
  props: {
    menu: Object,
    horeca_id: String
  },
  methods: {
    makeOder(){
      this.$router.push({
        name: "CustomerMenucard",
        params: { id: this.horeca_id },
      });
    }
  }
};
</script>

<style scoped>

#customer-menucard-tab-box {
  margin-bottom: 500px;
  padding: 0;
}

.info-box {
  border: 0.1px solid #f5f6fa;
  margin-bottom: 15px;
}

.customer-tab-menucard-title{
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 5px;
}

.customer-tab-menucard-subtitle{
  font-weight: 500;
  font-size: 14px;
}

.customer-tab-menucard-text{
  font-weight: 300;
  font-size: 14px;
}

.customer-tab-submenu-box{
  margin-bottom: 5px;
}

.alignleft {
  float: left;
}
.alignright {
  float: right;
}
</style>