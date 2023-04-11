<template>
  <div class="navbar">
    <div class="left-menu">
      <a>
        <img src="../../assets/FansBridge.png" />
        <h1>&nbsp;FansBridge代运营后台</h1>
      </a>
    </div>
    <div>
      <div
        class="left-menu"
        v-show="!isChrome"
        style="font-size: 12px; margin-left: 6px; color: #333"
      >
        为了确保您能正常使用Night
        Chat的所有功能，强烈建议您使用Chrome官方浏览器。
        <el-link
          type="primary"
          :href="chromeDownUrl"
          style="display: inline; font-size: 12px"
          >立即下载</el-link
        >
      </div>
    </div>
    <div class="right-menu">
      <div class="right-menu">
        <!-- 切换账号 -->
        <img
          class="user-img"
          v-if="bloggerInfo && bloggerInfo.avatar"
          :src="bloggerInfo.avatar"
        />
        <el-dropdown
          @command="menuEvent"
          @visible-change="visibleChange"
          trigger="click"
          placement="bottom"
        >
          <span class="el-dropdown-link">
            <span style="font-size: 16px; color: #75748d">{{
              bloggerInfo ? bloggerInfo.nickname : "选择账号"
            }}</span>
            <img class="change-user" src="@/assets/chang_user.png" alt="" />
          </span>
          <el-dropdown-menu slot="dropdown" class="drop-down">
            <el-dropdown-item
              v-for="(item, index) in bloggerList"
              :key="index"
              :command="{ targetUserID: item.bloggerUser.id }"
            >
              <i
                class="el-icon-check"
                v-show="bloggerInfo && item.bloggerUser.id == bloggerInfo.id"
              ></i>
              <img :src="item.bloggerUser.avatar" alt="" />
              <span class="nick-name">{{ item.bloggerUser.nickname }}</span>
              <span v-if="item.inUseUser"
                >({{ item.inUseUser.nickname }}正在使用)</span
              >
              <span v-if="bloggerInfo && item.bloggerUser.id == bloggerInfo.id"
                >(你正在使用)</span
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 运营人员账号信息 -->
        <el-dropdown
          class="avatar-container"
          style="cursor: pointer"
          trigger="hover"
          @visible-change="rotateIcon"
        >
          <div
            style="
              height: 58px;
              display: flex;
              align-items: center;
              color: #75748d;
              font-size: 12px;
            "
          >
            <div class="avatar-wrapper">
              <img
                :src="require('src/assets/admin_super_avatar.png')"
                class="user-avatar"
              />
            </div>
            <div style="display: flex; align-items: center">
              <div style="font-size: 14px; color: #75748d">
                {{ user.name }}
              </div>
              <i
                class="el-icon-arrow-down"
                style="font-size: 16px; margin-left: 12px"
              ></i>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { chromeDownUrl } from "@/config";
export default {
  data() {
    return {
      noticeList: "", //气泡数据
      visible: false,
      fullscreen: false,
      rotate: true,
      chromeDownUrl,
      dropMenu: false,
      bloggerList: [],
    };
  },
  components: {},
  computed: {
    ...mapGetters(["bloggerInfo"]),
    ...mapState({
      user: (state) => state.user,
    }),
    isChrome() {
      var ua = navigator.userAgent;
      var ch = /google/gi.test(navigator.vendor);
      return (
        ((/chrome/gi.test(ua) && !/edge/gi.test(ua)) ||
          (/safari/gi.test(ua) && !/edge/gi.test(ua))) &&
        ch
      );
    },
  },
  methods: {
    rotateIcon($state) {
      this.rotate = !$state;
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },

    async logout() {
      await this.$store.dispatch("user/logout");
    },

    visibleChange(bool) {
      this.dropMenu = bool;
    },
    getBloggerList() {
      this.$api.bloggerList().then((res) => {
        if (res.result) {
          this.bloggerList = res.data.bloggerList;
        } else {
          this.$message.error(res.errorMsg);
        }
      });
    },
    async menuEvent(obj) {
      if (this.bloggerInfo && this.bloggerInfo.id) {
        obj.previousUserID = this.bloggerInfo.id;
      } else {
        obj.previousUserID = 0;
      }
      this.$api.checkAccount(obj).then((res) => {
        if (res.result) {
          this.$store.commit("user/SET_INFO", res.data);
          localStorage.setItem("nowBloggerId", res.data.id);
          console.log(this.bloggerInfo, "----现在使用的博主账号----");
        } else {
          this.$message.error(res.errorMsg);
        }
      });
    },
  },
  mounted() {
    this.getBloggerList();
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.el-dropdown-menu.user-dropdown {
  top: 60px !important;
}
.navbar {
  width: 100%;
  min-width: 1080px;
  margin: 0 auto;
  padding: 0 24px 0 24px;
  height: 56px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-menu {
    float: left;
    height: 60px;
    line-height: 60px;
    a {
      height: 60px;
      line-height: 60px;
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
      }
      h1 {
        margin-left: 8px;
        font-size: 16px;
        color: #161616;
      }
    }
  }
  .right-menu {
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }
    .el-dropdown-link {
      display: flex;
      align-items: center;
      cursor: pointer;
      span {
        margin: 0 5px;
      }
    }
    .user-img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
    .change-user {
      width: 24px;
      height: 24px;
      object-fit: cover;
    }
    .avatar-container {
      margin-left: 20px;
      &:before {
        content: "";
        width: 2px;
        height: 32px;
        background: #d8d8d8;
        border-radius: 1px;
        position: absolute;
        top: 12px;
        right: 111px;
      }
    }
    .avatar-wrapper {
      margin-left: 10px;
      margin-right: 11px;
      position: relative;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>

<style lang="scss">
.drop-down {
  width: 300px;
  height: 268px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  overflow: auto;
  border: 1px solid rgba(188, 187, 199, 0.08);
  .el-dropdown-menu__item {
    display: flex;
    align-items: center;
    padding: 5px 17px 5px 17px;
  }
  .el-icon-check {
    color: #7050f3;
    font-size: 17px;
    font-weight: 600;
    position: absolute;
  }
  img {
    width: 28px;
    height: 28px;
    object-fit: cover;
    border-radius: 50%;
    margin: 0 5px 0 26px;
  }
  .nick-name {
    max-width: 80px;
    width: max-content;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //用省略号显示
    white-space: nowrap; //不换行
  }
}
</style>
