<template>
  <div class="input-edit">
    <common-header>
      <template #title>{{ title }}</template>
      <div slot="right" @click="handleSave">Save</div>
    </common-header>

    <div class="main">
      <div v-if="editType == 'nickname'">
        <van-field v-model="nicknameInput" clearable />
        <p>16</p>
      </div>
      <div v-else>
        <van-field
          v-model="selfIntroInput"
          rows="4"
          type="textarea"
          maxlength="100"
          placeholder="请输入留言"
          show-word-limit
        />
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from "./CommonHeader.vue";

export default {
  name: "",
  mixins: [],
  components: { CommonHeader },
  props: {
    editType: {
      type: String,
    },
    editContent: {
      type: String,
    },
  },
  data() {
    return {
      nicknameInput: "",
      selfIntroInput: "",
    };
  },
  computed: {
    title() {
      if (this.editType == "nickname") {
        return "Edit nickname";
      } else {
        return "Monologue";
      }
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.nicknameInput = this.editContent;
    this.selfIntroInput = this.editContent;
  },
  methods: {
    handleSave() {
      if (!(this.nicknameInput || this.selfIntroInput)) return;

      var value = "";
      if (this.editType == "nickname") {
        value = this.nicknameInput.trim();
      } else {
        value = this.selfIntroInput.trim();
      }

      this.$root.$emit("mineConfirm", {
        key: this.editType,
        value,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.input-edit {
  .main {
    margin-top: 0.64rem /* 12/18.75 */;

    input[type="text"] {
      border: none;
      width: 100%;
      padding: 0.64rem /* 12/18.75 */ 1.066667rem /* 20/18.75 */;
      font-size: 0.853333rem /* 16/18.75 */;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      box-sizing: border-box;
    }

    p {
      width: 100%;
      font-size: 0.746667rem /* 14/18.75 */;
      text-align: right;
      padding: 0 0.533333rem /* 10/18.75 */;
      color: #9896a0;
      box-sizing: border-box;
    }
  }
}
</style>
