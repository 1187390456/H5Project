<template>
  <div class="">
    <van-picker
      ref="birthPicker"
      show-toolbar
      title="Select Date"
      :columns="birthColumns"
      confirm-button-text="Confirm"
      cancel-button-text="Cancel"
      @cancel="cancleBtn"
      @confirm="onConfirmBirth"
    />
  </div>
</template>

<script>
import { regFormatDate, daysInMonth } from "../../utils/date";

export default {
  name: "",
  mixins: [],
  components: {},
  props: {
    from: {
      type: String,
    },
  },
  data() {
    return {};
  },
  computed: {
    todayArr() {
      let formatStr = regFormatDate(new Date(), "YYYY-MM-DD");
      let todayArr = formatStr.split("-");
      todayArr = todayArr.map((item) =>
        item.charAt(0) == "0" ? Number(item.slice(1)) : Number(item)
      );
      return todayArr;
    },

    yearArr() {
      let yearArr = [];
      for (let i = 1923; i <= this.todayArr[0]; i++) {
        yearArr.push({ value: i, label: i, children: [] });
      }
      return yearArr;
    },

    monthArr() {
      return (year) => {
        let monthArr = [];
        let month = year == this.todayArr[0] ? this.todayArr[1] : 12;
        for (let j = 1; j <= month; j++) {
          monthArr.push({ value: j, label: j, children: [] });
        }
        return monthArr;
      };
    },

    dayArr() {
      return ([year, month]) => {
        let dayArr = [];
        let days = daysInMonth(year, month);
        days =
          year == this.todayArr[0] && month == this.todayArr[1]
            ? this.todayArr[2]
            : days;
        for (let k = 1; k <= days; k++) {
          dayArr.push({ value: k, label: k, leaf: true });
        }
        return dayArr;
      };
    },

    birthColumns() {
      let yearArr = [];
      for (let i = 1923; i <= this.todayArr[0]; i++) {
        let monthArr = [];
        let month = i == this.todayArr[0] ? this.todayArr[1] : 12;
        for (let j = 1; j <= month; j++) {
          let dayArr = [];
          let days = daysInMonth(i, j);
          days =
            i == this.todayArr[0] && j == this.todayArr[1]
              ? this.todayArr[2]
              : days;
          for (let k = 1; k <= days; k++) {
            dayArr.push({ id: k, text: k > 9 ? "" + k : "0" + k, leaf: true });
          }
          monthArr.push({
            id: j,
            text: j > 9 ? "" + j : "0" + j,
            children: dayArr,
          });
        }
        yearArr.push({ id: i, text: i, children: monthArr });
      }
      return yearArr;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleBirthClick(str = "2000-01-01") {
      const startBirth = [1923, 1, 1];
      let arr = str.split("-");
      const index_0 = arr[0] - startBirth[0];
      const index_1 = arr[1] - startBirth[1];
      const index_2 = arr[2] - startBirth[2];
      setTimeout(() => {
        this.$refs.birthPicker.setIndexes([index_0, index_1, index_2]);
      }, 0);
    },

    onConfirmBirth(value, index) {
      if (this.from == "login") {
        this.$root.$emit("loginConfirmBirth", value);
      } else if (this.from == "mine") {
        this.$root.$emit("mineConfirm", {
          key: "birthday",
          value: value.join("-"),
        });
      }
    },

    cancleBtn() {
      this.$root.$emit("cancleShowPopup");
    },
  },
};
</script>

<style scoped lang="scss"></style>
