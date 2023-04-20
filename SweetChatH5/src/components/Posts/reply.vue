<template>
  <div class="reply-container">
    <div class="reply-box">
      <div>
        <template v-if="commentCount > 0">
          <template v-if="replyList.length">
            <div
              class="reply-level1-item"
              v-for="item in replyList"
              :key="item.id"
            >
              <div class="level1-avatar" @click.stop="toShowInput(item)">
                <img :src="item.authorInfo.avatar" alt="" />
              </div>
              <div class="level1-main">
                <div @click.stop="toShowInput(item)">
                  <div class="reply-nickname">
                    {{ item.authorInfo.nickname }}
                  </div>
                  <div class="reply-msg">{{ item.content }}</div>
                  <div class="reply-time">
                    {{ item.postTime | timeFilter }}
                    {{ item.postAddress ? " · " + item.postAddress : "" }}
                    · Reply
                  </div>
                </div>
                <div
                  class="reply-level2-item"
                  v-for="level2item in item.replyToReplyList"
                  :key="'level2_' + level2item.id"
                  @click.stop="toShowInput(level2item)"
                >
                  <div class="level2-avatar reply-avatar">
                    <img :src="level2item.authorInfo.avatar" alt="" />
                  </div>
                  <div class="level2-main">
                    <div class="reply-nickname">
                      {{ level2item.authorInfo.nickname }}
                    </div>
                    <div class="reply-to-reply">
                      <p
                        class="to-reply-user"
                        v-show="level2item.toUserNickname"
                      >
                        @{{ level2item.toUserNickname }}
                      </p>
                      <div class="reply-msg">{{ level2item.content }}</div>
                    </div>
                    <div class="reply-time">
                      {{ level2item.postTime | timeFilter }}
                      {{
                        level2item.postAddress
                          ? " · " + level2item.postAddress
                          : ""
                      }}
                      · Reply
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 加载更多 -->
            <div v-if="isEnd" class="no-more">— THE END —</div>
            <div v-else class="loading-more">
              <template v-if="flag">
                <i class="el-icon-loading"></i>
                <p>评论加载中</p>
              </template>
            </div>
          </template>
          <div v-else class="comment-loading">
            <i class="el-icon-loading"></i>
            <p>评论加载中</p>
          </div>
        </template>
        <div class="no-comment" v-else>
          <img src="../../assets/images/posts/no_comments.png" alt="" />
          <p>No comments</p>
        </div>
      </div>
    </div>

    <!-- 输入框 -->

    <van-overlay
      :show="isShowInput"
      :z-index="99"
      @click="isShowInput = false"
      style="background: transparent"
    >
      <div class="reply-input" @click.stop>
        <input
          ref="replyInput"
          v-model="replyTextarea"
          type="text"
          :placeholder="placeholder"
        />
        <!-- <img src="../../assets/images/trends/emoji.svg" alt="" /> -->
        <span>笑</span>
        <button @click="sendReplyBtn">Send</button>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { relativeTime } from "@/utils/date.js";

