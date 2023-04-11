<template>
  <div class="mytrends-container">
    <div
      class="container"
      v-if="trendList.length"
      @click="isShowComment = false"
    >
      <div v-for="item in trendList" :key="item.id">
        <div class="top">
          <img :src="item.authorInfo.avatar" alt="" />
          <div class="top-center">
            <div>{{ item.authorInfo.nickname }}</div>
            <div v-show="item.authorInfo.isBlogger">
              <img src="@/assets/images/trends/member.png" alt="" />
              入驻博主
            </div>
          </div>
          <el-popconfirm
            v-if="bloggerInfo.id == item.authorInfo.id"
            title="确认删除该动态？"
            @confirm="delDynamic(item)"
          >
            <img
              slot="reference"
              src="@/assets/images/trends/delete.png"
              alt=""
            />
          </el-popconfirm>
        </div>
        <div class="center">
          <p class="trend-contrnt">{{ item.content }}</p>
          <div class="img-list" v-if="item.imageList.length">
            <el-image
              :class="item.imageList.length > 1 ? 'img2' : 'img1'"
              v-for="(innerItem, index) in item.imageList"
              :key="index"
              :src="innerItem"
              :preview-src-list="item.imageList"
              alt=""
            ></el-image>
          </div>
          <div
            class="videoPlayer"
            v-if="item.video"
            @click="openVideo(item.video.url)"
          >
            <div id="videoIcon" class="el-icon-video-play"></div>
            <video :src="item.video.url" type="video/mp4"></video>
          </div>
          <div class="publish-time">
            {{ item.postTime | timeFilter }}
            <span v-show="item.postAddress">|</span> {{ item.postAddress }}
          </div>
        </div>
        <div class="bottom">
          <img
            v-if="item.isLike"
            src="@/assets/images/trends/islike.png"
            alt=""
            @click="cancelLike(item)"
          />
          <img
            v-else
            src="@/assets/images/trends/isnotlike.png"
            alt=""
            @click="getLike(item)"
          />
          <span>{{ item.likeCount }}</span>
          <img
            @click.stop="showComment(item)"
            src="@/assets/images/trends/comment-on.png"
            alt=""
          />
          <span>{{ item.commentCount }}</span>
        </div>
        <div class="separate-line"></div>
      </div>
      <!-- 加载更多 -->
      <div v-if="isEnd" class="no-more">— THE END —</div>
      <div v-else class="loading-more">
        <i class="el-icon-loading"></i>
        <p>动态加载中</p>
      </div>
    </div>
    <el-empty v-else style="margin: 0 auto"></el-empty>
    <trends-comment
      v-if="isShowComment"
      ref="trendsComment"
      :dynamicID="dynamicID"
      :commentCount="commentCount"
    />

    <el-dialog
      v-if="dialogVisibleVideo"
      title="查看视频"
      :visible.sync="dialogVisibleVideo"
      width="50%"
    >
      <video-player
        ref="videoPlayer"
        class="video-player vjs-custom-skin"
        :playsinline="true"
        :options="playerOptions"
      />
    </el-dialog>
  </div>
</template>

<script>
import TrendsComment from "../TrendsComment/index.vue";
import { relativeTime } from "@/utils/date.js";
import { mapGetters } from "vuex";

