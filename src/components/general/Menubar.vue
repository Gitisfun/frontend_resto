<template>
<!-- TODO: change style here -->
  <b-menu activable>
    <b-menu-list>
      <div v-for="item in menuItems" :key="item.id">
        <div @click="itemClicked()">
          <!-- v-if="authenticator(item.code)" -->
          <b-menu-item 
            :active.sync="item.isActive"
            :icon="item.icon"
            :label="item.name"
            tag="router-link"
            :to="item.route"
          ></b-menu-item>
        </div>
      </div>
    </b-menu-list>
  </b-menu>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Menubar",
  data() {
    return {
      currentActiveGroup: null,
      lastActiveGroup: null,
      isActive: true,
      menuItems: [],
    };
  },
  computed: mapGetters(["allMenuItems", "currentMenuItem"]),
  created() {
    this.menuItems = this.allMenuItems;
    for (let i = 0; i < this.menuItems.length; i++) {
      if (this.$route.meta.group == this.menuItems[i].group) {
        this.menuItems[i].isActive = true;
        this.currentActiveGroup = this.menuItems[i].group;
      }
    }
  },
  methods: {
    ...mapActions(["switchMenuItem"]),
    itemClicked() {
      if (this.$route.meta.group != this.currentActiveGroup) {
        for (let i = 0; i < this.menuItems.length; i++) {
          if (this.$route.meta.group == this.menuItems[i].group) {
            this.lastActiveGroup = this.currentActiveGroup;
            this.currentActiveGroup = this.menuItems[i].group;
            this.menuItems[
              this.findById(this.lastActiveGroup)
            ].isActive = false;
            this.menuItems[i].isActive = true;
          }
          if (this.$route.name == this.menuItems[i].name) {
            this.switchMenuItem(this.menuItems[i]);
          }
        }
      }
    },
    findById(group) {
      for (let i = 0; i < this.menuItems.length; i++) {
        if (this.menuItems[i].group == group) {
          return i;
        }
      }
      return 0;
    },
  },
};
</script>