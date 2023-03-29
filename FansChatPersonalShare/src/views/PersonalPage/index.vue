<template>
  <div class="fixPos">
    <div class="container">
      <!-- 背景图片 -->
      <div v-if="loading" class="l_backGroundBg"></div>
      <img v-else class="backGroundBg" :src="this.userInfo.avatar" alt="">
      <div class="floatShade"></div>
      <!-- 下载浮窗 -->
      <div class="download">
        <div class="c1">
          <img src="../../assets/img/logo1.jpg" alt="" />
          <span>{{ gender == 1 ? $t('pp1') : $t('pp1_1') }}</span>
        </div>
        <a-button data-name="downHandler" @click="DownLoad($event)" class="c2">{{ $t('pp8') }}</a-button>
      </div>
      <!-- 个人信息 -->
      <div v-if="loading">
        <a-skeleton class="l_personDes" active :title="false" :paragraph="SkeletonParagraphProps"
          :avatar="false"></a-skeleton>
      </div>
      <div v-else>
        <div class="personDes" v-if="this.userInfo.nickname != null">
          <div class="c4" v-if="this.userInfo.isOnline">
            <img src="../../assets/img/dot.png" alt="">
            <span>{{ $t('pp2') }}</span>
          </div>
          <div class="c1 nowarp">{{ this.userInfo.nickname }}</div>
          <!-- 身份认证 -->
          <div class="c2" v-if="this.userInfo.identityV != null">
            <img :src="this.userInfo.identityV.icon" alt="">
            <span>{{ this.userInfo.identityV.desc }}</span>
          </div>
          <!--  其他认证信息 -->
          <ul class="c3" v-if="this.userInfo.identityApp && this.userInfo.identityApp.length > 0">
            <li v-for="(item, i) in this.userInfo.identityApp" :key="i">
              <img :src="item.icon" alt="">
              <span>{{ item.desc }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 卡片区域 -->
      <a-card class="cardArea" :tab-list="tabListNoTitle" :active-tab-key="noTitleKey"
        @tabChange="(key) => onTabChange(key, 'noTitleKey')">
        <p v-if="noTitleKey === 'photoAlbum'">
        <ul class="c1">
          <div v-if="loading">
            <li class="l_loadingLiImg"></li>
            <li class="l_loadingLiImg"></li>
            <li class="l_loadingLiImg"></li>
            <li class="l_loadingLiImg"></li>
            <li class="l_loadingLiImg"></li>
            <li class="l_loadingLiImg"></li>
            <li class="l_loadingLiImg"></li>
            <li class="l_loadingLiImg"></li>
          </div>
          <div v-else>
            <div class="noYet" v-if="photolist.length == 0">
              No photo yet
            </div>
            <li v-else @click="DownLoad($event)" v-for="(item, i) in this.photolist" :key="i"><img :src="item.url" alt="">
            </li>
          </div>
        </ul>
        </p>
        <p v-else-if="noTitleKey === 'dynamic'">
        <ul class="c2">
          <div v-if="loading">
            <li>
              <a-skeleton active :title="false" :paragraph="SkeletonParagraphPropsli" :avatar="true"
                :loading="true"></a-skeleton>
            </li>
            <li>
              <a-skeleton active :title="false" :paragraph="SkeletonParagraphPropsli" :avatar="true"
                :loading="true"></a-skeleton>
            </li>
            <li>
              <a-skeleton active :title="false" :paragraph="SkeletonParagraphPropsli" :avatar="true"
                :loading="true"></a-skeleton>
            </li>
          </div>
          <div v-else>
            <div class="noYet" v-if="dynamicList.length == 0">
              No status yet
            </div>
            <li v-else v-for="(item, i) in this.dynamicList" :key="i" v-show="i < 3">
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
                <span>{{ $format(item.postTime) }}</span>
                <span>｜</span>
                <span>{{ item.postAddress }}</span>
              </div>
              <div @click="DownLoad($event)" class="c2-5">
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
          </div>
        </ul>
        </p>
      </a-card>
      <!-- 浮动按钮 -->
      <div class="bottomBtn">
        <a-button @click="DownLoad($event)" class="c1">
          <img src="../../assets/img/chatbig.png" alt="">
          <span style="margin-left: 8px;">{{ $t('pp6') }}</span>
        </a-button>
        <a-button @click="DownLoad($event)" class="c2">
          <img src="../../assets/img/addFridendBig.png" alt="">
          <span style="margin-left: 8px;">{{ $t('pp7') }}</span>
        </a-button>
      </div>
      <!-- 博主注册pc弹窗 -->
      <blogger-dialong v-if="bloggerDialong" @CloseEvent="bloggerDialong = false" :url="targetUrl"></blogger-dialong>
      <!-- 粉丝pc弹窗 -->
      <fan-dialong v-if="fanDialong" @CloseEvent="fanDialong = false" :url="targetUrl" :gender="gender"></fan-dialong>
      <!-- 粉丝mob弹窗 -->
      <fan-mob-dialong v-if="fanMobDialong" @CloseEvent="fanMobDialong = false" @OnClickEvent="TriggerEvent"
        :gender="gender"></fan-mob-dialong>
    </div>
  </div>
</template>
  
<script>
import { recordHand, _isMobile, listenDownInfo, getParams, jumpUrl } from "../../utils/tools";
import { homepage, photolist, recommendDynamic } from "../../../api/PersonPage";
import BloggerDialong from '../../component/BloggerDialong.vue';
import FanDialong from "../../component/FanDialong.vue";
import FanMobDialong from '../../component/FanMobDialong.vue';

export default {
  components: { BloggerDialong, FanDialong, FanMobDialong },
  data() {
    return {
      noTitleKey: "dynamic",
      userInfo: {}, // 个人信息
      photolist: [], // 相册信息
      dynamicList: [], // 动态信息列表
      loading: true,

      isFirstListen: true,

      // loading
      SkeletonParagraphProps: {
        rows: 5,
        width: ["2.2rem", "9.1rem", "9.1rem", "18.75rem", "18.75rem"]
      },
      SkeletonParagraphPropsli: {
        rows: 5,
        width: ["2.2rem", "4.1rem", "9.1rem", "16rem", "16rem"]
      },

      // 弹窗 
      bloggerDialong: false,
      fanDialong: false,
      fanMobDialong: false,
      type: 0,// 身份判断
      targetUrl: '',
      gender: 0
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
    // window.addEventListener("load", () => ());
    this.InitData();

    // 身份判断监听
    this.type = sessionStorage.getItem('type');
    listenDownInfo(this.type, this.$listenObj);

    // 性别
    this.gender = sessionStorage.getItem('gender'); // 1 男 2 女 
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
    // 下载 点击监听
    DownLoad(e) {

      if (_isMobile()) {
        this.MobHandler(e);
      }
      else {
        this.PCHandler();
      }

    },
    // pc
    PCHandler() {   // 这里type一定是1  粉丝身份
      //TODO 二维码是 粉丝身份进入下载页面 type=1 且在第二个/t/u 当前u为当前的博主
      var u = getParams().u;
      console.log('pc端的粉丝啊', u);
      this.targetUrl = `${jumpUrl}` + `${u}-1`;
      this.fanDialong = true;
    },
    // 移动
    MobHandler(e) {
      // 点击了下载按钮
      if (e.target.dataset.name == 'downHandler') {
        this.TriggerEvent();
      }
      else {  // 点击了其他按钮
        this.fanMobDialong = true
      }
    },
    TriggerEvent() {
      // 这里要博主分享的记录 跳转市场 2
      console.log('移动端跳转type是', this.type);
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

      var userID = this.$route.params.u;
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
      var userID = this.$route.params.u;
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
      var userID = this.$route.params.u;
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

      // 首次监听
      if (this.isFirstListen && this.dynamicList.length == 0) {
        this.noTitleKey = "photoAlbum";
        this.isFirstListen = false;
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

  // 骨架
  .loading {
    position: fixed;
    top: 0;
    width: 375px;
    height: 100vh;

  }

  .backGroundBg {
    position: fixed;
    top: 0;
    width: 375px;
    min-height: 412px;
    object-fit: cover;
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
        border-radius: 0.3rem;
      }

      span {
        font-size: 0.66rem;
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
    top: 15rem;
    width: 375px;
    height: 8rem;
    background: linear-gradient(180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.3) 100%);
    filter: blur(0px);
  }

  .personDes {
    position: relative;
    top: 0;
    width: 100%;
    margin-top: 13.2rem;
    margin-bottom: 10px; // 解决遮罩
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    min-height: 155px;

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
        font-size: 0.5rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 0.7rem;
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
      margin-bottom: 0.4rem;
    }

    .c2 {
      display: flex;
      align-items: center;
      margin-bottom: 0.4rem;

      img {
        width: 1rem;
        height: 1rem;
        margin-right: 0.3rem;
      }

      span {
        font-size: 0.7rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 1rem;
      }
    }

    .c3 {
      li {
        min-height: 1.4rem;
        padding: 0.25rem 0.45rem;
        margin-bottom: 0.3rem;
        margin-right: 0.3rem;

        // height: 28px;
        background: #000000;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 14px;

        float: left;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 0.9rem;
          height: 0.9rem;
        }

        span {
          margin-left: 0.2rem;
          font-size: 0.7rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 1rem;
        }
      }
    }
  }

  .cardArea {
    width: 100%;
    min-height: 70%;
    background: #ffffff;
    border-radius: 0.8rem 0.8rem 0px 0px;
    overflow: hidden; // 解决溢出
    margin-top: -10px; // 解决遮罩

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
    justify-content: center;
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

      margin-right: 0.8rem;

      img {
        width: 20px;
        height: 21px;
      }
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

      img {
        width: 20px;
        height: 21px;
      }
    }
  }
}

.noYet {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 0.8rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #6F6F6F;
}

//--------------------------loading-------------------------
/deep/ .ant-skeleton {
  width: 375px;
}


/deep/ .ant-skeleton-content .ant-skeleton-paragraph>li {
  background: #f4f4f4;
  opacity: 0.6;
}

.l_backGroundBg {
  width: 375px;
  height: 430px;
  background: #E7E7E7;
  filter: blur(0px);
}

.l_loadingLiImg {

  background: #F3F3F3;
  border-radius: 5px;
  opacity: 0.8;
}

.l_personDes {
  position: absolute;
  top: 0;

  margin-top: 14.2rem;
  padding: 0 0.5rem;
}
</style>
  