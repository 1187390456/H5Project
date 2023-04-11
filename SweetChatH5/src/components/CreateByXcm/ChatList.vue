<template>
  <div class="chatList">
    <div
      v-for="(item, i) in chatList"
      :key="i"
      :class="[
        'flex-center-center',
        'chatItem',
        i == chatActive ? 'chatActive' : '',
      ]"
      @click="OnClickChatItem(i, item)"
    >
      <div class="l">
        <img :src="item.targetUserInfo.avatar" alt="" />
        <div v-if="item.targetUserInfo.onlineInfo.isOnline" class="float"></div>
      </div>
      <div class="r flex-col-nor-sbt">
        <div class="flex-center-sbt">
          <span class="font-14-500-161616">{{ item.targetUserInfo.nick }}</span>
          <span class="font-12-400-908f91">{{
            item.lastMsg.time | timeFilter
          }}</span>
        </div>
        <div class="limit twolineElp font-14-400-908f91">
          {{ item.lastMsg.file == null ? item.lastMsg.text : "图片" }}
        </div>
      </div>
      <div class="tip" v-if="item.unread > 0">
        {{ item.unread }}
      </div>
      <div class="float"></div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../utils/xcm";
export default {
  props: {
    chatList: {
      default: [],
      type: Array,
    },
  },
  filters: {
    timeFilter(val) {
      return formatDate(val, "YYYY-MM-DD hh:mm:ss");
    },
  },
  data() {
    return {
      chatActive: 0,
    };
  },
  created() {
    // 初始手动调一次
    this.OnClickChatItem(0, this.chatList[0]);
  },
  methods: {
    // 设置item项
    OnClickChatItem(i, item) {
      this.chatActive = i;
      this.$emit("SelectChatCallback", item);
    },
    // 重置索引
    ResetIndex() {
      this.chatActive = 0;
    },
    // 索引加加
    IndexAdd() {
      this.chatActive++;
    },
    // 设置索引
    SetIndex(i) {
      this.chatActive = i;
    },
    // 获取当前索引
    GetLastIndex() {
      return this.chatActive;
    },
  },
};
</script>

<style lang="less" scoped>
.chatActive {
  background: #e9e9e9 !important;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: #9e9e9e;
  width: 6px;
  min-height: 341px;
  border-radius: 4px;
}
::-webkit-scrollbar-track {
  background: #ececec;
}
.limit {
  max-width: 282px;
  word-break: break-all;
}
.chatList {
  position: fixed;
  left: 180px;

  width: 382px;
  min-height: calc(100% - 56px);

  max-height: 953px;
  background: #ffffff;

  overflow-y: auto;
  overflow-x: hidden;
  .chatItem {
    min-width: 382px;
    height: 73px;
    background: #ffffff;
    padding: 8px 13px 10px;
    position: relative;

    .l {
      width: 55px;
      height: 55px;
      margin-right: 8px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .float {
        position: absolute;
        bottom: 0;
        left: 38px;
        width: 15px;
        height: 15px;
        background: #4cc81e;
        border: 2px solid #ffffff;
        border-radius: 50%;
      }
    }
    .r {
      height: 100%;
      flex: 1;
    }
    .tip {
      position: absolute;
      bottom: 15px;
      right: 5px;

      background: red;
      color: #fff;
      font-size: 12px;
      text-align: center;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 50%;
      margin-left: 10px;
    }
    .float {
      position: absolute;
      left: 75px;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #cac9cd;
    }
  }
  .chatItem:hover {
    background: #e9e9e9;
    cursor: pointer;
  }
}
</style>