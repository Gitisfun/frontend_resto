<template>
  <!-- Main container -->
  <nav class="level">
    <!-- Left side -->
    <div class="level-left">
      <div class="level-item">
        <b-icon :icon="currentMenuItem.icon" size="is-medium" type="is-dark"> </b-icon>
      </div>
      <div class="level-item">
        <AccountBarTitle :title="currentMenuItem.name" />
      </div>
    </div>

    <!-- Right side -->
    <div class="level-right">
      <b-dropdown aria-role="list">
        <template #trigger="{ active }">
          <b-button label="Account" type="is-primary" icon-left="account" :icon-right="active ? 'menu-up' : 'menu-down'" />
        </template>
        <b-dropdown-item @click="logout" aria-role="listitem">Logout</b-dropdown-item>
      </b-dropdown>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AccountBarTitle from "../textfields/AccountBarTitle";

export default {
  name: "Accountbar",
  components: {
    AccountBarTitle,
  },
  data() {
    return {
      currentActivePage: null,
    };
  },
  computed: mapGetters(["allMenuItems", "currentMenuItem"]),
  created() {
    this.menuItems = this.allMenuItems;
    for (let i = 0; i < this.menuItems.length; i++) {
      if (this.$route.name == this.menuItems[i].name) {
        this.switchMenuItem(this.menuItems[i]);
      }
    }
  },
  methods: {
    ...mapActions(["switchMenuItem"]),
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.go();
    },
  },
};
</script>
