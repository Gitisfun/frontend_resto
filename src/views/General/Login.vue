<template>
  <section id="loginboxbackground" class="hero is-fullheight">
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-4-widescreen">
            <div class="box">
              <div id="titleloginbox">
                <h1 class="is-size-3 has-text-centered has-text-dark has-text-weight-bold"><b-icon icon="login-variant" style="margin-right: 15px" size="is-small"></b-icon>Inloggen</h1>
              </div>
              <br />
              <div v-show="error" v-bind:class="[errorBox, errorColor]">
                <p class="has-text-white">{{ errorMessage }}</p>
              </div>
              <div v-show="!error" style="margin-bottom: 35px"></div>
              <ValidationObserver ref="observer" v-slot="{ passes }">
                <div id="fieldbox">
                  <ValidatedInput size="is-small" label="Gebruikersnaam" rules="required" type="text" placeholder="Gebruikersnaam" v-model="user.username" />
                </div>
                <div>
                  <ValidatedInput size="is-small" label="Paswoord" rules="required" type="password" placeholder="Paswoord" v-model="user.password" />
                </div>
                <br />
                <div class="buttons">
                  <SaveButton text="Login" style="width: 100%; margin-bottom: 35px" @clicked="passes(logginIn)" />
                </div>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidatedInput from "../../components/input/ValidatedInput";
import SaveButton from "../../components/buttons/SaveButton";
import { login } from "../../api/routes/login";

export default {
  name: "Login",
  components: {
    ValidationObserver,
    ValidatedInput,
    SaveButton,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      errorBox: "box",
      errorMessage: "",
      error: false,
      errorColor: "errorboxcolorred",
      delay: 0,
      isLoading: false,
      response: {},
      resError: {},
    };
  },
  methods: {
    logginIn() {
      this.isLoading = true;
      login(this.user)
        .then((res) => {
          //   this.showErrorMessage(true, res.data.msg, res.data.delay, res.data.status);
          this.isLoading = false;
          if (res.data.token) {
            this.$store.dispatch("setToken", res.data.token);
            this.$store.dispatch("setPermissions", res.data.role_permissions)
            this.$store.dispatch("setUser", res.data);
            this.$router.push({
              name: "Dashboard",
            });
          } else {
            this.errorMessage = res.data.msg;
            this.error = true
          }
        })
        .catch((err) => {
          this.resError = err;
          this.isLoading = false;
          //this.showErrorMessage(true, 0, "Something on the server went wrong, try again later!", false);
        });
    },
  },
};
</script>

<style scoped>
#loginboxbackground {
  background-image: linear-gradient(to left, #81ecec 0%, #00cec9 100%);
  height: 100%;
}
#titleloginbox {
  margin-bottom: 0px;
}
#fieldbox {
  margin-bottom: 15px;
}
#loginbtnbox {
  margin-top: 25px;
}
.errorboxcolorred {
  background-color: red;
}
.errorboxcolorgreen {
  background-color: green;
}
</style>
