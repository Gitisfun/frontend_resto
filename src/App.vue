<template>
  <div id="app">
    <div v-if="isCustomer">
      <router-view></router-view>
    </div>
    <div v-else-if="isVisible">
      <div class="columns is-gapless">
        <div class="column">
          <div id="menusidebar" v-show="!$isMobile()">
            <Menubar style="position: fixed; width: 14%" />
          </div>
          <div style="padding: 25px" v-show="$isMobile()">
            <Menubar />
          </div>
        </div>
        <div class="column is-10">
          <div id="accountbar">
            <Accountbar />
          </div>
          <div id="mainbox">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// TODO: Mobile --> https://renatello.com/vue-js-detect-mobile/
import Menubar from "@/components/general/Menubar.vue";
import Accountbar from "@/components/general/Accountbar.vue";

export default {
  components: {
    Menubar,
    Accountbar,
  },
  computed: {
    isVisible() {
      if (this.$route.name == "Login" || this.$route.name == "PrintQrCode" || this.$route.name == "Ticket") {
        return false;
      }
      return true;
    },
    isCustomer() {
      if (this.$route.meta.group == "Customer") {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors

//$primary: rgb(2, 73, 73);
//$primary: rgba(74, 105, 189,1.0);
//$primary: rgba(10, 189, 227,1.0);
$primary: #22a6b3;
$primary-light: findLightColor($primary);
$primary-dark: findDarkColor($primary);
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);
$success: #3ae374;
$danger: red;
$warning: #feca57;
$info: #34495e;

$menu-item-color: $primary;
/*
$menu-item-hover-color: grey;
$menu-item-hover-background-color: green;
$menu-item-active-color: white;
$menu-item-active-background-color: orane;
$menu-label-color: white;
*/

// Lists and maps
$custom-colors: null !default;
$custom-shades: null !default;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: mergeColorMaps(
  (
    "white": (
      $white,
      $black,
    ),
    "black": (
      $black,
      $white,
    ),
    "light": (
      $light,
      $light-invert,
    ),
    "dark": (
      $dark,
      $dark-invert,
    ),
    "primary": (
      $primary,
      $primary-invert,
      $primary-light,
      $primary-dark,
    ),
    "link": (
      $link,
      $link-invert,
      $link-light,
      $link-dark,
    ),
    "info": (
      $info,
      $info-invert,
      $info-light,
      $info-dark,
    ),
    "success": (
      $success,
      $success-invert,
      $success-light,
      $success-dark,
    ),
    "warning": (
      $warning,
      $warning-invert,
      $warning-light,
      $warning-dark,
    ),
    "danger": (
      $danger,
      $danger-invert,
      $danger-light,
      $danger-dark,
    ),
  ),
  $custom-colors
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>

<style>
#app {
  /*position: fixed;*/
  top: 0px;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100vh;
  background-color: white;
}

#mainbox {
  position: relative;

  border-radius: 5px 0px 0px 0px;
  height: 100vh;
  /*
    background: linear-gradient(105deg, rgba(22,13,186,1) 0%, rgba(21,21,232,1) 50%, rgba(21,21,232,1) 100%);
  background-color: lightcoral;
  background-color: #318CE7;
  background-color: teal;
  background-color: rgba(10, 189, 227,1.0);

Een geheel
background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
 background-blend-mode: multiply,multiply;

  background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-image: linear-gradient(180deg, #2af598 0%, #009efd 100%);
background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
background-image: linear-gradient(to top, #f43b47 0%, #453a94 100%);
background-image: linear-gradient(to top, #0250c5 0%, #d43f8d 100%);
background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);


background-image: linear-gradient(to top, #c79081 0%, #dfa579 100%);

background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
background-image: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
background-image: linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%);
background-image: linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%);
background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
background-image: linear-gradient(to top, #ff0844 0%, #ff0844 100%);
background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
  background-image: linear-gradient(to top, #330867 0%, #330867 100%);
  
background-image: linear-gradient(to top, #f77062 0%, #fe5196 100%);
background-image: linear-gradient(to top, #c71d6f 0%, #d09693 100%);
background-image: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);

*/
  /* background-image: linear-gradient(to bottom, #81ecec 0%, #81ecec 100%); */
/* background-image: linear-gradient(to bottom, #ecf0f1 0%, #ecf0f1 100%); */
    background: #c7ecee;

  min-height: 100%;
}

#menusidebar {
  padding: 15px;
  height: 100%;
}

#accountbar {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 10px;
}
.small-margin-gap-of-5 {
  margin-bottom: 15px;
}
</style>
