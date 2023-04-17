<template>
  <div>
    <div class="top-back">
      <img
        src="../../assets/images/login/goback@3x.png"
        alt=""
        @click="handleBack"
      />
    </div>
    <div class="title">
      <p v-if="type == 1">
        Verification <span style="display: block">code login</span>
      </p>
      <p v-if="type == 2">
        Fill in <span style="display: block">verification code</span>
      </p>
      <p v-if="type == 3">
        Create a new<span style="display: block">account</span>
      </p>
      <i></i>
    </div>

    <!-- 二次确认弹框 -->
    <van-overlay :show="showOverlay">
      <div class="confirm-again">
        <div class="content-box">
          <div class="content">
            <p>You cannot edit your</p>
            <p>gender after signing up</p>
          </div>
          <div class="btn-box">
            <div @click="showOverlay = false">Cancel</div>
            <i></i>
            <div @click="confirmBack">Confirm</div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  name: "",
  mixins: [],
  components: {},
  props: {
    type: {
      type: Number,
    },
  },
  data() {
    return {
      showOverlay: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleBack() {
      switch (this.type) {
        case 1:
          this.$root.$emit("changeLoginMethod", 0);
          break;
        case 2:
          this.$emit("changeType", 1);
          break;
        case 3:
          this.showOverlay = true;
          break;
        default:
          break;
      }
    },

    confirmBack() {
      this.$root.$emit("changeLoginMethod", 0);
    },
  },
};
</script>

<style scoped lang="scss">
.top-back {
  height: 2.346667rem /* 44/18.75 */;
  font-size: 0rem;
  display: flex;
  align-items: center;

  img {
    width: 1.28rem /* 24/18.75 */;
    height: 1.28rem /* 24/18.75 */;
    margin-left: 0.853333rem /* 16/18.75 */;
  }
}

.title {
  padding: 0 1.066667rem /* 20/18.75 */;
  margin-top: 0.32rem /* 6/18.75 */;

  p {
    // width: 12.64rem /* 237/18.75 */;
    color: #ffffff;
    font-size: 1.706667rem /* 32/18.75 */;
    margin: 0;
  }

  i {
    display: block;
    width: 2.88rem /* 54/18.75 */;
    height: 0.213333rem /* 4/18.75 */;
    background: #ffffff;
    border-radius: 0.213333rem /* 4/18.75 */;
    margin-top: 0.693333rem /* 13/18.75 */;
  }
}

.confirm-again {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .content-box {
    width: 14.933333rem /* 280/18.75 */;
    height: 7.466667rem /* 140/18.75 */;
    border-radius: 0.853333rem /* 16/18.75 */;
    background: #fefefe;
    display: flex;
    flex-direction: column;

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1.066667rem /* 20/18.75 */ 1.813333rem /* 34/18.75 */;

      p {
        margin: 0;
      }
    }

    .btn-box {
      height: 2.826667rem /* 53/18.75 */;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 1px solid #f0f0f0;

      i {
        width: 0.053333rem /* 1/18.75 */;
        height: 100%;
        background-color: #f0f0f0;
      }

      div:first-of-type {
        color: #9896a0;
      }

      div:last-of-type {
        color: #8032ff;
      }
    }
  }
}
</style>
