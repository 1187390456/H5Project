<template>
  <div class="container">
    <!-- 背景区域-->
    <div class="backGroundArea">
      <div class="topArea">
        <img
          @click="Return"
          src="../../assets/images/bloggerInfo/返回.png"
          alt=""
        />
        <div class="top-right">
          <img src="../../assets/images/bloggerInfo/其他.png" alt="" />
          <div>
            <div class="edit-btn" @click="$router.push('/editProfile')">
              <img src="../../assets/images/bloggerInfo/edit.png" alt="" />
              Profile
            </div>
            <img src="../../assets/images/bloggerInfo/share_white.png" alt="" />
          </div>
        </div>
      </div>
      <img class="bgImg" :src="bloggerInfo.avatar" alt="" />
      <div class="floatShade"></div>
      <!-- 个人信息 -->
      <div class="personDes">
        <div class="c1" v-if="this.bloggerInfo.isOnline">
          <img src="../../assets/images/bloggerInfo/dot.png" alt="" />
          <span>Online</span>
        </div>
        <div class="c2">{{ this.bloggerInfo.nickname }}</div>
        <!-- 身份认证 -->
        <div class="c3" v-if="this.bloggerInfo.identityV != null">
          <img :src="this.bloggerInfo.identityV.icon" alt="" />
          <span>{{ this.bloggerInfo.identityV.desc }}</span>
        </div>
      </div>
    </div>
    <!--  其他认证信息 -->
    <div
      class="otherDes"
      v-if="
        this.bloggerInfo.identityApp && this.bloggerInfo.identityApp.length > 0
      "
    >
      <div class="des">Fans in other social platform</div>
      <ul class="list">
        <li v-for="(item, i) in this.bloggerInfo.identityApp" :key="i">
          <img :src="item.icon" alt="" />
          <span>{{ item.desc }}</span>
        </li>
      </ul>
    </div>
    <!-- 卡片区域 -->
    <van-tabs
      :line-width="50 + '%'"
      color="#8032FF"
      title-active-color="#8032FF"
      class="cardArea"
      :active="activeName"
    >
      <van-tab title="Album" name="Album">
        <ul class="c1">
          <!-- 空相册 -->
          <div class="noYet" v-if="photolist.length == 0">No photo yet</div>
          <li v-else v-for="(item, i) in this.photolist" :key="i">
            <img :src="item.url" alt="" />
          </li>
        </ul>
      </van-tab>
      <van-tab title="Posts" name="Posts">
        <ul class="c2">
          <!-- 空动态 -->
          <div class="noYet" v-if="dynamicList.length == 0">No status yet</div>
          <li v-else v-for="(item, i) in this.dynamicList" :key="i">
            <div class="c2-1">
              <div><img :src="item.authorInfo.avatar" alt="" /></div>
              <span class="nowrap" style="margin-left: 8px">{{
                item.authorInfo.nickname
              }}</span>
            </div>
            <div class="c2-2">
              {{ item.content }}
            </div>
            <ul class="c2-3">
              <li v-for="(item1, i1) in item.imageList" :key="i1">
                <img :src="item1" alt="" />
              </li>
            </ul>
            <div class="c2-4">
              <span>{{ $format(item.postTime) }}</span>
              <span>｜</span>
              <span>{{ item.postAddress }}</span>
            </div>
            <div class="c2-5">
              <div class="c2-5-1">
                <img src="../../assets/images/bloggerInfo/dinazan.png" alt="" />
                <span>{{ item.likeCount }}</span>
              </div>
              <div class="c2-5-2">
                <img src="../../assets/images/bloggerInfo/pinlun.png" alt="" />
                <span>{{ item.commentCount }}</span>
              </div>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
    <!-- 底部固定按钮 -->
    <div class="bottomBtn">
      <el-button class="c1" @click="OnclickChat">
        <span>
          <img src="../../assets/images/bloggerInfo/chatbig.png" alt="" />
          <span>DM</span>
        </span>
      </el-button>
      <!-- <a-button @click="DownLoad($event)" class="c2">
            <img src="../../assets/img/addFridendBig.png" alt="">
            <span style="margin-left: 8px;">{{ $t('pp7') }}</span>
          </a-button> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { GoToChatView } from "../../utils/xcm";
var paramsUserInfo;

