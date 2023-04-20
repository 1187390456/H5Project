<template>
  <div class="input-edit">
    <div class="mine-header">
      <div class="left" @click="$emit('hideEditPopup')">
        <img src="../../assets/images/mine/left@3x.png" alt="" />
      </div>
      <div class="title">
        {{ title }}
      </div>
      <div class="right" @click="handleSave">Save</div>
    </div>

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
  .mine-header {
    width: 100%;
    height: 2.773333rem /* 52/18.75 */;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.853333rem /* 16/18.75 */;
    box-sizing: border-box;

    .left {
      width: 1.28rem /* 24/18.75 */;
      height: 1.28rem /* 24/18.75 */;

      img {
        width: 1.28rem /* 24/18.75 */;
        height: 1.28rem /* 24/18.75 */;
      }
    }

    .title {
      font-size: 0.853333rem /* 16/18.75 */;
      font-family: Helvetica-Bold, Helvetica;
      font-weight: bold;
      color: #161616;
    }

    .right {
      font-size: 0.746667rem /* 14/18.75 */;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #8f4afe;
    }
  }

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
