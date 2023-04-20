<template>
  <div class="edit-profile">
    <common-header>
      <template #title>Edit profile</template>
    </common-header>

    <div class="main"></div>
  </div>
</template>

<script>
import CommonHeader from "./CommonHeader.vue";

export default {
  name: "",
  mixins: [],
  components: { CommonHeader },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.edit-profile {
  .main {
  }
}
</style>
