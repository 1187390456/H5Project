<template>
    <div class="search_container">
        <div class="tips">
            <div>Please tell me</div>
            <div>Who are you here for?</div>
        </div>
        <div class="box">
            <img class="icon" src="../../assets/images/chats/Search/Search.png" alt="">
            <input class="input" type="text" placeholder="Enter a nickname" v-model="searchContent">
            <img v-show="searchContent != ''" @click="OnclickClose" class="icon1"
                src="../../assets/images/chats/Search/close.png" alt="">
        </div>
        <ul class="content">
            <li v-for="(item, i) in bloggerList" :key="i" @click="OnClickBlogger(item)">
                <div class="info">
                    <img class="avatar" :src="item.userAvatar" alt="">
                    <span class="name">{{ item.nickName }}</span>
                </div>
                <img class="logo" src="../../assets/images/chats/Search/arrow.png" alt="">
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    data() {
        return {
            searchContent: '',
            bloggerList: [],
            timer: null  // 搜索框计时器
        }
    },
    watch: {
        'searchContent': {
            handler(newVal, oldValue) {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.SendRequest(newVal)
                }, 500);
            },
        }
    },
    methods: {
        // 清空搜索
        OnclickClose() {
            this.searchContent = '';
            this.bloggerList = []
        },
        // 博主列表请求
        async SendRequest(val) {
            var res = await this.$api.bloggerSearch({ officialId: '0', nickname: val, pageNum: 0 });
            console.log('博主搜索列表', res.data.list);
            this.bloggerList = res.data.list;
        },
        // 跳转个人主页
        OnClickBlogger(info) {
            this.$router.push({ path: '/bloggerInfo', query: { info } });
        }
    }
}
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
    width: 0px;
}

.search_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .tips {
        max-width: 11.7rem;
        font-size: 1.1rem;
        font-family: Helvetica-Bold, Helvetica;
        font-weight: bold;
        color: #2F2F2F;
        line-height: 1.3rem;
        text-align: center;

        margin-top: 1.1rem;
    }

    .box {
        width: 17.15rem;
        min-height: 2.2rem;
        margin: 1.15rem 0.8rem 0.4rem 0.8rem;
        position: relative;

        .input {
            width: 100%;
            height: 100%;
            background: #F6F6F6;
            border-radius: 1.95rem;
            border: 1px solid #D7D7D7;

            padding-left: 2rem;
            padding-right: 2rem;

            box-sizing: border-box;
        }

        input::-webkit-input-placeholder {
            font-size: 0.7rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #979797;
            text-align: center;
        }

        .icon {
            position: absolute;
            left: 0.9rem;
            top: 0.8rem;
            // left: 0.8rem;
            // top: 0.75rem;
            width: 0.7rem;
            height: 0.7rem;
        }

        .icon1 {
            position: absolute;
            right: 0.65rem;
            top: 0.75rem;

            width: 0.9rem;
            height: 0.9rem;
        }
    }

    .content {
        width: 100%;
        overflow-y: auto;

        li {
            width: 100%;
            height: 59px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            padding: 0 16px;
            box-sizing: border-box;

            .info {
                display: flex;
                align-items: center;
                justify-content: center;

                .avatar {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;

                    margin-right: 9px;
                }

                .name {
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #161616;
                    line-height: 20px;
                }

            }

            .logo {
                width: 19px;
                height: 19px;
            }
        }
    }
}
</style>