export default {
  name: "",
  mixins: [],
  components: {},
  props: {
    commentCount: {
      type: Number,
      default: 0,
    },
    dynamicID: {
      type: Number,
      default: 0,
    },
  },
  filters: {
    timeFilter(val) {
      return relativeTime(val);
    },
  },
  data() {
    return {
      pageNum: 0,
      replyList: [],
      isEnd: false,
      isShowInput: false,
      level1Or2: 1,
      replyObj: null,
      placeholder: "Say something...",
      replyTextarea: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getPostsReplyList();
  },
  methods: {
    getPostsReplyList(pageNum = 0, isAfterSend = false) {
      this.$api
        .postsReplyList({
          dynamicID: this.dynamicID,
          pageNum,
        })
        .then((res) => {
          if (res.result) {
            !isAfterSend
              ? (this.replyList = res.data.replyList)
              : (this.replyList = [...this.replyList, ...res.data.replyList]);
            this.isEnd = res.data.isEnd;
          }
        });
    },

    toShowInput(info) {
      console.log(info);
      this.isShowInput = true;
      this.$nextTick(() => {
        this.$refs.replyInput.focus();
      });
      this.replyObj = info;
      this.level1Or2 = 2;
    },

    // 点击发送按钮
    async sendReplyBtn() {
      this.isShowInput = false;
      // if (!this.replyTextarea.trim()) {
      //   this.$message.warning("您还没有输入评论内容！");
      //   return;
      // }
      // if (this.isSending) {
      //   this.$message.warning("评论正在发送中，请不要连续点击按钮！");
      //   return;
      // }

      var res = await this.postSendReply();

      if (res.result) {
        // 添加二级/楼中楼评论，前端更新数据
        if (this.level1Or2 == 1) {
          this.pageNum = 0;
          this.getPostsReplyList();
        } else {
          var tempId = 0;
          if (this.replyObj.replyID) {
            tempId = this.replyObj.replyID;
          } else {
            tempId = this.replyObj.id;
          }

          var tempPageNum = 0;
          this.replyList.forEach((item, index) => {
            if (item.id == tempId) {
              tempPageNum = Math.floor(index / 10);
            }
          });

          var tempRes = await this.$api.postsReplyList({
            dynamicID: this.dynamicID,
            pageNum: tempPageNum,
            isBackendVisit: true,
          });
          if (tempRes.result) {
            var tempObj = null;
            tempRes.data.replyList.forEach((item) => {
              if (item.id == tempId) {
                tempObj = item.replyToReplyList[0];
              }
            });
            this.replyList.forEach((item) => {
              if (item.id == tempId) {
                item.replyToReplyList.unshift(tempObj);
              }
            });
          }
        }

        this.replyTextarea = "";
        this.placeholder = "Say something...";
        this.level1Or2 = 1;
        this.isShowInput = false;
        this.replyObj = null;
      } else {
        // this.$message.error(res.errorMsg);
      }
    },

    // 请求发布评论接口
    async postSendReply() {
      if (this.replyObj) {
        // 发送 一级评论 or 楼中楼
        let tempParms = {
          dynamicID: this.dynamicID,
          replyID: this.replyObj.id,
          contentText: this.replyTextarea.trim(),
        };
        if (this.replyObj.replyID) {
          // 对 一级评论 或 楼中楼 的 回复
          tempParms.toReplyID = this.replyObj.id;
          tempParms.toUserID = this.replyObj.authorInfo.id;
          tempParms.replyID = this.replyObj.replyID;
        }
        var res = await this.$api.postsReplyToReply(tempParms);
      } else {
        // 发送 动态评论
        var res = await this.$api.postsReply({
          dynamicID: this.dynamicID,
          contentText: this.replyTextarea.trim(),
        });
      }

      return res;
    },

    // methods end
  },
};
</script>

<style scoped lang="scss">
.reply-container {
  .reply-box {
    padding: 0.8rem /* 15/18.75 */ 0.853333rem /* 16/18.75 */ 0;
  }
}

.reply-level1-item {
  display: flex;
  margin-bottom: 0.64rem /* 12/18.75 */;
}

.level1-avatar {
  width: 1.92rem /* 36/18.75 */;
  height: 1.92rem /* 36/18.75 */;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.426667rem /* 8/18.75 */;

  img {
    width: 1.92rem /* 36/18.75 */;
    height: 1.92rem /* 36/18.75 */;
  }
}

.level1-main {
  flex: 1;

  .level1-main-common {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }

  .reply-nickname {
    @extend .level1-main-common;
    font-size: 0.746667rem /* 14/18.75 */;
    color: #a8a8a8;
  }

  .reply-msg {
    @extend .level1-main-common;
    font-size: 0.746667rem /* 14/18.75 */;
    color: #010101;
    margin: 0.16rem /* 3/18.75 */ 0 0.266667rem /* 5/18.75 */;
    word-break: break-all;
    white-space: pre-wrap;
  }

  .reply-time {
    @extend .level1-main-common;
    font-size: 12px;
    color: #aaaaaa;
  }
}

.reply-level2-item {
  display: flex;
  margin-top: 0.64rem /* 12/18.75 */;

  .level2-avatar {
    width: 1.28rem /* 24/18.75 */;
    height: 1.28rem /* 24/18.75 */;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 0.426667rem /* 8/18.75 */;

    img {
      width: 1.28rem /* 24/18.75 */;
      height: 1.28rem /* 24/18.75 */;
    }
  }

  .level2-main {
    flex: 1;

    .reply-to-reply {
      margin: 0.16rem /* 3/18.75 */ 0 0.266667rem /* 5/18.75 */;
      clear: both;

      .to-reply-user {
        float: left;
        color: #4681fb;
        font-size: 0.746667rem /* 14/18.75 */;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        margin: 0;
        margin-right: 0.16rem /* 3/18.75 */;
      }

      .reply-msg {
        margin: 0;
      }
    }
  }
}

.reply-input {
  width: 100%;
  height: max-content;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 10;
  background-color: #fff;
  padding: 0.533333rem /* 10/18.75 */;
  box-sizing: border-box;

  input[type="text"] {
    flex: 1;
    border: none;
    border-radius: 18px;
    background: #f1efef;
    padding: 5px 10px;
  }

  span {
    margin: 0 0.533333rem /* 10/18.75 */;
  }

  button {
    width: 3.413333rem /* 64/18.75 */;
    height: 1.92rem /* 36/18.75 */;
    border: none;
    font-size: 0.746667rem /* 14/18.75 */;
    color: #fff;
    background: #8032ff;
    border-radius: 1.706667rem /* 32/18.75 */;
  }
}

.no-more {
  text-align: center;
  font-size: 0.64rem /* 12/18.75 */;
  color: #aaa;
  padding-bottom: 0.533333rem /* 10/18.75 */;
}

.no-comment {
  text-align: center;
  width: 100%;

  img {
    width: 5.12rem /* 96/18.75 */;
    height: 5.12rem /* 96/18.75 */;
  }

  p {
    text-align: center;
    margin: 0.533333rem /* 10/18.75 */;
  }
}
</style>
