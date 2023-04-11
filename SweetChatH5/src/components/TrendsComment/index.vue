<template>
  <div class="trends-comment-container" @click="cancleReplyToReply">
    <p class="comment-title">全部评论({{ commentCount }})</p>
    <div class="comment-container">
      <div class="comment-item">
        <template v-if="commentCount > 0">
          <template v-if="replyList.length">
            <div class="item-main" v-for="item in replyList" :key="item.id">
              <div class="main-avatar" @click.stop="toShowInput(item)">
                <img :src="item.authorInfo.avatar" alt="" />
                <img :src="genderImg(item.authorInfo.gender)" alt="" />
              </div>
              <div class="main-content">
                <div @click.stop="toShowInput(item)">
                  <span>{{ item.authorInfo.nickname }}</span>
                  <div class="reply-msg">{{ item.content }}</div>
                  <span
                    >{{ item.postTime | timeFilter }}
                    {{ item.postAddress ? " · " + item.postAddress : "" }} ·
                    回复</span
                  >
                </div>
                <div
                  class="item-reply"
                  v-for="inneritem in item.replyToReplyList"
                  :key="'inner' + inneritem.id"
                  @click.stop="toShowInput(inneritem)"
                >
                  <div class="main-avatar reply-avatar">
                    <img :src="inneritem.authorInfo.avatar" alt="" />
                    <img :src="genderImg(inneritem.authorInfo.gender)" alt="" />
                  </div>
                  <div class="main-content">
                    <span>{{ inneritem.authorInfo.nickname }}</span>
                    <div class="reply-to-reply">
                      <p
                        v-show="inneritem.toUserNickname"
                        class="to-reply-user"
                      >
                        回复 <i>{{ inneritem.toUserNickname }}</i> ：
                      </p>
                      <div class="reply-msg">{{ inneritem.content }}</div>
                    </div>
                    <span>
                      {{ inneritem.postTime | timeFilter }}
                      {{
                        inneritem.postAddress
                          ? " · " + inneritem.postAddress
                          : ""
                      }}
                      · 回复</span
                    >
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
              <el-button
                v-else
                size="mini"
                round
                style="margin-bottom: 24px"
                @click="getMoreComment"
                >点击加载更多评论</el-button
              >
            </div>
          </template>
          <div v-else class="comment-loading">
            <i class="el-icon-loading"></i>
            <p>评论加载中</p>
          </div>
        </template>
        <div class="no-comment" v-else>
          <i class="el-icon-chat-line-square"></i>
          <p>暂无评论</p>
        </div>
      </div>
      <div class="comment-input" @click.stop>
        <div>
          <el-input
            ref="commentInput"
            type="textarea"
            :rows="1"
            :placeholder="placeholder"
            v-model="commentTextarea"
            resize="none"
          >
          </el-input>
          <img src="../../assets/images/trends/emoji.svg" alt="" />
          <el-button
            type="primary"
            round
            style="padding: 6px 12px"
            @click="sendCommentBtn"
            >发送</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { relativeTime } from "@/utils/date.js";

