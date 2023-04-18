// 动态详情
<template>
  <div class="containner-posts">
    <div class="top">
      <img src="@/assets/return.png" @click="$emit('exitDetails')" />
      <span>Posts</span>
    </div>
    <div class="content">
      <div class="con-info">
        <img :src="detailData.authorInfo.avatar" alt="" />
        <div class="info">
          <div :class="detailData.authorInfo.identity ? 'name1' : 'name'">
            {{ detailData.authorInfo.nickname }}
          </div>
          <div class="mark" v-if="detailData.identity">
            <img src="@/assets/images/discover/attestation.png" alt="" />
            <span>Miss World 2019 No.3</span>
            <img src="@/assets/images/discover/terrace.png" alt="" />
            <span>154.3K Fans</span>
          </div>
        </div>
      </div>
      <div class="con-center">
        {{ detailData.content }}
      </div>
      <div
        class="con-img"
        v-if="detailData.imageList"
        :class="{
          img2: detailData.imageList.length == 2,
          'img-more': detailData.imageList.length >= 2,
          img3: detailData.imageList.length >= 3,
          img4: detailData.imageList.length == 4,
        }"
      >
        <img
          v-for="(imgItem, imgI) in detailData.imageList"
          :key="imgI"
          :src="imgItem"
          alt=""
        />
      </div>
      <div class="con-btm">
        <div class="time">
          {{ detailData.postTime | timeFilter }}｜{{ detailData.postAddress }}
        </div>
        <div class="bottom">
          <div>
            <img
              v-if="detailData.isLike"
              src="@/assets/images/posts/like.png"
              @click="$emit('cancelLike', detailData)"
              alt=""
            />
            <img
              v-else
              src="@/assets/images/posts/nolike.png"
              @click="$emit('getLike', detailData)"
              alt=""
            />
            <span>{{ detailData.likeCount }}</span>
            <img src="@/assets/images/posts/comment.png" alt="" />
            <span>{{ detailData.commentCount }}</span>
          </div>
          <img src="@/assets/images/posts/more.png" alt="" />
        </div>
      </div>
    </div>
    <div class="addpost">
      <img src="@/assets/images/posts/white-com.png" alt="" />
      <span>comment</span>
    </div>

    <!-- 查看评论 -->
    <div class="check-comment">
      <reply-list
        :commentCount="detailData.commentCount"
        :dynamicID="detailData.id"
      ></reply-list>
    </div>
  </div>
</template>

<script>
import ReplyList from "./reply.vue";
import { relativeTime } from "@/utils/date.js";

export default {
  data() {
    return {};
  },
  props: {
    detailData: {
      type: Object,
      default: {},
    },
  },
  filters: {
    timeFilter(val) {
      return relativeTime(val);
    },
  },
  components: {
    ReplyList,
  },
  mounted() {
    console.log(this.detailData, "动态详情内容");
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.containner-posts {
  img {
    object-fit: cover;
  }
}
.top {
  position: sticky;
  top: 0;
  height: 52px;
  line-height: 52px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #161616;
  background-color: #fff;
  z-index: 5;
  img {
    height: 24px;
    width: 24px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
.content {
  position: relative;
  padding: 12px 0;
  border-bottom: 1px solid rgba(238, 238, 238, 0.7);
  .con-info {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .info {
      margin-left: 0.4267rem;
      color: #383838;
      font-size: 0.8533rem;
      .name {
        // height: 1.1733rem;
        // line-height: 1.1733rem;
        position: relative;
        transform: translateY(50%);
      }
      .name1 {
        position: static;
        transform: none;
        height: 1.1733rem;
        line-height: 1.1733rem;
      }
      .mark {
        display: flex;
        align-items: center;
        height: 17px;
        line-height: 17px;
        img {
          width: 15px;
          height: 15px;
          &:last-of-type {
            margin-left: 6px;
          }
        }
        span {
          font-size: 12px;
          color: #808080;
        }
      }
    }
  }
  .con-center {
    margin: 8px 0;
    color: #383838;
    font-size: 16px;
    line-height: 22px;
  }
  .con-img {
    margin-bottom: 8px;
    img {
      width: 170px;
      height: 170px;
      border-radius: 5px;
    }
  }
  .con-btm {
    .time {
      color: #808080;
      font-size: 11px;
      height: 16px;
      line-height: 16px;
    }
    .bottom {
      margin-top: 12px;
      display: flex;
      align-items: center;
      height: 17px;
      line-height: 17px;
      font-size: 12px;
      img {
        width: 17px;
        height: 17px;
      }
      div {
        flex: 1;
        display: flex;
        align-items: center;
        span {
          margin-left: 6px;
        }
        img:last-of-type {
          margin-left: 20px;
        }
      }
    }
  }
}
.content::after {
  content: "";
  width: 100%;
  height: 5px;
  // position: absolute;
  background: #eeeeee;
}
.addpost {
  position: fixed;
  right: 16px;
  bottom: 16px;
  width: 112px;
  height: 36px;
  background: #8032ff;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  img {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }
}

.check-comment {
}
</style>