export default {
  name: "",
  mixins: [],
  components: {
    TrendsComment,
  },
  filters: {
    timeFilter(val) {
      return relativeTime(val);
    },
  },
  props: {
    trendList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    dynamicType: {
      type: Number,
      default: 1,
    },
    isEnd: {
      type: Boolean,
      default: true,
    },
    isRequest: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pageNum: 1,
      isShowComment: false,
      showCommentTimes: 0, // 点击打开评论的次数
      dynamicID: -1, // 传给动态评论
      commentCount: 0, // 总评论数
      nextDynamic: null,
      dialogVisibleVideo: false,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "", // url地址
          },
        ],
        hls: true, // 你的封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, // 全屏按钮
        },
      },
    };
  },
  computed: {
    ...mapGetters(["bloggerInfo"]),
  },
  watch: {
    "$store.state.user.bloggerInfo": {
      deep: true,
      handler: function (newVal, oldVal) {
        if (newVal.id) {
          this.isShowComment = false;
          this.pageNum = 1;
          this.showCommentTimes = 0;
          this.nextDynamic = null;
        }
      },
    },
    isShowComment(newVal) {
      if (!newVal) {
        this.showCommentTimes = 0;
      }
    },
    dynamicType() {
      this.pageNum = 1;
    },
    trendList: {
      handler(newList) {
        if (newList.length) {
          this.$nextTick(() => {
            let container = document.querySelector(".container");
            container.onscroll = () => {
              let scrollTop = container.scrollTop;
              let clientHeight = container.clientHeight;
              let scrollHeight = container.scrollHeight;
              if (
                scrollTop + clientHeight > scrollHeight - 10 &&
                !this.isEnd &&
                !this.isRequest
              ) {
                this.pageNum++;
                if (this.dynamicType == 1) {
                  this.$emit("getMytrend", this.pageNum);
                } else {
                  this.$emit("getAlltrend", this.pageNum);
                }
              }
            };
          });
        }
      },
      deep: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    // 点赞
    getLike(item) {
      this.$api.giveLike({ dynamicID: item.id }).then((res) => {
        if (res.result) {
          item.likeCount++;
          this.$set(item, "isLike", true);
          this.$root.$emit("parGetNewNotice");
        } else {
          this.$message.error(res.errorMsg);
        }
      });
    },
    // 取消点赞
    cancelLike(item) {
      this.$api.cancelLike({ dynamicID: item.id }).then((res) => {
        if (res.result) {
          item.likeCount--;
          this.$set(item, "isLike", false);
        } else {
          this.$message.error(res.errorMsg);
        }
      });
    },
    // 删除动态
    async delDynamic(item) {
      if (!this.isEnd) {
        this.pageNum++;
        if (this.dynamicType == 1) {
          var res = await this.$api.myTrendList({
            pageNum: this.pageNum,
            targetUserID: this.bloggerInfo.id,
          });
        } else {
          var res = await this.$api.allTrendList({
            pageNum: this.pageNum,
          });
        }
        if (res.result) {
          this.nextDynamic = res.data.list[0];
        }
        this.pageNum--;
      }
      var delRes = await this.$api.deleteDynamic({ dynamicID: item.id });
      if (delRes.result) {
        this.$message.success("删除成功");
        this.$root.$emit("parDelDynamic", item);
      } else {
        this.$message.error(delRes.errorMsg);
      }
    },
    // 展示评论
    showComment(item) {
      this.dynamicID = item.id;
      this.commentCount = item.commentCount;
      this.isShowComment = true;
      this.showCommentTimes > 0 &&
        this.commentCount > 0 &&
        this.$refs.trendsComment.getInitReply(0, true, item.id);
      this.showCommentTimes++;
    },
    // 大视频
    openVideo(val) {
      this.dialogVisibleVideo = true;
      this.playerOptions.sources[0].src = val;
    },

    // methods end
  },
};
</script>

<style scoped lang="scss">
img {
  object-fit: cover;
  cursor: pointer;
}
.mytrends-container {
  height: calc(100vh - 112px);
  display: flex;
  .container {
    border-right: 1px solid #f1f1f1;
    flex: 1;
    overflow: auto;
    > div {
      padding: 20px 25px 0 16px;
    }
  }
  .top {
    display: flex;
    .top-center {
      flex: 1;
      margin-left: 8px;
      div:last-child {
        display: inline-block;
        font-size: 10px;
        padding: 1px 4px 1px 5px;
        color: #fff;
        background-color: #ff006a;
        border-radius: 5px;
        img {
          width: 14px;
          height: 14px;
          position: relative;
          top: 2px;
        }
      }
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    img:last-of-type {
      width: 30px;
      height: 30px;
    }
  }
  .center {
    p {
      margin: 8px 0;
      color: #383838;
    }
    .trend-contrnt {
      word-break: break-all;
      white-space: pre-wrap;
    }
    margin: 8px 0;
    .img-list {
      .img1 {
        width: 170px;
        height: 170px;
        border-radius: 5px;
      }
      .img2 {
        width: 112px;
        height: 112px;
        border-radius: 5px;
        margin-right: 3px;
      }
    }
    .videoPlayer {
      cursor: pointer;
      position: relative;
      width: 180px;
      height: 180px;
      #videoIcon {
        color: #fff;
        font-size: 30px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      video {
        width: 180px;
        height: 180px;
      }
    }
    .publish-time {
      font-size: 12px;
      color: #9d9ea6;
      margin-top: 8px;
    }
  }
  .bottom {
    margin: 16px 0;
    font-size: 14px;
    color: #9d9ea6;
    display: flex;
    align-items: center;
    img:last-of-type {
      margin-left: 40px;
    }
    img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
    span {
      margin-left: 12px;
    }
  }
  .separate-line {
    height: 1px;
    background: #eeeeee;
    opacity: 0.5;
  }

  .no-more {
    height: 52px;
    line-height: 52px;
    text-align: center;
    color: #999;
  }

  .loading-more {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #999;
    font-size: 16px;
  }
}
</style>
