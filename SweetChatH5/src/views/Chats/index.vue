<template>
    <div class="chatContainer">
        <chat-list :chatList="$nimInfo.chatList" v-if="$nimInfo.chatListGetDone && viewType == 'list'"
            @SelectChatCallback="SelectChatCallback" ref="chatlist"></chat-list>
        <!-- <chat-view :chatViewList="chatViewList" :sessionInfo="sessionInfo" :fileImageWidth="fileImageWidth"
            :isSendImg="isSendImg" v-if="chatViewList.length > 0 && viewType == 'view'" @SendText="SendText"
            @handleImageChange="handleImageChange" @handleImageRemove="handleImageRemove" @ReturnList="ReturnList"
            ref="chatView"></chat-view> -->
        <user-search v-if="viewType == 'search'"></user-search>
    </div>
</template>
  
<script>
import ChatList from "../../components/Chats/ChatList.vue";
import UserSearch from '../../components/Chats/UserSearch.vue'
import { InitIM, GoToChatView } from "../../utils/xcm";

export default {
    components: { ChatList, UserSearch },
    data() {
        return {
            viewType: 'search',
        };
    },
    created() {
        InitIM(this);
    },
    methods: {
        // 选中会话回调
        SelectChatCallback(selectItem) {
            GoToChatView(selectItem.targetUserInfo.account); // b_test_174
        },

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