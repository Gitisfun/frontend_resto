<template>
  <div class="tablesbox">
    <div class="box" style="padding: 25px">
      <TitleFour title="Tafels" btnText="Nieuwe tafel" :isVisible="authenticator(202)" @clicked="newTable" />
      <hr />
      <TableItem v-for="item in tables" :key="item.id" :table="item" @update="updateTable(item.id)" />
    </div>
  </div>
</template>

<script>
import TitleFour from "../../components/titles/TitleFour";
import TableItem from "../../components/tables/TableItem";

import { getAll } from "../../api/apiCalls";
import { getAllTables } from "../../api/routes/tables";

export default {
  name: "Tables",
  components: {
    TitleFour,
    TableItem,
  },
  data() {
    return {
      tables: [],
    };
  },
  created() {
    this.fetchData(
        getAll(getAllTables, "", (res) => { this.tables = res.data}, this)
    );
  },
  methods: {
    fetchData() {},
    newTable() {
      this.$router.push({
        name: "CreateTables",
      });
    },
    updateTable(id) {
      this.$router.push({
        name: "UpdateTables",
        params: { id: id },
      });    },
  },
};
</script>

<style>
.tablesbox {
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
  min-height: 100%;
  background: #c7ecee;
  border-radius: 5px 0px 0px 0px;
}
</style>