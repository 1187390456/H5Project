<template>
  <div :class="['fixPos', moveTrigger ? 'moveLeft' : '']">
    <div class="contentTitle" style="top: 0">聊天</div>
    <div class="chatList">
      <div v-for="(item, i) in chatList" :key="i" :class="[
        'flex-center-center',
        'chatItem',
        i == chatActive ? 'chatActive' : '',
      ]" @click="OnClickChatItem(i, item)">
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
    <div class="contentTitle" style="bottom: 0">占位区域</div>
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
      moveTrigger: false
    };
  },
  created() {
    // 初始手动调一次
    // this.OnClickChatItem(0, this.chatList[0]);
  },
  methods: {
    // 设置item项
    OnClickChatItem(i, item) {
      this.chatActive = i;
      this.moveTrigger = true;
      setInterval(() => {
        this.$emit("SelectChatCallback", item);
      }, 300);
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

.fixPos {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;

  transition: transform 0.3s;
}

.moveLeft {
  transform: translate(-375px);
}

.contentTitle {
  position: absolute;

  width: 375px;
  height: 2.2rem;
  background: #F2F2F2;
  font-size: 0.8rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #161616;
  text-align: center;
  line-height: 2.2rem;
}



.chatList {
  width: 375px;
  // max-height: 953px;
  height: calc(100vh - 80px);

  background: #ffffff;

  overflow-y: auto;
  overflow-x: hidden;

  .chatItem {
    width: 375px;
    height: 73px;
    background: #ffffff;
    position: relative;
    padding: 8px 13px 10px;
    box-sizing: border-box;

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