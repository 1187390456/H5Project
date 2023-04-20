<template>
    <div class="chatView">
        <div class="top ">
            <div class="l">
                <img @click="$router.push({ path: '/Chats' })" class="return" src="../../../assets/images/chats/返回.png"
                    alt="">
                <img class="avatar" :src="$nimInfo.sessionInfo.avatar" alt="" />
                <span class="name">{{ $nimInfo.sessionInfo.nick }}</span>
            </div>
            <div class="r"> 10 </div>
        </div>
        <div class="topline"></div>
        <div class="content" ref="chatViewRef">
            <time-line v-if="$nimInfo.chatViewList.length > 0" :timeInfo="$nimInfo.chatViewList[0].time"></time-line>
            <div :class="[
                'w100p',
                item.from == $nimInfo.sessionInfo.account
                    ? 'flex-col-start-center'
                    : 'flex-col-end-center',
            ]" v-for="(item, i) in $nimInfo.chatViewList" :key="i">
                <img-msg v-if="item.file != null" :info="item"></img-msg>
                <text-msg v-else :info="item" :isleft="item.from == $nimInfo.sessionInfo.account"></text-msg>
            </div>
        </div>
        <div class="bottom">
            <div class="input">
                <el-input type="text" placeholder="Enter a new message" v-model="textarea" @keydown.native="listen($event)">
                </el-input>
                <el-button v-if="textarea != ''" class="elBtn" @click="SendText">Send</el-button>
            </div>
            <div class="btnlist">
                <img src="../../../assets/images/chats/麦克风2.png" alt="">
                <img src="../../../assets/images/chats/相册、照片-m.png" alt="">
                <img src="../../../assets/images/chats/表情笑脸.png" alt="">
                <img src="../../../assets/images/chats/礼物.png" alt="">
            </div>
        </div>
    </div>
</template>
  
<script>
import ImgMsg from "../../../components/Chats/MsgType/ImgMsg.vue";
import TextMsg from "../../../components/Chats/MsgType/TextMsg.vue";
import TimeLine from "../../../components/Chats/MsgType/TimeLine.vue";
import { SendText } from '../../../utils/xcm'

export default {
    components: { ImgMsg, TextMsg, TimeLine },
    data() {
        return {
            textarea: "",
            isSendImg: false,
        };
    },
    mounted() {
        this.ResetScroll();
    },
    methods: {
        // 监听Enter
        listen(event) {
            if (event.keyCode == 13 && event.ctrlKey) {
                this.textarea += "\n"; //换行
            } else if (event.keyCode === 13) {
                this.SendText(); // 发送文本
                event.preventDefault(); // 阻止浏览器默认换行操作
                return;
            }
        },
        // 发送消息
        SendText() {
            SendText(this, this.textarea);
            this.ResetScroll();
            this.textarea = "";
        },
        // 重置滚动条
        ResetScroll() {
            var that = this;
            // 滚动条自适应
            this.$nextTick(() => {
                var root = that.$refs["chatViewRef"];
                var time = this.isSendImg ? 1000 : 200;
                console.log("时间" + time); // 这里发图片就延时1秒 发文本延时200毫秒
                setTimeout(() => {
                    root.scrollTop = root.scrollHeight;
                }, time);
            });
        },
    },
};
</script>
  
<style lang="less" scoped>
/deep/ .el-input__inner {
    border: none;
    // width: 17.15rem;
    width: 80vw;
    height: 2.1rem;
    background: #F9F9F9;
    border-radius: 0.5rem;

    &::placeholder {
        font-size: 0.75rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #D4D4D4;
        line-height: 1.05rem;
    }
}


::-webkit-scrollbar {
    width: 0px;
}

.emj_img_btn {
    position: fixed;
    background: #f6f7fb;
    border: none;

    width: 24px;
    height: 24px;

    display: flex;
    align-items: center;
    justify-content: center;
}

.chatView {
    width: 100%;
    height: 100vh;
    background: #ffffff;
    position: relative;

    .top {
        width: 100vw;
        height: 2.6rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .l {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            max-width: 18rem;

            .return {
                width: 1.25rem;
                height: 1.25rem;
                margin-left: 0.6rem;
            }

            .avatar {
                height: 1.9rem;
                width: 1.9rem;
                border-radius: 50%;
                margin-left: 0.4rem;
            }

            .name {
                font-size: 0.8rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #161616;
                line-height: 1.1rem;
                margin-left: 0.4rem;
            }
        }

        .r {
            width: 1.1rem;
            height: 1.1rem;
            background: #0D57C0;
            border-radius: 0.45rem;
            font-size: 0.5rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 1.1rem;
            text-align: center;

            margin-right: 0.8rem;
        }
    }

    .topline {
        width: 100vw;
        height: 0.15rem;
        background-color: #F7F7F7;
    }

    .content {
        width: 100vw;
        max-height: calc(100% - 2.6rem - 0.15rem - 5.45rem - 5px); // 5px的自适应
        overflow: scroll;
        overflow-x: hidden;

        padding: 0 0.4rem;
        box-sizing: border-box;
    }

    .bottom {
        position: absolute;
        bottom: 0;
        width: 100vw;
        height: 5.45rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        .input {
            width: 100%;
            display: flex;
            justify-content: center;
            position: relative;

        }

        .btnlist {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            margin-top: 0.6rem;

            img {
                width: 1.05rem;
                height: 1.05rem;
            }
        }
    }

}
</style>