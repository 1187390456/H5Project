<template>
  <div class="verification-code">
    <common-header :type="type" @changeType="changeType"></common-header>
    <!-- 标题 -->
    <div class="container">
      <!-- 输入手机号 -->
      <template v-if="type == 1">
        <div class="phone-number">
          <div class="country-code">
            <p>+{{ countryCode }}</p>
            <img src="../../assets/images/login/drop_down@3x.png" alt="" />
          </div>
          <i></i>
          <input
            v-model="phoneNumber"
            oninput="value = value.replace(/[^\d]/g,'')"
            placeholder="Please enter phone number"
            type="number"
            pattern="[0-9]*"
            inputmode="numeric"
          />
        </div>
        <div class="separation-line"></div>
        <!-- 按钮 -->
        <div class="btn-box">
          <p
            :class="{ 'input-phone': phoneNumber.length == 11 }"
            @click="changeType(2)"
          >
            Get verification code
          </p>
        </div>
      </template>
      <!-- 输入验证码 -->
      <template v-if="type == 2">
        <div class="phone-code">
          <p>Verification code sent to +{{ countryCode }} {{ phoneNumber }}</p>
          <div>
            <input
              v-for="(item, index) in phoneCodebox"
              :key="index"
              :ref="`ref_${index}`"
              class="input"
              v-model="phoneCodebox[index]"
              type="number"
              pattern="[0-9]*"
              inputmode="numeric"
              oninput="value = value.replace(/[^\d]/g,'')"
              @focus="onFocusCode"
              @input="onInputCode(index, $event)"
              @keydown.delete="onDeleteCode(index, $event)"
            />
          </div>
          <p>
            <template v-if="!isRetrieveCode">
              The verification code will be retrieved after
              {{ seconds }} seconds
            </template>
            <a v-else href="#">Retrieve verification code</a>
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CommonHeader from "./CommonHeader.vue";

