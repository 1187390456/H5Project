<template>
  <div class="">
    <van-picker
      ref="birthPicker"
      show-toolbar
      :columns="heightColumns"
      confirm-button-text="Confirm"
      cancel-button-text="Cancel"
      @cancel="cancleBtn"
      @confirm="confirmBth"
    />
  </div>
</template>

<script>
export default {
  name: "",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    heightColumns() {
      let arr = [];
      for (let i = 140; i <= 200; i++) {
        arr.push(i + "cm");
      }
      return arr;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleHeightClick(str) {
      str > 0 ? str : 165;
      const startBirth = 140;
      const index_0 = str - startBirth;
      console.log(index_0);
      setTimeout(() => {
        this.$refs.birthPicker.setIndexes([index_0]);
      }, 0);
    },

    cancleBtn() {
      this.$root.$emit("cancleShowPopup");
    },

    confirmBth(value, index) {
      value = value.replaceAll(/c|m/g, "");
      this.$root.$emit("mineConfirm", { key: "height", value });
    },
  },
};
</script>

<style scoped lang="scss"></style>
