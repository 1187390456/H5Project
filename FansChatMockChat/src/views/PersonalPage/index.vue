<template>
  <div class="fixPos">
    <div class="container">
      <!-- 加载 -->
      <div v-if="loading" class="loading">
        <a-spin tip="Loading..." />
      </div>
      <!-- 背景图片 -->
      <img class="backGroundBg" :src="this.userInfo.avatar" alt="">
      <div class="floatShade"></div>
      <!-- 下载浮窗 -->
      <div class="download">
        <div class="c1">
          <img src="../../assets/img/logo1.png" alt="" />
          <span>{{ $t('pp1') }}</span>
        </div>
        <a-button @click="DownLoad" class="c2">{{ $t('pp8') }}</a-button>
      </div>
      <!-- 个人信息 -->
      <div class="personDes">
        <div class="c4" v-if="this.userInfo.isOnline">
          <img src="../../assets/img/dot.png" alt="">
          <span>{{ $t('pp2') }}</span>
        </div>
        <div class="c1 nowarp">{{ this.userInfo.nickname }}</div>
        <div class="c2">
          <div class="c2-1">
            <img src="../../assets/img/huiYuan.png" alt="" />
            <span style="margin-left:0.1875rem;">{{ $t('pp3') }}</span>
          </div>
          <span class="c2-2">{{ this.userInfo.friendCount }} {{ $t('pp9') }}</span>
        </div>
        <div class="c3 nowarp">{{ this.userInfo.declaration }}</div>
      </div>
      <!-- 卡片区域 -->
      <a-card class="cardArea" :tab-list="tabListNoTitle" :active-tab-key="noTitleKey"
        @tabChange="(key) => onTabChange(key, 'noTitleKey')">
        <p v-if="noTitleKey === 'photoAlbum'">
        <ul class="c1">
          <li @click="DownLoad" v-for="(item, i) in this.photolist" :key="i"><img :src="item.url" alt=""></li>
        </ul>
        </p>
        <p v-else-if="noTitleKey === 'dynamic'">
        <ul class="c2">
          <li v-for="(item, i) in this.dynamicList" :key="i">
            <div class="c2-1">
              <div><img :src="item.authorInfo.avatar" alt=""></div>
              <span class="nowrap" style="margin-left: 8px;">{{ item.authorInfo.nickname }}</span>
            </div>
            <div class="c2-2">
              {{ item.content }}
            </div>
            <ul class="c2-3">
              <li v-for="(item1, i1) in item.imageList" :key="i1"><img :src="item1" alt=""></li>
            </ul>
            <div class="c2-4">
              <span>{{$format(item.postTime) }}</span>
              <span>｜</span>
              <span>{{ item.postAddress }}</span>
            </div>
            <div @click="DownLoad" class="c2-5">
              <div class="c2-5-1">
                <img src="../../assets/img/dinazan.png" alt="">
                <span>{{ item.likeCount }}</span>
              </div>
              <div class="c2-5-2">
                <img src="../../assets/img/pinlun.png" alt="">
                <span>{{ item.commentCount }}</span>
              </div>
            </div>
          </li>
        </ul>
        </p>
      </a-card>
      <!-- 浮动按钮 -->
      <div class="bottomBtn">
        <a-button @click="DownLoad" class="c1">
          <img src="../../assets/img/chat.png" alt="">
          <span style="margin-left: 8px;">{{ $t('pp6') }}</span>
        </a-button>
        <a-button @click="DownLoad" class="c2">
          <img src="../../assets/img/addFridend.png" alt="">
          <span style="margin-left: 8px;">{{ $t('pp7') }}</span>
        </a-button>
      </div>
    </div>
  </div>
</template>
  
<script>
import { getUrlKey, recordHand } from "../../utils/tools";
import { homepage, photolist, recommendDynamic } from "../../../api/PersonPage";

export default {
  data() {
    return {
      noTitleKey: "photoAlbum",
      userInfo: {}, // 个人信息
      photolist: [], // 相册信息
      dynamicList: [], // 动态信息列表
      loading: true,
    };
  },
  computed: {
    tabListNoTitle() {
      return [
        {
          key: "photoAlbum",
          tab: this.$t("pp4"),
        },
        {
          key: "dynamic",
          tab: this.$t("pp5"),
        },
      ];
    },
  },
  created() {
    window.addEventListener("load", () => (this.noTitleKey = "dynamic"));
    this.InitData();
  },
  methods: {
    // 切换tab
    onTabChange(key, type) {
      this[type] = key;
      if (key == "photoAlbum") {
        this.Getphotolist();
      } else if (key == "dynamic") {
        this.GetDynamicInfo();
      }
    },
    // 下载
    DownLoad() {
      // 这里要博主分享的记录 跳转市场 2
      recordHand(2);
      this.$listenObj.type = true;
    },
    // 初始化数据
    InitData() {
      this.GetUserInfo();
      this.Getphotolist();
      this.GetDynamicInfo();
    },
    // 个人信息
    async GetUserInfo() {
      // 第一次没缓存开启loading
      if (!this.$listenObj.isChache) {
        this.loading = true;
      }

      var userID = getUrlKey("u");
      var res = await homepage({ userID, targetUserID: userID });
      if (!res.result) {
        this.loading = false;
        this.$message.info("Server is Busy! Please Try Anain!");
        return;
      }
      this.userInfo = res.data.userInfo;
    },
    // 个人相册
    async Getphotolist() {
      var userID = getUrlKey("u");
      var res = await photolist({
        userID,
        targetUserID: userID,
        pageNum: 1,
      });
      if (!res.result) {
        this.loading = false;
        this.$message.info("Server is Busy! Please Try Anain!");
        return;
      }
      this.photolist = res.data.photoList;
    },
    // 个人动态
    async GetDynamicInfo() {
      var userID = getUrlKey("u");
      var res = await recommendDynamic({
        userID,
        targetUserID: userID,
        pageNum: 1,
      });
      if (!res.result) {
        this.loading = false;
        this.$message.info("Server is Busy! Please Try Anain!");
        return;
      }
      this.dynamicList = res.data.list;

      if (!this.$listenObj.isChache) {
        this.loading = false;
        this.$listenObj.isChache = true;
      }
    },
  },
};
</script>
  