export default {
  beforeRouteEnter(to, from, next) {
    console.log(from, "==");
    if (
      from.path === "/editProfile" ||
      from.path === "/Chats" ||
      from.path === "/Discover"
    ) {
      paramsUserInfo = from.params.info;
    }
    next();
  },
  data() {
    return {
      bloggerInfo: "", // 当前用户信息
      photolist: [], // 相册信息
      dynamicList: [], // 动态信息

      activeName: "Album",
      serverTag: "b_test_",
    };
  },
  created() {
    console.log("当前个人主页的传参", paramsUserInfo);
    this.InitData();
  },
  computed: {
    ...mapState({
      user: (state) => state.user.loginInfo.userInfo,
    }),
  },
  methods: {
    // 聊天
    OnclickChat() {
      var id = this.serverTag + this.bloggerInfo.id;
      console.log("123", id);
      GoToChatView(id);
    },
    // 返回
    Return() {
      this.$router.back();
    },
    // 初始化数据
    InitData() {
      console.log(paramsUserInfo, "======================");
      this.GetUserInfo();
      this.Getphotolist();
      this.GetDynamicInfo();
    },
    // 个人信息
    async GetUserInfo() {
      var res = await this.$api.homepage({
        userID: this.user.id,
        userKey: this.user.token,
        targetUserID: paramsUserInfo.id,
      });
      if (!res.result) return;
      console.log("个人信息", res);
      this.bloggerInfo = res.data.userInfo;
    },
    // 个人相册
    async Getphotolist() {
      var res = await this.$api.photolist({
        userID: this.user.id,
        targetUserID: paramsUserInfo.id,
        pageNum: 1,
        userToken: this.user.token,
      });
      if (!res.result) return;
      console.log("相册信息", res);
      this.photolist = res.data.photoList;
    },
    // 个人动态
    async GetDynamicInfo() {
      var res = await this.$api.recommendDynamic({
        targetUserID: paramsUserInfo.id,
        pageNum: 1,
      });
      if (!res.result) return;
      console.log("动态信息", res);
      this.dynamicList = res.data.list;
    },
  },
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  width: 0px;
}

/deep/ .van-tabs--line .van-tabs__wrap {
  min-height: 2.55rem;
}

// --------------------------------  Common ------------------------
.container {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;

  .backGroundArea {
    width: 100%;
    height: 18.75rem;
    position: relative;

    overflow: hidden;

    .topArea {
      width: 100%;
      position: fixed;
      //  background: #ffffff;
      background: rgba(0, 0, 0, 0);

      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 14px 16px;
      box-sizing: border-box;
    }

    .top-right {
      > div {
        display: flex;
        align-items: center;

        .edit-btn {
          width: 87px;
          height: 31px;
          background: #ffffff;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #8032ff;

          img {
            width: 15px;
            height: 15px;
            margin-right: 4px;
          }
        }

        img {
          width: 24px;
          height: 24px;
        }
      }
    }

    .bgImg {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .floatShade {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 8rem;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.3) 100%
      );
      filter: blur(0px);
    }

    .personDes {
      position: absolute;
      bottom: 0;
      width: 100%;

      padding: 0 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;
      min-height: 155px;

      .c1 {
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

      .c2 {
        width: 100%;
        height: 2.25rem;
        font-size: 1.6rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 2.25rem;
        margin-bottom: 0.4rem;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .c3 {
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
    }
  }

  .otherDes {
    width: 100%;
    height: 6.55rem;
    background: #efeef3;
    position: relative;
    padding-bottom: 1rem;

    .des {
      padding: 0.8rem 0 0.4rem 0.8rem;

      font-size: 0.6rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #898989;
      line-height: 0.85rem;
    }

    .list {
      display: flex;
      overflow-x: auto;
      margin-left: 0.6rem;
      margin-right: 0.2rem;

      li {
        flex: none;
        background: #ffffff;
        border-radius: 0.55rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: content-box;
        padding: 0.5rem 1.4rem;
        margin-right: 0.4rem;
        min-height: 3.5rem;

        img {
          width: 1.6rem;
          height: 1.6rem;
        }

        span {
          font-size: 0.5rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #7b7b7b;
          line-height: 0.7rem;
          margin-top: 0.2rem;
        }
      }
    }
  }

  .cardArea {
    width: 100%;
    background: #ffffff;
    overflow: hidden; // 解决溢出

    .noYet {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);

      font-size: 0.8rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #6f6f6f;
    }

    .c1 {
      padding-left: 0.4rem;
      position: relative;
      min-height: 200px;

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
      min-height: 200px;

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
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    margin-bottom: 2rem;

    .c1 {
      width: 15.25rem;
      height: 2.1rem;
      background: #ffefd1;
      border-radius: 1.05rem;
      border: none;
      font-size: 0.7rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #f6892c;

      img {
        width: 1rem;
        height: 1.05rem;
        margin-right: 0.35rem;
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