export default {
  name: "",
  mixins: [],
  components: {
    CommonHeader,
  },
  props: {},
  data() {
    return {
      type: 1,
      isInputPhone: false,
      phoneNumber: "",
      countryCode: 86,
      seconds: 60,
      phoneCodebox: ["", "", "", "", "", ""],
      isRetrieveCode: false,
      copyCode: "",
    };
  },
  computed: {},
  watch: {
    type(newVal) {
      if (newVal == 2) {
        var timer = setInterval(() => {
          if (this.seconds === 0) {
            this.isRetrieveCode = true;
            clearInterval(timer);
            timer = null;
          }
          this.seconds--;
        }, 1000);
      }
    },
    phoneCodebox: {
      handler(newVal) {
        let str = newVal.join("");
        if (str == "000000") {
          this.$api
            .phoneLogin({
              phone: this.phoneNumber,
              captcha: str,
            })
            .then((res) => {
              if (res.result) {
                this.$store.commit("user/SET_LOGIN_INFO", res.data);
                if (res.data.isEdit) {
                  // 直接进入
                  console.log("直接进入===");
                  const id = res.data.userInfo.id;
                  const name = res.data.userInfo.nickname;
                  sessionStorage.setItem("User", JSON.stringify({ name, id }));
                  sessionStorage.setItem("userToken", res.data.userInfo.token);
                  this.$router.push({ path: "/Chats" });
                  this.$store.dispatch("permission/generateRoutes", []);
                } else {
                  // 去编辑资料
                  this.$root.$emit("changeLoginMethod", 2);
                }
              }
            });
        }
      },
      deep: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    changeType(type) {
      this.type = type;
    },

    onFocusCode() {
      let isEmpty = this.phoneCodebox.every((item) => !item);
      isEmpty && this.$refs["ref_0"][0].focus();
    },

    onInputCode(index, event) {
      if (this.copyCode.length == 6) {
        this.copyCode = event.target.value;
        let copyCodeArr = this.copyCode.split("");
        this.phoneCodebox.map((item, index) => {
          this.$refs["ref_" + index][0].blur();
          this.phoneCodebox[index] = copyCodeArr[index];
          return item;
        });
      } else {
        this.copyCode = "";
        this.phoneCodebox[index] = this.phoneCodebox[index].slice(0, 1);
        // index < 5 ，如果是第6格，不触发光标移动至下一个输入框。
        if (this.phoneCodebox[index] && index < 5) {
          this.$refs["ref_" + (index + 1)][0].focus();
        }
        var inputValue = "";
        this.phoneCodebox.forEach((item) => {
          inputValue = inputValue + item;
        });
        if (inputValue.length < 6) {
          this.isError = true;
        } else {
          this.isError = false;
        }
      }
    },

    onDeleteCode(index, event) {
      // 如果是第1格，不触发光标移动至上一个输入框
      if (index > 0) {
        if (!event.target.value) {
          this.phoneCodebox[index - 1] = "";
          this.$refs["ref_" + (index - 1)][0].focus();
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.verification-code {
  .container {
    padding: 0 1.066667rem /* 20/18.75 */;

    .phone-number {
      margin-top: 1.706667rem /* 32/18.75 */;
      display: flex;

      .country-code {
        display: flex;
        align-items: center;

        p {
          width: max-content;
          color: #ffffff;
          font-size: 0.746667rem /* 14/18.75 */;
          margin: 0;
        }

        img {
          width: 1.28rem /* 24/18.75 */;
          height: 1.28rem /* 24/18.75 */;
          margin-left: 0.48rem /* 9/18.75 */;
        }
      }

      i {
        display: block;
        width: 0.053333rem /* 1/18.75 */;
        height: 1.28rem /* 24/18.75 */;
        background: #c5c5d1;
        opacity: 0.2;
        margin: 0 0.64rem /* 12/18.75 */ 0 0.213333rem /* 4/18.75 */;
      }

      input {
        flex: 1;
        color: #ffffff;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 100;
        outline-style: none;
        border: 0rem;
        background: transparent;

        &::placeholder {
          color: #ffffff;
          opacity: 0.5;
        }
      }
    }

    .separation-line {
      width: 100%;
      height: 0.053333rem /* 1/18.75 */;
      background: #c5c5d1;
      opacity: 0.2;
      margin-top: 0.853333rem /* 16/18.75 */;
    }

    .btn-box {
      margin-top: 2.133333rem /* 40/18.75 */;

      p {
        width: 17.866667rem /* 335/18.75 */;
        height: 2.453333rem /* 46/18.75 */;
        line-height: 2.453333rem /* 46/18.75 */;
        color: #8032ff;
        background-color: #fff;
        text-align: center;
        margin: 0;
        opacity: 0.4;
        border-radius: 1.6rem /* 30/18.75 */;
      }

      .input-phone {
        opacity: 1;
      }
    }

    .phone-code {
      width: 100%;
      margin-top: 0.693333rem /* 13/18.75 */;

      p {
        margin: 0;
        opacity: 0.7;

        &:first-of-type {
          font-size: 0.64rem /* 12/18.75 */;
          font-family: Helvetica-Bold, Helvetica;
          font-weight: bold;
          color: #ffffff;
        }

        &:last-of-type {
          font-size: 0.64rem /* 12/18.75 */;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;

          a {
            text-decoration: underline;
          }
        }
      }

      > div {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0.906667rem /* 17/18.75 */ 0;
        box-sizing: border-box;

        input {
          // display: flex;
          // width: 2.4rem /* 45/18.75 */;
          width: 10vw;
          height: 2.933333rem /* 55/18.75 */;
          // font-size: 1.6rem /* 30/18.75 */;
          color: #333333;
          background-color: #f2f2f2;
          text-align: center;
          outline: none;
          border: 0rem;
          border-radius: 0.533333rem /* 10/18.75 */;
        }
        .error-tips {
          margin-left: 10px;
          color: #f56c6c;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
