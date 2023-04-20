<template>
  <div class="edit-profile">
    <common-header>
      <template #title>Edit profile</template>
    </common-header>

    <div class="main">
      <dl>
        <dt>Personal information</dt>
        <dd v-for="(item, index) in basicInfoArr" :key="index">
          <span class="line-title">{{ item.title }}</span>
          <p
            :class="{
              'line-content': true,
              'no-cursor': item.type === 'country' || item.type === 'gender',
            }"
            @click="toEditInfo(item)"
          >
            <img v-show="item.imageUrl" :src="item.imageUrl" alt="" />
            {{ item | contentFilter }}
            <img
              v-if="!(item.type === 'country' || item.type === 'gender')"
              class="right-img"
              src="../../assets/images/mine/right.png"
              alt=""
            />
          </p>
        </dd>
        <dt>Self-introduction</dt>
        <dd class="self-intro">
          <div>
            <p>Who are you expecting for?</p>
          </div>
          <img src="../../assets/images/mine/right.png" alt="" />
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import CommonHeader from "./CommonHeader.vue";
import { regFormatDate } from "../../utils/date";

export default {
  name: "",
  mixins: [],
  components: { CommonHeader },
  props: {},
  data() {
    return {
      // 基础信息
      basicInfoArr: [
        {
          type: "avatar",
          title: "Avatar",
          imageUrl: "",
          content: "",
        },
        {
          type: "nickname",
          title: "Nickname",
          imageUrl: "",
          content: "",
        },
        {
          type: "gender",
          title: "Gender",
          imageUrl: "",
          content: "",
        },
        {
          type: "birthday",
          title: "Birth",
          imageUrl: "",
          content: "",
        },
        {
          type: "country",
          title: "Country",
          imageUrl: "",
          content: "",
        },
        {
          type: "height",
          title: "Height",
          imageUrl: "",
          content: "",
        },
      ],
    };
  },
  computed: {},
  filters: {
    contentFilter(val) {
      switch (val.type) {
        case "gender":
          return val.type == 1 ? "男" : "女";
        case "height":
          return val.content + "cm";
        default:
          return val.content;
      }
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.getMineInfo();
  },
  methods: {
    // 获取基础信息
    async getMineInfo() {
      let res = await this.$api.mineInfo();
      if (res.result) {
        this.basicInfoArr.map((item) => {
          switch (item.type) {
            case "avatar":
              item.imageUrl = res.data.userInfo[item.type];
              break;
            case "birthday":
              item.content = regFormatDate(
                new Date(res.data.userInfo[item.type]),
                "YYYY-MM-DD"
              );
              break;
            default:
              item.content = res.data.userInfo[item.type];
              break;
          }
          return item;
        });
      } else {
        this.$message.error(res.errorMsg);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.edit-profile {
  .main {
    padding: 0 0.64rem /* 12/18.75 */;

    dl {
      width: 100%;
      margin: 0;

      dt {
        font-size: 0.746667rem /* 14/18.75 */;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #9896a0;
        margin-top: 0.853333rem /* 16/18.75 */;
        margin-bottom: 0.426667rem /* 8/18.75 */;
        margin-left: 0.426667rem /* 8/18.75 */;
      }

      dd {
        width: 100%;
        height: 2.88rem /* 54/18.75 */;
        background: #fefefe;
        padding: 0.853333rem /* 16/18.75 */;
        margin: 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-size: 0.853333rem /* 16/18.75 */;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
        }

        > p {
          display: flex;
          align-items: center;
        }

        p {
          font-size: 0.746667rem /* 14/18.75 */;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #9896a0;
          margin: 0;

          img {
            width: 1.92rem /* 36/18.75 */;
            height: 1.92rem /* 36/18.75 */;
            border-radius: 50%;
          }

          .right-img {
            width: 1.066667rem /* 20/18.75 */;
            height: 1.066667rem /* 20/18.75 */;
            margin-left: 0.426667rem /* 8/18.75 */;
          }
        }
      }

      .self-intro {
        height: 4.906667rem /* 92/18.75 */;
        border-radius: 0.64rem /* 12/18.75 */;

        > div {
          height: 100%;
        }

        img {
          width: 1.066667rem /* 20/18.75 */;
          height: 1.066667rem /* 20/18.75 */;
          margin-left: 0.426667rem /* 8/18.75 */;
        }
      }
    }
  }
}
</style>