<style lang="less" scoped>
// --------------------------------  Common ------------------------

.fixPos {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
}

.nowarp {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/deep/ .ant-spin {
  color: #8032ff;
}
/deep/ .ant-spin-dot-item {
  background-color: #8032ff;
}

/deep/ .ant-card-head {
  border-bottom: none;
}

/deep/ .ant-card-head .ant-tabs-bar {
  border-bottom: none;
}

/deep/ .ant-card-body {
  margin: 0;
  padding: 0;
  margin-top: 0.6rem;
}

/deep/ .ant-tabs-nav-scroll {
  display: flex;
  align-items: center;
  justify-content: space-around;

  div {
    width: 100%;
    padding: 0;
    margin: 0;

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    font-size: 0.9rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #9896a0;
  }

  :hover div {
    color: #8032ff;
  }
}

/deep/ .ant-tabs-ink-bar {
  background-color: #8032ff;
}

/deep/ .ant-tabs-nav-scroll :hover div .ant-tabs-tab {
  color: #9896a0;
}
/deep/ .ant-tabs-nav .ant-tabs-tab-active {
  color: #8032ff !important;
}
// --------------------------------  Common ------------------------
.container {
  width: 375px;
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  .loading {
    position: fixed;
    width: 375px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.6);
  }

  .backGroundBg {
    position: fixed;
    top: 0;
    width: 375px;
    max-height: 412px;
    object-fit: contain;
  }

  .download {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 375px;
    min-height: 48px;
    background: #000000;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.3rem;

    .c1 {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 1.4rem;
        height: 1.4rem;
      }

      span {
        font-size: 0.7rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 1rem;
        margin-left: 0.4rem;
      }
    }

    .c2 {
      height: 1.4rem;
      padding: 0 10px;
      border-radius: 0.7rem;
      background: transparent;
      border: 1px solid #ffffff;
      font-size: 0.6rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .floatShade {
    position: fixed;
    top: 12rem;
    width: 375px;
    height: 8rem;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    filter: blur(0px);
  }

  .personDes {
    position: relative;
    top: 0;
    width: 100%;
    margin-top: 12.3rem;
    padding: 0 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    .c4 {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.25rem;
      height: 1rem;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 0.5rem;

      img {
        width: 0.375rem;
        height: 0.375rem;
        margin-right: 0.25rem;
      }

      span {
        font-size: 0.625rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }
    }

    .c1 {
      width: 100%;
      height: 2.25rem;
      font-size: 1.6rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 2.25rem;
    }

    .c2 {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0.5rem 0;

      .c2-1 {
        padding: 0.1rem 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ff006a;
        border-radius: 0.25rem;
        font-size: 0.6rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }

      .c2-2 {
        font-size: 0.7rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 1rem;
        margin-left: 0.6rem;
      }
    }

    .c3 {
      width: 100%;
      height: 1rem;
      font-size: 0.7rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 1rem;
      margin-bottom: 0.75rem;
    }
  }

  .cardArea {
    width: 100%;
    min-height: 100%;
    background: #ffffff;
    border-radius: 0.8rem 0.8rem 0px 0px;
    overflow: hidden; // 解决溢出

    .c1 {
      margin-left: 0.3rem;

      li {
        width: 6.3rem;
        height: 8rem;
        border-radius: 0.25rem;
        opacity: 0.8;
        margin: 0.15rem 0.15rem 0 0;
        float: left;

        img {
          width: 100%;
          height: 100%;
          border-radius: 0.25rem;
          object-fit: cover;
        }
      }
    }

    .c2 {
      li {
        display: flex;
        flex-direction: column;
        border-bottom: 0.05rem solid #eee;
        margin-bottom: 1rem;

        .c2-1 {
          margin: 0 0.5rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          font-size: 0.8rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #383838;
          line-height: 1.1rem;

          img {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            object-fit: cover;
          }
        }

        .c2-2 {
          margin: 0.4rem 0.5rem;
          font-size: 0.8rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #383838;
          line-height: 1.1rem;
        }

        .c2-3 {
          margin: 0 0.5rem;

          li {
            width: 6.1rem;
            height: 8rem;
            border-radius: 0.25rem;
            margin: 0.15rem 0.15rem 0 0;
            float: left;

            img {
              width: 100%;
              height: 100%;
              border-radius: 0.25rem;
              object-fit: cover;
            }
          }
        }

        .c2-4 {
          margin: 0.4rem 0.5rem;
          width: 100%;
          font-size: 0.6rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #9d9ea6;
          line-height: 0.85rem;
        }

        .c2-5 {
          display: flex;

          margin: 0.5rem 0.5rem;
          margin-bottom: 0.9rem;

          img {
            width: 1rem;
            height: 1rem;
            margin-right: 0.5rem;
          }

          .c2-5-1 {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 3rem;
          }

          .c2-5-2 {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }

  .bottomBtn {
    width: 375px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    margin-bottom: 2rem;

    .c1 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 6.8rem;
      height: 2.1rem;
      background: #ffefd1;
      border-radius: 1.25rem;
      border: none;
      font-size: 0.7rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #f6892c;
    }

    .c2 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 9.6rem;
      height: 2.1rem;
      background: #8032ff;
      border-radius: 1.05rem;
      border: none;
      font-size: 0.7rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>
  