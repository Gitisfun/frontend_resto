<template>
  <div class="tab-context-box">
    <ValidationObserver ref="observer" v-slot="{ passes }">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title is-4 has-text-black">Openingsuren</h1>
          </div>
        </div>
        <div class="level-right">
          <div v-if="authenticator(102)" class="level-item">
            <EditButton text="Bewerken" :isVisible="!editMode" @clicked="toggleMode" />
          </div>
        </div>
      </div>
      <hr />
      <OpeninghourHeader />
      <div v-show="!editMode">
        <OpeninghourInfoRow v-for="item in opening_hours.timetable" :key="item.id" :opening_day="item" />
      </div>
      <div v-show="editMode">
        <OpeninghourRow v-for="item in opening_hours.timetable" :key="item.id" :opening_day="item" />
        <br />
        <br />
        <Submit @save="passes(save)" @cancel="cancel" />
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import OpeninghourHeader from "../../components/details/OpeninghourHeader";
import OpeninghourInfoRow from "../../components/details/OpeninghourInfoRow";
import OpeninghourRow from "../../components/details/OpeninghourRow";
import EditButton from "../../components/buttons/EditButton";
import Submit from "../../components/forms/Submit";

import { getById, updateWithCallback } from "../../api/apiCalls";
import { getTimetable, updateTimetable } from "../../api/routes/timetable";

import store from "../../store";

export default {
  name: "OpeninghoursTab",
  components: {
    ValidationObserver,
    OpeninghourHeader,
    OpeninghourInfoRow,
    OpeninghourRow,
    EditButton,
    Submit,
  },
  data() {
    return {
      editMode: false,
      opening_hours: {
        id: 0,
        timetable: [
          {
            id: 1,
            day: "Maandag",
            open_at: null,
            closed_at: null,
            start_break: null,
            end_break: null,
            isOpen: true,
          },
          {
            id: 2,
            day: "Dinsdag",
            open_at: null,
            closed_at: null,
            start_break: null,
            end_break: null,
            isOpen: true,
          },
          {
            id: 3,
            day: "Woensdag",
            open_at: null,
            closed_at: null,
            start_break: null,
            end_break: null,
            isOpen: true,
          },
          {
            id: 4,
            day: "Donderdag",
            open_at: null,
            closed_at: null,
            start_break: null,
            end_break: null,
            isOpen: true,
          },
          {
            id: 5,
            day: "Vrijdag",
            open_at: null,
            closed_at: null,
            start_break: null,
            end_break: null,
            isOpen: true,
          },
          {
            id: 6,
            day: "Zaterdag",
            open_at: null,
            closed_at: null,
            start_break: null,
            end_break: null,
            isOpen: true,
          },
          {
            id: 7,
            day: "Zondag",
            open_at: null,
            closed_at: null,
            start_break: null,
            end_break: null,
            isOpen: true,
          },
        ],
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getById(
        getTimetable,
        store.getters.getUser.horeca_id,
        (res) => {
          let temp = {
            id: res.data[0].id,
            timetable: JSON.parse(res.data[0].timetable),
          };

          for (let i = 0; i < temp.timetable.length; i++) {
            if (temp.timetable[i].open_at != null) {
              temp.timetable[i].open_at = new Date(temp.timetable[i].open_at);
            }
            if (temp.timetable[i].closed_at != null) {
              temp.timetable[i].closed_at = new Date(temp.timetable[i].closed_at);
            }
            if (temp.timetable[i].start_break != null) {
              temp.timetable[i].start_break = new Date(temp.timetable[i].start_break);
            }
            if (temp.timetable[i].end_break != null) {
              temp.timetable[i].end_break = new Date(temp.timetable[i].end_break);
            }
          }
          this.opening_hours = temp;
        },
        this
      );
    },
    toggleMode() {
      this.editMode = true;
    },
    save() {
      let temp = {
        id: this.opening_hours.id,
        timetable: JSON.stringify(this.opening_hours.timetable),
      };
      updateWithCallback(updateTimetable, temp, this, () => this.cancel());
    },
    cancel() {
      this.fetchData();
      this.editMode = false;
    },
  },
};
</script>

<style></style>
