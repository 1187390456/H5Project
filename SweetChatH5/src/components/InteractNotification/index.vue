<template>
  <div>
    <div v-if="noticeList.length" class="interactive-notification">
      <div v-for="item in noticeList" :key="item.id" class="notice-list">
        <div class="left">
          <img :src="item.userInfo.avatar" alt="" />
          <div v-show="item.userInfo.isOnline" class="dot"></div>
        </div>
        <div class="center">
          <div>{{ item.userInfo.nickname }}</div>
          <div>
            <span style="word-break: break-all">{{ item.replyContent }}</span>
          </div>
        </div>
        <div class="right">
          <div>{{ item.postTimeStr | dateFilter }}</div>
          <img :src="bloggerInfo.avatar" alt="" />
        </div>
      </div>
      <!-- 加载更多 -->
      <div v-if="noticeIsEnd" class="no-more">— THE END —</div>
      <div v-else class="loading-more">
        <template v-if="noticeIsRequest">
          <i class="el-icon-loading"></i>
          <p style="margin-top: 5px">互动通知加载中</p>
        </template>
        <el-button v-else size="mini" round @click="getMoreNotice"
          >点击加载更多互动通知</el-button
        >
      </div>
    </div>
    <el-empty v-else></el-empty>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "",
  filters: {
    dateFilter(val) {
      var date = new Date(val);
      var hour = date.getHours();
      var minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
      if (new Date(val).toDateString() == new Date().toDateString()) {
        var data = "上午";
        if (hour > 12) {
          data = "下午";
          hour = hour - 12;
        }
        return `${hour}:${minute} ${data}`;
      } else {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return `${year}/${month}/${day} ${hour}:${minute}`;
      }
    },
  },
  computed: {
    ...mapGetters(["bloggerInfo"]),
  },
  components: {},
  props: {
    noticeList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    noticeIsEnd: {
      type: Boolean,
      default: true,
    },
    noticeIsRequest: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pageNum: 0,
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 加载更多互动通知
    getMoreNotice() {
      this.pageNum++;
      this.$emit("getNotice", this.pageNum);
    },
  },
};
</script>

<style scoped lang="scss">
.interactive-notification {
  height: calc(100vh - 112px);
  overflow: auto;
}
.notice-list {
  position: relative;
  width: 382px;
  display: flex;
  height: 73px;
  box-sizing: border-box;
  padding: 8px 14px 10px 10px;
  overflow: hidden;
  .left {
    position: relative;
    img {
      width: 55px;
      height: 55px;
      object-fit: cover;
      border-radius: 50%;
    }
    .dot {
      position: absolute;
      right: -1px;
      bottom: 0px;
      width: 15px;
      height: 15px;
      background: #4cc81e;
      border: 2px solid #ffffff;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    margin-left: 8px;
    span {
      color: #908f91;
      font-size: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
  .right {
    text-align: right;
    div {
      font-size: 12px;
      color: #908f91;
    }
    img {
      width: 35px;
      height: 35px;
      border-radius: 5px;
      object-fit: cover;
    }
  }
  &:hover {
    background-color: #e9e9e9;
    border-radius: 4px;
  }
  &::after {
    content: "";
    width: 307px;
    height: 1px;
    position: absolute;
    bottom: 0;
    right: 2px;
    background-color: #cac9cd;
  }
}

.no-more {
  width: 382px;
  height: 58px;
  line-height: 58px;
  text-align: center;
  color: #999;
}

.loading-more {
  width: 382px;
  height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 14px;
}
</style>
