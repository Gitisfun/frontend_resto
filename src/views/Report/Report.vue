<template>
  <div id="reportbox">
    <div class="box">
      <!-- Header -->
      <div>
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <InfoButton style="width: 100px" text="Vorige" @clicked="previous" />
            </div>
          </div>
          <div class="level-item">
            <p id="badge-date">
              {{ currentDay | formatDate }}
            </p>
          </div>
          <div class="level-right">
            <div class="level-item"><InfoButton style="width: 100px" text="Volgende" @clicked="next" /></div>
          </div>
        </div>
        <hr />
      </div>
      <!-- Body -->
      <div id="report-print" v-if="categories.length != 0">
        <p id="report-title">Dagoverzicht</p>
        <div>
          <div v-for="cat in categories" :key="cat.id">
            <p id="report-subtitle">{{ cat.name }}</p>
            <table width="100%">
              <colgroup>
                <col span="1" style="width: 36%;" />
                <col span="1" style="width: 18%;" />
                <col span="1" style="width: 10%;" />
                <col span="1" style="width: 18%;" />
                <col span="1" style="width: 18%;" />
              </colgroup>
              <tbody>
                <tr id="report-item-box" v-for="item in cat.items" :key="item.id">
                  <td style="padding-left: 5px;">o {{ item.name }}</td>
                  <td style="text-align: right">€ {{ item.price }}</td>
                  <td style="text-align: center">x</td>
                  <td style="text-align: center">{{ item.quantity }}</td>
                  <td style="text-align: right; padding-right: 15px;">€ {{ item.total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Total -->
      <div class="level" v-if="categories.length != 0">
        <div class="level-left">
          <div class="level-item">
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <p id="report-total-box-info">Totaal:</p>
          </div>
          <div class="level-item">
            <p id="report-total-box">€ {{ calculateTotal }}</p>
          </div>
        </div>
      </div>
      <div id="report-no-data" v-if="categories.length == 0">Geen gegevens voor deze dag...</div>
    </div>
  </div>
</template>

<script>
import InfoButton from "../../components/buttons/InfoButton";
import dateHelper from "../../logic/dateHelper.js";
import logic from "../../logic/logic.js";

import { getAll } from "../../api/apiCalls";
import { getReportForPeriod } from "../../api/routes/statistics";

export default {
  name: "Report",
  components: {
    InfoButton,
  },
  created() {
    this.currentDay = dateHelper.getCurrentDay();
    this.fetchData();
  },
  data() {
    return {
      currentDay: null,
      categories: [],
    };
  },
  computed: {
    calculateTotal() {
      let total = 0;
      for (let i = 0; i < this.categories.length; i++) {
        for (let j = 0; j < this.categories[i].items.length; j++) {
          total += parseFloat(this.categories[i].items[j].total);
        }
      }
      return total.toFixed(2);
    },
  },
  methods: {
    fetchData() {
      getAll(
        getReportForPeriod,
        dateHelper.getStartAndEndOfDay(this.currentDay),
        (res) => {
          this.categories = this.convertList(res.data);
        },
        this
      );
    },
    previous() {
      let temp = dateHelper.subtractDays(this.currentDay, 1);
      this.currentDay = null;
      this.currentDay = temp;
      this.fetchData();
    },
    next() {
      let temp = dateHelper.addDays(this.currentDay, 1);
      this.currentDay = null;
      this.currentDay = temp;
      this.fetchData();
    },
    convertList(resultList) {
      let tempList = [];
      for (let i = 0; i < resultList.length; i++) {
        if (tempList.length == 0) {
          this.addItemToList(tempList, resultList[i]);
        } else {
          const index = logic.findIndexById(tempList, resultList[i].category_id);
          if (index == -1) {
            this.addItemToList(tempList, resultList[i]);
          } else {
            tempList[index].items.push({
              id: resultList[i].product_id,
              name: resultList[i].product_name,
              price: resultList[i].price,
              quantity: resultList[i].quantity,
              total: resultList[i].total,
            });
          }
        }
      }
      return tempList;
    },
    addItemToList(list, item) {
      list.push({
        id: item.category_id,
        name: item.category_name,
        items: [
          {
            id: item.product_id,
            name: item.product_name,
            price: item.price,
            quantity: item.quantity,
            total: item.total,
          },
        ],
      });
    },
  },
  filters: {
    formatDate(date) {
      if (date != null) {
        return dateHelper.formatDay(date);
      }
      return "";
    },
  },
};
</script>

<style>
#reportbox {
  padding: 25px;
}

#badge-date {
  border: 0.1px solid #130f40;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  padding-top: 5px;
  padding-right: 25px;
  padding-left: 25px;
  padding-bottom: 5px;
  background: #130f40;
  color: white;
  font-size: 17px;
  font-weight: 600;
}

#report-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 25px;
}

#report-subtitle {
  font-size: 20px;
  font-weight: 400;
  margin-top: 15px;
  margin-bottom: 5px;
}

#report-item-box {
  font-size: 16px;
  font-weight: 300;
}

#report-total-box {
  margin-top: 50px;
  border: 1px solid #2ecc71;
  border-radius: 5px;
  padding-top: 5px;
  padding-right: 25px;
  padding-left: 25px;
  padding-bottom: 5px;
  background: #2ecc71;
  font-size: 18px;
  font-weight: 600;
  color: white;
}

#report-total-box-info {
  margin-top: 50px;
  border: 1px solid black;
  border-radius: 5px;
  padding-top: 5px;
  padding-right: 25px;
  padding-left: 25px;
  padding-bottom: 5px;
  background: black;
  font-size: 18px;
  font-weight: 600;
  color: white;
}

#report-no-data {
  font-size: 22px;
  font-weight: 600;
  margin-top: 250px;
  margin-bottom: 250px;
  text-align: center;
}
</style>
