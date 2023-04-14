<template>
  <div :class="[moveTrigger ? 'moveLeft' : '']">
    <!-- <div class="contentTitle" style="top: 0">
      <span class="c1">Chats</span>
      <div class="c2">
        <div class="search">
          <img src="../../assets/images/chats/search.png" alt="">
        </div>
        <div class="avatar">
          <img src="" alt="">
        </div>
      </div>
    </div> -->
    <div class="chatList">
      <div v-for="(item, i) in chatList" :key="i" class="chatItem" @click="OnClickChatItem(i, item)">
        <div class="avatar">
          <img :src="item.targetUserInfo.avatar" alt="" />
          <div class="unRead">
            {{ item.unread }}
          </div>
        </div>
        <div class="listInfo">
          <div class="name">
            <span class="c1">{{ item.targetUserInfo.nick }}</span>
            <span class="c2">{{
              item.lastMsg.time | timeFilter
            }}</span>
          </div>
          <div class="info">
            <!-- <img class="unRead" src="../../assets/images/正确.png" alt=""> -->
            <img class="Read" src="../../assets/images/chats/已读备份.png" alt="">
            {{ item.lastMsg.text }}
          </div>
          <div class="line"></div>
        </div>
      </div>
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
      return formatDate(val, "hh:mm");
    },
  },
  data() {
    return {
      chatActive: 0,
      moveTrigger: false
    };
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



.moveLeft {
  transform: translate(-375px);
}

.contentTitle {
  width: 375px;
  min-height: 52px;
  background: #FFFFFF;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 16px;
  box-sizing: border-box;

  .c1 {
    font-size: 27px;
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
    color: #161616;
    line-height: 32px;
  }

  .c2 {
    display: flex;
    align-items: center;
    justify-content: center;

    .search {
      width: 36px;
      height: 36px;
      background: #F1F1F1;
      border-radius: 50%;

      display: flex;
      align-items: center;
      justify-content: center;

      margin-right: 12px;

      img {
        width: 18px;
        height: 18px;
      }
    }

    .avatar {
      width: 36px;
      height: 36px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
}


.chatList {
  width: 375px;
  background: #ffffff;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 0rem;

  .chatItem {
    width: 375px;
    background: #ffffff;
    position: relative;
    padding: 0 0.45rem 0 0.6rem;
    box-sizing: border-box;
    display: flex;
    align-content: center;
    justify-content: center;

    margin-top: 0.5rem;

    .avatar {
      width: 2.55rem;
      height: 2.55rem;
      margin-right: 0.4rem;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }

      .unRead {
        position: absolute;
        top: 0.15rem;
        left: 1.78rem;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: #FF0000;
        text-align: center;
        font-size: 0.5rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 0.7rem;
      }
    }

    .listInfo {
      flex: 1;
      display: flex;
      flex-direction: column;

      .name {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .c1 {
          //TODO名字长度限制
          font-size: 0.7rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #161616;
          line-height: 1rem;
        }

        .c2 {
          font-size: 0.6rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #908F91;
          line-height: 0.85rem;
        }
      }

      .info {
        max-width: 14.75rem;
        min-height: 1.7rem;

        word-break: break-all;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 0.7rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #908F91;
        line-height: 0.85rem;

        img {
          width: 0.65rem;
          height: 0.65rem;
        }
      }

      .line {
        margin-top: 10px;
        border-bottom: 1px solid #E7E7E7;
      }
    }

    .float {
      position: absolute;
      left: 3.75rem;
      bottom: 0;
      width: 100%;
      height: 0.05rem;
      background-color: #cac9cd;
    }
  }
}
</style>