export default {
  name: "",
  mixins: [],
  components: {},
  props: {
    dynamicID: {
      type: Number,
    },
    commentCount: {
      type: Number,
    },
  },
  filters: {
    timeFilter(val) {
      return relativeTime(val);
    },
  },
  data() {
    return {
      replyList: [],
      isShowInput: false,
      placeholder: "发布评论",
      commentTextarea: "",
      pageNum: 0,
      replyObj: null,
      isSending: false,
      isEnd: true, // 是否已获取所有评论
      flag: false, // 回复列表接口是否请求完毕
      oneOrTwo: 1, // 发送的是一级评论还是二级评论
    };
  },
  computed: {
    genderImg() {
      return (flag) => {
        if (flag == 1) {
          return require("../../assets/images/trends/male.png");
        }
        return require("../../assets/images/trends/female.png");
      };
    },

    // computed end
  },
  watch: {
    dynamicID() {
      this.pageNum = 0;
      this.replyList = [];
      this.replyObj = null;
      this.commentTextarea = "";
      this.placeholder = "发布评论";
      this.oneOrTwo = 1;
    },
  },
  created() {},
  mounted() {
    this.commentCount > 0 && this.getInitReply();
  },
  methods: {
    // 获取动态评论
    getInitReply(pageNum = 0, isAfterSend = true, id = this.dynamicID) {
      if (this.flag) {
        return;
      }
      this.flag = true;
      this.$api
        .dynamicReplyList({
          dynamicID: id,
          pageNum,
          isBackendVisit: true,
        })
        .then((res) => {
          if (res.result) {
            isAfterSend
              ? (this.replyList = res.data.replyList)
              : (this.replyList = [...this.replyList, ...res.data.replyList]);
            this.isEnd = res.data.isEnd;
          } else {
            this.$message.error(res.errorMsg);
          }
          this.flag = false;
        });
    },

    // 加载更多评论
    getMoreComment() {
      this.pageNum++;
      this.getInitReply(this.pageNum, false);
    },

    // 取消对回复的回复
    cancleReplyToReply() {
      this.placeholder = "发布评论";
      this.oneOrTwo = 1;
      this.replyObj = null;
    },

    // 点击显示输入框
    toShowInput(commentInfo) {
      this.isShowInput = true;
      this.replyObj = commentInfo;
      console.log(this.replyObj, "=======");
      this.placeholder = `回复 @${commentInfo.authorInfo.nickname} :`;
      this.oneOrTwo = 2;
      this.$refs.commentInput.focus();
    },

    // 点击发送按钮
    async sendCommentBtn() {
      if (!this.commentTextarea.trim()) {
        this.$message.warning("您还没有输入评论内容！");
        return;
      }
      if (this.isSending) {
        this.$message.warning("评论正在发送中，请不要连续点击按钮！");
        return;
      }
      this.isSending = true;

      var res = await this.postSendComment();

      if (res.result) {
        this.$root.$emit("parGetNewNotice");
        // 添加二级/楼中楼评论，前端更新数据
        if (this.oneOrTwo == 1) {
          this.pageNum = 0;
          this.getInitReply();
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

          var tempRes = await this.$api.dynamicReplyList({
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

        this.commentTextarea = "";
        this.placeholder = "发布评论";
        this.oneOrTwo = 1;
        this.isShowInput = false;
        this.replyObj = null;
        this.$message.success("发送评论成功");
        this.$root.$emit("changeTrendsCommentNum", this.dynamicID);
        this.$parent.commentCount++;
      } else {
        this.$message.error(res.errorMsg);
      }
      this.isSending = false;
    },

    // 请求发布评论接口
    async postSendComment() {
      if (this.replyObj) {
        // 发送 一级评论 or 楼中楼
        let tempParms = {
          dynamicID: this.dynamicID,
          replyID: this.replyObj.id,
          contentText: this.commentTextarea.trim(),
        };
        if (this.replyObj.replyID) {
          // 发送 楼中楼
          tempParms.toReplyID = this.replyObj.id;
          tempParms.toUserID = this.replyObj.authorInfo.id;
          tempParms.replyID = this.replyObj.replyID;
        }
        var res = await this.$api.dynamicReplyToReply(tempParms);
      } else {
        // 发送 动态评论
        var res = await this.$api.dynamicReply({
          dynamicID: this.dynamicID,
          contentText: this.commentTextarea.trim(),
        });
      }

      return res;
    },
  },
};
</script>

<style scoped lang="scss">
.trends-comment-container {
  width: 400px;
  height: calc(100vh - 112px);

  .comment-title {
    margin: 0;
    font-weight: 600;
    color: #373737;
    padding: 20px 35px 0 25px;
  }

  .comment-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 150px);
  }

  .comment-item {
    margin-top: 16px;
    padding: 0 35px 0 25px;
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
  }

  .no-comment {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #999;

    i {
      font-size: 48px;
    }
  }

  .item-main {
    display: flex;
    margin-bottom: 15px;

    .main-avatar {
      width: 36px;
      height: 36px;
      position: relative;
      margin-right: 8px;
      cursor: pointer;

      img:first-of-type {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }

      img:last-of-type {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }

    .main-content {
      font-size: 14px;

      span {
        color: #a8a8a8;

        &:first-of-type {
          font-size: 14px;
        }

        &:last-of-type {
          font-size: 12px;
        }
      }

      > div {
        font-size: 14px;
        margin: 3px 0 5px;
        cursor: pointer;
        width: max-content;
        max-width: 290px;

        .reply-msg {
          margin: 3px 0 5px;
          word-break: break-all;
          white-space: pre-wrap;
        }

        p {
          margin: 0;
        }
      }

      .reply-to-reply {
        max-width: 256px;
      }

      .to-reply-user {
        display: inline-block;
        color: #373737;
        font-size: 14px;

        i {
          color: #8b8989;
        }
      }
    }

    .item-reply {
      display: flex;
      margin-top: 12px !important;

      .reply-avatar {
        width: 24px;
        height: 24px;

        img:first-of-type {
          width: 24px;
          height: 24px;
        }
      }
    }
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
    font-size: 14px;
  }

  .comment-loading {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #999;

    i {
      font-size: 48px;
    }
  }

  .comment-input {
    height: 65px;
    width: 400px;
    background-color: #f3f3f3;
    padding: 10px 16px;
    box-sizing: border-box;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 45px;

      ::v-deep .el-textarea__inner {
        height: 45px !important;
        min-height: 45px !important;
        border-radius: 23px;
        padding: 8px 20px !important;
        box-sizing: border-box;

        &::-webkit-scrollbar {
          display: none;
        }
      }

      img {
        width: 23px;
        height: 23px;
        margin: 0 14px;
      }
    }
  }
}
</style>
