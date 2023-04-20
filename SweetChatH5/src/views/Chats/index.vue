<template>
    <div class="chatContainer">
        <chat-list :chatList="$nimInfo.chatList" v-if="$nimInfo.chatListGetDone && viewType == 'list'"
            @SelectChatCallback="SelectChatCallback" ref="chatlist"></chat-list>
        <!-- <chat-view :chatViewList="chatViewList" :sessionInfo="sessionInfo" :fileImageWidth="fileImageWidth"
            :isSendImg="isSendImg" v-if="chatViewList.length > 0 && viewType == 'view'" @SendText="SendText"
            @handleImageChange="handleImageChange" @handleImageRemove="handleImageRemove" @ReturnList="ReturnList"
            ref="chatView"></chat-view> -->
        <user-search v-if="viewType == 'search'"></user-search>
        <!-- <button @click="SendText('123')">123</button> -->
    </div>
</template>
  
<script>
import ChatList from "../../components/Chats/ChatList.vue";
import UserSearch from '../../components/Chats/UserSearch.vue'
import { InitIM, SelectCallBack, DisConnectNim } from "../../utils/xcm";

export default {
    components: { ChatList, UserSearch },
    data() {
        return {
            imFile: { imageFile: [] }, // 添加的临时图片
            isSendImg: false, // 是否正在上传图片
            fileImageWidth: 400, //图片上传提示框宽度

            viewType: 'list',
        };
    },
    created() {
        InitIM(this);
    },
    destroyed() {
        //  DisConnectNim();
    },

    methods: {
        // 选中会话回调
        SelectChatCallback(selectItem) {
            SelectCallBack(this, selectItem);
        },

        // 清空当前id的消息未读
        ClearUnread(id) {
            this.chatList.map((item) => {
                if (item.id == id) {
                    console.log("找到了", item);
                    item.unread = 0;
                }
                return item;
            });
        },
        // 从左侧列表 查找指定用户
        GetByChatList(id) {
            for (var i = 0; i < this.chatList.length; i++) {
                if (this.chatList[i].id == id) return this.chatList[i];
            }
            return null;
        },

        //添加图片文件
        handleImageChange(file, fileList) {
            this.imFile.imageFile = fileList;
            this.fileImageWidth = fileList.length * 160 + 300;
        },
        //删除图片文件
        handleImageRemove(file, fileList) {
            this.imFile.imageFile = fileList; //删除文件时要移除缓存区文件
        },
        // 返回列表视图
        ReturnList() {
            this.viewType = 'list'
        }
    },
};
</script>
  
<style lang="less" scoped>
.chatContainer {
    display: flex;
    width: 100%;
    height: 100%;
}

.btnStyle {
    height: 32px;
    background: #ffffff;
    border-radius: 5px;
    border: none;
    color: #ff4471 !important;
}


.dialong {
    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #000000;
        opacity: 0.34;
    }

    .dialongContent {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        // width: 350px;
        // height: 210px;

        width: 280px;
        height: 168px;

        background: #fefefe;
        border-radius: 16px;

        .drawBtn {
            width: 229px;
            height: 43px;
            background: #ff536c;
            border-radius: 29px;
            border: none;
        }
    }
}
</style>