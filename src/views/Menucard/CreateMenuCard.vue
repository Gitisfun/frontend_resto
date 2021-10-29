<template>
  <div id="menukaartcreatebox">
    <div id="nieuwmenubox" v-show="menu.name != ''">
      <MenuTitle @addSubmenu="addSubmenuItem" @editMenuTitle="editMenuTitle" @saveMenu="saveMenu" :title="menu.name" />
      <hr style="margin-top: -15px" />

      <div v-for="submenu in menu.submenus" :key="submenu.id">
        <MenuSubItem @addMenuItem="addMenuItem(submenu)" @editSubMenuItem="editSubMenuItem(submenu.id)" @removeSubmenu="removeSubmenu(submenu.id)" :title="submenu.name" :id="submenu.id" />
        <MenuItem @editMenuitem="editMenuitem(item.id, submenu)" @removeMenuItem="removeMenuItem(submenu, item.id)" v-for="item in submenu.items" :key="item.id" :title="item.name" :price="item.price" />
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import MenuTitle from "../../components/menu/MenuTitle";
import MenuSubItem from "../../components/menu/MenuSubItem";
import MenuItem from "../../components/menu/MenuItem";

import MenuTitleModal from "../../modals/menu/MenuTitleModal.vue";
import AddSubmenuModal from "../../modals/menu/addSubmenu/AddSubmenuModal.vue";
import AddMenuItemModal from "../../modals/menu/addMenuItem/AddMenuItemModal";
import { showMenuTitleModal, showAddSubmenuModal, showAddMenuItemModal } from "../../logic/modals/modals";

import logic from "../../logic/logic.js";

import { createMulitpleMenu } from "../../api/apiCalls";
import { createMenu } from "../../api/routes/menus";
import { createMenuItems } from "../../api/routes/menuItems";

import menu from "../../logic/menu.js";

export default {
  name: "CreateMenuCard",
  components: {
    MenuTitle,
    MenuSubItem,
    MenuItem,
  },
  data() {
    return {
      times: 1,
      menu: {
        itemCount: 1,
        name: "",
        submenus: [],
        currentlyActive: false,
      },
    };
  },
  created() {
    showMenuTitleModal(this, MenuTitleModal, "Geef een naam aan het menu", 1, this.menu, (value) => {
      this.menu.name = value;
    });
  },
  methods: {
    // Menu title
    editMenuTitle() {
      showMenuTitleModal(this, MenuTitleModal, "Naam van menu wijzigen", 0, this.menu, (value) => {
        this.menu.name = value;
      });
    },
    // Submenu
    addSubmenuItem() {
      showAddSubmenuModal(this, AddSubmenuModal, "Submenu toevoegen", this.menu, (value) => {
        this.menu.submenus.push({ id: this.menu.itemCount, name: value, items: [] });
        this.menu.itemCount += 1;
      });
    },
    editSubMenuItem(id) {
      showAddSubmenuModal(this, AddSubmenuModal, "Submenu wijzigen", this.menu, (value) => {
        const index = logic.findIndexById(this.menu.submenus, id);
        if (index >= 0) {
          this.menu.submenus[index].name = value;
        }
      });
    },
    removeSubmenu(id) {
      this.menu.submenus = logic.removeItemById(this.menu.submenus, id);
    },
    // Menu item
    addMenuItem(submenu) {
      showAddMenuItemModal(this, AddMenuItemModal, "Product toevoegen", submenu, (value) => {
        submenu.items.push({ id: this.menu.itemCount, product_id: value.id, name: value.name, description: value.description, price: value.price });
        this.menu.itemCount += 1;
      });
    },
    editMenuitem(menuItemId, submenu) {
      showAddMenuItemModal(this, AddMenuItemModal, "Product wijzigen", submenu, (value) => {
        const index = logic.findIndexById(submenu.items, menuItemId);
        if (index >= 0) {
          submenu.items[index].product_id = value.id;
          submenu.items[index].name = value.name;
          submenu.items[index].description = value.description;
          submenu.items[index].price = value.price;
        }
      });
    },
    removeMenuItem(submenu, id) {
      const index = logic.findIndexById(this.menu.submenus, submenu.id);
      if (index >= 0) {
        this.menu.submenus[index].items = logic.removeItemById(submenu.items, id);
      }
    },
    saveMenu() {
      if (this.menu.submenus.length == 0) {
        console.log("fout");
      } else if (this.menu.submenus[0].items.length == 0) {
        console.log("fout 2");
      } else {
        this.menu = menu.convertToBackend(this.menu);
        createMulitpleMenu(createMenu, this.menu, createMenuItems, this);
      }
    },
  },
};
</script>

<style>
#menukaartcreatebox {
  min-height: 100%;
  background: #c7ecee;
  border-radius: 5px 0px 0px 0px;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
}

#nieuwmenubox {
  border-radius: 5px 5px 5px 5px;
  padding-top: 15px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
  background: white;
}
</style>
